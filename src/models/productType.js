import mongoose from "mongoose";

const productTypeSchema = new mongoose.Schema(
  {
    productTypeName: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  }
);
const ProductType = mongoose.model("ProductType", productTypeSchema);

module.exports = ProductType;
