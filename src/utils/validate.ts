// Phone number validation helpers

/** Normalize phone string by removing spaces. */
export const normalizePhone = (phone: string) => (phone || '').replace(/\s+/g, '');

/** Mainland China mobile format: 11 digits, starts with 1[3-9]. */
export const isValidCnMainlandPhone = (phone: string) => {
  const pure = normalizePhone(phone);
  if (!pure) return false;
  return /^1[3-9]\d{9}$/.test(pure);
};

/** Basic international check: 5-15 digits. */
export const isValidIntlPhone = (phone: string) => {
  const pure = normalizePhone(phone);
  if (!pure) return false;
  return /^\d{5,15}$/.test(pure);
};

/** Validate phone by country/area code string, e.g., "+86". */
export const validatePhoneByCode = (code: string, phone: string) => {
  if (code === '+86') return isValidCnMainlandPhone(phone);
  return isValidIntlPhone(phone);
};

/** Basic email validation */
export const isValidEmail = (email: string) => {
  const val = (email || '').trim();
  if (!val) return false;
  // Simple RFC 5322-inspired check, pragmatic for app use
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(val);
};
