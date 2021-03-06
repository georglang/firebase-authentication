import { Application } from 'express';
import { create, get, patch, all, remove } from './controller';
import { isAuthenticated } from '../auth/authenticated';
import { isAuthorized } from '../auth/authorized';

export function routesConfig(app: Application) {
  app.post('/users', isAuthenticated, isAuthorized({ hasRole: ['admin'] }), create);

  // lists all users
  app.get('/users', [isAuthenticated, isAuthorized({ hasRole: ['admin'] }), all]);
  // get :id user
  app.get('/users/:id', [
    isAuthenticated,
    isAuthorized({ hasRole: ['admin'], allowSameUser: true }),
    get,
  ]);
  // updates :id user
  app.patch('/users/:id', [
    isAuthenticated,
    isAuthorized({ hasRole: ['admin'], allowSameUser: true }),
    patch,
  ]);
  // deletes :id user
  app.delete('/users/:id', [isAuthenticated, isAuthorized({ hasRole: ['admin'] }), remove]);
}
