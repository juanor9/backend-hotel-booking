import { Router } from 'express';

import {
    handleLoginUser,
    handleVerifyUserEmail,
    handleResetPassword,
    handleVerifyPasswordReset,
  } from "./local.controller";

const router = Router();

//Login
// auth/local/login
router.post("/login", handleLoginUser);

//Change password
// auth/local/change-password

//Reset password
// auth/local/password-reset
router.post("/password-reset", handleResetPassword)
// auth/local/password-reset/validate
router.post("/password-reset/:token", handleVerifyPasswordReset)

//Verify email
// auth/local/activate/*hexToken*
router.get("/activate/:token", handleVerifyUserEmail);

export default router;