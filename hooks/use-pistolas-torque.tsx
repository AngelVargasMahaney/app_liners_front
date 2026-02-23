import { getPistolasTorque } from "@/api/client";
import { useEffect, useState } from "react";

export const usePistolasTorque = () => {

    const [pistolas, setPistolas] = useState([]);
    const [loading, setLoading] = useState(false);

    const load = async () => {
        setLoading(true);
        const data = await getPistolasTorque();
        setPistolas(data);
        setLoading(false);
    };

    useEffect(() => {
        load();
    }, []);

    return {
        pistolas,
        loading,
        reload: load
    };
};
