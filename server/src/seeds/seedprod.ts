import mongoose from 'mongoose';
import { Product } from '../models/Product';
import { Category } from '../models/Category';

const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://devcircularityke:O1gF9hg2h63q6Jc4@fotrapp.alkmk8x.mongodb.net/?retryWrites=true&w=majority&appName=fotrapp';

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error(err));

const categories = [
  { name: "Afro Collection", imageURL: "https://d1x0wj96yg0bkd.cloudfront.net/Categories/AfroCollection.jpg" },
  { name: "Malaika Collection", imageURL: "https://d1x0wj96yg0bkd.cloudfront.net/Categories/MalaikaCollection.jpg" },
  { name: "Big Daddy", imageURL: "https://d1x0wj96yg0bkd.cloudfront.net/Categories/BigDaddy.jpg" },
  { name: "Velveti", imageURL: "https://d1x0wj96yg0bkd.cloudfront.net/Categories/Velveti.jpg" }
];

const products = [
  {
    name: "Afrolace",
    description: "A stylish and comfortable lace outfit perfect for any occasion.",
    price: 6000,
    imageURL: "https://d1x0wj96yg0bkd.cloudfront.net/Products/Afrolace+(6K).jpeg",
    category: "Afro Collection",
    gender: "Unisex"
  },
  {
    name: "Afrolook",
    description: "A modern look with an Afrocentric twist, ideal for both casual and formal events.",
    price: 6000,
    imageURL: "https://d1x0wj96yg0bkd.cloudfront.net/Products/Afrolook+(6K).jpeg",
    category: "Afro Collection",
    gender: "Unisex"
  },
  {
    name: "Afrolook",
    description: "A modern look with an Afrocentric twist, ideal for both casual and formal events.",
    price: 6000,
    imageURL: "https://d1x0wj96yg0bkd.cloudfront.net/Products/Afrolook+(6K).JPG",
    category: "Afro Collection",
    gender: "Unisex"
  },
  {
    name: "Afrolook",
    description: "A modern look with an Afrocentric twist, ideal for both casual and formal events.",
    price: 6000,
    imageURL: "https://d1x0wj96yg0bkd.cloudfront.net/Products/Afrolook.JPG",
    category: "Afro Collection",
    gender: "Unisex"
  },
  {
    name: "Afrosheer",
    description: "A sheer, lightweight outfit that combines elegance and comfort.",
    price: 6000,
    imageURL: "https://d1x0wj96yg0bkd.cloudfront.net/Products/Afrosheer (6K).JPG",
    category: "Afro Collection",
    gender: "Unisex"
  },
  {
    name: "Afrosheer",
    description: "A sheer, lightweight outfit that combines elegance and comfort.",
    price: 6000,
    imageURL: "https://d1x0wj96yg0bkd.cloudfront.net/Products/Afrosheer.jpeg",
    category: "Afro Collection",
    gender: "Unisex"
  },
  {
    name: "Afrosheer",
    description: "A sheer, lightweight outfit that combines elegance and comfort.",
    price: 6000,
    imageURL: "https://d1x0wj96yg0bkd.cloudfront.net/Products/Afrosheer.JPG",
    category: "Afro Collection",
    gender: "Unisex"
  },
  {
    name: "Afrosheer",
    description: "A sheer, lightweight outfit that combines elegance and comfort.",
    price: 6000,
    imageURL: "https://d1x0wj96yg0bkd.cloudfront.net/Products/Afrosheer(1).JPG",
    category: "Afro Collection",
    gender: "Unisex"
  },
  {
    name: "AfroSheer",
    description: "A sheer, lightweight outfit that combines elegance and comfort.",
    price: 6000,
    imageURL: "https://d1x0wj96yg0bkd.cloudfront.net/Products/AfroSheer(2).JPG",
    category: "Afro Collection",
    gender: "Unisex"
  },
  {
    name: "BigDaddy Velveti",
    description: "A luxurious velvet outfit perfect for making a bold statement.",
    price: 8000,
    imageURL: "https://d1x0wj96yg0bkd.cloudfront.net/Products/BigDaddy+velveti+(8K).JPG",
    category: "Big Daddy",
    gender: "Unisex"
  },
  {
    name: "Malaika Afro",
    description: "A beautiful Afrocentric design that brings out the elegance in you.",
    price: 8000,
    imageURL: "https://d1x0wj96yg0bkd.cloudfront.net/Products/Malaika+Afro+(8K).jpg",
    category: "Malaika Collection",
    gender: "Unisex"
  },
  {
    name: "Velveti Cape",
    description: "A stylish cape made from high-quality velvet, perfect for any occasion.",
    price: 8000,
    imageURL: "https://d1x0wj96yg0bkd.cloudfront.net/Products/Velveti Cape Poster Pic  (8K).jpeg",
    category: "Velveti",
    gender: "Unisex"
  },
  {
    name: "Velveti Cloak",
    description: "An elegant cloak made from premium velvet, offering both style and comfort.",
    price: 6000,
    imageURL: "https://d1x0wj96yg0bkd.cloudfront.net/Products/Velveti Cloak (6K).JPG",
    category: "Velveti",
    gender: "Unisex"
  },
  {
    name: "Velveti Sport",
    description: "A sporty outfit made from soft velvet, combining comfort and fashion.",
    price: 6000,
    imageURL: "https://d1x0wj96yg0bkd.cloudfront.net/Products/Velveti Sport Poster Pic (6K).JPG",
    category: "Velveti",
    gender: "Unisex"
  },
  {
    name: "Velveti Sport",
    description: "A sporty outfit made from soft velvet, combining comfort and fashion.",
    price: 6000,
    imageURL: "https://d1x0wj96yg0bkd.cloudfront.net/Products/Velveti Sport.JPG",
    category: "Velveti",
    gender: "Unisex"
  },
  {
    name: "Velveti Sport",
    description: "A sporty outfit made from soft velvet, combining comfort and fashion.",
    price: 6000,
    imageURL: "https://d1x0wj96yg0bkd.cloudfront.net/Products/Velveti Sport(1).JPG",
    category: "Velveti",
    gender: "Unisex"
  },
  {
    name: "Velveti Sport",
    description: "A sporty outfit made from soft velvet, combining comfort and fashion.",
    price: 6000,
    imageURL: "https://d1x0wj96yg0bkd.cloudfront.net/Products/Velveti Sport(2).JPG",
    category: "Velveti",
    gender: "Unisex"
  }
];

const seedDatabase = async () => {
  try {
    await Category.deleteMany({});
    await Product.deleteMany({});

    const createdCategories = await Category.insertMany(categories);
    console.log('Categories seeded successfully');

    for (const product of products) {
      const category = createdCategories.find(cat => cat.name === product.category);
      if (category) {
        product.category = category._id;
      }
    }

    await Product.insertMany(products);
    console.log('Products seeded successfully');

    mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    mongoose.disconnect();
  }
};

seedDatabase();
