import Room, {RoomDocument} from "./room.model";
import {DocumentDefinition} from 'mongoose';

export function getAllRooms() {
  return Room.find({});
}

export function getRoomById(id: string) {
  return Room.findById(id)
}

export function createRoom (input: DocumentDefinition<Omit<RoomDocument, 'createdAt' | 'updatedAt'>>,){
  return Room.create(input)
}

export function updateRoom (id: string,
  room: DocumentDefinition<Omit<RoomDocument, 'createdAt' | 'updatedAt'>>,
) {
  return Room.findByIdAndUpdate(id, room, { new: true });
}

export function deleteRoom(id: string) {
  return Room.findByIdAndRemove(id);
}
