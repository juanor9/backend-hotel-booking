import { Application } from "express";
import post from "./api/post";
import user from './api/user';

function routes(app: Application):void{
  app.use('/api/posts', post);
  app.use('/api/user', user);
}

export default routes;
