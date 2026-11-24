export interface ContactFormData {
  fullName: string;
  phone: string;
  machineType: string;
  description: string;
}

export interface ContactValidationErrors {
  fullName?: string;
  phone?: string;
  machineType?: string;
  description?: string;
}

export interface ContactValidationResult {
  isValid: boolean;
  errors: ContactValidationErrors;
  normalizedPhone: string;
}

const PERSIAN_DIGITS = '۰۱۲۳۴۵۶۷۸۹';
const ARABIC_DIGITS = '٠١٢٣٤٥٦٧٨٩';

/**
 * Converts Persian/Arabic numerals to ASCII Latin digits and strips formatting spaces/hyphens.
 */
export function normalizeDigits(input: string): string {
  let result = '';
  for (const ch of input) {
    const persianIdx = PERSIAN_DIGITS.indexOf(ch);
    if (persianIdx !== -1) {
      result += String(persianIdx);
      continue;
    }
    const arabicIdx = ARABIC_DIGITS.indexOf(ch);
    if (arabicIdx !== -1) {
      result += String(arabicIdx);
      continue;
    }
    result += ch;
  }
  return result;
}

export function normalizePhoneNumber(input: string): string {
  return normalizeDigits(input).replace(/[\s\-().]/g, '').trim();
}

/**
 * Validates international phone format (7 to 15 digits, optional leading +) or Iranian formats.
 */
export function isValidInternationalPhone(raw: string): boolean {
  const cleaned = normalizePhoneNumber(raw);
  const withoutPlus = cleaned.startsWith('+') ? cleaned.slice(1) : cleaned;
  return /^\d{7,15}$/.test(withoutPlus);
}

/**
 * Validates Iranian mobile (09XXXXXXXXX or +989XXXXXXXXX) or landline (0XX-XXXXXXXX, 8-11 digits).
 */
export function isValidIranianPhone(raw: string): boolean {
  const cleaned = normalizePhoneNumber(raw);
  if (/^(\+98|0098|98)?9\d{9}$/.test(cleaned)) {
    return true;
  }
  if (/^09\d{9}$/.test(cleaned)) {
    return true;
  }
  if (/^0[1-8]\d{9}$/.test(cleaned)) {
    return true;
  }
  return false;
}

export function validateContactForm(
  data: ContactFormData,
  lang: 'fa' | 'en' = 'fa'
): ContactValidationResult {
  const errors: ContactValidationErrors = {};
  const trimmedName = data.fullName.trim();
  const normalizedPhone = normalizePhoneNumber(data.phone);
  const trimmedMachine = data.machineType.trim();
  const trimmedDesc = data.description.trim();

  const isEn = lang === 'en';

  if (trimmedName.length < 3) {
    errors.fullName = isEn
      ? 'Please enter your full name (minimum 3 characters).'
      : 'لطفاً نام و نام خانوادگی خود را کامل وارد کنید (حداقل ۳ کاراکتر).';
  }

  if (!normalizedPhone) {
    errors.phone = isEn
      ? 'Phone number is required.'
      : 'وارد کردن شماره تماس الزامی است.';
  } else {
    const valid = isEn
      ? isValidInternationalPhone(normalizedPhone) || isValidIranianPhone(normalizedPhone)
      : isValidIranianPhone(normalizedPhone);

    if (!valid) {
      errors.phone = isEn
        ? 'Please enter a valid phone number (e.g. +98 912 345 6789 or local number).'
        : 'شماره تماس معتبر نیست (مثال: ۰۹۱۲۳۴۵۶۷۸۹ یا ۰۴۴۳۲۲۲۰۰۰۰).';
    }
  }

  if (!trimmedMachine) {
    errors.machineType = isEn
      ? 'Please select your target machinery or production line.'
      : 'لطفاً نوع دستگاه یا خط تولید موردنظر را انتخاب کنید.';
  }

  if (trimmedDesc.length > 0 && trimmedDesc.length < 10) {
    errors.description = isEn
      ? 'If providing project details, please write at least 10 characters.'
      : 'در صورت ثبت توضیحات، لطفاً حداقل ۱۰ کاراکتر بنویسید.';
  } else if (trimmedDesc.length > 1000) {
    errors.description = isEn
      ? 'Description cannot exceed 1000 characters.'
      : 'متن توضیحات نمی‌تواند بیشتر از ۱۰۰۰ کاراکتر باشد.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    normalizedPhone,
  };
}
