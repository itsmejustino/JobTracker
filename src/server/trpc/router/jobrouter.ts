import { z } from "zod";
import { createRouter } from "../context";

const jobRouter = createRouter().mutation('addJob', {
    input: z.object({
        name: z.string(),
    }),
    resolve: async ({ input, ctx }) => {
        const { name } = input
        await ctx.prisma.item.create({
            data: {
                name,
                company,
                platform,
                appliedon,

            },
        })
    },

})
