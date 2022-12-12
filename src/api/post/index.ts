import { Router } from 'express';
import {
  handleAllGetPosts,
  handleCreatePost,
  handleDeletePost,
  handleGetPost,
  handleUpdatePost
} from './post.controller';

const router = Router();

// GET /api/users
router.get('/', handleAllGetPosts);
// GET /api/users/:id
router.get('/:id', handleGetPost);
// POST /api/users
router.post('/', handleCreatePost);
// PATCH /api/users/:id
router.patch('/:id', handleUpdatePost);
// DELETE /api/users/:id
router.delete('/:id', handleDeletePost);

export default router;
