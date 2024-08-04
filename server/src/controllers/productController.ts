// Import necessary modules and types
import { Request, Response } from 'express';
import { Product, Category } from '../models';
import APIFeatures from '../utils/ApiFeatures';
import { Cloudinary } from '../lib/cloudinary';

export const index = async (req: Request, res: Response) => {
  try {
    const { category, gender } = req.query;
    
    const baseQuery = Product.find();

    if (category) {
      // Map category name to category ID
      const categoryDoc = await Category.findOne({ name: decodeURIComponent(category as string) });
      if (categoryDoc) {
        baseQuery.where('category').equals(categoryDoc._id);
      }
    }

    if (gender) {
      baseQuery.where('gender').equals(gender as string);
    }

    // Use the APIFeatures class for filtering, sorting, limiting, and pagination
    const features = new APIFeatures(baseQuery, Product, req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    // Execute the query
    const products = await features.query;

    // Get the total count of products
    const total = await features.count().total;

    // Send the response
    res.status(200).json({ data: { total, count: products.length, products } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error in getting products' });
  }
};


export const show = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) return res.status(404).json({ message: 'Product not found' });

    // find related products based on product category
    const relatedProducts = await Product.find({
      category: product.category,
      _id: { $ne: id },
    }).limit(8);

    res.status(200).json({ data: { product, relatedProducts } });
  } catch (error) {
    res.status(500).json({ message: 'Error in getting product' });
  }
};

export const store = async (req: Request, res: Response) => {
  try {
    const { name, price, description, image, category, gender } = req.body;

    // upload base64 image to cloudinary
    const imageURL = await Cloudinary.upload(image, 'products', {
      height: 600,
      width: 600,
    });

    const product = await Product.create({
      name,
      price,
      description,
      imageURL,
      category,
      gender,
    });

    res.status(200).json({ data: { product } });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error in creating product' });
  }
};

export const remove = async (req: Request, res: Response) => {
  const { id } = req.params;

  let product = await Product.findOne({ _id: id });

  if (!product) return res.status(404).json({ message: 'Product not found' });

  product.remove();

  res.status(204).json({ data: null });
};

export const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    let product = await Product.findOne({ _id: id });

    if (!product) return res.status(404).json({ message: 'Product not found' });

    product = await Product.findOneAndUpdate({ _id: product._id }, req.body, {
      new: true,
    });

    res.status(200).json({ data: { product } });
  } catch (error) {
    res.status(500).json({ message: 'Error in creating product' });
  }
};
