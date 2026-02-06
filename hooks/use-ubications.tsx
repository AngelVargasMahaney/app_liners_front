import { getUbications } from "@/api/client";
import { useEffect, useState } from "react";

export function useUbications() {
  const [ubications, setUbications] = useState([]);

  const load = async () => {
    const data = await getUbications();
    setUbications(data);
  };

  useEffect(() => {
    load();
  }, []);

  return { ubications };
}
