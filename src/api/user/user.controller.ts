import {Request, Response} from 'express';
import { sendMailSendGrid } from '../../utils/emails';
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "./user.services";
import crypto from 'crypto';

export async function handleGetUsers(req: Request, res: Response) {
  try {
    const users = await getUsers();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json(error);
  }
}

export async function handleGetUser(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const user = await getUserById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
}

export async function handleCreateUser(req: Request, res: Response) {
  const data = req.body;
  const newUser = data
  try {
    const hash = crypto.createHash('sha256').update(data.email).digest('hex');
    newUser.emailConfirmToken = hash;
    newUser.emailConfirmExpires= Date.now() + 3_600_000 * 48;

    const user = await createUser(data);

    const message = {
      to: user.email,
      from: `No Reply <orjuela9@gmail.com>`,
      subject: 'Welcome to your hotel booking application',
      templateId: 'd-0f65e09fc1fe45e6a891fda451b57e77',
      dynamic_template_data:{
        firstName:user.name,
        url: `http://localhost:3000/activate/${hash}`
      }
    }
    await sendMailSendGrid(message);

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
}

export async function handleDeleteUser(req: Request, res: Response) {
  const { id } = req.params;
  try {
    await deleteUser(id);
    return res.status(200).json({ message: "User deleted" });
  } catch (error) {
    return res.status(500).json(error);
  }
}

export async function handleUpdateUser(req: Request, res: Response) {
  const { id } = req.params;
  const data = req.body;

  try {
    const user = await updateUser(id, data);

    if (!user) {
      return res.status(404).json({ message: "User not found to update" });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
}