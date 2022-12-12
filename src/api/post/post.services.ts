import { DocumentDefinition } from "mongoose";
import Post, { PostDocument } from "./post.model";

export function getAllPosts() {
  return Post.find();
}

export function getPostById(id: string) {
  const post = Post.findById(id);
  return post;
}

export function createPost(post: DocumentDefinition<PostDocument>) {
  return Post.create(post);
}

export function updatePost(id: string, post: DocumentDefinition<PostDocument>) {
  const updatePost = Post.findByIdAndUpdate(id, post, { new: true });
  return updatePost;
}

export function deletePost(id: string) {
  const deletePost = Post.findByIdAndDelete(id);
  return deletePost;
}
