import { z } from "zod";

import { router, publicProcedure } from "../trpc";


export const jobRouter = router({

    // The syntax is identical to creating queries
    addJob: publicProcedure
        // using zod schema to validate and infer input values
        .input(
            z.object({
                name: z.string(),
                company: z.string(),
                platform: z.string(),
                appliedon: z.string(),
            })
        )
        .mutation(({ input }) => {
            // Here return the information from the addJob procedure
            return {
                addJob:{
                    name: input.name,
                    company: input.company,
                    platform: input.platform,
                    aplliedon: input.appliedon,
                },
            };
        })
});

    // getall: publicProcedure.query(() => {
    //     return ctx.task.findMany({
    //       orderBy: {
    //         createdAt: 'asc',
    //       },
    //     });
    //   }),