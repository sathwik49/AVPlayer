import { Context } from 'hono';
import bcrypt from 'bcryptjs';
import { userSignupValidation } from '../zod/schemaValidation';
import { findDocuments, insertDocument } from '../utils/mongo';

export const userSignup = async (c: Context) => {
  try {
    const { username, password, email, mobile } = await c.req.json();
    const inputValidation = userSignupValidation({ username, password, email, mobile });

    if (!inputValidation.success || inputValidation.errMessage) {
      return c.json({ message: inputValidation.message || inputValidation.errMessage,success:false },403);
    }

    const duplicate:any = await findDocuments(c, { username },"users");
    
    if (duplicate.documents.length > 0) {
      return c.json({ message: 'Username already exists',success:false },403);
    }

    const hashedPwd = await bcrypt.hash(password, 10);
    const newUser:any = await insertDocument(c, {
      username,
      password: hashedPwd,
      email,
      mobile,
    },"users");

    if (newUser) {
      return c.json({ message: 'User created successfully',success:true },201);
    }

    return c.json({ message: 'Something went wrong. Try Again',success:false },500);
  } catch (error: any) {
    return c.json({ message:error.message ,success:false},404);
  }
};

