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

export function validateContactForm(data: ContactFormData): ContactValidationResult {
  const errors: ContactValidationErrors = {};
  const trimmedName = data.fullName.trim();
  const normalizedPhone = normalizePhoneNumber(data.phone);
  const trimmedMachine = data.machineType.trim();
  const trimmedDesc = data.description.trim();

  if (trimmedName.length < 3) {
    errors.fullName = 'لطفاً نام و نام خانوادگی خود را کامل وارد کنید (حداقل ۳ کاراکتر).';
  }

  if (!normalizedPhone) {
    errors.phone = 'وارد کردن شماره تماس الزامی است.';
  } else if (!isValidIranianPhone(normalizedPhone)) {
    errors.phone = 'شماره تماس معتبر نیست (مثال: ۰۹۱۲۳۴۵۶۷۸۹ یا ۰۴۴۳۲۲۲۰۰۰۰).';
  }

  if (!trimmedMachine) {
    errors.machineType = 'لطفاً نوع دستگاه یا خط تولید موردنظر را انتخاب کنید.';
  }

  if (trimmedDesc.length > 0 && trimmedDesc.length < 10) {
    errors.description = 'در صورت ثبت توضیحات، لطفاً حداقل ۱۰ کاراکتر بنویسید.';
  } else if (trimmedDesc.length > 1000) {
    errors.description = 'متن توضیحات نمی‌تواند بیشتر از ۱۰۰۰ کاراکتر باشد.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    normalizedPhone,
  };
}
