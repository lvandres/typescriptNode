import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../database/entity/user";

class UserController{

    static listAll = async (req: Request, res: Response) => {
      //Get users from database
      const userRepository = getRepository(User);
      const users = await userRepository.find({
        select: ["id", "email", "name", "last_name", "role"] //We dont want to send the passwords on response
      });
    
      //Send the users object
      res.send(users);
    };
    
};
    
export default UserController;