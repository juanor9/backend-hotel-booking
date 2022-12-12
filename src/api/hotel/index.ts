import { Router } from "express";
import {
  handleGetAllHotels,
  handleGetHotelById,
  handleCreateHotel,
  handleUpdateHotel,
  handleDeleteHotel
} from "./hotel.controller";

const router = Router();

// GET /api/hotels
router.get("/", handleGetAllHotels);
// GET /api/hotels/:id
router.get("/:id", handleGetHotelById);
// POST /api/hotels
router.post("/", handleCreateHotel);
// PATCH /api/hotels/:id
router.patch('/:id', handleUpdateHotel);
// DELETE /api/products/:id
router.delete('/:id', handleDeleteHotel);

export default router;
