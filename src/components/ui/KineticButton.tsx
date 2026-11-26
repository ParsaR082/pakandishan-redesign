import React, { useCallback, useRef } from 'react';
import { ArrowLeft } from 'lucide-react';

interface KineticButtonProps {
  children: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  href?: string;
  target?: string;
  rel?: string;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  showArrow?: boolean;
  magnetic?: boolean;
  className?: string;
  ariaLabel?: string;
}

/**
 * Signature forged-gold kinetic CTA button:
 * - Slot-machine dual-line vertical text roll on hover
 * - Specular diagonal light sheen sweep (GPU transform)
 * - Dual-arrow chase (exiting + incoming trailing arrow)
 * - Subtle damped magnetic pull on fine-pointer desktop via direct DOM ref (0 React re-renders)
 */
export function KineticButton({
  children,
  onClick,
  href,
  target,
  rel,
  type = 'button',
  variant = 'primary',
  size = 'md',
  showArrow = false,
  magnetic = true,
  className = '',
  ariaLabel,
}: KineticButtonProps) {
  const elRef = useRef<HTMLElement | null>(null);
  const rafRef = useRef<number>(0);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLElement>) => {
      if (!magnetic || e.pointerType !== 'mouse') return;
      const el = elRef.current;
      if (!el) return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const rect = el.getBoundingClientRect();
      const relX = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
      const relY = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
      const dx = Math.max(-5, Math.min(5, relX * 5));
      const dy = Math.max(-4, Math.min(4, relY * 4));

      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        el.style.transform = `translate3d(${dx.toFixed(2)}px, ${dy.toFixed(2)}px, 0)`;
      });
    },
    [magnetic]
  );

  const handlePointerLeave = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    const el = elRef.current;
    if (el) {
      el.style.transform = 'translate3d(0, 0, 0)';
    }
  }, []);

  const sizeClasses =
    size === 'sm'
      ? 'h-10 px-5 text-sm'
      : size === 'lg'
      ? 'h-12 px-7 text-sm'
      : 'h-11 sm:h-12 px-6 text-sm';

  const variantClasses =
    variant === 'primary'
      ? 'btn-kinetic bg-[#d4b278] text-[#090908] font-semibold hover:bg-[#ebd09e]'
      : 'btn-kinetic btn-kinetic--ghost border border-[#f5f2eb]/35 text-[#f5f2eb] font-medium hover:border-[#ebd09e] hover:text-[#ebd09e] hover:bg-white/[0.05]';

  const sharedClasses = `inline-flex items-center justify-center gap-2.5 rounded-md whitespace-nowrap cursor-pointer select-none ${sizeClasses} ${variantClasses} ${className}`;

  const innerContent = (
    <>
      <span className="kinetic-roll relative z-10">
        <span className="kinetic-roll-line kinetic-roll-line--main">
          {children}
        </span>
        <span
          aria-hidden="true"
          className="kinetic-roll-line kinetic-roll-line--clone"
        >
          {children}
        </span>
      </span>

      {showArrow && (
        <span className="kinetic-arrow-box relative z-10" aria-hidden="true">
          <ArrowLeft className="kinetic-arrow kinetic-arrow--main rtl:rotate-0 ltr:rotate-180" />
          <ArrowLeft className="kinetic-arrow kinetic-arrow--trail rtl:rotate-0 ltr:rotate-180" />
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <a
        ref={(node) => {
          elRef.current = node;
        }}
        href={href}
        target={target}
        rel={rel}
        aria-label={ariaLabel}
        onClick={onClick}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        className={sharedClasses}
      >
        {innerContent}
      </a>
    );
  }

  return (
    <button
      ref={(node) => {
        elRef.current = node;
      }}
      type={type}
      aria-label={ariaLabel}
      onClick={onClick}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={sharedClasses}
    >
      {innerContent}
    </button>
  );
}
