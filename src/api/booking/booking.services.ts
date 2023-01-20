import { DocumentDefinition } from "mongoose";
import Booking, { BookingDocument } from "./booking.model";

export function getAllBookings() {
  return Booking.find().populate("idHotel");
}

export function getBookingById(id: string) {
  const booking = Booking.findById(id).populate("idHotel").populate("idUser");
  return booking;
}

export function createBooking(booking: DocumentDefinition<BookingDocument>) {
  return Booking.create(booking);
}

export function updateBooking(id: string, booking: DocumentDefinition<BookingDocument>) {
  const updateBooking = Booking.findByIdAndUpdate(id, booking, { new: true });
  return updateBooking;
}

export function deleteBooking(id: string) {
  const deleteBooking = Booking.findByIdAndDelete(id);
  return deleteBooking;
}
