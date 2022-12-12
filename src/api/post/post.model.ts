import { Schema, model, Document } from 'mongoose';

export interface PostDocument extends Document {
  title: String,
  image: String,
  content: String
}

const PostSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
},{
  timestamps: true,
  versionKey: false,
});

const Post = model<PostDocument>('Post', PostSchema);

export default Post;
