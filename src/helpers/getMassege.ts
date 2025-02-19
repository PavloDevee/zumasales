export const getMassege = (message: string) => {
  const match = message.match(/auth\/(.*?)(?=\))/);
  const extractedError = match ? match[1].replace(/-/g, ' ').replace(/^\w/, (c) => c.toUpperCase()) : '';
  return extractedError;
} 