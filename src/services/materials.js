import axios from "axios"
import {API_URL} from "../constants"

export const getProductMaterialCategories = (token = localStorage.getItem('auth-token')) => axios.get(`${API_URL}/products/materials`, {
  headers: {
    Authorization: token
  }
})

export const createNewMaterialCategory = (body, token = localStorage.getItem('auth-token')) => axios.post(`${API_URL}/products/create-material-category`, body, {
  headers: {
    Authorization: token
  }
})

export const getMaterialCategories = (token = localStorage.getItem('auth-token')) => axios.get(`${API_URL}/products/create-material-category`, {
  headers: {
    Authorization: token
  }
})

export const createNewMaterial = (body, token = localStorage.getItem('auth-token')) => axios.post(`${API_URL}/materials/create`, body, {
  headers: {
    Authorization: token
  }
})

export const getMaterialById = (id, token = localStorage.getItem('auth-token')) => axios.get(`${API_URL}/materials/${id}`, {
  headers: {
    Authorization: token
  }
})

export const updateMaterial = (body, token = localStorage.getItem('auth-token')) => axios.put(`${API_URL}/products/materials`, body, {
  headers: {
    Authorization: token
  }
})

export const updateMaterialCategory = (body, token = localStorage.getItem('auth-token')) => axios.put(`${API_URL}/products/create-material-category`, body, {
  headers: {
    Authorization: token
  }
})
