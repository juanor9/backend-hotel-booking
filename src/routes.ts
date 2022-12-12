import { Application } from "express";
import hotel from './api/hotel' 
import post from "./api/post";
import user from './api/user';   

function routes(app: Application):void{
  app.use('/api/hotels', hotel)
  app.use('/api/posts', post);
  app.use('/api/user', user);
}

export default routes;
