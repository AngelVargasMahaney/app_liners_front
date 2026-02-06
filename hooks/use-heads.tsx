import { getRHeadsByProject } from "@/api/client";
import { useEffect, useState } from "react";

export function useRegisterHeads(projectId?: number) {
  const [heads, setHeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    if (!projectId) {
      setHeads([]);
      return;
    }

    try {
      setLoading(true);
      const res = await getRHeadsByProject(projectId)
      
      setHeads(res);
    } catch (e) {
      console.log(e);
      setHeads([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [projectId]);

  return { heads, loading, reload: load };
}
