"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Offer_1 = require("../models/Offer");
const Image_1 = require("../models/Image");
const multer_config_1 = __importDefault(require("../middleware/multer-config"));
const router = (0, express_1.Router)();
router.post("/upload", multer_config_1.default.single("image"), async (req, res) => {
    try {
        const { title, description, price } = req.body;
        if (!title || !description || !price) {
            res.status(400).json({ message: "Missing inputs required" });
            return;
        }
        let imageId = null;
        if (req.file) {
            const imgPath = req.file.path.replace("public", "");
            const image = new Image_1.Image({
                filename: req.file.filename,
                path: imgPath,
            });
            const savedImage = await image.save();
            imageId = savedImage._id;
        }
        const newOffer = new Offer_1.Offer({
            title,
            description,
            price,
            imageId,
        });
        const savedOffer = await newOffer.save();
        res.status(201).json({
            message: "Offer created successfully!",
            offer: savedOffer,
        });
    }
    catch (error) {
        console.error(`Error while creating offer: ${error.message}`);
        res.status(500).json({ message: "Internal server error" });
    }
});
router.get("/api/offers", async (req, res) => {
    try {
        const offers = await Offer_1.Offer.find().populate("imageId");
        const formattedOffers = offers.map((offer) => {
            const image = offer.imageId;
            return {
                title: offer.title,
                description: offer.description,
                price: offer.price,
                imagePath: image ? image.path : null,
            };
        });
        res.status(200).json(formattedOffers);
    }
    catch (error) {
        console.error("Error fetching offers:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.default = router;
