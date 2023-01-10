import Hotel, {HotelDocument} from "./hotel.model";
import {DocumentDefinition} from 'mongoose';

export function getAllHotels() {
  return Hotel.find({});
}

export function getHotelById(id: string) {
  return Hotel.findById(id).populate("rooms")
}

export function createHotel (input: DocumentDefinition<Omit<HotelDocument, 'createdAt' | 'updatedAt'>>,){
  return Hotel.create(input)

}

export function updateHotel (id: string,
  hotel: DocumentDefinition<Omit<HotelDocument, 'createdAt' | 'updatedAt'>>,
) {
  return Hotel.findByIdAndUpdate(id, hotel, { new: true });
}

export function deleteHotel(id: string) {
  return Hotel.findByIdAndRemove(id);
}
