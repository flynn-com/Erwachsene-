type PlaceholderImageProps = {
  seed: string;
  label: string;
  className?: string;
};

const gradients = [
  "linear-gradient(135deg,#cfe3cb,#9cbf97)",
  "linear-gradient(135deg,#f3d9d2,#e3ada0)",
  "linear-gradient(135deg,#d7e6ee,#a9c8d8)",
  "linear-gradient(135deg,#f6e8bd,#e3c978)",
  "linear-gradient(135deg,#e4dcef,#bdaad9)",
  "linear-gradient(135deg,#e8c3ae,#c98f6e)",
];

function hashString(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = (hash * 31 + value.charCodeAt(i)) >>> 0;
  }
  return hash;
}

export function PlaceholderImage({ seed, label, className = "" }: PlaceholderImageProps) {
  const gradient = gradients[hashString(seed) % gradients.length];
  return (
    <div
      className={`flex items-center justify-center text-center text-sm font-semibold text-[#2b2a28]/70 ${className}`}
      style={{ background: gradient }}
      aria-hidden
    >
      {label}
    </div>
  );
}
