import Product from "../models/product.model.js";
import mongoose from "mongoose";

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const createProduct = async (req, res) => {
  const product = new Product(req.body);
  if (!product.name || !product.price || !product.image) {
    return res.status(400).json({ message: "Please fill all fields"});
  }
  try {
    const newProduct = await product.save();
    res.status(201).json({ message: "Product created successfully", data: newProduct });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid product ID" });
        }
  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({message: "Product updated successfully", data: updatedProduct });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid product ID" });
        }
  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}