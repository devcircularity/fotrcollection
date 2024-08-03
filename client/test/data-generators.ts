import * as faker from 'faker';

type Overrides = Record<string, any>;

export const userGenerator = (overrides?: Overrides) => {
  return {
    _id: faker.datatype.uuid(),
    name: faker.name.findName(),
    email: faker.internet.email(),
    imageURL: faker.image.imageUrl(),
    password: faker.internet.password(),
    role: 'user',
    ...overrides,
  };
};

export const productGenerator = (overrides?: Overrides) => {
  return {
    _id: faker.datatype.uuid(),
    name: faker.commerce.productName(),
    imageURL: faker.image.imageUrl(),
    price: Number(faker.commerce.price()),
    category: faker.lorem.word(1),
    description: faker.lorem.sentences(2),
    gender: faker.helpers.randomize(['male', 'female', 'unisex']), // Adding gender field
    ...overrides,
  };
};

export const bannerGenerator = (overrides?: Overrides) => {
  return {
    _id: faker.datatype.uuid(),
    imageURL: faker.image.imageUrl(),
    name: faker.commerce.productName(),
    ...overrides,
  };
};

export const categoryGenerator = (overrides?: Overrides) => {
  return {
    _id: faker.datatype.uuid(),
    imageURL: faker.image.imageUrl(),
    name: faker.commerce.productName(),
    description: faker.lorem.sentence(), // Adding description property
    ...overrides,
  };
};

export const cartItemGenerator = (overrides?: Overrides, productOverrides?: Overrides) => {
  return {
    _id: faker.datatype.uuid(),
    product: productGenerator(productOverrides), // Use updated productGenerator
    quantity: faker.datatype.number(99),
    ...overrides,
  };
};
