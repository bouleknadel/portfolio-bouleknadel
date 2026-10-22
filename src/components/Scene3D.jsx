import { Suspense, useEffect, useLayoutEffect, useMemo, useRef, useState, Component } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Environment,
  Float,
  Lightformer,
  MeshReflectorMaterial,
  PerformanceMonitor,
  QuadraticBezierLine,
  RoundedBox,
} from "@react-three/drei";
import { Bloom, EffectComposer, ToneMapping } from "@react-three/postprocessing";
import { ToneMappingMode } from "postprocessing";
import * as THREE from "three";
import { useLang } from "../LanguageContext";

class SceneErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch() {}
  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}

const BG = "#05070f";
const FONT = "Inter, system-ui, -apple-system, sans-serif";
const MONO = "'JetBrains Mono', 'Fira Code', Consolas, 'Courier New', monospace";

// Deterministic PRNG so particle layout is stable across renders.
function mulberry32(seed) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function useCanvasTexture(width, height, draw, deps = []) {
  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 8;
    return tex;
  }, [width, height]);

  useEffect(() => {
    const ctx = texture.image.getContext("2d");
    const paint = () => {
      draw(ctx, width, height);
      texture.needsUpdate = true;
    };
    paint();
    // Repaint once web fonts are ready so canvas text uses Inter.
    document.fonts?.ready.then(paint);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [texture, ...deps]);

  useEffect(() => () => texture.dispose(), [texture]);
  return texture;
}

/* ------------------------------------------------------------------ */
/* Laptop screen: an animated IDE + AI assistant UI on a canvas        */
/* ------------------------------------------------------------------ */

const CODE = [
  [["from", "#c084fc"], [" langgraph.graph ", "#e2e8f0"], ["import", "#c084fc"], [" StateGraph", "#67e8f9"]],
  [["from", "#c084fc"], [" rag ", "#e2e8f0"], ["import", "#c084fc"], [" retriever, rerank", "#67e8f9"]],
  [],
  [["def ", "#c084fc"], ["answer", "#fbbf24"], ["(state):", "#e2e8f0"]],
  [["    docs = ", "#e2e8f0"], ["retriever", "#67e8f9"], [".invoke(state[", "#e2e8f0"], ['"query"', "#86efac"], ["])", "#e2e8f0"]],
  [["    ctx = ", "#e2e8f0"], ["rerank", "#67e8f9"], ["(docs, top_k=", "#e2e8f0"], ["5", "#fca5a5"], [")", "#e2e8f0"]],
  [["    ", "#e2e8f0"], ["return", "#c084fc"], [" llm.", "#e2e8f0"], ["generate", "#fbbf24"], ["(ctx)", "#e2e8f0"]],
  [],
  [["graph = ", "#e2e8f0"], ["StateGraph", "#67e8f9"], ["(AgentState)", "#e2e8f0"]],
  [["graph.", "#e2e8f0"], ["add_node", "#fbbf24"], ["(", "#e2e8f0"], ['"retrieve"', "#86efac"], [", answer)", "#e2e8f0"]],
  [["graph.", "#e2e8f0"], ["add_edge", "#fbbf24"], ["(", "#e2e8f0"], ['"plan"', "#86efac"], [", ", "#e2e8f0"], ['"retrieve"', "#86efac"], [")", "#e2e8f0"]],
  [["agent = graph.", "#e2e8f0"], ["compile", "#fbbf24"], ["()", "#e2e8f0"]],
];
const CODE_CHARS = CODE.reduce((n, line) => n + line.reduce((m, [t]) => m + t.length, 0) + 1, 0);

const CHAT = [
  { who: "user", text: "Summarize site report #42" },
  { who: "agent", text: "Retrieving 12 chunks…" },
  { who: "agent", text: "Reranked → 5 sources" },
  { who: "agent", text: "✓ Grounded answer ready" },
];

