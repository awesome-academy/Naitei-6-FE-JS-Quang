const { faker } = require('@faker-js/faker');

let numberProducts = 30;

const category = [
  {
    title: 'Rượu vang',
    list: [
      'Rượu Whiskey',
      'Rượu Cognac',
      'Rượu Vodka',
      'Rượu Đỏ',
      'Rượu Champane'
    ]
  }
];

const tags = ['Cao cấp', 'Thông thường'];

const generateData = () => {
  const products = [];
  while (numberProducts > 0) {
    const imgs = [];
    const colors = [];
    for (let i = 0; i < 4; i++) {
      imgs.push(faker.image.food(300, 400));
    }
    for (let i = 0; i < 3; i++) {
      colors.push(faker.color.rgb({ prefix: '#' }));
    }
    const newProduct = {
      id: numberProducts,
      name: faker.commerce.productName(),
      price: faker.commerce.price(),
      type: category[0][Math.floor(Math.random() * category.length)],
      tag: tags[Math.floor(Math.random() * tags.length)],
      thumbnail: faker.image.food(300, 400),
      imgs: imgs,
      description: faker.commerce.productDescription(),
      star: Math.floor(Math.random() * 5),
      reviews: Math.floor(Math.random() * 10)
    };
    products.push(newProduct);
    numberProducts--;
  }
  return { products, tags, category };
};

module.exports = generateData;
