import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import CreateCategoryMaterialView from './CreateCategoryMaterialView'
import {
  getCategoryParameters,
  getMaterialCategories,
  getProductMaterialCategories,
  createNewMaterialCategory,
  updateMaterialCategory
} from 'src/services'
import { showToast } from 'src/store'

const CreateCategoryMaterialContainer = ({
  createCategoryMaterialFormData,
  onChangeCategoryMaterial,
  locateToDefaultProductPage,
  onCreateSelectCategoryMaterial,
  setParamsOptions,
  paramsOptions,
  setCreateCategoryMaterialFormData,
  ...rest
}) => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [categoryLoading, setCategoryLoading] = useState(false)
  const [defaultData, setDefaultData] = useState([])

  useEffect(() => {
    setCreateCategoryMaterialFormData({
      ...createCategoryMaterialFormData,
      name: '',
      status: true,
      parameters: []
    })
  }, [])

  const getParameters = async () => {
    try {
      setLoading(true)
      const { data } = await getCategoryParameters()
      const mappedOptions = data.map(parameter => ({
        value: parameter.id,
        label: parameter.name
      }))
      setParamsOptions(mappedOptions)
    } catch ({ response: { data: { details } } }) {
      setLoading(false)
      dispatch(showToast({ message: details, error: true }))
    } finally {
      setLoading(false)
    }
  }

  useEffect(getParameters, [])

  useEffect(async () => {
    try {
      setLoading(true)
      const { data } = await getMaterialCategories()
      setDefaultData(data)
    } catch ({ response: { data: { details } } }) {
      dispatch(showToast({ message: details, error: true }))
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(async () => {
    try {
      if (rest.history.location.state) {
        try {
          setCategoryLoading(true)
          const { data } = await getProductMaterialCategories()

          const editedCategory = rest.history.location.state

          const [currentCategory] = data.filter(({ id }) => id === editedCategory.id)

          setCreateCategoryMaterialFormData({
            ...createCategoryMaterialFormData,
            name: editedCategory.name,
            status: editedCategory.status,
            parameters: currentCategory.parameters.map(parameter => ({
              label: parameter.name,
              value: parameter.parameter_id,
            })),
          })
        } catch ({ response: { data: { details } } }) {
          dispatch(showToast({ message: details, error: true }))
          setCategoryLoading(false)
        } finally {
          setCategoryLoading(false)
        }
      }
    } finally {
      setCategoryLoading(false)
    }
  }, [rest.history.location.state])

  const createNewMaterialCategoryHandler = async () => {
    try {
      setLoading(true)
      let editedCategory
      if (rest.history.location.state) { editedCategory = rest.history.location.state }

      const { status } = rest.history.location.state ?
        await updateMaterialCategory({ name: createCategoryMaterialFormData.name, status: createCategoryMaterialFormData.status, id: editedCategory.id }) :
        await createNewMaterialCategory(createCategoryMaterialFormData)

      if (status === 201 || status === 200) {
        dispatch(showToast({ message: status === 200 ? 'Только что изменили категорию материала!' : 'Только что создали новую категорию материала!' }))
        status === 200 ? rest.history.push('/products/categories') : rest.history.push('/products')
      }
    } catch ({ response: { data: { details } } }) {
      dispatch(showToast({ message: details, error: true }))
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }

  const propsData = {
    paramsOptions,
    createNewMaterialCategoryHandler,
    createCategoryMaterialFormData,
    onChangeCategoryMaterial,
    onCreateSelectCategoryMaterial,
    locateToDefaultProductPage,
    loading,
    categoryLoading,
    setLoading,
    ...rest
  }

  return (
    <CreateCategoryMaterialView {...propsData} />
  )
}

export default CreateCategoryMaterialContainer
