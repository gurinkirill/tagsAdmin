export const expiredUtils = (expiredAt: number) => {
  const now = Date.now() / 1000;
  const expiresInSeconds = expiredAt - now;
  return new Date(Date.now() + expiresInSeconds * 1000);
};
