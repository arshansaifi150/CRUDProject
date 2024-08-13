import mongoose from 'mongoose';
const { Schema } = mongoose;

const propertySchema = new Schema({
  title: { type: String, required: false },
  price: { type: Number, required: false },
  bedrooms: { type: [], required: false },
  bathrooms: { type: Number, required: false },
  area: { type: String, required: false },
  amenities: { type: [], required: false },
  gallery: { type: [String], required: false },
  location: { type: String, required: false },
  propertyType: { type: String, required: false },
  googleMapEmbeddedUrl: { type: String, required: false },
  highlights: { type: [String], required: false },
  about_builder: { type: String, required: false },
  address: { type: String, required: false },
  overview: { type: String, required: false },
  image: { type: String, required: false },
  neighbourhood: { type: [String], required: false },
  downloads: { type: String, required: false },
  types: { type: String, required: false },
  youtubeVideoUrl:{type:String, required:false}
}, {
  timestamps: true
});

// propertySchema.virtual('fullImageUrl').get(function() {
//   if (this.image) {
//     return `http://localhost:4000/${this.image}`;
//   }
//   return null;
// });

// propertySchema.virtual('fullGalleryUrls').get(function() {
//   return this.gallery.map(img => `http://localhost:4000/${img}`);
// });

// propertySchema.set('toJSON', { virtuals: true });

const Property = mongoose.model('Property', propertySchema);

const visitSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String },
  phoneNumber: { type: String, required: true },
  project: { type: String, required: true },
  receiveUpdates: { type: Boolean, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
}, {
  timestamps: true
});

const Visit = mongoose.model('Visit', visitSchema);

const careerSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String,  },
  email: { type: String, required: true },
  mobile: { type: String, required: true },
  currentCompany: { type: String, required: true },
  currentCtc: { type: String, required: true },
  expectedCtc: { type: String, required: true },
  earliestStartDate: { type: String },
  role: { type: String, required: true },
  resume: { type: String, required: true },
}, {
  timestamps: true
});

const Career = mongoose.model('Career', careerSchema);

const contactSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  mobile: { type: String, required: true },
  email: { type: String },
  message: { type: String, required: true },
  receiveUpdates: { type: Boolean, required: true },
}, {
  timestamps: true
});

const Contact = mongoose.model('Contact', contactSchema);

const enquirySchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String },
  country: { type: String, required: true },
  city: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  project: { type: String, required: true },
  receiveUpdates: { type: Boolean, required: true },
}, {
  timestamps: true
});

const Enquiry = mongoose.model('Enquiry', enquirySchema);



export {
  Property,
  Visit,
  Career,
  Contact,
  Enquiry
};

