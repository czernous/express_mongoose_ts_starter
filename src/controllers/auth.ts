import { NextFunction, Request, Response, Router } from 'express';
import mongoose from 'mongoose';
import User from '../models/User';

const loginGet: Router = Router();
const registerPost: Router = Router();

loginGet.get(
    '/',
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const users = await User.find({});
            res.status(200).json({ users: users, count: users.length });
        } catch (err) {
            res.status(400).json({ success: false, message: 'something went wrong' });
            next(err);
        }
    },
);

registerPost.post(
    '/',
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const user = new User({
                _id: new mongoose.Types.ObjectId(),
                email: 'testUser@example.com',
                firstName: 'John',
                lastName: 'Doe',
                role: 'user',
            });
            await user.save();
            res.status(201).json({ user });
        } catch (err) {
            res.status(400).json({ success: false, message: 'something went wrong' });
            next(err);
        }
    },
);

export default { loginGet, registerPost };
