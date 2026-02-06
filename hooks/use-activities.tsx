import { getActivities } from "@/api/client";
import { useEffect, useState } from "react";

export function useActivities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadActivities = async () => {
    setLoading(true);
    const data = await getActivities();
    setActivities(data);
    setLoading(false);
  };

  useEffect(() => {
    loadActivities();
  }, []);

  return {
    activities,
    loading,
    reload: loadActivities,
  };
}
