import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useDispatch } from 'react-redux'
import CreateMaterialView from './CreateMaterialView'
import { getProductMaterialCategories, createNewMaterial, getMaterialById, updateMaterial } from 'src/services'
import { showToast } from 'src/store'
import omit from 'lodash.omit'

const options = [
  { id: uuidv4(), name: 'ВКЛЮЧЕНО', value: true },
  { id: uuidv4(), name: 'НЕ ВКЛЮЧЕНО', value: false },
]

const CreateMaterialContainer = ({ locateToDefaultProductPage, ...rest }) => {
  const dispatch = useDispatch()
  const [paramsOptions, setParamsOptions] = useState([])
  const [loading, setLoading] = useState(false)
  const [installedParameters, installParameters] = useState(paramsOptions[0]?.parameters || [])
  const [formData, setFormData] = useState({
    defaultParams: {
      product_name: '',
      model: '',
      regular_price: '',
      net_cost: '',
      left_in_warehouse: '',
      is_included: options[0].value
    },
    category_id: paramsOptions[0]?.id,
    parameters: [],
  })

  const checkedFormData = omit(formData.defaultParams, 'is_included')

  useEffect(() => {
    if (!rest.history.location.state) {
      setFormData({
        ...formData,
        parameters: paramsOptions[0]?.parameters,
        category_id: paramsOptions[0]?.id,
      })
    }
  }, [paramsOptions])

  useEffect(async () => {
    if (!rest.history.location.state) {
      try {
        setLoading(true)
        let { data } = await getProductMaterialCategories()
        data = data.filter(({status}) => status)
        setParamsOptions(data)
      } catch ({ response }) {
        setLoading(false)
        dispatch(showToast({ message: details, error: true }))
      } finally {
        setLoading(false)
      }
    }
  }, [])

  useEffect(async () => {
    if (rest.history.location.state) {
      try {
        setLoading(true)

        const data = rest.history.location.state
        const { data: materialCategories } = await getProductMaterialCategories()

        const { data: materialData } = await getMaterialById(data.id)
        const { product_name, model, regular_price, net_cost, left_in_warehouse, is_included } = materialData
        const defaultParams = {
          product_name,
          model,
          regular_price,
          net_cost,
          left_in_warehouse,
          is_included
        }

        const checkedCategoryParameters = materialCategories.filter(element => element.id === materialData.category_id)
        setFormData({
          ...formData,
          defaultParams,
          parameters: materialData.parameters.map(parameter => ({ ...parameter, value: parameter.val })),
          category_id: materialData.category_id,
        })
        setParamsOptions(checkedCategoryParameters)
      } finally {
        setLoading(false)
      }
    }
  }, [rest.history.location.state])

  const onCreateMaterialHandler = async () => {
    try {
      setLoading(true)

      const { status } = rest.history.location.state
        ? await updateMaterial({
          id: rest.history.location.state.id,
          category_id: formData.category_id,
          defaultParams: formData.defaultParams,
          parameters: formData.parameters
        })
        : await createNewMaterial(formData)

      if (status === 200 || 201) {
        dispatch(showToast({ message: rest.history.location.state ? 'Вы только что изменили материал!' : 'Вы только что создали новый материал!' }))
        rest.history.push('/products')
      }
    } catch ({ response }) {
      setLoading(false)
      dispatch(showToast({ message: response.data.message, error: true }))
    } finally {
      setLoading(false)
    }
  }

  const onDefaultInputChange = ({ target: { value, name } }) => {
    setFormData({
      ...formData,
      defaultParams: {
        ...formData.defaultParams,
        [name]: value
      }
    })
  }

  const onStatusChange = ({ target: { value } }) => {
    setFormData({
      ...formData,
      defaultParams: {
        ...formData.defaultParams,
        is_included: value === 'false' ? false : Boolean(value)
      }
    })
  }

  const onCategoryChange = ({ target: { value } }) => {
    const [selected] = paramsOptions.filter(element => element.id === value)
    installParameters(selected.parameters)
    setFormData({
      ...formData,
      parameters: selected.parameters,
      category_id: value
    })
  }

  const onChange = ({ target: { value, name, dataset: { id } } }) => {
    const newFormParameters = formData.parameters
      .map(element => {
        if (element.parameter_id === id) {
          return {
            ...element,
            value
          }
        }
        return element
      })
    if (name) {
      setFormData({
        ...formData,
        is_included: value
      })
    } else {
      setFormData({
        ...formData,
        parameters: newFormParameters
      })
    }
  }

  const propsData = {
    installedParameters,
    onCategoryChange,
    onChange,
    formData,
    paramsOptions,
    locateToDefaultProductPage,
    loading,
    onDefaultInputChange,
    onCreateMaterialHandler,
    statusOptions: options,
    onStatusChange,
    checkedFormData,
  }

  return (
    <CreateMaterialView { ...propsData } />
  )
}

export default CreateMaterialContainer
