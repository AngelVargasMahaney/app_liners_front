import { getCampaigns } from "@/api/client";
import { useEffect, useState } from "react";

export function useCampaigns() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadCampaigns = async () => {
    setLoading(true);
    const data = await getCampaigns();
    setCampaigns(data);
    setLoading(false);
  };

  useEffect(() => {
    loadCampaigns();
  }, []);

  return {
    campaigns,
    loading,
    reload: loadCampaigns,
  };
}
