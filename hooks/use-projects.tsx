import { getProjects } from "@/api/client";
import { useEffect, useState } from "react";

export function useProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadProjects = async () => {
    setLoading(true);
    const data = await getProjects();
    setProjects(data);
    setLoading(false);
  };

  useEffect(() => {
    loadProjects();
  }, []);

  return {
    projects,
    loading,
    reload: loadProjects,
  };
}
