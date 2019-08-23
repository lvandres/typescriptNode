import { Router } from "express";

import user from "./users.routes";

const routes = Router();

routes.use("", user);

export default routes;