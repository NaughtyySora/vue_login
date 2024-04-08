export const prepareParams = (params?: Record<string, any> | Array<[string, any]> ) => {
  const parsed = new URLSearchParams(params).toString();
  return parsed ? `?${parsed}` : parsed;
};