import express, { Application, Request, Response, NextFunction } from 'express';
import { routes } from './routes';
import logging from './config/logging';
import config from './config/config';
import mongoose from 'mongoose';

const NAMESPACE = 'Server';
// Connect to Mongo
mongoose
    .connect(config.mongo.devUrl, config.mongo.options)
    .then((result) => {
        logging.info(NAMESPACE, 'Connected to MONGODB');
    })
    .catch((error) => {
        logging.error(NAMESPACE, error.message, error);
    });
// Boot express
const app: Application = express();

// Log requests
app.use((req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

    res.on('finish', () => {
        /** Log the res */
        logging.info(
            NAMESPACE,
            `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`,
        );
    });

    next();
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Application routing
routes(app);

// Start server
app.listen(config.server.port, () =>
    logging.info(NAMESPACE, `is running on ${config.server.hostname}:${config.server.port}`),
);
