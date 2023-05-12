export function sortColumn(a: string | number, b: string | number): number {
  if (a === b) {
    return 0;
  } else {
    return a > b ? 1 : -1;
  }
}
