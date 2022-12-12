import { Router } from 'express';
import {
  handleAllGetBookings,
  handleCreateBooking,
  handleDeleteBooking,
  handleGetBooking,
  handleUpdateBooking
} from './booking.controller';

const router = Router();

// GET /api/users
router.get('/', handleAllGetBookings);
// GET /api/users/:id
router.get('/:id', handleGetBooking);
// POST /api/users
router.post('/', handleCreateBooking);
// PATCH /api/users/:id
router.patch('/:id', handleUpdateBooking);
// DELETE /api/users/:id
router.delete('/:id', handleDeleteBooking);

export default router;
