import { getEquipments } from "@/api/client";
import { useEffect, useState } from "react";

export function useEquipments() {
    const [equipments, setEquipments] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadEquipments = async () => {
        setLoading(true);
        const data = await getEquipments();
        setEquipments(data);
        setLoading(false);
    };

    useEffect(() => {
        loadEquipments();
    }, []);

    return {
        equipments,
        loading,
        reload: loadEquipments,
    };
}
