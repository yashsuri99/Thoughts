import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { SubthoughtsSubscriptionValidator } from "@/lib/validators/subthoughts";
import { z } from "zod";

export async function POST(req: Request) {
    try {
        const session = await getAuthSession()
        if(!session?.user) {
            return new Response('Unauthorized', {status: 401})
        }

        const body = await req.json()

        const {subthoughtId} = SubthoughtsSubscriptionValidator.parse(body)

        const subscriptionExists = await db.subscription.findFirst({
            where: {
                subthoughtId, 
                userId: session.user.id
            }
        })
        
        if(!subscriptionExists) {
            return new Response('You are not subscribed to this thought', {status: 400})
        }  

        const subthought = await db.subthought.findFirst({
            where: {
                id: subthoughtId,
                creatorId: session.user.id
            }
        })

        if(subthought) {
            return new Response("You can't unsubscribe your own subthought", {status: 400})
        }

        await db.subscription.delete({
            where: {
                userId_subthoughtId: {
                    subthoughtId,
                    userId: session.user.id
                }
            }
        })

        return new Response(subthoughtId)
    } catch (error) {
        if(error instanceof z.ZodError) {
            return new Response('Invalid request data passed',{status: 422})
        } 

        return new Response('Could not unsubscribe, please try again later', {status: 500})
    }
}