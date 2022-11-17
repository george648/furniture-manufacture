import { API_URL } from "../constants";
import axios from "axios";

export const logInUser = (body) => axios.post(`${API_URL}/login`, body)
