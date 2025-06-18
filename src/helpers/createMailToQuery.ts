export const createMailToQuery = (
  email: string,
  productName: string,
  productId: string,
) => {
  const subject = encodeURIComponent(`${productName} (id: ${productId})`);

  return `mailto:${email}?subject=${subject}`;
};
