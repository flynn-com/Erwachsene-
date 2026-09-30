type PlaceholderImageProps = {
  seed: string;
  label: string;
  className?: string;
};

const gradients = [
  "linear-gradient(135deg,#F4A261,#E76F51)",
  "linear-gradient(135deg,#2A9D8F,#264653)",
  "linear-gradient(135deg,#E9C46A,#F4A261)",
  "linear-gradient(135deg,#8AB6D6,#2A6F97)",
  "linear-gradient(135deg,#B08968,#7F5539)",
  "linear-gradient(135deg,#9D8189,#6D6875)",
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
      className={`flex items-center justify-center text-center text-sm font-semibold text-white/90 ${className}`}
      style={{ background: gradient }}
      aria-hidden
    >
      {label}
    </div>
  );
}
