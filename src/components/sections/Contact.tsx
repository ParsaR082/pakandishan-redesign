import { FormEvent, useEffect, useMemo, useState } from 'react';
import { CheckCircle2, RotateCcw } from 'lucide-react';
import { getBrandInfo } from '../../data/navigation';
import { PAKANDISHAN_PRODUCTS, pickLocale } from '../../data/pakandishanCatalog';
import {
  ContactFormData,
  ContactValidationErrors,
  validateContactForm,
} from '../../lib/validation';
import { useLanguage } from '../../context/LanguageContext';
import { KineticButton } from '../ui/KineticButton';

interface ContactSectionProps {
  preselectedMachine?: string;
  onNavigate?: (href: string) => void;
  compactTopPadding?: boolean;
}

export function ContactSection({
  preselectedMachine = '',
  onNavigate,
  compactTopPadding = false,
}: ContactSectionProps) {
  const { language, t, isRTL } = useLanguage();
  const brandInfo = getBrandInfo(language);

  // Full list of all 20 real Pakandishan products + turnkey consultation option
  const machineOptions = useMemo(() => {
    const productNames = PAKANDISHAN_PRODUCTS.map((p) =>
      pickLocale(p.name, language)
    );
    const generalOption =
      language === 'fa'
        ? 'مشاوره کامل راه‌اندازی خط نانوایی'
        : 'Turnkey Bakery Line Consultation';
    const list = [...productNames, generalOption];
    if (preselectedMachine && !list.includes(preselectedMachine)) {
      list.unshift(preselectedMachine);
    }
    return list;
  }, [language, preselectedMachine]);

  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    phone: '',
    machineType: preselectedMachine || '',
    description: '',
  });
  const [errors, setErrors] = useState<ContactValidationErrors>({});
  const [submittedPayload, setSubmittedPayload] = useState<
    (ContactFormData & { normalizedPhone: string }) | null
  >(null);

  useEffect(() => {
    if (preselectedMachine) {
      setFormData((prev) => ({ ...prev, machineType: preselectedMachine }));
      setSubmittedPayload(null);
      setErrors((prev) => ({ ...prev, machineType: undefined }));
    }
  }, [preselectedMachine]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validation = validateContactForm(formData, language);
    if (!validation.isValid) {
      setErrors(validation.errors);
      setSubmittedPayload(null);
      return;
    }

    setErrors({});
    setSubmittedPayload({
      ...formData,
      fullName: formData.fullName.trim(),
      description: formData.description.trim(),
      normalizedPhone: validation.normalizedPhone,
    });
  };

  const handleReset = () => {
    setSubmittedPayload(null);
    setFormData({
      fullName: '',
      phone: '',
      machineType: '',
      description: '',
    });
    setErrors({});
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className={`relative scroll-mt-24 ${
        compactTopPadding ? 'py-14 sm:py-20' : 'py-28 sm:py-32 lg:py-40'
      } section-base`}
    >
      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Info Column */}
          <div className="lg:col-span-5 space-y-8 reveal-section text-start">
            <div>
              <h2
                id="contact-heading"
                className="text-2xl sm:text-[28px] lg:text-[32px] font-bold text-[#f5f2eb] leading-[1.3] mb-4"
              >
                {t.contact.title}
              </h2>
              <p className="text-[15px] sm:text-base text-[#c2bbb0] leading-[1.85] max-w-[48ch]">
                {t.contact.description}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <KineticButton
                href={brandInfo.phoneHref}
                variant="primary"
                size="md"
                className="tabular-nums"
              >
                {language === 'fa' ? 'تماس مستقیم: ۰۹۹۶۰۷۸۶۶۱۷' : `Call ${brandInfo.phonePlaceholder}`}
              </KineticButton>
              {onNavigate && (
                <KineticButton
                  variant="ghost"
                  size="md"
                  showArrow
                  onClick={() => onNavigate('/contact')}
                >
                  {t.contact.visitPortal}
                </KineticButton>
              )}
            </div>

            {/* Official Factory & Office Details */}
            <dl className="pt-8 border-t border-white/10 space-y-5">
              <div>
                <dt className="text-sm font-medium text-[#d4b278] mb-1">
                  {t.contact.plantAddressTitle}
                </dt>
                <dd className="text-[15px] text-[#f5f2eb] leading-relaxed">
                  {t.contact.plantAddressValue}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-[#d4b278] mb-1">
                  {t.contact.salesDeskTitle}
                </dt>
                <dd className="text-[15px] text-[#f5f2eb] tabular-nums">
                  <a
                    href={brandInfo.phoneHref}
                    dir="ltr"
                    className="inline-block hover:text-[#ebd09e] transition-colors"
                  >
                    {brandInfo.phonePlaceholder}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-[#d4b278] mb-1">
                  {t.contact.corporateEmailTitle}
                </dt>
                <dd className="text-[15px] text-[#f5f2eb]">
                  {brandInfo.emailPlaceholder}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-[#d4b278] mb-1">
                  {t.contact.workingHoursTitle}
                </dt>
                <dd className="text-[15px] text-[#f5f2eb] leading-relaxed">
                  {t.contact.workingHoursValue}
                </dd>
              </div>
            </dl>
          </div>

          {/* Validated Consultation Form */}
          <div className="reveal-section lg:col-span-7 text-start">
            <div className="surface-panel rounded-lg p-6 sm:p-8 lg:p-10">
              <h3
                id="consultation-form-title"
                className="text-xl font-semibold text-[#f5f2eb] mb-2"
              >
                {t.contact.formTitle}
              </h3>
              <p className="text-sm text-[#c2bbb0] mb-8">
                {t.contact.formSubtitle}
              </p>

              {submittedPayload ? (
                <div
                  role="status"
                  aria-live="polite"
                  className="rounded-lg bg-[#0e0d0c] border border-[#d4b278]/45 p-6 space-y-5"
                >
                  <div className="flex items-start gap-3">
                    <CheckCircle2
                      className="w-6 h-6 text-[#d4b278] shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <div>
                      <h4 className="text-base font-semibold text-[#f5f2eb]">
                        {t.contact.successTitle}
                      </h4>
                      <p className="text-sm text-[#c2bbb0] mt-1 leading-relaxed">
                        {t.contact.successSubtitle}
                      </p>
                    </div>
                  </div>

                  <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/10 text-sm">
                    <div>
                      <dt className="text-sm text-[#c2bbb0]">{t.contact.fullNameLabel}</dt>
                      <dd className="text-[#f5f2eb] font-medium mt-1">
                        {submittedPayload.fullName}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm text-[#c2bbb0]">{t.contact.phoneLabel}</dt>
                      <dd className="text-[#f5f2eb] tabular-nums mt-1" dir="ltr">
                        {submittedPayload.normalizedPhone}
                      </dd>
                    </div>
                    <div className="sm:col-span-2">
                      <dt className="text-sm text-[#c2bbb0]">{t.contact.machineSelectLabel}</dt>
                      <dd className="text-[#ebd09e] font-medium mt-1">
                        {submittedPayload.machineType}
                      </dd>
                    </div>
                    {submittedPayload.description && (
                      <div className="sm:col-span-2">
                        <dt className="text-sm text-[#c2bbb0]">{t.contact.descriptionLabel}</dt>
                        <dd className="text-[#f5f2eb] mt-1 leading-relaxed">
                          {submittedPayload.description}
                        </dd>
                      </div>
                    )}
                  </dl>

                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center gap-2 h-11 px-5 rounded-md border border-[#f5f2eb]/35 text-sm font-medium text-[#f5f2eb] hover:bg-[#f5f2eb] hover:text-[#090908] transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" aria-hidden="true" />
                    <span>{t.contact.resetButton}</span>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="contact-fullName"
                        className="block text-sm font-medium text-[#f5f2eb] mb-2"
                      >
                        {t.contact.fullNameLabel} *
                      </label>
                      <input
                        id="contact-fullName"
                        name="fullName"
                        type="text"
                        autoComplete="name"
                        value={formData.fullName}
                        onChange={(e) => {
                          setFormData((prev) => ({ ...prev, fullName: e.target.value }));
                          if (errors.fullName) {
                            setErrors((prev) => ({ ...prev, fullName: undefined }));
                          }
                        }}
                        aria-invalid={Boolean(errors.fullName)}
                        aria-describedby={errors.fullName ? 'error-fullName' : undefined}
                        placeholder={t.contact.fullNamePlaceholder}
                        className="w-full h-12 px-4 rounded-md bg-[#0b0a09] border border-white/15 text-sm text-[#f5f2eb] placeholder:text-[#c2bbb0]/65 hover:border-white/30 focus:border-[#d4b278]"
                      />
                      {errors.fullName && (
                        <p id="error-fullName" role="alert" className="text-sm text-[#f0a58a] mt-1.5">
                          {errors.fullName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="contact-phone"
                        className="block text-sm font-medium text-[#f5f2eb] mb-2"
                      >
                        {t.contact.phoneLabel} *
                      </label>
                      <input
                        id="contact-phone"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        dir="ltr"
                        value={formData.phone}
                        onChange={(e) => {
                          setFormData((prev) => ({ ...prev, phone: e.target.value }));
                          if (errors.phone) {
                            setErrors((prev) => ({ ...prev, phone: undefined }));
                          }
                        }}
                        aria-invalid={Boolean(errors.phone)}
                        aria-describedby={errors.phone ? 'error-phone' : undefined}
                        placeholder={t.contact.phonePlaceholder}
                        className={`w-full h-12 px-4 rounded-md bg-[#0b0a09] border border-white/15 text-sm ${isRTL ? 'text-right' : 'text-left'} text-[#f5f2eb] placeholder:text-[#c2bbb0]/65 hover:border-white/30 focus:border-[#d4b278] tabular-nums`}
                      />
                      {errors.phone && (
                        <p id="error-phone" role="alert" className="text-sm text-[#f0a58a] mt-1.5">
                          {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-machineType"
                      className="block text-sm font-medium text-[#f5f2eb] mb-2"
                    >
                      {t.contact.machineSelectLabel} *
                    </label>
                    <select
                      id="contact-machineType"
                      name="machineType"
                      value={formData.machineType}
                      onChange={(e) => {
                        setFormData((prev) => ({ ...prev, machineType: e.target.value }));
                        if (errors.machineType) {
                          setErrors((prev) => ({ ...prev, machineType: undefined }));
                        }
                      }}
                      aria-invalid={Boolean(errors.machineType)}
                      aria-describedby={errors.machineType ? 'error-machineType' : undefined}
                      className="w-full h-12 px-4 rounded-md bg-[#0b0a09] border border-white/15 text-sm text-[#f5f2eb] hover:border-white/30 focus:border-[#d4b278]"
                    >
                      <option value="" className="bg-[#0b0a09]">
                        {t.contact.machineSelectPlaceholder}
                      </option>
                      {machineOptions.map((opt) => (
                        <option key={opt} value={opt} className="bg-[#0b0a09]">
                          {opt}
                        </option>
                      ))}
                    </select>
                    {errors.machineType && (
                      <p id="error-machineType" role="alert" className="text-sm text-[#f0a58a] mt-1.5">
                        {errors.machineType}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-description"
                      className="block text-sm font-medium text-[#f5f2eb] mb-2"
                    >
                      {t.contact.descriptionLabel}
                    </label>
                    <textarea
                      id="contact-description"
                      name="description"
                      rows={4}
                      value={formData.description}
                      onChange={(e) => {
                        setFormData((prev) => ({ ...prev, description: e.target.value }));
                        if (errors.description) {
                          setErrors((prev) => ({ ...prev, description: undefined }));
                        }
                      }}
                      aria-invalid={Boolean(errors.description)}
                      aria-describedby={errors.description ? 'error-description' : undefined}
                      placeholder={t.contact.descriptionPlaceholder}
                      className="w-full p-4 rounded-md bg-[#0b0a09] border border-white/15 text-sm text-[#f5f2eb] placeholder:text-[#c2bbb0]/65 hover:border-white/30 focus:border-[#d4b278] resize-y"
                    />
                    {errors.description && (
                      <p id="error-description" role="alert" className="text-sm text-[#f0a58a] mt-1.5">
                        {errors.description}
                      </p>
                    )}
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <KineticButton
                      type="submit"
                      variant="primary"
                      size="lg"
                      showArrow
                    >
                      {t.contact.submitButton}
                    </KineticButton>
                    <span className="text-sm text-[#c2bbb0]">
                      {t.contact.privacyNote}
                    </span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
