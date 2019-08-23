import { Router } from "express";

const router = Router();

router.get('/', async (req, res, next) => {
    try {
      res.json('exelent');
    } catch (e) {
        res.sendStatus(400);
      next(e);
    }
});

export default router;