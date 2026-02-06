import axios from "axios";

export const axiosInstance = axios.create({
    //esta variable me ayuda a brindarle el header authorization token a todas las consultas por medio de su interceptors, 
    // creo que si le hacía al axios de frente tendría que hacer para cada uno de los servicios, por eso mejor lo creo aquí
})

axiosInstance.interceptors.request.use((config) => {
    // const token = localStorage.getItem('token')
    // config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
})


axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/';
        }
        return Promise.reject(error); 
    }
);
