import {
  createBooking,
  deleteBooking,
  getAllBookings,
  getBookingById,
  updateBooking
} from "./booking.services";
import { Request, Response, NextFunction } from 'express';

export async function handleAllGetBookings(req: Request, res: Response, next: NextFunction) {
  try {
    const bookings = await getAllBookings();
    return res.status(200).json(bookings);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
}

export async function handleGetBooking(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;
  try {
    const booking = await getBookingById(id);
    if(!booking){
      return res.status(404).json({message: "booking not found"});
    }
    return res.status(200).json(booking);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
}

export async function handleCreateBooking(req: Request, res: Response, next: NextFunction) {
  const data = req.body;
  try {
    const booking = await createBooking(data);
    return res.status(201).json(booking);
  } catch (error) {
    return res.status(500).json(error);
  }
}

export async function handleUpdateBooking(req: Request, res: Response,  next: NextFunction) {
  const { id } = req.params;
  const data = req.body;
  const product = await updateBooking(id, data);
  if (!product) {
    return res.status(404).json({ message: 'Booking not found' });
  }
  return res.status(200).json(product);
}

export async function handleDeleteBooking(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;
  try {
    await deleteBooking(id);
    return res.status(200).json({ message: "Booking deleted" });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
}
