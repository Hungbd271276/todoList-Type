import axios  from "axios";

 export const axiosClient = axios.create({
     baseURL: 'https://618b2b833013680017343f5f.mockapi.io/api/v1',
     headers: {
        'Content-Type': 'application/json'
     }
 })