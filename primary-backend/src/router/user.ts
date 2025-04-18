import { Router } from 'express';
import { authMiddleware } from '../middleware';
import { SigninSchema, SignupSchema } from '../types';
import { prismaClient } from '../db';
import jwt from 'jsonwebtoken';
import { JWT_PASSWORD } from '../config';
import bcrypt from 'bcrypt';

const router = Router();

router.post('/signup', async (req, res): Promise<any> => {
    const body = req.body;
    const parsedData = SignupSchema.safeParse(body);

    if (!parsedData.success) {
        console.log(parsedData.error);
        return res.status(411).json({
            message: 'Incorrect inputs',
        });
    }

    const userExists = await prismaClient.user.findFirst({
        where: {
            email: parsedData.data.username,
        },
    });

    if (userExists) {
        return res.status(403).json({
            message: 'User already exists',
        });
    }

    const hashedPassword = await bcrypt.hash(parsedData.data.password, 10);
    await prismaClient.user.create({
        data: {
            email: parsedData.data.username,
            // TODO: Dont store passwords in plaintext, hash it
            password: hashedPassword,
            name: parsedData.data.name,
        },
    });

    // await sendEmail();

    return res.json({
        message: 'Please verify your account by checking your email',
    });
});

router.post('/signin', async (req, res): Promise<any> => {
    const body = req.body;
    const parsedData = SigninSchema.safeParse(body);

    if (!parsedData.success) {
        return res.status(411).json({
            message: 'Incorrect inputs',
        });
    }

    const user = await prismaClient.user.findFirst({
        where: {
            email: parsedData.data.username
        },
    });

    if (!user || !(await bcrypt.compare(parsedData.data.password, user.password))) {
        return res.status(403).json({
            message: 'Invalid credentials',
        });
    }

    // sign the jwt
    const token = jwt.sign(
        {
            id: user.id,
        },
        JWT_PASSWORD
    );

    res.json({
        token: token,
    });
});

// TODO: Fix the type
// @ts-ignore
router.get('/', authMiddleware, async (req, res): Promise<any> => {
    // TODO: Fix the type
    // @ts-ignore
    const id = req.id;
    const user = await prismaClient.user.findFirst({
        where: {
            id,
        },
        select: {
            name: true,
            email: true,
        },
    });

    return res.json({
        user,
    });
});

export const userRouter = router;
