import { Router } from "express";
import { isAuthenticated } from "../../auth/auth.services";
import {
  handleGetUsers,
  handleGetUser,
  handleCreateUser,
  handleUpdateUser,
  handleDeleteUser,
  handleGetUserByFilter,
} from "./user.controller";

const router = Router();

router.get("/", handleGetUsers);
router.get("/search", handleGetUserByFilter);
router.get("/:id", handleGetUser);
router.post("/", handleCreateUser);
router.patch("/:id", handleUpdateUser);
router.delete("/:id", isAuthenticated, handleDeleteUser);
export default router;
