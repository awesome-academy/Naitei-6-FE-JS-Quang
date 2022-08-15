const { faker } = require('@faker-js/faker');

let numberProducts = 100;

const generateData = () => {
  const products = [];
  while (numberProducts > 0) {
    const newProduct = {
      id: numberProducts,
      name: faker.commerce.productName(),
      price: faker.commerce.price(),
      img: faker.image.food(300, 400),
      description: faker.commerce.productDescription()
    };
    products.push(newProduct);
    numberProducts--;
  }
  return { products };
};

module.exports = generateData;
