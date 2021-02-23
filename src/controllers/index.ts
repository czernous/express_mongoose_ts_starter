import { NextFunction, Request, Response, Router } from 'express';
const index: Router = Router();

index.get('/', (req: Request, res: Response, next: NextFunction) => {
    try {
        const SUCCESS_MESSAGE = 'Welcome to index route';
        res.status(200).json({ success: true, message: SUCCESS_MESSAGE });
    } catch (err) {
        res.status(400).json({ success: false, message: 'something went wrong' });
        next(err);
    }
});

export default { index };
