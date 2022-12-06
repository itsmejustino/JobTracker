import { type NextPage } from "next";
import Head from "next/head";
import React, { useState } from "react";
import { trpc } from "../utils/trpc";

//1. Capture input in State object. [DONE]
//2. Use object in State to Mutate to database. [In progress]
//3. query database for newly posted input. [Not Started]
//4. Map db to create a list of input. [Not Started]

const Home: NextPage = () => {
  // Mutations and Queries for jobs to the DB
  const createJobMutation = trpc.jobs.addJob.useMutation();
  const queryJobs= trpc.jobs.queryJobs.useQuery();

  //useState to capture changes to input fields
  const [jobText, setJobText] = useState('');
  const [orgText, setOrgText] = useState('');
  const [platformText, setPlatformText] = useState('');
  const [appliedOnText, setAppliedOnText] = useState('');
  const [id, setId] = useState('');

  // const handleClick = (event: React.MouseEvent<HTMLElement>) => {
  //   console.log(event.target);
  //   console.log(event.currentTarget);
  //   return createJobMutation;
  // };

  //   const onChange = (e: React.FormEventHandler<HTMLInputElement>)=> {
  //     const newValue = e.name.length
  //     const targetName = e.target.name
  //     console.log(newValue, targetName);
  //  }

  // const newJob = (e: React.MouseEvent<HTMLInputElement>) => {
  //   const newValue = {};

  // }
  
  const createJob = (jobName: string, company: string, platform:string, appliedon: string) => {
    createJobMutation.mutate({
      jobName,
      company,
      platform,
      appliedon,
    });
  }
  const queryAllJobs = ()=> {
   return queryJobs.data
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
        <form className="flex flex-wrap flex-row gap-4 mt-20 justify-center items-end">
          <div className="flex flex-col gap-0">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Job Name</label>
            <input name='jobName'
              key={id}
              value={jobText}
              onChange={(e) => {
                e.preventDefault();
                setJobText(e.target.value);
                setId(e.target.name)
                console.log(jobText, id);
              }}
              type="text" id="small-input" className="block w-100 p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
          </div>

          <div className="flex flex-col gap-0">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Organization</label>
            <input
              name='organization'
              key={id}
              value={orgText}
              onChange={(e) => {
                e.preventDefault();
                setOrgText(e.target.value);
                setId(e.target.name)
                console.log(orgText, id);
              }}
              type="text"
              id="small-input"
              className="block w-100 p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
          </div>

          <div className="flex flex-col gap-0">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Platform</label>
            <input
              name='platform'
              key={id}
              value={platformText}
              onChange={(e) => {
                e.preventDefault();
                setPlatformText(e.target.value);
                setId(e.target.name)
                console.log(platformText, id);
              }}
              type="text"
              id="small-input"
              className="block w-100 p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
          </div>


          <div className="flex flex-col gap-0">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Applied On-Date</label>
            <input
              name='appliedOn'
              key={id}
              value={appliedOnText}
              onChange={(e) => {
                e.preventDefault();
                setAppliedOnText(e.target.value);
                setId(e.target.name)
                console.log(appliedOnText, id);
              }}
              type="text"
              id="small-input"
              className="block w-100 p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
          </div>


          <div className="">
            <button
              onClick={() => {
                const input = {
                  appliedOnText,
                  platformText,
                  orgText,
                  jobText,
              }
              console.log(input);
              createJob(jobText, orgText, platformText, appliedOnText)
              console.log(queryAllJobs());
              }}
              type='button' className="flex flex-row items-center gap-2 bg-blue-400 text-sm rounded-md transition p-2 hover:bg-blue-500" >Add Job <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>

            </button>
          </div>


        </form>
      </main>
    </>
  );
};

export default Home;
