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
    if (search[half] > element) {
      max = half;
    } else {
      min = half + 1;
    }
  }
  return max;
}
