import { Request, Response, NextFunction } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';
const User = require('../models/User');

const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
  let token: string | undefined;
  if (req.headers.authorization) {
    token = req.headers.authorization.split(' ')[1];
  }

  // check if json web token exists & is verified
  if (token) {
    const tokenVerified = verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;
    try {
      const { id } = tokenVerified;
      const user = await User.findByPk(id);
      if (user) {
        req.user = user;
        return next();
      }
      return res.status(401).json({ error: 'Invalid credentials' });
    } catch (error) {
      return res.sendStatus(401);
    }
  } else {
    return res
      .status(401)
      .json({ message: 'You must be logged in to access this resource' });
  }
};

module.exports = requireAuth;
