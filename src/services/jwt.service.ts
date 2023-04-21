import jwt from 'jsonwebtoken';

const USERS = [
    {
        id: 1,
        email: 'example1@example.com',
        password: '$2y$10$mj1OMFvVmGAR4gEEXZGtA.R5wYWBZTis72hSXzpxEs.QoXT3ifKSq', // password
        createdAt: '2020-06-14 18:23:45',
    },
    {
        id: 2,
        email: 'example2@example.com',
        password: '$2y$10$mj1OMFvVmGAR4gEEXZGtA.R5wYWBZTis72hSXzpxEs.QoXT3ifKSq', // password
        createdAt: '2020-06-14 18:23:45',
    },
    {
        id: 3,
        email: 'example3@example.com',
        password: '$2y$10$mj1OMFvVmGAR4gEEXZGtA.R5wYWBZTis72hSXzpxEs.QoXT3ifKSq', // password
        createdAt: '2020-06-14 18:23:45',
    },
    {
        id: 4,
        email: 'example4@example.com',
        password: '$2y$10$mj1OMFvVmGAR4gEEXZGtA.R5wYWBZTis72hSXzpxEs.QoXT3ifKSq', // password
        createdAt: '2020-06-14 18:23:45',
    },
];

export class JWT {

    private static JWT_KEY = process.env.JWT_KEY as string

    constructor() {
    }

    /**
     * getToken
     */
    public getToken(userId: string) {
        const payload = {
            id: USERS[0].id,
            email: USERS[0].email,
            createdAt: USERS[0].createdAt,
        };

        return {
            token: jwt.sign(
                payload,
                JWT.JWT_KEY,
                { expiresIn: '7d' }),
            expiresIn: '7d'
        }
    }
}