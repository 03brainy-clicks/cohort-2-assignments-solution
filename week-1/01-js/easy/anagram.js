function isAnagram(str1, str2) {
  const arr1 = str1.toLowerCase().split("");
  const arr2 = str2.toLowerCase().split("");

  if (arr1.length !== arr2.length) return false;

  let join1 = arr1.sort().join("");
  let join2 = arr2.sort().join("");

  if (join1 !== join2) return false;
  return true;
}

module.exports = isAnagram;
