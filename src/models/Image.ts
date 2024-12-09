import mongoose, {Document, Schema} from "mongoose";

interface IImage extends Document {
    filename: String;
    path: String;
}

const imageSchema = new Schema({
    filename: { type: String, required: true },
    path: { type: String, required: true },
  });
  
  const Image = mongoose.model<IImage>("Image", imageSchema);
  
  export { Image, IImage };
