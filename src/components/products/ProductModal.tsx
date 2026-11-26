import { useEffect } from 'react';
import { ArrowLeft, Check, X } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { getFeaturedProducts, ProductItem } from '../../data/products';
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
  const { language, t } = useLanguage();

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

  const currentProduct =
    getFeaturedProducts(language).find((p) => p.id === product.id) ?? product;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
    >
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/80"
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-4xl max-h-[90svh] overflow-y-auto rounded-lg surface-elevated text-start">
        {/* Top bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between gap-4 px-6 py-5 bg-[#161513] border-b border-white/10">
          <div className="min-w-0">
            <p className="text-xs font-semibold text-[#d4b278] mb-0.5">
              {currentProduct.category}
            </p>
            <h3
              id="product-modal-title"
              className="text-lg sm:text-xl font-bold text-[#f5f2eb] truncate"
            >
              {currentProduct.name}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={`${t.products.modalClose} ${currentProduct.name}`}
            className="w-10 h-10 inline-flex items-center justify-center rounded-md border border-white/15 bg-[#141311] text-[#c2bbb0] hover:text-[#f5f2eb] hover:bg-white/10 hover:border-[#d4b278]/50 transition-colors cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Body */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 p-6 sm:p-8">
          <div className="md:col-span-6">
            <div className="aspect-[4/3] rounded-lg overflow-hidden border border-white/10 bg-[#090908]">
              <SafeImage
                src={currentProduct.image}
                alt={currentProduct.imageAlt}
                fallbackTitle={currentProduct.name}
                width={1200}
                height={896}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="mt-5 pt-5 border-t border-white/10">
              <p className="text-sm font-medium text-[#c2bbb0] mb-1.5">
                {t.products.primaryApplications}
              </p>
              <p className="text-sm font-semibold text-[#ebd09e] leading-relaxed">
                {currentProduct.applications.join(' · ')}
              </p>
            </div>
          </div>

          <div className="md:col-span-6 flex flex-col justify-between gap-6">
            <div className="space-y-6">
              <p className="text-[15px] text-[#c2bbb0] leading-[1.85]">
                {currentProduct.fullDescription}
              </p>

              <div>
                <h4 className="text-sm font-semibold text-[#f5f2eb] mb-3.5">
                  {t.products.designHighlights}
                </h4>
                <ul className="space-y-3">
                  {currentProduct.highlights.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-sm text-[#f5f2eb]"
                    >
                      <Check
                        className="w-4 h-4 text-[#d4b278] mt-1 shrink-0"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="text-sm text-[#c2bbb0] leading-relaxed border-t border-white/10 pt-4">
                {currentProduct.structureNote}
              </p>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => onRequestConsultation(currentProduct.name)}
                className="w-full h-12 inline-flex items-center justify-center gap-2.5 px-6 rounded-md bg-[#d4b278] text-[#090908] text-sm font-semibold hover:bg-[#ebd09e] transition-colors cursor-pointer"
              >
                <span>{t.products.modalInquire}</span>
                <ArrowLeft className="w-4 h-4 rtl:rotate-0 ltr:rotate-180" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
