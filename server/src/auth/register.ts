import validator from 'validator';

import { checkEmailExists, checkUsernameExists } from '../helper/authHelper.js';
import { generateToken } from '../helper/tokenHelper.js';
import { getHash } from '../helper/util.js';

import { PrismaClient, Gender } from "@prisma/client";
const prisma = new PrismaClient();

export async function authRegister(name: string, email: string, password: string, username: string, profilePic: string) {
  // Error Handling
  if (name.length < 1) throw { status: 400, message: "Name cannot be empty." };
  if (!validator.isEmail(email)) throw { status: 400, message: "Invalid email address." };
  if (await checkEmailExists(email)) throw { status: 400, message: "Email address is already being used by another user." };
  if (await checkUsernameExists(username)) throw { status: 400, message: "Username is already being used by another user." };

  // Create the user
  const user = await prisma.user.create({
    data: {
      name: name,
      username: username,
      email: email,
      password: getHash(password),
      profilePic: profilePic,
      bio: "",
      linkedIn: "",
      github: "",
      degree: "",
      university: "",
      gender: Gender.NONE,
      preference: Gender.NONE,
    }
  });

  // Generate the token
  const token = await generateToken(user.id);

  return {
    accessToken: token.accessToken,
    refreshToken: token.refreshToken,
    userId: user.id,
    name: user.name,
    email: user.email,
    profilePic: user.profilePic,
  };
}