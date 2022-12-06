import { createRouter } from "@trpc/next";
import { z } from "zod";

import { router, publicProcedure } from "../trpc";


export const jobRouter = router({
    // The syntax is identical to creating queries
    addJob: publicProcedure
        .input(
            z.object({
                jobName: z.string(),
                company: z.string(),
                platform: z.string(),
                appliedon: z.string(),
            })
        )
        .mutation(({ ctx, input }) => {
            const { prisma } = ctx;
            const { jobName, company, platform, appliedon } = input;
            return prisma.job.create({
                data: {
                    jobName,
                    company,
                    platform,
                    appliedon,
                }
            });
            // Here return the information from the addJob procedure
            
        }),
    queryJobs: publicProcedure.query(async ({ ctx }) => {
        const jobApps = await ctx.prisma.job.findMany();
        return jobApps;
    }),
    // using zod schema to validate and infer input values


});




// .mutation(async ({ ctx }) => {
//     const jobCreation = await ctx.prisma.job.create({
//         data:{

    // name: z.string(),
    // company: z.string(),
    // platform: z.string(),
    // appliedon: z.string(),

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