// Brand-colored round chip showing official logo(s), or initials when no logo exists.
// Used by the skill pills and the certification issuers.
export default function BrandMark({ icons, short, bg, fg, border, size = 28, title, glow = false }) {
  const iconSize = Math.round(size * 0.55);
  return (
    <span
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      className="inline-flex flex-none items-center justify-center gap-1 rounded-full font-extrabold"
      style={{
        height: size,
        minWidth: size,
        paddingInline: icons?.length > 1 ? size * 0.22 : 0,
        backgroundColor: bg,
        color: fg,
        border: border ? `1px solid ${border}` : undefined,
        // Discreet halo in the brand color.
        boxShadow: glow ? `0 0 14px ${border ?? bg}55` : undefined,
        fontSize: Math.round(size * (short?.length > 2 ? 0.32 : 0.38)),
      }}
    >
      {icons?.length
        ? icons.map((Icon, i) => <Icon key={i} size={iconSize} aria-hidden="true" />)
        : short}
    </span>
  );
}
