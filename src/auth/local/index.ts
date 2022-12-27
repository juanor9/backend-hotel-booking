import { Router } from 'express';

import {
    handleLoginUser,
  } from "./local.controller";

const router = Router();

//Login
// api/auth/local/login
router.post("/login", handleLoginUser);

//Change password
// api/auth/change-password

//Forgot password
// api/auth/forgot-password

//Verify email
// api/auth/verify-email

export default router;