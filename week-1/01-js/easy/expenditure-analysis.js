/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  Transaction - an object like { itemName, category, price, timestamp }.
  Output - [{ category1 - total_amount_spent_on_category1 }, { category2 - total_amount_spent_on_category2 }]
*/

function calculateTotalSpentByCategory(transactions) {
  const map = {};
  for (let item of transactions) {
    if (!map[item.category]) {
      map[item.category] = {
        category: item.category,
        totalSpent: item.price,
      };
    } else {
      map[item.category].totalSpent += item.price;
    }
  }
  return Object.values(map);
}

module.exports = calculateTotalSpentByCategory;
