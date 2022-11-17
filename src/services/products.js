import { API_URL } from '../constants'
import axios from 'axios'

export const getProducts = (token = localStorage.getItem('auth-token')) => axios.get(`${API_URL}/products`, {
  headers: {
    Authorization: token
  }
})

export const getProductions = (token = localStorage.getItem('auth-token')) => axios.get(`${API_URL}/productions`, {
  headers: {
    Authorization: token
  }
})

export const createProduction = async (body, token = localStorage.getItem('auth-token')) => axios.post(`${API_URL}/productions`, body, {
  headers: {
    Authorization: token
  }
})

export const deleteProduction = (id, token = localStorage.getItem('auth-token')) => axios.delete(`${API_URL}/productions/${id}`, {
  headers: {
    Authorization: token
  }
})

export const createProduct = async (body, token = localStorage.getItem('auth-token')) => axios.post(`${API_URL}/products`, body, {
  headers: {
    Authorization: token
  }
})

export const uploadImage = async (id, body, token = localStorage.getItem('auth-token')) => {
  try {
    let config = {
      method: 'POST',
      cache: 'no-store',
      headers: {
        Authorization: token,
        pragma: 'no-cache',
        'Accept': '*/*',
        product_id: id,
      },
      body
    }

    const response = await fetch(`${API_URL}/documents/upload`, config)

    return response
  } catch(e) {
    throw e
  }
}

export const getProductCategories = (token = localStorage.getItem('auth-token')) => axios.get(`${API_URL}/product-categories`, {
  headers: {
    Authorization: token
  }
})

export const createProductCategory = (body, token = localStorage.getItem('auth-token')) => axios.post(`${API_URL}/product-categories`, body, {
  headers: {
    Authorization: token
  }
})

export const getCategoryParameters = (token = localStorage.getItem('auth-token')) => axios.get(`${API_URL}/parameters`, {
  headers: {
    Authorization: token
  }
})

export const createNewCategoryParameters = (body, token = localStorage.getItem('auth-token')) => axios.post(`${API_URL}/parameters`, body, {
  headers: {
    Authorization: token
  }
})

export const getTechDataByProductId = (id, token = localStorage.getItem('auth-token')) => axios.get(`${API_URL}/product/tech-data/${id}`, {
  headers: {
    Authorization: token
  }
})

export const getAllSemiReadyProducts = (token = localStorage.getItem('auth-token')) => axios.get(`${API_URL}/semi-ready`, {
  headers: {
    Authorization: token
  }
})

export const updateProduct = (body, token = localStorage.getItem('auth-token')) => axios.put(`${API_URL}/products`, body, {
  headers: {
    Authorization: token
  }
})

export const updateProductCategory = (body, token = localStorage.getItem('auth-token')) => axios.put(`${API_URL}/product-categories`, body, {
  headers: {
    Authorization: token
  }
})

export const getAllProductsByProductType = (type, token = localStorage.getItem('auth-token')) => axios.get(`${API_URL}/product/${type}`, {
  headers: {
    Authorization: token
  }
})

export const uploadDocuments = async (id, body, token = localStorage.getItem('auth-token')) => {
  try {
    let config = {
      method: 'POST',
      cache: 'no-store',
      headers: {
        Authorization: token,
        pragma: 'no-cache',
        'Accept': '*/*',
        product_id: id,
      },
      body
    }

    const response = await fetch(`${API_URL}/product/document`, config)

    return response
  } catch(e) {
    throw e
  }
}

export const deleteDocumentById = async (product, document, token = localStorage.getItem('auth-token')) => axios.delete(`${API_URL}/documents/${product}/${document}`, {
  headers: {
    Authorization: token
  }
})

export const deleteImageById = async (product, image, token = localStorage.getItem('auth-token')) => axios.delete(`${API_URL}/images/${product}/${image}`, {
  headers: {
    Authorization: token
  }
})
