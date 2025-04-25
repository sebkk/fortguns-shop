import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const baseAPI = axios.create({ baseURL: BASE_URL });

export default baseAPI;
