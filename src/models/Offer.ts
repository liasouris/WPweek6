import mongoose, {Document, ObjectId, Schema} from "mongoose";

interface IOffer extends Document {
    title: string
    description: string
    price: number
    imageId?: ObjectId;
}

const offerSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    imageId: { type: mongoose.Schema.Types.ObjectId, ref: "Image" },
})

const Offer: mongoose.Model<IOffer> = mongoose.model<IOffer>("Offer", offerSchema);

export { Offer, IOffer };
