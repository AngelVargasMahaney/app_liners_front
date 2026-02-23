import { getRHeadsByProjectEq } from "@/api/client";
import { useEffect, useState } from "react";

export function useRegisterHeads(projectId?: number) {
  const [heads, setHeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const load = async (id = projectId) => {
    if (!id) {
      setHeads([]);
      return;
    }

    try {
      setLoading(true);
      const res = await getRHeadsByProjectEq({
        project:projectId
      });
      setHeads(res);
    } catch (e) {
      console.log(e);
      setHeads([]);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    load(projectId);
  }, [projectId]);

  return { heads, loading, reload: load };
}
