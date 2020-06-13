/**
 * Searches a sorted array to find a specific element.
 *
 * @param search Array to search.
 * @param element Element to find. Must support relational comparison.
 */
export function binarySearch<T>(search: T[], element: T): number {
  let min = 0;
  let max = search.length - 1;
  while (min < max) {
    const half = Math.floor(min + (max - min) / 2);
    const midE = search[half];
    if (midE > element) {
      max = half - 1;
    } else if (midE < element) {
      min = half + 1;
    } else {
      return half;
    }
  }
  return max;
}
