import { getAuthSession } from "@/lib/auth";
import { SubthoughtValidator } from "@/lib/validators/subthoughts";
import { db } from "@/lib/db";
import { z } from "zod";

export async function POST(req: Request) {
    try {
        const session = await getAuthSession()

        if(!session?.user) {
            return new Response('Unauthorized', {status: 401})
        }

        const body = await req.json()
        const {name} = SubthoughtValidator.parse(body)

        const subthoughtExists = await db.subthought.findFirst({
            where: {
                name,
            }
        })

        if(subthoughtExists) {
            return new Response('Thought already exists', {status: 409})
        }

        const subthought = await db.subthought.create({
            data: {
                name,
                creatorId: session.user.id,
            }
        })

        await db.subscription.create({
            data: {
                userId: session.user.id,
                subthoughtId: subthought.id
            }
        })

        return new Response(subthought.name)
    }
    catch(error) {
        if(error instanceof z.ZodError) {
            return new Response(error.message,{status: 422})
        } 

        return new Response('Could not create subthought', {status: 500})
    }
}