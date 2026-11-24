import test from 'node:test';
import assert from 'node:assert/strict';
import {
  normalizeDigits,
  isValidIranianPhone,
  validateContactForm,
} from './validation';

test('normalizeDigits converts Persian and Arabic numerals to ASCII', () => {
  assert.equal(normalizeDigits('۰۹۱۲-۳۴۵-۶۷۸۹'), '0912-345-6789');
  assert.equal(normalizeDigits('٠٩١٢٣٤٥٦٧٨٩'), '09123456789');
});

test('isValidIranianPhone accepts valid mobile and landline formats', () => {
  assert.equal(isValidIranianPhone('09123456789'), true);
  assert.equal(isValidIranianPhone('۰۹۱۲ ۳۴۵ ۶۷۸۹'), true);
  assert.equal(isValidIranianPhone('+989123456789'), true);
  assert.equal(isValidIranianPhone('044-32220000'), true);
  assert.equal(isValidIranianPhone('12345'), false);
  assert.equal(isValidIranianPhone('abc'), false);
});

test('validateContactForm rejects empty required fields', () => {
  const result = validateContactForm({
    fullName: '',
    phone: '',
    machineType: '',
    description: '',
  });
  assert.equal(result.isValid, false);
  assert.ok(result.errors.fullName);
  assert.ok(result.errors.phone);
  assert.ok(result.errors.machineType);
});

test('validateContactForm passes on valid Persian consultation payload', () => {
  const result = validateContactForm({
    fullName: 'رضا محمدی',
    phone: '۰۹۱۴۱۲۳۴۵۶۷',
    machineType: 'فر گردان صنعتی',
    description: 'درخواست مشاوره برای تجهیز کارگاه نان فانتزی در تهران',
  });
  assert.equal(result.isValid, true);
  assert.equal(result.normalizedPhone, '09141234567');
  assert.deepEqual(result.errors, {});
});

test('validateContactForm rejects too-short non-empty description', () => {
  const result = validateContactForm({
    fullName: 'علی کریمی',
    phone: '09121112233',
    machineType: 'فر طبقاتی مدرن',
    description: 'سلام',
  });
  assert.equal(result.isValid, false);
  assert.ok(result.errors.description);
});

test('validateContactForm supports English and accepts international phone format', () => {
  const result = validateContactForm(
    {
      fullName: 'John Miller',
      phone: '+1 415 555 2671',
      machineType: 'Rotary Rack Oven',
      description: 'Inquiry for high-capacity industrial bakery installation in Munich',
    },
    'en'
  );
  assert.equal(result.isValid, true);
  assert.equal(result.normalizedPhone, '+14155552671');
  assert.deepEqual(result.errors, {});
});

test('validateContactForm produces localized English error messages', () => {
  const result = validateContactForm(
    {
      fullName: 'A',
      phone: '123',
      machineType: '',
      description: 'Short',
    },
    'en'
  );
  assert.equal(result.isValid, false);
  assert.match(result.errors.fullName || '', /minimum 3 characters/i);
  assert.match(result.errors.phone || '', /valid phone/i);
  assert.match(result.errors.machineType || '', /select your target/i);
  assert.match(result.errors.description || '', /at least 10 characters/i);
});
