import { Request, Response, NextFunction } from "express";
import {
  getAllRooms,
  getRoomById,
  createRoom,
  updateRoom,
  deleteRoom,
} from "./room.services";

export async function handleGetAllRooms(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const rooms = await getAllRooms();
    return res.status(200).json(rooms);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
}

export async function handleGetRoomById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id } = req.params;

  const room = await getRoomById(id);

  if (!room) {
    return res.status(404).json({ message: "Room not found" });
  }

  return res.status(200).json(room);
}

export async function handleCreateRoom(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const data = req.body;
  try {
    const newRoom = await createRoom(data);
    return res.status(201).json(newRoom);
  } catch (error) {
    return res.status(500).json(error);
  }
}

export async function handleUpdateRoom(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id } = req.params;
  const data = req.body;

  const room = await updateRoom(id, data);
  if (!room) {
    return res.status(404).json({ message: "Hotel not found" });
  }

  return res.status(200).json(room);
}

export async function handleDeleteRoom(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id } = req.params;

  try {
    const room = await deleteRoom(id);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }
    return res.status(200).json({ message: "Room deleted" });
  } catch (error) {
    return res.status(500).json(error);
  }
}
