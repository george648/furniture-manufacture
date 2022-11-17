import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {logInUser} from 'src/services'
import {login, showToast} from 'src/store'
import LoginView from './LoginView'

const LoginContainer = ({ history }) => {
  const dispatch = useDispatch()

  const [formData, setFormData] = useState({})
  const [isLoading, setLoading] = useState(false)

  const logInHandler = async () => {
    try {
      setLoading(true)
      const {data} = await logInUser(formData)

      if (data?.token) {
        setLoading(false)
        dispatch(login(data?.token))
        history.push('/main')
      }
    } catch ({ response: { data: {details}} }) {
      setLoading(false)
      dispatch(showToast({message: details, error: true }))
    } finally {
      setLoading(false)
    }
  }

  const onChange = ({ target: { name, value } }) => {
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const propsData = {
    logInHandler,
    formData,
    onChange,
    isLoading
  }

  return (
    <>
      <LoginView {...propsData} />
    </>
  )
}

export default LoginContainer
