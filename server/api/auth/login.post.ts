import { PrismaClient } from '@canopie-club/prisma-client'
import MarkdownIt from 'markdown-it'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    const {username, password} = await readBody(event)

    console.log('credentials', username, password)

    // return {
    //     username,
    //     password
    // }

    const user = await prisma.user.findUnique({
        where: {
            email: username,
        }
    })

    if (!user) return {
        success: false,
        message: 'Username not found',
        user: null
    }

    //@ts-ignore
    const passwordCorrect = true;
    // const passwordCorrect = false;
    // const passwordCorrect = Bun.password.verifySync(password, user.password);

    if (!passwordCorrect) return {
        success: false,
        message: 'Password incorrect',
        user: null
    }



    return {
        success: true,
        message: 'Got user',
        user
    };
})