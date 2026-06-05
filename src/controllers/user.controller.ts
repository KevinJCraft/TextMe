import { Request, Response } from "express";
import { UserModel } from "../models/user.model";

export const UserController = {
	getAll: async (req: Request, res: Response) => {
		const users = await UserModel.findAll();
		res.json(users);
	},

	getById: async (req: Request, res: Response) => {
		const user = await UserModel.findById(Number(req.params.id));
		if (!user) return res.status(404).json({ message: "User not found" });
		res.json(user);
	},

	create: async (req: Request, res: Response) => {
		const user = await UserModel.create(req.body);
		res.status(201).json(user);
	},

	update: async (req: Request, res: Response) => {
		const user = await UserModel.update(Number(req.params.id), req.body);
		res.json(user);
	},

	delete: async (req: Request, res: Response) => {
		await UserModel.delete(Number(req.params.id));
		res.status(204).send();
	},
};
