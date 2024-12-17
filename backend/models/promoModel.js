import mongoose from "mongoose";

const promoSchema = new mongoose.Schema({
    image:{
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    discount:{
        type: Number,
        min: 0,
        max: 100,
    },
    freeShipping:{
        type: Boolean,
        default: false,
    },
    description: {
        type: String,
    },
    products: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
    ], 
}, {
    timestamps: true,
});

const Promo = mongoose.model('Promo', promoSchema);

export default Promo;