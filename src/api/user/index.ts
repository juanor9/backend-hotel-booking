import { Router } from 'express';

import { handleGetUsers, handleGetUser, handleCreateUser, handleUpdateUser, handleDeleteUser} from './user.controller';

const router = Router();

router.get('/', handleGetUsers);
router.get('/:id', handleGetUser);
router.post('/', handleCreateUser);
router.patch('/:id', handleUpdateUser);
router.delete('/:id', handleDeleteUser);

export default router;
