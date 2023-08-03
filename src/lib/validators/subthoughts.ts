import {z} from 'zod'

export const SubthoughtValidator = z.object({
    name: z.string().min(3).max(21)
})

export const SubthoughtsSubscriptionValidator = z.object({
    subthoughtId: z.string()
})

export type createSubthoughtPayload = z.infer<typeof SubthoughtValidator>
export type SubscribeToSubthoughtPayload = z.infer<typeof SubthoughtsSubscriptionValidator>