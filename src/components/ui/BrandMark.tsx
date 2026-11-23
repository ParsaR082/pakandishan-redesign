interface BrandMarkProps {
  className?: string;
}

export function BrandMark({ className = 'w-9 h-9' }: BrandMarkProps) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect
        x="2"
        y="2"
        width="36"
        height="36"
        rx="6"
        stroke="#c5a46d"
        strokeWidth="1.4"
        strokeOpacity="0.65"
        fill="#14120f"
      />
      <path
        d="M12 28V12H22.5C25.8 12 28 14.1 28 17.2C28 20.3 25.8 22.4 22.5 22.4H16.2"
        stroke="#e4c995"
        strokeWidth="2.1"
        strokeLinecap="square"
      />
      <path
        d="M16.2 28V22.4"
        stroke="#c5a46d"
        strokeWidth="2.1"
        strokeLinecap="square"
      />
      <circle cx="26.5" cy="27" r="2.2" fill="#c5a46d" />
    </svg>
  );
}
