import { getRegisterDetails } from "@/api/client";
import { useEffect, useState } from "react";

export function useDetails() {
  const [details, setDetails] = useState([]);

  const load = async () => {
    const data = await getRegisterDetails();
    setDetails(data);
  };

  useEffect(() => {
    load();
  }, []);

  return { details, reload: load };
}
