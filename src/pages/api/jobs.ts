import { type NextApiRequest, type NextApiResponse } from "next";

import { prisma } from "../../server/db/client";

const jobs = async (req: NextApiRequest, res: NextApiResponse) => {
  const postedjobs = await prisma.jobs.findMany();
  res.status(200).json(postedjobs);
};

export default jobs;