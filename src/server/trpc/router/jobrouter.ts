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
    deleteJob: publicProcedure.input(
        z.object({
            id: z.string(),
        })
    )
        .mutation(({ ctx , input }) => {
            const { prisma } = ctx;
            const { id } = input;
            return prisma.job.delete({
                    where:{
                        id,
                    }
            });
        }),
    // Here return the information from the addJob procedure

    queryJobs: publicProcedure.query(async ({ ctx }) => {
        const jobApps = await ctx.prisma.job.findMany();
        return jobApps;
    }),
    // using zod schema to validate and infer input values


});