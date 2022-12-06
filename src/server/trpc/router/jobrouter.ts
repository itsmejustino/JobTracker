import { createTRPCNext } from "@trpc/next";
import { z } from "zod";

import { router, publicProcedure } from "../trpc";


export const jobRouter = router({

    queryJobs: publicProcedure.query(async ({ ctx })=>{
        const jobApps = await ctx.prisma.job.findMany();
        return jobApps; 
    }),

    // The syntax is identical to creating queries
    addJob: publicProcedure
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
            addJob: {
                name: input.name,
                company: input.company,
                platform: input.platform,
                aplliedon: input.appliedon,
            },
        };
    }),
        // using zod schema to validate and infer input values
      

});




// .mutation(async ({ ctx }) => {
//     const jobCreation = await ctx.prisma.job.create({
//         data:{

//     // name: z.string(),
//     // company: z.string(),
//     // platform: z.string(),
//     // appliedon: z.string(),

//         },
//     })
//     return jobCreation;
// })

// .input(
//     z.object({
//         name: z.string().nullish(),
//         company: z.string().nullish(),
//         platform: z.string().nullish(),
//         aplliedon: z.string().nullish(),
//     }).nullish(),
// ).query(async ({ ctx }) => {
//     console.log('input received'+ input)
//     return input;
//   })