function drawScreen(ctx, W, H, progress, blink) {
  const bg = ctx.createLinearGradient(0, 0, W, H);
  bg.addColorStop(0, "#0b1024");
  bg.addColorStop(1, "#140b2e");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // title bar
  ctx.fillStyle = "rgba(255,255,255,0.04)";
  ctx.fillRect(0, 0, W, 44);
  ["#f87171", "#fbbf24", "#4ade80"].forEach((c, i) => {
    ctx.fillStyle = c;
    ctx.beginPath();
    ctx.arc(26 + i * 22, 22, 7, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.fillStyle = "rgba(129,140,248,0.22)";
  roundRect(ctx, 110, 9, 150, 27, 7);
  ctx.fill();
  ctx.font = `600 15px ${FONT}`;
  ctx.fillStyle = "#e0e7ff";
  ctx.fillText("agent.py", 140, 28);
  ctx.fillStyle = "#64748b";
  ctx.fillText("rag_pipeline.py", 290, 28);

  // sidebar
  ctx.fillStyle = "rgba(255,255,255,0.025)";
  ctx.fillRect(0, 44, 150, H - 44);
  ctx.font = `500 13px ${FONT}`;
  ["▾ src", "  agent.py", "  rag.py", "  tools.py", "▾ data", "  index/", "  docs/"].forEach((f, i) => {
    ctx.fillStyle = i === 1 ? "#a5b4fc" : "#64748b";
    ctx.fillText(f, 16, 78 + i * 26);
  });

  // code with typing animation
  let remaining = Math.floor(progress * CODE_CHARS);
  let cursor = null;
  ctx.font = `500 17px ${MONO}`;
  CODE.forEach((line, i) => {
    const y = 84 + i * 30;
    ctx.fillStyle = "#334155";
    ctx.fillText(String(i + 1).padStart(2, " "), 168, y);
    let x = 206;
    for (const [text, color] of line) {
      if (remaining <= 0) break;
      const shown = text.slice(0, remaining);
      remaining -= shown.length;
      ctx.fillStyle = color;
      ctx.fillText(shown, x, y);
      x += ctx.measureText(shown).width;
    }
    if (remaining > 0) remaining -= 1;
    else if (!cursor) cursor = [x, y];
  });
  if (cursor && blink) {
    ctx.fillStyle = "#a5b4fc";
    ctx.fillRect(cursor[0] + 2, cursor[1] - 16, 9, 20);
  }

  // AI assistant panel
  const px = W - 290;
  ctx.fillStyle = "rgba(99,102,241,0.08)";
  ctx.fillRect(px, 44, 290, H - 44);
  ctx.fillStyle = "rgba(129,140,248,0.35)";
  ctx.fillRect(px, 44, 2, H - 44);
  const grad = ctx.createLinearGradient(px + 20, 0, px + 60, 0);
  grad.addColorStop(0, "#818cf8");
  grad.addColorStop(1, "#22d3ee");
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(px + 34, 80, 13, 0, Math.PI * 2);
  ctx.fill();
  ctx.font = `700 16px ${FONT}`;
  ctx.fillStyle = "#f1f5f9";
  ctx.fillText("AI Assistant", px + 58, 86);

  const visible = Math.min(CHAT.length, Math.floor(progress * (CHAT.length + 1)));
  CHAT.slice(0, visible).forEach((m, i) => {
    const y = 120 + i * 62;
    const isUser = m.who === "user";
    ctx.font = `500 14px ${FONT}`;
    const w = Math.min(250, ctx.measureText(m.text).width + 28);
    const x = isUser ? W - 18 - w : px + 18;
    ctx.fillStyle = isUser ? "rgba(129,140,248,0.85)" : "rgba(255,255,255,0.08)";
    roundRect(ctx, x, y, w, 42, 12);
    ctx.fill();
    ctx.fillStyle = isUser ? "#ffffff" : i === CHAT.length - 1 ? "#86efac" : "#cbd5e1";
    ctx.fillText(m.text, x + 14, y + 27);
  });

  // input bar
  ctx.fillStyle = "rgba(255,255,255,0.06)";
  roundRect(ctx, px + 18, H - 62, 254, 40, 12);
  ctx.fill();
  ctx.font = `500 13px ${FONT}`;
  ctx.fillStyle = "#64748b";
  ctx.fillText("Ask the agent…", px + 34, H - 37);

  // status bar
  ctx.fillStyle = "rgba(99,102,241,0.55)";
  ctx.fillRect(0, H - 22, px, 22);
  ctx.font = `600 12px ${FONT}`;
  ctx.fillStyle = "#e0e7ff";
  ctx.fillText("● LangSmith  ·  relevance 0.87  ·  Python 3.12", 14, H - 7);
}

function ScreenMaterial() {
  const tex = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 640;
    const t = new THREE.CanvasTexture(canvas);
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = 8;
    return t;
  }, []);
  const last = useRef(-1);

  useEffect(() => () => tex.dispose(), [tex]);

  useFrame(({ clock }) => {
    const time = clock.elapsedTime;
    // ~12 fps is plenty for a typing effect and keeps canvas uploads cheap.
    const tick = Math.floor(time * 12);
    if (tick === last.current) return;
    last.current = tick;
    const cycle = 9; // seconds per loop: ~6.5s typing, then hold
    const progress = Math.min(1, (time % cycle) / 6.5);
    drawScreen(tex.image.getContext("2d"), 1024, 640, progress, Math.floor(time * 2) % 2 === 0);
    tex.needsUpdate = true;
  });

  // Color > 1 pushes the screen into HDR range so bloom picks it up.
  return <meshBasicMaterial map={tex} color={[1.35, 1.35, 1.45]} toneMapped={false} />;
}

/* ------------------------------------------------------------------ */
/* Laptop                                                              */
/* ------------------------------------------------------------------ */

const BASE_W = 3.0;
const BASE_D = 2.05;
const BASE_H = 0.1;
const LID_H = 1.95;
const LID_T = 0.06;

function Keyboard() {
  const ref = useRef();
  const rows = 5;
  const cols = 14;
  useEffect(() => {
    const m = new THREE.Object3D();
    let i = 0;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        m.position.set((c - (cols - 1) / 2) * 0.185, 0, (r - (rows - 1) / 2) * 0.17);
        // wider space bar on the last row
        const isSpace = r === rows - 1 && c >= 4 && c <= 9;
        m.scale.set(isSpace ? 0 : 1, 1, 1);
        m.updateMatrix();
        ref.current.setMatrixAt(i++, m.matrix);
      }
    }
    ref.current.instanceMatrix.needsUpdate = true;
  }, []);

  return (
    <group position={[0, BASE_H / 2 + 0.012, -0.32]}>
      {/* backlight glow under the keys */}
      <mesh rotation-x={-Math.PI / 2} position-y={-0.006}>
        <planeGeometry args={[cols * 0.185, rows * 0.17]} />
        <meshBasicMaterial color={[0.45, 0.3, 1.1]} toneMapped={false} />
      </mesh>
      <instancedMesh ref={ref} args={[undefined, undefined, rows * cols]}>
        <boxGeometry args={[0.155, 0.022, 0.14]} />
        <meshStandardMaterial color="#0f1220" roughness={0.55} metalness={0.2} />
      </instancedMesh>
      <mesh position={[0, 0, (rows - 1) / 2 * 0.17]}>
        <boxGeometry args={[0.185 * 6 - 0.03, 0.022, 0.14]} />
        <meshStandardMaterial color="#0f1220" roughness={0.55} metalness={0.2} />
      </mesh>
    </group>
  );
}

