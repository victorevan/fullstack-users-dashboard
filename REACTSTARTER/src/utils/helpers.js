/* eslint-disable */

// filter duplicates by property
export function filterDuplicatesBy(arr, prop) {
  // begin filtering
  return arr.filter((obj, i, arrRef) => arrRef
    // if first instance of object prop value, allow through filter
    .map(innerObj => innerObj[prop]).indexOf(obj[prop]) === i);
}
