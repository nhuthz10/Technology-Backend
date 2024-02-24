import mongoose from "mongoose";

const sizeSchema = new mongoose.Schema(
  {
    productTypeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductType",
      required: true,
    },
    sizeName: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  }
);
const Size = mongoose.model("Size", sizeSchema);

module.exports = Size;
