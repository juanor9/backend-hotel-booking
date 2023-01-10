import { Router } from "express";
import {
  handleGetAllRooms,
  handleGetRoomById,
  handleCreateRoom,
  handleUpdateRoom,
  handleDeleteRoom
} from "./room.controller";

const router = Router();

// GET /api/hotels
router.get("/", handleGetAllRooms);
// GET /api/hotels/:id
router.get("/:id", handleGetRoomById);
// POST /api/hotels
router.post("/", handleCreateRoom);
// PATCH /api/hotels/:id
router.patch('/:id', handleUpdateRoom);
// DELETE /api/products/:id
router.delete('/:id', handleDeleteRoom);

export default router;
