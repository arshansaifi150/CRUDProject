import mongoose from "mongoose";
import { Schema } from "mongoose";

const formData = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: String, required: true },
  propertyId:{type:String},
  receiveUpdates: { type: Boolean}
  
},{timestamps:true});

const FormData = mongoose.model("FormData",formData)

export default FormData