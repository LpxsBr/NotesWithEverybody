import axios from "axios";
import env from "react-dotenv";

const useApi = axios.create({baseURL: env.API_HOST});

export default useApi;