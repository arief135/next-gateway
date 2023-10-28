import { PrismaClient } from "@prisma/client";
import * as bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function adminPassword() {
    const salt = await bcrypt.genSalt()
    const password = 'admin'
    const hash = await bcrypt.hash(password, salt)

    return hash
}

async function main() {
    await prisma.credentialType.upsert({
        where: {
            id: 1
        },
        update: {},
        create: {
            id: 1,
            name: 'BASIC'
        },
    })

    await prisma.user.upsert({
        create: {
            email: 'admin@next-gateway.id',
            username: 'admin',
            firstName: "Administrator",
            lastName: '',
            passwordHash: await adminPassword(),
            active: true
        },
        where: {
            username: 'admin'
        },
        update: {}
    })

    const defaultRoles = ['ADMINISTRATOR', 'DEVELOPER', 'SERVICE']
    defaultRoles.forEach(async (e) => {
        await prisma.role.upsert({
            create: { name: e },
            update: {},
            where: { name: e }
        })
    })
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
