export const formatDate = (date: string | Date): string => {
  const d = new Date(date);
  return d.toLocaleString();
};

export const validateUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}; 