function Laptop() {
  const aluminium = (
    <meshPhysicalMaterial
      color="#2a2f45"
      metalness={0.9}
      roughness={0.28}
      clearcoat={0.6}
      clearcoatRoughness={0.2}
    />
  );

  return (
    <group>
      {/* base */}
      <RoundedBox args={[BASE_W, BASE_H, BASE_D]} radius={0.045} smoothness={4}>
        {aluminium}
      </RoundedBox>
      {/* keyboard well */}
      <mesh position={[0, BASE_H / 2 + 0.001, -0.32]} rotation-x={-Math.PI / 2}>
        <planeGeometry args={[2.68, 0.92]} />
        <meshStandardMaterial color="#090b16" roughness={0.8} />
      </mesh>
      <Keyboard />
      {/* trackpad */}
      <RoundedBox args={[1.05, 0.006, 0.62]} radius={0.003} smoothness={2} position={[0, BASE_H / 2 + 0.002, 0.58]}>
        <meshPhysicalMaterial color="#1c2135" metalness={0.6} roughness={0.35} clearcoat={1} />
      </RoundedBox>
      {/* front lip glow */}
      <mesh position={[0, 0, BASE_D / 2 + 0.001]}>
        <planeGeometry args={[0.5, 0.012]} />
        <meshBasicMaterial color={[0.6, 1.4, 2.2]} toneMapped={false} />
      </mesh>

      {/* lid, hinged at the back edge */}
      <group position={[0, BASE_H / 2, -BASE_D / 2 + 0.04]} rotation-x={-0.26}>
        <RoundedBox args={[BASE_W, LID_H, LID_T]} radius={0.04} smoothness={4} position={[0, LID_H / 2, 0]}>
          {aluminium}
        </RoundedBox>
        {/* bezel */}
        <mesh position={[0, LID_H / 2, LID_T / 2 + 0.001]}>
          <planeGeometry args={[BASE_W - 0.08, LID_H - 0.08]} />
          <meshStandardMaterial color="#04050b" roughness={0.15} metalness={0.4} />
        </mesh>
        {/* display */}
        <mesh position={[0, LID_H / 2 + 0.02, LID_T / 2 + 0.003]}>
          <planeGeometry args={[BASE_W - 0.2, (BASE_W - 0.2) * 0.625]} />
          <ScreenMaterial />
        </mesh>
        {/* screen spill light onto the keyboard */}
        <pointLight position={[0, LID_H / 2, 0.6]} intensity={2.2} distance={3.5} color="#8b8cff" />
      </group>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Floating glass cards                                                */
/* ------------------------------------------------------------------ */

function drawCard(ctx, W, H, { title, subtitle, accent, icon }) {
  ctx.clearRect(0, 0, W, H);
  const pad = 10;
  roundRect(ctx, pad, pad, W - pad * 2, H - pad * 2, 34);
  const fill = ctx.createLinearGradient(0, 0, W, H);
  fill.addColorStop(0, "rgba(49,46,129,0.55)");
  fill.addColorStop(1, "rgba(15,23,42,0.35)");
  ctx.fillStyle = fill;
  ctx.fill();
  const stroke = ctx.createLinearGradient(0, 0, W, H);
  stroke.addColorStop(0, accent);
  stroke.addColorStop(1, "rgba(255,255,255,0.08)");
  ctx.lineWidth = 3;
  ctx.strokeStyle = stroke;
  ctx.stroke();

  // icon chip
  ctx.fillStyle = accent;
  ctx.globalAlpha = 0.22;
  roundRect(ctx, 40, 44, 96, 96, 24);
  ctx.fill();
  ctx.globalAlpha = 1;
  ctx.font = `800 ${icon.length > 1 ? 34 : 44}px ${FONT}`;
  ctx.fillStyle = accent;
  ctx.textAlign = "center";
  ctx.fillText(icon, 88, icon.length > 1 ? 104 : 108);
  ctx.textAlign = "left";

  ctx.font = `800 54px ${FONT}`;
  ctx.fillStyle = "#ffffff";
  ctx.fillText(title, 160, 102);
  ctx.font = `500 26px ${FONT}`;
  ctx.fillStyle = "#a5b4fc";
  ctx.fillText(subtitle, 160, 138);

  // faux metric bars
  [0.82, 0.58, 0.7].forEach((v, i) => {
    const y = 180 + i * 26;
    ctx.fillStyle = "rgba(255,255,255,0.07)";
    roundRect(ctx, 40, y, W - 80, 10, 5);
    ctx.fill();
    ctx.fillStyle = accent;
    ctx.globalAlpha = 0.75 - i * 0.15;
    roundRect(ctx, 40, y, (W - 80) * v, 10, 5);
    ctx.fill();
    ctx.globalAlpha = 1;
  });
}

function useGlowTexture() {
  return useCanvasTexture(128, 128, (ctx, W) => {
    const g = ctx.createRadialGradient(W / 2, W / 2, 0, W / 2, W / 2, W / 2);
    g.addColorStop(0, "rgba(255,255,255,1)");
    g.addColorStop(0.25, "rgba(255,255,255,0.6)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.clearRect(0, 0, W, W);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, W);
  });
}

function GlassCard({ position, rotation = [0, 0, 0], width = 1.25, speed = 1.4, glow, ...card }) {
  const tex = useCanvasTexture(512, 280, (ctx, W, H) => drawCard(ctx, W, H, card), [card.title]);
  const height = width * (280 / 512);
  return (
    <Float speed={speed} rotationIntensity={0.25} floatIntensity={0.6} floatingRange={[-0.08, 0.08]}>
      <group position={position} rotation={rotation}>
        {/* soft radial halo behind the card */}
        <mesh position-z={-0.03} scale={[width * 1.6, height * 2.2, 1]}>
          <planeGeometry />
          <meshBasicMaterial
            map={glow}
            color={card.accent}
            transparent
            opacity={0.22}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            toneMapped={false}
          />
        </mesh>
        <mesh>
          <planeGeometry args={[width, height]} />
          <meshBasicMaterial
            map={tex}
            transparent
            depthWrite={false}
            side={THREE.DoubleSide}
            color={[1.15, 1.15, 1.2]}
            toneMapped={false}
          />
        </mesh>
      </group>
    </Float>
  );
}

const CARDS = [
  { title: "LLM", subtitle: "GPT · Gemini · Groq", accent: "#22d3ee", icon: "✦", position: [-1.95, 2.15, -0.5], rotation: [0, 0.35, 0.03], width: 1.15, speed: 1.3 },
  { title: "RAG", subtitle: "ChromaDB · Rerank", accent: "#a78bfa", icon: "◈", position: [1.95, 2.0, -0.4], rotation: [0, -0.4, -0.03], width: 1.15, speed: 1.6 },
  { title: "AI Agents", subtitle: "LangGraph · MCP", accent: "#f472b6", icon: "⬡", position: [-2.1, 0.6, 0.6], rotation: [0, 0.45, 0], width: 1.3, speed: 1.1 },
  { title: "Backend", subtitle: "Java · Spring Boot", accent: "#60a5fa", icon: "{ }", position: [2.05, 0.6, 0.65], rotation: [0, -0.5, 0.02], width: 1.25, speed: 1.8 },
  { title: "Frontend", subtitle: "React · TypeScript", accent: "#facc15", icon: "</>", position: [0.1, 3.05, -1.3], rotation: [0, -0.05, 0], width: 1.25, speed: 1.45 },
]

// Bounds of the laptop + cards composition at scale 1 (local units, incl. float margin).
const COMPOSITION = { halfWidth: 2.95, bottom: -0.1, top: 3.45 };

function Connections() {
  const refs = useRef([]);
  useFrame((_, delta) => {
    refs.current.forEach((l) => {
      if (l?.material) l.material.dashOffset -= delta * 0.6;
    });
  });
  const target = [0, 1.05, -0.9];
  return CARDS.map((c, i) => (
    <QuadraticBezierLine
      key={c.title}
      ref={(el) => (refs.current[i] = el)}
      start={c.position}
      end={target}
      mid={[(c.position[0] + target[0]) / 2, Math.max(c.position[1], target[1]) + 0.6, (c.position[2] + target[2]) / 2]}
      color={c.accent}
      lineWidth={1.2}
      dashed
      dashSize={0.08}
      gapSize={0.12}
      transparent
      opacity={0.45}
    />
  ));
}

/* ------------------------------------------------------------------ */
/* Particles & floor                                                   */
/* ------------------------------------------------------------------ */

// Full-width starfield. Positions are stored in normalized screen space
// (u across the hero, v up, z depth) and mapped to world units every frame,
// so the field always spans the entire canvas whatever its size.
function Particles({ count, centerShift }) {
  const ref = useRef();
  const sprite = useGlowTexture();
  const { camera, size } = useThree();

  const data = useMemo(() => {
    const rand = mulberry32(7);
    const uvz = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    const base = new Float32Array(count * 3);
    const palette = [new THREE.Color("#818cf8"), new THREE.Color("#22d3ee"), new THREE.Color("#c084fc")];
    for (let i = 0; i < count; i++) {
      uvz[i * 3] = rand();
      uvz[i * 3 + 1] = rand();
      uvz[i * 3 + 2] = -4 + rand() * 6; // world z between -4 and 2
      speeds[i] = 0.004 + rand() * 0.012; // fraction of the screen height per second
      const c = palette[i % 3];
      base.set([c.r, c.g, c.b], i * 3);
    }
    return { uvz, speeds, base, positions: new Float32Array(count * 3), colors: new Float32Array(count * 3) };
  }, [count]);

  useFrame((_, delta) => {
    const { uvz, speeds, base, positions, colors } = data;
    const tanHalf = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
    const aspect = size.width / size.height;
    for (let i = 0; i < count; i++) {
      let v = uvz[i * 3 + 1] + speeds[i] * delta;
      if (v > 1.05) v = -0.05;
      uvz[i * 3 + 1] = v;
      const u = uvz[i * 3];
      const z = uvz[i * 3 + 2];
      const dist = camera.position.z - z;
      const h = 2 * dist * tanHalf;
      const w = h * aspect;
      // The view offset moves the visible window left by `centerShift` of its width.
      positions[i * 3] = (u - 0.5 - centerShift) * w;
      positions[i * 3 + 1] = camera.position.y + (v - 0.5) * h;
      positions[i * 3 + 2] = z;
      // Dimmer behind the hero text (left side), brighter around the laptop.
      const k = 0.55 + 0.9 * Math.min(1, Math.max(0, (u - 0.25) / 0.5));
      colors[i * 3] = base[i * 3] * k;
      colors[i * 3 + 1] = base[i * 3 + 1] * k;
      colors[i * 3 + 2] = base[i * 3 + 2] * k;
    }
    const geo = ref.current.geometry;
    geo.attributes.position.needsUpdate = true;
    geo.attributes.color.needsUpdate = true;
  });

  return (
    <points ref={ref} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[data.positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[data.colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        map={sprite}
        size={0.07}
        vertexColors
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        toneMapped={false}
        fog={false}
      />
    </points>
  );
}

function Floor() {
  const glow = useCanvasTexture(256, 256, (ctx, W) => {
    const g = ctx.createRadialGradient(W / 2, W / 2, 0, W / 2, W / 2, W / 2);
    g.addColorStop(0, "rgba(139,92,246,0.9)");
    g.addColorStop(0.45, "rgba(34,211,238,0.25)");
    g.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, W);
  });
  return (
    <group position-y={-BASE_H / 2 - 0.002} userData={{ skipBounds: true }}>
      <mesh rotation-x={-Math.PI / 2}>
        <planeGeometry args={[40, 40]} />
        <MeshReflectorMaterial
          blur={[300, 80]}
          resolution={512}
          mixBlur={1}
          mixStrength={4}
          roughness={0.9}
          depthScale={1.1}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#070914"
          metalness={0.6}
          mirror={0.6}
        />
      </mesh>
      <mesh rotation-x={-Math.PI / 2} position-y={0.004}>
        <planeGeometry args={[6.5, 6.5]} />
        <meshBasicMaterial map={glow} transparent opacity={0.55} depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Composition                                                         */
/* ------------------------------------------------------------------ */

// Gap kept between the hero text and the 3D composition, and from the right edge (px).
const TEXT_GAP = 48;
const EDGE_MARGIN = 32;
// Below this half-width (px) the laptop would be too small to read: show particles only.
const MIN_HALF_PX = 150;
// Composition is drawn at this fraction of the space it could fill, for breathing room.
const FILL = 0.8;
const MAX_SCALE = 0.6;

function worldMetrics(camera, size) {
  const dist = camera.position.length();
  const worldH = 2 * dist * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
  return { worldH, pxPerUnit: size.height / worldH };
}

// Place the laptop in the free zone to the right of the hero text, biased to
// the right third of the screen, and size it so it never crosses into the text.
function computeLayout(size, camera, textRight) {
  if (size.width < 1024 || textRight == null) return { showLaptop: false, center: 0.5, scale: 0 };
  const left = textRight + TEXT_GAP;
  const right = size.width - EDGE_MARGIN;
  const centerPx = Math.max((left + right) / 2, size.width * 0.74);
  const halfPx = Math.min(centerPx - left, right - centerPx);
  if (halfPx < MIN_HALF_PX) return { showLaptop: false, center: 0.5, scale: 0 };

  const { worldH, pxPerUnit } = worldMetrics(camera, size);
  const compH = COMPOSITION.top - COMPOSITION.bottom;
  const scale = Math.min(
    MAX_SCALE,
    (FILL * halfPx) / pxPerUnit / COMPOSITION.halfWidth,
    (worldH * 0.5) / compH
  );
  return { showLaptop: true, center: centerPx / size.width, scale };
}

// Shifts the projection centre so the world origin (the laptop) renders at
// `center` of the canvas without skewing the perspective.
function ViewOffset({ center }) {
  const { camera, size } = useThree();
  useLayoutEffect(() => {
    const shift = (center - 0.5) * size.width;
    if (shift === 0) camera.clearViewOffset();
    else camera.setViewOffset(size.width, size.height, -shift, 0, size.width, size.height);
    camera.updateProjectionMatrix();
  }, [camera, size, center]);
  return null;
}

const _box = new THREE.Box3();
const _part = new THREE.Box3();
const _corner = new THREE.Vector3();

// Publishes the on-screen pixel bounds of the laptop + cards as `data-bounds`
// on the canvas (used by the layout tests to assert there is no text overlap).
function reportBounds(group, camera, size, canvas) {
  _box.makeEmpty();
  group.children.forEach((child) => {
    if (child.userData.skipBounds) return;
    _part.setFromObject(child);
    if (!_part.isEmpty()) _box.union(_part);
  });
  if (_box.isEmpty()) return;
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  for (let i = 0; i < 8; i++) {
    _corner
      .set(i & 1 ? _box.max.x : _box.min.x, i & 2 ? _box.max.y : _box.min.y, i & 4 ? _box.max.z : _box.min.z)
      .project(camera);
    const x = ((_corner.x + 1) / 2) * size.width;
    const y = ((1 - _corner.y) / 2) * size.height;
    minX = Math.min(minX, x); maxX = Math.max(maxX, x);
    minY = Math.min(minY, y); maxY = Math.max(maxY, y);
  }
  canvas.dataset.bounds = [minX, minY, maxX, maxY].map(Math.round).join(",");
}

function Rig({ scale, children }) {
  const group = useRef();
  const frame = useRef(0);
  const { pointer } = useThree();
  const compH = COMPOSITION.top - COMPOSITION.bottom;
  const y = 0.35 - (COMPOSITION.bottom + compH / 2) * scale;

  useFrame((state, delta) => {
    const g = group.current;
    const t = state.clock.elapsedTime;
    const targetY = -0.42 + Math.sin(t * 0.25) * 0.06 + pointer.x * 0.1;
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, targetY, 3, delta);
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, pointer.y * -0.04, 3, delta);
    if (frame.current++ % 30 === 0) reportBounds(g, state.camera, state.size, state.gl.domElement);
  });

  return (
    <group ref={group} scale={scale} position={[0, y, 0]}>
      {children}
    </group>
  );
}

function SceneContents({ textRight }) {
  const { size, camera } = useThree();
  const { showLaptop, center, scale } = computeLayout(size, camera, textRight);
  const gl = useThree((s) => s.gl);

  useEffect(() => {
    if (!showLaptop) delete gl.domElement.dataset.bounds;
  }, [showLaptop, gl]);
  const glow = useGlowTexture();

  return (
    <>
      <color attach="background" args={[BG]} />
      <fog attach="fog" args={[BG, 9, 17]} />
      <ViewOffset center={center} />

      <Particles count={showLaptop ? 320 : 140} centerShift={center - 0.5} />

      {showLaptop && (
        <>
          <ambientLight intensity={0.15} />
          <spotLight position={[-5, 6, 3]} angle={0.5} penumbra={1} intensity={60} color="#8b5cf6" />
          <spotLight position={[5, 4, 2]} angle={0.6} penumbra={1} intensity={45} color="#22d3ee" />
          <pointLight position={[0, 3, -3]} intensity={18} color="#6366f1" />

          <Environment resolution={64} frames={1}>
            <Lightformer form="rect" intensity={2} color="#8b5cf6" position={[-4, 2, 2]} scale={[3, 6, 1]} />
            <Lightformer form="rect" intensity={1.5} color="#22d3ee" position={[4, 2, 2]} scale={[3, 6, 1]} />
            <Lightformer form="ring" intensity={1} color="#ffffff" position={[0, 5, -2]} scale={2} />
          </Environment>

          <Rig scale={scale}>
            <Laptop />
            {CARDS.map((c) => (
              <GlassCard key={c.title} glow={glow} {...c} />
            ))}
            <Connections />
            <Floor />
          </Rig>

          <EffectComposer multisampling={4} disableNormalPass>
            <Bloom mipmapBlur luminanceThreshold={0.9} luminanceSmoothing={0.2} intensity={0.9} radius={0.7} />
            <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
          </EffectComposer>
        </>
      )}
    </>
  );
}

// Right edge (px, relative to the hero) of the actual text glyphs in `el`.
function measureTextRight(el, origin) {
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  const range = document.createRange();
  let right = 0;
  for (let n = walker.nextNode(); n; n = walker.nextNode()) {
    if (!n.textContent.trim()) continue;
    range.selectNodeContents(n);
    for (const r of range.getClientRects()) right = Math.max(right, r.right);
  }
  // Buttons have padding beyond their text, include their boxes too.
  for (const a of el.querySelectorAll("a")) right = Math.max(right, a.getBoundingClientRect().right);
  return right - origin.getBoundingClientRect().left;
}

export default function Scene3D({ avoidRef }) {
  const wrapper = useRef();
  const { lang } = useLang();
  const [textRight, setTextRight] = useState(null);

  // Track where the hero text ends so the laptop never overlaps it.
  useEffect(() => {
    const el = avoidRef?.current;
    if (!el || !wrapper.current) return;
    const update = () => setTextRight(measureTextRight(el, wrapper.current));
    update();
    document.fonts?.ready.then(update);
    const ro = new ResizeObserver(update);
    ro.observe(el);
    ro.observe(wrapper.current);
    return () => ro.disconnect();
  }, [avoidRef, lang]);

  const [visible, setVisible] = useState(true);
  const [dpr, setDpr] = useState(1.5);

  // Stop rendering entirely when the hero is scrolled out of view.
  useEffect(() => {
    const el = wrapper.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={wrapper}
      className="absolute inset-0"
      style={{
        // Fade the bottom edge into the next section.
        maskImage: "linear-gradient(to bottom, #000 78%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to bottom, #000 78%, transparent 100%)",
      }}
    >
      <SceneErrorBoundary>
        <Canvas
          camera={{ position: [0, 1.5, 8.4], fov: 34 }}
          dpr={dpr}
          frameloop={visible ? "always" : "never"}
          gl={{ antialias: false, powerPreference: "high-performance" }}
          // The canvas sits under the hero text, so listen for the pointer on the whole page.
          eventSource={document.getElementById("root")}
          eventPrefix="client"
          onCreated={({ camera }) => camera.lookAt(0, 0.35, 0)}
        >
          <PerformanceMonitor onDecline={() => setDpr(1)} onIncline={() => setDpr(1.5)} />
          <Suspense fallback={null}>
            <SceneContents textRight={textRight} />
          </Suspense>
        </Canvas>
      </SceneErrorBoundary>
    </div>
  );
}
