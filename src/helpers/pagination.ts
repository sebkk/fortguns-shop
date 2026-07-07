const MAX_ALLOWED_PAGINATION_PAGE = 1000;

export const getValidPaginationPage = (pageNumber: string) => {
  const page = Number(pageNumber);

  if (
    !Number.isInteger(page) ||
    page <= 1 ||
    page > MAX_ALLOWED_PAGINATION_PAGE
  ) {
    return null;
  }

  return page;
};

export const isPaginationPageOutOfRange = (
  page: number,
  totalPages: number,
) => {
  return page > Number(totalPages);
};
