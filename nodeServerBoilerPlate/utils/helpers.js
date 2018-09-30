// filter duplicates by property - useful when you get ALL users at once
module.exports.filterDuplicatesBy = (arr, prop) =>
  // begin filtering
  arr.filter((obj, i, arrRef) => arrRef
    // if first instance of object prop value, allow through filter
    .map(innerObj => innerObj[prop]).indexOf(obj[prop]) === i);
