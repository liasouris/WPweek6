import { Request, Response, Router } from "express";
import { Offer } from "../models/Offer";
import { Image } from "../models/Image";
import upload from "../middleware/multer-config";

const router = Router();

router.post("/upload", upload.single("image"), async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description, price } = req.body;

    if (!title || !description || !price) {
      res.status(400).json({ message: "Missing inputs required" });
      return; 
    }

    let imageId = null;

    if (req.file) {
      const imgPath: string = req.file.path.replace("public", ""); 
      const image = new Image({
        filename: req.file.filename,
        path: imgPath,
      });

      const savedImage = await image.save();
      imageId = savedImage._id; 
    }

    const newOffer = new Offer({
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
  } catch (error: any) {
    console.error(`Error while creating offer: ${error.message}`);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/offers", async (req: Request, res: Response): Promise<void> => {
    try {
      const offers = await Offer.find().populate("imageId"); 

      const formattedOffers = offers.map((offer) => {

        const image = offer.imageId as unknown as { path: string };
        
        return {
          title: offer.title,
          description: offer.description,
          price: offer.price,
          imagePath: image ? image.path : null,
        };
      });
  
      res.status(200).json(formattedOffers);
    } catch (error: any) {
      console.error("Error fetching offers:", error.message);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  export default router;