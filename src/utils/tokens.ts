import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const experiationToken = process.env.TOKEN_EXPIRATION as unknown as number;

interface userToken {
  id: number;
  role: 'student' | 'teacher' | 'coordinator' | 'administrator';
  name: string;
  email?: string;
  imageUrl: string;
  nameCareer?: string;
  shortNameCareer?: string;
  period?: {
    id: number;
    name: string;
  };
}

const generateToken = async (user: userToken) => {
  const token = jwt.sign(user, process.env.JWT_KEY_UPQROO as string, {
    expiresIn: 60 * 60 * experiationToken,
  });

  return token;
};

const verifyToken = async (token: string) => {
  try {
    jwt.verify(token, process.env.JWT_KEY_UPQROO as string);
    return true;
  } catch (error) {
    return false;
  }
};

export { generateToken, verifyToken };
