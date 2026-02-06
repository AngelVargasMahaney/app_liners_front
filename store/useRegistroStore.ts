import { create } from "zustand";

type InfoData = {
    campana: string;
    proyecto: string;
    rhead: string;
    turno: string;
    actividad: string;
    equipo: string;
    equipoSelected: number | null;
    role:string
};

type RegistroState = {
    infoData: InfoData;
    setInfoData: (data: Partial<InfoData>) => void;
    reset: () => void;
};

const initialInfoData: InfoData = {
    campana: "",
    role:"user",
    rhead:"",
    proyecto: "",
    turno: "",
    actividad: "",
    equipo: "",
    equipoSelected: null,
};

export const useRegistroStore = create<RegistroState>((set) => ({
    infoData: initialInfoData,

    setInfoData: (data) =>
        set((state) => ({
            infoData: { ...state.infoData, ...data },
        })),

    reset: () => set({ infoData: initialInfoData }),
}));
