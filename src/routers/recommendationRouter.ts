import { Request, Response, Router } from "express";
import { recommendationController } from "../controllers/recommendationController.js";
import { prisma } from "../database.js";

const recommendationRouter = Router();

recommendationRouter.post("/", recommendationController.insert);
recommendationRouter.get("/", recommendationController.get);
recommendationRouter.get("/random", recommendationController.random);
recommendationRouter.get("/top/:amount", recommendationController.getTop);
recommendationRouter.get("/:id", recommendationController.getById);
recommendationRouter.post("/:id/upvote", recommendationController.upvote);
recommendationRouter.post("/:id/downvote", recommendationController.downvote);
recommendationRouter.post("/clear", async (req: Request, res: Response) => {
	await prisma.$executeRaw`TRUNCATE TABLE recommendations`;
	res.sendStatus(200);
});

export default recommendationRouter;
