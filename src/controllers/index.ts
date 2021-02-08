import { NextFunction, Request, Response, Router } from 'express';
const index: Router = Router();

index.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(200).json({ success: true, message: 'Welcome to index route' });
    } catch (err) {
        res.status(400).json({ success: false, message: 'something went wrong' });
        next(err);
    }
});

export default { index };
