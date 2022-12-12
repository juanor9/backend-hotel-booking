import {
  createPost,
  deletePost,
  getAllPosts,
  getPostById,
  updatePost
} from "./post.services";
import { Request, Response, NextFunction } from 'express';

export async function handleAllGetPosts(req: Request, res: Response, next: NextFunction) {
  try {
    const posts = await getAllPosts();
    return res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
}

export async function handleGetPost(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;
  try {
    const post = await getPostById(id);
    if(!post){
      return res.status(404).json({message: "post not found"});
    }
    return res.status(200).json(post);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
}

export async function handleCreatePost(req: Request, res: Response, next: NextFunction) {
  const data = req.body;
  try {
    const post = await createPost(data);
    return res.status(201).json(post);
  } catch (error) {
    return res.status(500).json(error);
  }
}

export async function handleUpdatePost(req: Request, res: Response,  next: NextFunction) {
  const { id } = req.params;
  const data = req.body;
  const post = await updatePost(id, data);
  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }
  return res.status(200).json(post);
}

export async function handleDeletePost(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;
  try {
    await deletePost(id);
    return res.status(200).json({ message: "Post deleted" });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
}
