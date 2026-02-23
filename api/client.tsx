import axios from "axios";

let urlBack = "http://192.168.1.26:8000/api"

// export const getCampaigns = async () => {
//     const res = await api.get("/entities");
//     console.log(res);

//     return res.data.data.filter((e: any) => e.type === 1); // campañas
// };

export const getCampaigns = async () => {
    const rpta = await axios.get(`${urlBack}/entities`)


    return rpta.data.data.filter((e: any) => e.type === 1)
}

export const createCampaign = async (data: any) => {
    console.log("MY DATAAA", data);

    const res = await axios.post(`${urlBack}/entities`, data);
    return res.data;
};

export const getProjects = async () => {
    const rpta = await axios.get(`${urlBack}/entities`)


    return rpta.data.data.filter((e: any) => e.type === 2)
}

export const createProject = async (data: any) => {
    const res = await axios.post(`${urlBack}/entities`, data);
    return res.data;
};

export const getActivities = async () => {
    const res = await axios.get(`${urlBack}/activities`);
    return res.data.data;
};

export const createActivity = async (data: any) => {
    const res = await axios.post(`${urlBack}/activities`, data);
    return res.data;
};

// HEADS
export const getRegisterHeads = async () => {
    const res = await axios.get(`${urlBack}/register-heads`);
    return res.data.data;
};

export const createRegisterHead = async (data: any) => {
    const res = await axios.post(`${urlBack}/register-heads`, data);
    return res.data;
};

// DETAILS
export const getRegisterDetails = async () => {
    const res = await axios.get(`${urlBack}/register-details`);
    return res.data.data;
};

export const createRegisterDetail = async (data: any) => {
    const res = await axios.post(`${urlBack}/register-details`, data);
    return res.data;
};

export const updateRegisterDetail = async (data: any, id: number) => {
    const res = await axios.put(`${urlBack}/register-details/${id}`, data);
    return res.data;
};

export const getUbications = async () => {
    const res = await axios.get(`${urlBack}/ubications`);
    return res.data.data;
};

export const getJobs = async () => {
    const res = await axios.get(`${urlBack}/jobs`);
    return res.data.data;
};

export const getEquipments = async () => {
    const res = await axios.get(`${urlBack}/equipments`);
    return res.data.data;
};

export const getProjectsAvailable = async (campania: number, equipo: number) => {
    const res = await axios.get(`${urlBack}/projects-available??campaign=${campania}&equipo=${equipo}`);
    return res.data.data;
};

type GetRHeadsParams = {
    project?: number;
    equipment?: number;
};

export const getRHeadsByProjectEq = async (params: GetRHeadsParams) => {
    const res = await axios.get(
        `${urlBack}/register-heads-by-project-eq`,
        { params }
    );
    return res.data.data;
};

export const getActByProjectEq = async (project: number, equipo: number) => {
    const res = await axios.get(`${urlBack}/activities-by-project?project=${project}&equipo=${equipo}`);
    return res.data.data;
};

export const getCurrentRegDetail = async (regHead: number, activity: number, ubication: number, job: number) => {
    const res = await axios.get(`${urlBack}/current-reg-detail?register_head=${regHead}&activity=${activity}&ubication=${ubication}&job=${job}`);
    return res.data
};



export const getPistolasTorque = async () => {
    const res = await axios.get(`${urlBack}/pistolas-torque`);
    return res.data.data;
};

export const postPistolasTorque = async (data: any) => {
    const res = await axios.post(`${urlBack}/pistolas-torque`, data);
    return res.data.data;
};

export const deletePistolaTorque = async (id: number) => {
    const res = await axios.delete(`${urlBack}/pistolas-torque/${id}`);
    return res.data.data;
}