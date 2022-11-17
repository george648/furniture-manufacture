import { createStore } from 'redux'

const initialState = {
  sidebarShow: false,
  user: {
    firstName: '',
    lastName: '',
    type: '',
  },
  isLoggedIn: !!localStorage.getItem('auth-token'),
  token: '',
  toast: 0,
  isModalShown: false,
}

const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case 'set':
      return { ...state, ...rest }
    case 'SET_USER':
      return { ...state, user: rest.user }
    case 'SHOW_TOAST':
      return { ...state, toast: rest.toast }
    case 'LOGIN_SUCCESS':
      localStorage.setItem('auth-token', rest.token)
      return { ...state, isLoggedIn: true, token: rest.token }
    case 'LOGOUT':
      localStorage.removeItem('auth-token')
      return { ...state, user: {}, isLoggedIn: false, token: '' }
    case 'SHOW_MODAL':
      return { ...state, isModalShown: rest.isShown }
    default:
      return state
  }
}

export const register = (token) => ({ type: 'LOGIN_SUCCESS', token })
export const logout = () => ({ type: 'LOGOUT' })
export const login = (token) => ({ type: 'LOGIN_SUCCESS', token })
export const setUser = (user) => ({ type: 'SET_USER', user })
export const showToast = (toast) => ({ type: 'SHOW_TOAST', toast })
export const showModal = (isShown) => ({ type: 'SHOW_MODAL', isShown })

const store = createStore(changeState)
export default store
