import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {type: String, required: [true, "Please enter a product name"]},
  price: {type: Number, required: [true, "Please enter a product price"]},
  image: {type: String, required: [true, "Please enter a product image"]}
},({timestamps: true}));

const Product = mongoose.model("Product", productSchema);
export default Product;