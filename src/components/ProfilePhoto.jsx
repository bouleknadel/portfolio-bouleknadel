import { profilePhoto } from "../data";

// Round profile photo with a thin theme-colored border. `size` is a Tailwind
// size pair (e.g. "h-10 w-10"); every avatar on the site uses this one image.
export default function ProfilePhoto({ size, alt, className = "" }) {
  return (
    <img
      src={profilePhoto}
      alt={alt}
      width={512}
      height={512}
      decoding="async"
      className={`${size} flex-none rounded-full border border-indigo-400/60 object-cover ${className}`}
    />
  );
}
