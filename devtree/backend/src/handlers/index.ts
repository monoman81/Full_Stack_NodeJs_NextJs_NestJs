import User from "../models/User";
import type {Request, Response} from 'express';
import {hashPassword, verifyPassword} from "../utils/auth";
import {validationResult} from 'express-validator';
import slug from "slug";
import jwt from "jsonwebtoken";
import {generateJWT} from "../utils/jwt";
import user from "../models/User";

export const createAccount = async (req: Request, res: Response)=> {
    const {email, password} = req.body;
    const userExists = await User.findOne({email});
    if (userExists) {
        const error = new Error("Usuario ya esta registrado");
        return res.status(409).json({error: error.message});
    }

    const handle = slug(req.body.handle, '');
    const handleExists = await User.findOne({handle});
    if (handleExists) {
        const error = new Error("El handle del usuario ya existe");
        return res.status(409).json({error: error.message});
    }

    const user = new User(req.body);
    user.password = await hashPassword(password);
    user.handle = handle;
    await user.save();
    return res.send('Registro creado correctamente');
}

export const login = async (req: Request, res: Response) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if (!user) {
        const error = new Error("Usuario no existe");
        return res.status(404).json({error: error.message});
    }
    if (await verifyPassword(password, user.password)) {
        const token = generateJWT({id: user.id});
        return res.status(200).send(token);
    }
    return res.status(401).json({error: 'Credenciales no validas'});
}

export const getUser = async (req: Request, res: Response) => {
    return res.status(200).json(req.user);
}