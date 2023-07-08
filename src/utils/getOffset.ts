export function getOffset(page: number, limit: number) {
  return (page - 1) * limit;
}
