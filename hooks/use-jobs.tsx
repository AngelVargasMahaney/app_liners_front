import { getJobs } from "@/api/client";
import { useEffect, useState } from "react";

export function useJobs() {
  const [jobs, setJobs] = useState([]);

  const load = async () => {
    const data = await getJobs();
    setJobs(data);
  };

  useEffect(() => {
    load();
  }, []);

  return { jobs };
}
