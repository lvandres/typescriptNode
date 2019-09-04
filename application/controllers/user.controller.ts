import { Request, Response } from "express";
import { UserService } from "../services/user.service";

class UserController{

  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async listAll (req: Request, res: Response) {
    const users = await this.userService.findAll();
    res.send(users);
  }
    
};
    
export default UserController;