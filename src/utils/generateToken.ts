import jwt from 'jsonwebtoken';

const generateToken = (id: number) => {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: '7d',
  });
};

module.exports = generateToken;
