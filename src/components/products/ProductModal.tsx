import { useEffect } from 'react';
import { ArrowLeft, Check, X } from 'lucide-react';
import { ProductItem } from '../../data/products';
import { SafeImage } from '../ui/SafeImage';

interface ProductModalProps {
  product: ProductItem | null;
  onClose: () => void;
  onRequestConsultation: (machineName: string) => void;
}

export function ProductModal({
  product,
  onClose,
  onRequestConsultation,
}: ProductModalProps) {
  useEffect(() => {
    if (!product) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [product, onClose]);

  if (!product) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
    >
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/75 backdrop-blur-sm"
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-4xl max-h-[90svh] overflow-y-auto rounded-lg glass-surface-strong border border-[#c5a46d]/38 shadow-[0_28px_90px_rgba(0,0,0,0.88)]">
        {/* Top bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between gap-4 px-6 py-4 bg-[#0f0e0c]/92 backdrop-blur-xl border-b border-[#c5a46d]/20">
          <div className="min-w-0">
            <p className="text-xs text-[#c5a46d]">{product.category}</p>
            <h3
              id="product-modal-title"
              className="text-lg sm:text-xl font-bold text-[#f4f0e8] truncate"
            >
              {product.name}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={`بستن جزئیات ${product.name}`}
            className="w-10 h-10 inline-flex items-center justify-center rounded-md border border-[#c5a46d]/25 text-[#aaa39a] hover:text-[#f4f0e8] hover:border-[#c5a46d]/60 transition-colors cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Body */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6">
          <div className="md:col-span-6">
            <div className="aspect-[4/3] rounded-md overflow-hidden border border-[#c5a46d]/20 bg-[#090909]">
              <SafeImage
                src={product.image}
                alt={product.imageAlt}
                fallbackTitle={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="mt-4 pt-4 border-t border-[#c5a46d]/14">
              <p className="text-xs text-[#77716a] mb-2">کاربردهای اصلی</p>
              <p className="text-sm text-[#e4c995]">
                {product.applications.join(' · ')}
              </p>
            </div>
          </div>

          <div className="md:col-span-6 flex flex-col justify-between gap-6">
            <div className="space-y-5">
              <p className="text-sm text-[#aaa39a] leading-[1.9]">
                {product.fullDescription}
              </p>

              <div>
                <h4 className="text-sm font-semibold text-[#f4f0e8] mb-3">
                  ویژگی‌های طراحی و ساخت
                </h4>
                <ul className="space-y-2.5">
                  {product.highlights.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-sm text-[#f4f0e8]/85"
                    >
                      <Check
                        className="w-4 h-4 text-[#c5a46d] mt-1 shrink-0"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="text-xs text-[#77716a] leading-relaxed border-t border-[#c5a46d]/14 pt-3">
                {product.structureNote}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => onRequestConsultation(product.name)}
                className="flex-1 min-h-[46px] inline-flex items-center justify-center gap-2 px-5 rounded-md bg-[#c5a46d] text-[#090909] text-sm font-semibold hover:bg-[#e4c995] transition-colors cursor-pointer"
              >
                <span>درخواست مشاوره برای این دستگاه</span>
                <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
