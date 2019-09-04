import { Router } from "express";
import UserController from "../controllers/user.controller";

const router = Router();
const userController = new UserController();

router.get('/', (req, res) => userController.listAll(req, res));

export default router;