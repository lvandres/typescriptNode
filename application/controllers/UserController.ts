import { IRouterContext } from "koa-router";
import { Inject, Singleton } from "typescript-ioc";
import UserService from "../services/UserService";
import { GenericController, IController } from "./GenericController";
import User from "../database/entity/User";

@Singleton
export default class UserController extends GenericController<User> implements IController {
  service: UserService;

  constructor( @Inject private userService: UserService) {
    super();
    this.service = userService;
  }
}