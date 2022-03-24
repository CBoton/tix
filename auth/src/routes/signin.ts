import express, { Request, Response} from 'express';
import { body, validationResult } from 'express-validator';
import { User } from '../models/users';
import { validateRequest } from '../middlewares/validate-request';
import { BadRequestError } from '../errors/BadRequestError';
import { Password } from '../services/password';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/api/users/signin',
[
 body('email')
 .isEmail()
 .withMessage("Email must be valid"),
 body('password')
 .trim()
 .notEmpty()
 .withMessage('You must supply a password')
],
validateRequest, 
async(req: Request, res: Response) => {
 const { email, password } = req.body;

 const existingUser = await User.findOne({ email });
 if (!existingUser) {
   throw new BadRequestError('Invalid Credentials')
 }

 const passwordsMatch = await Password.compare(existingUser.password, password);

 if (!passwordsMatch){
   throw new BadRequestError('Invalid Credentials')
 }

  //Generate jwt
    
  const userJwt = jwt.sign({
    id: existingUser.id,
    email: existingUser.email
  }, process.env.jwt_key!)

  //store it on session object
  req.session = {
    jwt: userJwt
  }

  res.status(200).send(existingUser);
});

export { router as signinRouter };