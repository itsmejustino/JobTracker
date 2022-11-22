import { z } from "zod";
import { router, publicProcedure } from "../trpc";


export const jobRouter = router({
    // Create procedure at path 'login'
    // The syntax is identical to creating queries
    login: publicProcedure
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
            // Here some login stuff would happen
            return {
                user: {
                    name: input.name,
                    company: input.company,
                    platform: input.platform,
                    aplliedon: input.appliedon,
                },
            };
        })
});

