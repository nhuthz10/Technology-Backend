import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    images: [
      {
        link: { type: String, required: true },
      },
    ],
    productTypeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductType",
      required: true,
    },
    price: { type: Number, required: true },
    productSizes: [
      {
        sizeId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Size",
          unique: true,
        },
        countInStock: { type: Number, required: true },
      },
    ],
    selled: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    description: { type: String },
    discount: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
