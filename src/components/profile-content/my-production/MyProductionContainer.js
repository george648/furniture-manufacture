import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getProductions, createProduction, deleteProduction } from 'src/services'
import MyProductionView from './MyProductionView'
import { showToast } from 'src/store'

const MyProduction = () => {
  const dispatch = useDispatch()
  const [visible, setVisible] = useState(false)
  const [productions, setProductions] = useState([])
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({ name: '' })

  const onChange = ({ target: { name, value } }) => {
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  useEffect(async () => {
    try {
      setLoading(true)
      const { data } = await getProductions()
      setProductions(data)
    } catch ({ response: { data: { details } } }) {
      setLoading(false)
      dispatch(showToast({ message: details, error: true }))
    } finally {
      setLoading(false)
    }
  }, [])

  const createProductionHandler = async () => {
    try {
      setLoading(true)
      const {data} = await createProduction(formData)
      setProductions(data)
      if (data?.length) {
        setLoading(false)
        formData.name = ''
        dispatch(showToast({ message: 'Вы только что создали новое производство!' }))  
      }
    } catch ({ response: { data: { details } } }) {
      setLoading(false)
      dispatch(showToast({ message: details, error: true }))
    } finally {
      setLoading(false)
      setVisible(false)
    }
  }

  const onDeleteProduction = async ({ target: { dataset: { id } } }) => {
    try {
      setLoading(true)
      const {data, status} = await deleteProduction(id)
      if(status === 200) {
        dispatch(showToast({ message: 'Вы только что удалили производство!' }))
        setProductions(data)
      }
    } catch({ response: { data: { details } } }) {
      setLoading(false)
      dispatch(showToast({ message: details, error: true }))
    } finally {
      setLoading(false)
    }
  }

  const propsData = {
    loading,
    createProductionHandler,
    visible,
    setVisible,
    productions,
    formData,
    onChange,
    onDeleteProduction
  }

  return (
    <>
      <MyProductionView {...propsData} />
    </>
  )
}

export default MyProduction
