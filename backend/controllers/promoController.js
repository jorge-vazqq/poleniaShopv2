import asyncHandler from "../middleware/asyncHandler.js";
import Promo from "../models/promoModel.js";

// @desc Fetch all promos
// @route GET /api/promos
// @access Public

const getPromos = asyncHandler(async (req, res) => {
  const promos = await Promo.find({}).populate("products", "name price"); // Populate the products field

  res.json(promos);
});

// @desc Fetch a promo
// @route GET /api/promos/:id
// @access Public

const getPromoById = asyncHandler(async (req, res) => {
  const promo = await Promo.findById(req.params.id).populate(
    "products",
    "name price"
  ); // Populate the products field

  if (promo) {
    return res.json(promo);
  } else {
    res.status(404);

    throw new Error("Promo not found");
  }
});

// @desc Create a promo
// @route POST /api/promos
// @access Private/Admin

const createPromo = asyncHandler(async (req, res) => {
  const { image, title, discount, freeShipping, description, products } =
    req.body;

  const promo = new Promo({
    image: "/images/sample.jpg",

    title: "New discount",

    discount: 0,

    freeShipping: false,

    description: "Sample description",

    products: products, // Include products array
  });

  const createdPromo = await promo.save();

  res.status(201).json(createdPromo);
});

// @desc Update a promo
// @route PUT /api/promos/:id
// @access Private/Admin

const updatePromo = asyncHandler(async (req, res) => {
  const { image, title, discount, freeShipping, description, products } =
    req.body;

  const promo = await Promo.findById(req.params.id);

  if (promo) {
    promo.image = image || promo.image;

    promo.title = title || promo.title;

    promo.discount = discount || promo.discount;

    if (freeShipping !== undefined) {
      promo.freeShipping = freeShipping;
    }

    promo.description = description || promo.description;

    promo.products = products || promo.products; // Update the products list

    const updatedPromo = await promo.save();

    res.json(updatedPromo);
  } else {
    res.status(404);

    throw new Error("Promo not found");
  }
});

// @desc Delete a promo
// @route DELETE /api/promos/:id
// @access Private/Admin

const deletePromo = asyncHandler(async (req, res) => {
  const promo = await Promo.findById(req.params.id);

  if (promo) {
    await Promo.deleteOne({ _id: promo._id });

    res.status(200).json({ message: "Promo deleted" });
  } else {
    res.status(404);

    throw new Error("Promo not found");
  }
});

export { getPromos, getPromoById, createPromo, updatePromo, deletePromo };
