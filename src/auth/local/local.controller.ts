import { getUserFilter, updateUser } from "../../api/user/user.services";
import { NextFunction, Request, Response } from "express";
import { sendMailSendGrid } from "../../utils/emails";
import { signToken } from "../auth.services";
import crypto from "crypto";
import bcrypt from "bcryptjs";


export async function handleLoginUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { email, password } = req.body;

  try {
    const user = await getUserFilter({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const validPassword = await user.comparePassword(password);
    console.log(validPassword);

    if (!validPassword) {
      return res.status(401).json({ message: "Invalid password" });
    }

    //JWT
    const jwtPayload = user.profile;
    const userToken = signToken(jwtPayload);

    return res.status(200).json({ profile: user.profile, userToken });
  } catch (error) {
    return res.status(500).json(error);
  }
}

export async function handleVerifyUserEmail(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { token } = req.params;

  try {
    const user = await getUserFilter({ emailConfirmToken: token });

    if (!user) {
      return res.status(404).json({ message: "Invalid token" });
    }

    if (Date.now() > Number(user.emailConfirmExpires)) {
      return res.status(400).json({ message: "Token expired" });
    }

    user.isActive = true;
    user.emailConfirmToken = undefined;
    user.emailConfirmExpires = undefined;
    await user.save();
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
  return res.status(200).json({ message: "User validated" });
}

export async function handleResetPassword(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const data = req.body;
  try {
    const hash = crypto.createHash("sha256").update(data.email).digest("hex");

    const user = await getUserFilter({ email: data.email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.passwordResetToken = hash;
    user.passwordResetExpires = new Date(Date.now() + 3_600_000 * 24);

    const updateUserData = await updateUser(user._id, user);

    const message = {
      to: user.email,
      from: `No Reply <orjuela9@gmail.com>`,
      subject: "Reset your password",
      templateId: "d-0f65e09fc1fe45e6a891fda451b57e77",
      dynamic_template_data: {
        firstName: user.name,
        url: `http://localhost:3000/activate/new-password/${hash}`,
      },
    };
    await sendMailSendGrid(message);

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
}

export async function handleVerifyPasswordReset(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { token } = req.params;
  const {password} = req.body;
  try {
    const user = await getUserFilter({ passwordResetToken: token });

    if (!user) {
      return res.status(404).json({ message: "Invalid token" });
    }

    if (Date.now() > Number(user.passwordResetExpires)) {
      return res.status(400).json({ message: "Token expired" });
    }

    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save();
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
  return res.status(200).json({ message: "Password updated" });
}
