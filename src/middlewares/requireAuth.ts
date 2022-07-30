import { Request, Response, NextFunction } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';
import User from '../models/User';

const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
  // check if json web token exists & is verified
  try {
    let token: string | undefined;
    if (req.headers.authorization) {
      token = req.headers.authorization.split(' ')[1];
    }
    if (token) {
      const tokenVerified = (await verify(
        token,
        process.env.JWT_SECRET as string
      )) as JwtPayload;
      const { id } = tokenVerified;
      const user = await User.findByPk(id);
      if (user) {
        req.user = user;
        return next();
      }
    }
    return res.status(401).json({ message: 'No token provided' });
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = requireAuth;
