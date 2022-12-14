import { type NextPage } from "next";
import Head from "next/head";
import React, { useState, useReducer } from "react";
import { trpc } from "../utils/trpc";
import { Job } from '@prisma/client'
import JobList from "./components/Joblist";

//1. Capture input in State object. [DONE]
//2. Use object in State to Mutate to database. [DONE]
//3. query database for newly posted input. [DONE]
//4. Map db to create a list of input. [In Progress]

const Home: NextPage = () => {

  // Mutations and Queries for jobs to the DB
  const createJobMutation = trpc.jobs.addJob.useMutation();
  const queryJobs = trpc.jobs.getAllJobs.useQuery();
  const [, forceUpdate] = useReducer(x => x + 1, 0);

  //loading component using isLoading attribute from from trpc 
  // const querySomeJobs = trpc.jobs.getSpecificJobs.useQuery({ id, jobName, company, platform, appliedon })
  // if(!jobsData || isLoading) return <p> loading...</p>

  const createJob = (jobName: string, company: string, platform: string, appliedon: string) => {
    createJobMutation.mutate({
      jobName,
      company,
      platform,
      appliedon,
    });
  }

  const getInput = (event: React.FormEvent) => {
    event.preventDefault();
    const jobText = event.target.jobName.value
    const orgText = event.target.organization.value
    const platformText = event.target.platform.value
    const appliedOnText = event.target.appliedOn.value
    createJob(jobText, orgText, platformText, appliedOnText)
  }

  return (
    <>
      <Head>
        <title>Job Tracker</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="mx-auto my-12 nav-w-3xl  bg-slate-300 p-12"    >
        <div className="flex justify-around p-3 gap-3 bg-slate-400">
          <h2 className="text-2xl font-semibold">Applications Tracker</h2>
          <div className="flex flex-row">
            <button type='button' className="flex flex-row items-center gap-2 bg-blue-400 text-sm rounded-md transition p-2 hover:bg-blue-500">Save Applications List<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>

            </button>
          </div>
        </div>
        <form className="flex flex-wrap flex-row gap-4 mt-20 justify-center items-end" onSubmit={getInput}>
          <div className="flex flex-col gap-0">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Job Name</label>
            <input
              name='jobName'
              type="text" id="small-input"
              className="block w-100 p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
          </div>

          <div className="flex flex-col gap-0">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Organization</label>
            <input
              name='organization'
              type="text"
              id="small-input"
              className="block w-100 p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
          </div>

          <div className="flex flex-col gap-0">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Platform</label>
            <input
              name='platform'
              type="text"
              id="small-input"
              className="block w-100 p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
          </div>


          <div className="flex flex-col gap-0">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Applied On-Date</label>
            <input
              name='appliedOn'
              type="text"
              id="small-input"
              className="block w-100 p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
          </div>

          <button
            type='submit'
            onClick={forceUpdate}
            className="flex flex-row items-center gap-2 bg-blue-400 text-sm rounded-md transition p-2 hover:bg-blue-500" >Add Job <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </button>
        </form>
      </main>

      {
        <JobList
          jobName={JSON.stringify(queryJobs.data?.map(x => x.jobName))}
          company={JSON.stringify(queryJobs.data?.map(x => x.company))}
          platform={JSON.stringify(queryJobs.data?.map(x => x.platform))}
          appliedon={JSON.stringify(queryJobs.data?.map(x => x.appliedon))}
          id={JSON.stringify(queryJobs.data?.map(x => x.id))}
        />
      }

    </>
  );
};

export default Home;
