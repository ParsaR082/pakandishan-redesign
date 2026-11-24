import { FormEvent, useEffect, useState } from 'react';
import { CheckCircle2, Clock, Mail, MapPin, Phone, RotateCcw } from 'lucide-react';
import { getBrandInfo } from '../../data/navigation';
import { getMachineOptions } from '../../data/products';
import {
  ContactFormData,
  ContactValidationErrors,
  validateContactForm,
} from '../../lib/validation';
import { useLanguage } from '../../context/LanguageContext';

interface ContactSectionProps {
  preselectedMachine?: string;
}

export function ContactSection({ preselectedMachine = '' }: ContactSectionProps) {
  const { language, t, isRTL } = useLanguage();
  const brandInfo = getBrandInfo(language);
  const machineOptions = getMachineOptions(language);

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
      className="relative scroll-mt-24 py-24 lg:py-28 glass-band border-t border-[#c5a46d]/16"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Right Column (RTL start / LTR left): Headline, CTA actions & Company Info */}
          <div className="lg:col-span-5 glass-surface rounded-lg p-6 sm:p-8 space-y-8 reveal-section">
            <div>
              <p className="text-xs font-medium text-[#c5a46d] mb-3">
                {t.contact.badge}
              </p>
              <h2
                id="contact-heading"
                className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#f4f0e8] leading-snug mb-4"
              >
                {t.contact.title}
              </h2>
              <p className="text-sm sm:text-base text-[#aaa39a] leading-[1.9]">
                {t.contact.description}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#consultation-form-title"
                className="inline-flex items-center justify-center h-11 px-6 rounded-md bg-[#c5a46d] text-[#090909] text-sm font-semibold hover:bg-[#e4c995] transition-colors whitespace-nowrap"
              >
                {t.contact.requestCta}
              </a>
              <a
                href={`https://${brandInfo.website}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center h-11 px-6 rounded-md border border-[#c5a46d]/35 text-[#f4f0e8] text-sm font-medium hover:border-[#e4c995] hover:text-[#e4c995] transition-colors whitespace-nowrap"
              >
                {t.contact.visitPortal}
              </a>
            </div>

            <div className="pt-6 border-t border-[#c5a46d]/18 space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <MapPin
                  className="w-4 h-4 text-[#c5a46d] mt-1 shrink-0"
                  aria-hidden="true"
                />
                <div>
                  <p className="text-xs text-[#77716a] mb-0.5">{t.contact.plantAddressTitle}</p>
                  <p className="text-[#f4f0e8]">{t.contact.plantAddressValue || brandInfo.cityPlaceholder}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone
                  className="w-4 h-4 text-[#c5a46d] mt-1 shrink-0"
                  aria-hidden="true"
                />
                <div>
                  <p className="text-xs text-[#77716a] mb-0.5">{t.contact.salesDeskTitle}</p>
                  <p className="text-[#f4f0e8] tabular-nums" dir="ltr">
                    {brandInfo.phonePlaceholder}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail
                  className="w-4 h-4 text-[#c5a46d] mt-1 shrink-0"
                  aria-hidden="true"
                />
                <div>
                  <p className="text-xs text-[#77716a] mb-0.5">{t.contact.corporateEmailTitle}</p>
                  <p className="text-[#f4f0e8] font-mono-tech text-xs">
                    {brandInfo.emailPlaceholder}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock
                  className="w-4 h-4 text-[#c5a46d] mt-1 shrink-0"
                  aria-hidden="true"
                />
                <div>
                  <p className="text-xs text-[#77716a] mb-0.5">{t.contact.workingHoursTitle}</p>
                  <p className="text-[#f4f0e8] text-xs">
                    {t.contact.workingHoursValue}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Integration-Ready Validated Consultation Form */}
          <div className="reveal-section lg:col-span-7">
            <div className="glass-surface-strong rounded-lg p-6 sm:p-8">
              <h3
                id="consultation-form-title"
                className="text-lg font-semibold text-[#f4f0e8] mb-2"
              >
                {t.contact.formTitle}
              </h3>
              <p className="text-xs text-[#9c958b] mb-6">
                {t.contact.formSubtitle}
              </p>

              {submittedPayload ? (
                <div
                  role="status"
                  aria-live="polite"
                  className="rounded-lg bg-black/50 backdrop-blur-md border border-[#c5a46d]/40 p-6 space-y-5"
                >
                  <div className="flex items-start gap-3">
                    <CheckCircle2
                      className="w-6 h-6 text-[#e4c995] shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <div>
                      <h4 className="text-base font-semibold text-[#f4f0e8]">
                        {t.contact.successTitle}
                      </h4>
                      <p className="text-xs text-[#aaa39a] mt-1 leading-relaxed">
                        {t.contact.successSubtitle}
                      </p>
                    </div>
                  </div>

                  <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#c5a46d]/18 text-sm">
                    <div>
                      <dt className="text-xs text-[#77716a]">{t.contact.fullNameLabel}</dt>
                      <dd className="text-[#f4f0e8] font-medium mt-1">
                        {submittedPayload.fullName}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs text-[#77716a]">{t.contact.phoneLabel}</dt>
                      <dd className="text-[#f4f0e8] font-mono-tech mt-1" dir="ltr">
                        {submittedPayload.normalizedPhone}
                      </dd>
                    </div>
                    <div className="sm:col-span-2">
                      <dt className="text-xs text-[#77716a]">{t.contact.machineSelectLabel}</dt>
                      <dd className="text-[#e4c995] font-medium mt-1">
                        {submittedPayload.machineType}
                      </dd>
                    </div>
                    {submittedPayload.description && (
                      <div className="sm:col-span-2">
                        <dt className="text-xs text-[#77716a]">{t.contact.descriptionLabel}</dt>
                        <dd className="text-[#aaa39a] mt-1 leading-relaxed">
                          {submittedPayload.description}
                        </dd>
                      </div>
                    )}
                  </dl>

                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center gap-2 h-10 px-4 rounded-md border border-[#c5a46d]/35 text-xs font-medium text-[#e4c995] hover:bg-[#c5a46d]/10 transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>{t.contact.resetButton}</span>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="contact-fullName"
                        className="block text-xs font-medium text-[#f4f0e8] mb-2"
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
                        className="w-full h-11 px-3.5 rounded-md bg-black/55 border border-[#c5a46d]/25 text-sm text-[#f4f0e8] placeholder:text-[#867f77] focus:border-[#e4c995]"
                      />
                      {errors.fullName && (
                        <p id="error-fullName" role="alert" className="text-xs text-[#e8997a] mt-1.5">
                          {errors.fullName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="contact-phone"
                        className="block text-xs font-medium text-[#f4f0e8] mb-2"
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
                        className={`w-full h-11 px-3.5 rounded-md bg-black/55 border border-[#c5a46d]/25 text-sm ${isRTL ? 'text-right' : 'text-left'} text-[#f4f0e8] placeholder:text-[#867f77] focus:border-[#e4c995] tabular-nums`}
                      />
                      {errors.phone && (
                        <p id="error-phone" role="alert" className="text-xs text-[#e8997a] mt-1.5">
                          {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-machineType"
                      className="block text-xs font-medium text-[#f4f0e8] mb-2"
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
                      className="w-full h-11 px-3.5 rounded-md bg-[#0d0c0b]/90 border border-[#c5a46d]/25 text-sm text-[#f4f0e8] focus:border-[#e4c995]"
                    >
                      <option value="" className="bg-[#0d0c0b]">{t.contact.machineSelectPlaceholder}</option>
                      {machineOptions.map((opt) => (
                        <option key={opt} value={opt} className="bg-[#0d0c0b]">
                          {opt}
                        </option>
                      ))}
                    </select>
                    {errors.machineType && (
                      <p id="error-machineType" role="alert" className="text-xs text-[#e8997a] mt-1.5">
                        {errors.machineType}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-description"
                      className="block text-xs font-medium text-[#f4f0e8] mb-2"
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
                      className="w-full p-3.5 rounded-md bg-black/55 border border-[#c5a46d]/25 text-sm text-[#f4f0e8] placeholder:text-[#867f77] focus:border-[#e4c995] resize-y"
                    />
                    {errors.description && (
                      <p id="error-description" role="alert" className="text-xs text-[#e8997a] mt-1.5">
                        {errors.description}
                      </p>
                    )}
                  </div>

                  <div className="pt-1 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <button
                      type="submit"
                      className="h-12 px-7 rounded-md bg-[#c5a46d] text-[#090909] text-sm font-semibold hover:bg-[#e4c995] transition-colors cursor-pointer"
                    >
                      {t.contact.submitButton}
                    </button>
                    <span className="text-xs text-[#77716a]">
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
