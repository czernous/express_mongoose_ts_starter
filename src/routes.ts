import { Application, Router } from 'express';
import indexController from './controllers/index';
import authController from './controllers/auth';

const _routes: [string, Router][] = [
    ['/', indexController.index],
    ['/auth/login', authController.loginGet],
    ['/auth/register', authController.registerPost],
];

export const routes = (app: Application): void => {
    _routes.forEach((route) => {
        const [url, controller] = route;
        app.use(url, controller);
    });
};
