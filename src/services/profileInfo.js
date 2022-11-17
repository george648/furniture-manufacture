import { API_URL } from "../constants";
import axios from "axios";

export const profileInfo = (token = localStorage.getItem('auth-token')) => axios.get(`${API_URL}/profile`, {
  headers: {
    Authorization: token
  }
})
