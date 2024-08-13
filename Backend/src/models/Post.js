import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  status: { type: String, required: true },
  author: { type: String, required: true },
  tags: { type: Array },
  featuredImageUrl: { type: String },
  editorContent: { type: String, required: true },
  metaDescription:{type:String,required:true},
  metaTitle:{type:String,required:true},
  keyWords:{type:String,required:true},
  category:{type:String,required:true},
  altText:{type:String},
  
  createdAt: { type: Date, default: Date.now },

});

// PostSchema.virtual('fullImageUrl').get(function() {
//   if (this.featuredImageUrl) {
//     return `${process.env.BASE_URL}/uploads/${this.featuredImageUrl}`;
//   }
//   return null;
// });

// PostSchema.set('toJSON', { virtuals: true });


const Post = mongoose.model('Post', PostSchema);

export default Post

