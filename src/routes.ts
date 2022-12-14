import { Application } from 'express';
import booking from './api/booking';
import hotel from './api/hotel';
import post from "./api/post";
import user from './api/user';
import payment from './api/payment';
import healthcheck from './api/healthcheck';

function routes(app: Application):void{
  app.use('/api/healthcheck', healthcheck);
  app.use('/api/payments', payment);
  app.use('/api/bookings', booking);
  app.use('/api/hotels', hotel);
  app.use('/api/posts', post);
  app.use('/api/user', user);
}

export default routes;
