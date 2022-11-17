
import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import omit from 'lodash.omit'
import { showToast } from 'src/store'
import {
  createProduct,
  getProductCategories,
  getProductions,
  uploadImage,
  getProductMaterialCategories,
  getTechDataByProductId,
  uploadDocuments,
  updateProduct,
  getAllProductsByProductType,
  deleteDocumentById,
  deleteImageById,
} from 'src/services'
import SemiReadyView from './SemiReadyView'

const inputData = [
  { name: 'product_name', label: 'semi_ready_name', id: uuidv4() },
  { name: 'description', label: 'description', id: uuidv4(), isTextArea: true },
  { name: 'model', label: 'model', id: uuidv4() },
  { name: 'collection', label: 'collection', id: uuidv4() },
  { name: 'category', label: 'category', id: uuidv4(), isFormSelect: true, category: true },
  { name: 'regular_price', label: 'price_1', id: uuidv4() },
  { name: 'priority_price', label: 'price_2', id: uuidv4() },
  { name: 'left_in_warehouse', label: 'left_in_warehouse', id: uuidv4() },
  { name: 'net_cost', label: 'net_cost', id: uuidv4() },
  { name: 'is_included', label: 'is_included', id: uuidv4(), isFormSelect: true, status: true },
]

const statusOptions = [
  { name: 'ВКЛЮЧЕНО', value: true },
  { name: 'НЕ ВКЛЮЧЕНО', value: false },
]

const SemiReadyContainer = ({ setActiveKey, ...rest }) => {
  const dispatch = useDispatch()
  const [imagesData, setImagesData] = useState([])
  const [materials, setMaterials] = useState([])
  const [categoryOptions, setCategoryOptions] = useState([{ name: '' }])
  const [shallowMaterialCategories, setShallowMaterialCategories] = useState([
    { value: '', label: '', id: '' }
  ])
  const [fullMaterialCategories, setFullMaterialCategories] = useState([
    {
      id: '', parameters: []
    }
  ])
  const [productions, setProductions] = useState([])
  const [isLoading, setLoading] = useState(false)
  const [productionLoading, setProductionLoading] = useState(false)
  const [productsByTypeLoading, setProductsTypeLoading] = useState(false)
  const [mainLoading, setMainLoading] = useState(false)
  const [isCategoryLoading, setCategoryLoading] = useState(false)
  const [isSemiReadyLoading, setIsSemiReadyLoading] = useState(false)
  const [filesData, setFilesData] = useState([])
  const [formData, setFormData] = useState({
    main: {
      product_name: '',
      description: '',
      collection: '',
      category: categoryOptions[0]?.name,
      is_included: statusOptions[0].value,
      model: '',
      net_cost: '',
      regular_price: '',
      priority_price: '',
      left_in_warehouse: '',
      type: 'semi_ready'
    },
    techData: [fullMaterialCategories?.[0]],
    images: [],
    documents: []
  })

  const checkedFormData = omit(formData.main, 'description', 'category', 'semi_ready_id', 'color', 'production_id', 'is_included', 'techData', 'category_id', 'images', 'documents')

  useEffect(() => {
    if (fullMaterialCategories?.[0].parameters.length && !rest.history.location.state) {
      setFormData({
        ...formData,
        techData: formData.techData.map(el => {
          return {
            ...el,
            checkedCategory: fullMaterialCategories?.[0].id,
            parameters: [fullMaterialCategories?.[0].parameters],
          }})
      })
    }
  }, [fullMaterialCategories])

  useEffect(() => {
    setFormData({
      ...formData,
      main: {
        ...formData.main,
        category: categoryOptions[0].name
      }
    })
  }, [categoryOptions])

  useEffect(async () => {
    try {
      setLoading(true)
      let { data } = await getProductCategories()
      data = data.filter(({ status }) => status)
      setCategoryOptions(data)
    } catch ({ response: { data: { details } } }) {
      setLoading(false)
      dispatch(showToast({ message: details, error: true }))
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if(isCategoryLoading || isSemiReadyLoading || isLoading || productionLoading || productsByTypeLoading) {
      setMainLoading(true)
    } else {
      setMainLoading(false)
    }
  }, [isCategoryLoading,isSemiReadyLoading, isLoading, productionLoading, productsByTypeLoading])

  useEffect(async () => {
    try {
      setProductionLoading(true)
      const { data } = await getProductions()
      setProductions(data)
    } catch ({ response: { data: { details } } }) {
      setProductionLoading(false)
      dispatch(showToast({ message: details, error: true }))
    } finally {
      setProductionLoading(false)
    }
  }, [])

  useEffect(async () => {
    try {
      setProductsTypeLoading(true)
      const { data } = await getAllProductsByProductType('material')
      setMaterials(data)
    } catch ({ response: { data: { details } } }) {
      setProductsTypeLoading(false)
      dispatch(showToast({ message: details, error: true }))
    } finally {
      setProductsTypeLoading(false)
    }
  }, [])

  useEffect(async () => {
    try {
      setCategoryLoading(true)
      const { data } = await getProductMaterialCategories()
      const pureMaterialCategories = data
        .filter(({ status }) => status)
        .map(({ id, name }) => ({ value: id, label: name, id: uuidv4() }))
      setFullMaterialCategories(data.map(element => ({
        ...element,
        parameters: [{ name: 'Название материала', value: '', parameter_id: uuidv4() }, ...element.parameters, { name: 'Итого на изделие', parameter_id: uuidv4(), value: '' }].map(el => ({ ...el, id: uuidv4() }))
      })))
      setShallowMaterialCategories(pureMaterialCategories)
    } catch ({ response: { data: { details } } }) {
      setCategoryLoading(false)
      dispatch(showToast({ message: details, error: true }))
    } finally {
      setCategoryLoading(false)
    }
  }, [])

  useEffect(async () => {
    if (rest.history.location.state) {
      try {
        setIsSemiReadyLoading(true)
        setActiveKey(1)

        const data = rest.history.location.state

        const { data: techData } = await getTechDataByProductId(data.id)
        let techDataToSet = data.techData
        let documentsToSet = data.documents
        if (techData.length) techDataToSet = techData
        if (data.documents.length) documentsToSet = data.documents

        setImagesData(data.images.map(element => ({ file: { ...element, preview: element.url } })))
        setFilesData(data.documents.map(element => ({ file: { ...element, preview: element.url } })))
        setFormData({
          ...formData,
          main: {
            ...data
          },
          techData: techDataToSet,
          documents: documentsToSet
        })
      } finally {
        setIsSemiReadyLoading(false)
      }
    }
  }, [rest.history.location.state])

  const handleUploadImage = (fileData) => {
    const uploadedImage = {
      file: fileData,
      id: uuidv4(),
    }
    const updatedDocuments = [...imagesData, uploadedImage]
    setImagesData(updatedDocuments)
    setFormData({
      ...formData,
      images: [...formData.images, uploadedImage]
    })
  }

  const handleUploadFiles = (fileData) => {
    const uploadedFile = {
      file: fileData,
      id: uuidv4(),
    }
    const updatedDocuments = [...filesData, uploadedFile]
    setFilesData(updatedDocuments)

    setFormData({
      ...formData,
      documents: [...formData.documents, uploadedFile]
    })
  }

  const deleteDownLoadedImageHandler = (id) => {
    setImagesData(images => images.filter((image) => image.id !== id))
    setFormData({
      ...formData,
      images: formData.images.filter((image) => image.id !== id)
    })
  }

  const deleteDownLoadedFileHandler = (id) => {
    setFilesData(files => files.filter((file) => file.id !== id))
    setFormData({
      ...formData,
      documents: formData.documents.filter((image) => image.id !== id)
    })
  }

  const handleDeleteTechMapDocument = async ({ target: { dataset: { product, doc } } }) => {
    try {
      setLoading(true)
      const { data } = await deleteDocumentById(product, doc)
      setFilesData(data.map(element => ({ file: { ...element, preview: element.url } })))
    } catch ({ response: { data: { details } } }) {
      setLoading(false)
      dispatch(showToast({ message: details, error: true }))
    }
    finally {
      setLoading(false)
    }
  }

  const handleDeletePhoto = async ({ target: { dataset: { product, doc } } }) => {
    try {
      setLoading(true)
      const { data } = await deleteImageById(product, doc)
      setImagesData(data.map(element => ({ file: { ...element, preview: element.url } })))
    } catch ({ response: { data: { details } } }) {
      setLoading(false)
      dispatch(showToast({ message: details, error: true }))
    } finally {
      setLoading(false)
    }
  }

  const onChange = (form, { target: { name, value } }) => {
    let techData = [...formData.techData]
    if (name === 'semi_ready_id') {
      const [selectedItem] = semiReadyProducts.filter(product => product.id === value)
      techData = selectedItem.techData
    }
    setFormData({
      ...formData,
      techData,
      [form]: {
        ...formData[form],
        [name]: value === 'false' ? false : value
      },
    })
  }

  const addNewMaterial = () => {
    const newElement = {
      id: uuidv4(),
      categories: shallowMaterialCategories,
      checkedCategory: fullMaterialCategories?.[0].id,
      parameters: [fullMaterialCategories?.[0].parameters]
    }

    const newTechData = [...formData.techData, newElement]
    setFormData({
      ...formData,
      techData: newTechData
    })
  }

  const onMaterialChange = ({ target }) => {
    const { options, name, value } = target;
    const selected = options[target.selectedIndex];
    const { form, row } = selected.dataset;

    const newTechFormData = formData.techData.map(element => {
      if (element.id === form) {
        return {
          ...element,
          parameters: element.parameters.map((parameterRow, i) => {
            if (i == row) {
              return parameterRow.map((param) => {
                if (param.parameter_id === name) {
                  return {
                    ...param,
                    value
                  }
                }
                return param
              })
            }
            return parameterRow
          })
        }
      }
      return element
    })

    setFormData({
      ...formData,
      techData: newTechFormData
    })
  }

  const addNewParamsRow = ({ target: { dataset: { id } } }) => {
    const techDataUpdatedWithParams = formData.techData.map(element => {
      if (element.id === id) {
        let filteredParams = [...element.parameters, element.parameters[0].map(el => ({ ...el, value: '' }))].filter(parameter => parameter?.value !== 'name')
        return {
          ...element,
          parameters: filteredParams
        }
      }
      return element
    })

    setFormData({
      ...formData,
      techData: techDataUpdatedWithParams
    })
  }

  const onParameterChange = ({ target: { name, value, dataset: { form, row } } }) => {
    const newTechFormData = formData.techData.map(element => {
      if (element.id === form) {
        return {
          ...element,
          parameters: element.parameters.map((parameterRow, i) => {
            if (i == row) {
              return parameterRow.map((param) => {
                if (param.parameter_id === name) {
                  return {
                    ...param,
                    value
                  }
                }
                return param
              })
            }
            return parameterRow
          })
        }
      }
      return element
    })

    setFormData({
      ...formData,
      techData: newTechFormData
    })
  }

  const onTechCategoryChange = ({ target }) => {
    const { options } = target;
    const selected = options[target.selectedIndex];
    const { id } = selected.dataset;

    const newTechDataState = formData.techData.map(element => {
      if (element.id === id) {
        return {
          ...element,
          checkedCategory: target.value,
          parameters: [fullMaterialCategories.filter(element => element.id === target.value)[0].parameters]
        }
      }
      return element
    })

    setFormData({
      ...formData,
      techData: newTechDataState
    })
  }

  const saveProductData = async () => {
    try {
      setLoading(true)
      const fd = new FormData()
      const fdocs = new FormData()

      if (!rest.history.location.state) {
        formData.images.forEach((data) => {
          fd.append('file', data.file, data.file.name)
        })

        formData.documents.forEach((data) => {
          fdocs.append('file', data.file, data.file.name)
        })
      }

      const { data, status } = rest.history.location.state
        ? await updateProduct({ techData: formData.techData, main: formData.main })
        : await createProduct({ main: formData.main, techData: formData.techData })
      if (status === 200 && data.id) {
        if (formData.images.length) {
          await uploadImage(data.id, fd)
        }
        if (formData.documents.length) {
          await uploadDocuments(data.id, fdocs)
        }
        rest.history.push('/products')
        dispatch(showToast({ message: 'Вы только что создали новый полуфабрикат!' }))
      } else {
        rest.history.push('/products')
        dispatch(showToast({ message: 'Вы только что изменили полуфабрикат!' }))
      }
    } catch ({ response }) {
      setLoading(false)
      dispatch(showToast({ message: response, error: true }))
    } finally {
      setLoading(false)
    }
  }

  const printTechMap = () => {
    try {
      document.execCommand('print', false, null)
    } catch {
      window.print()
    }
  }

  const uploadImageWhileEditMode = async (fileData) => {
    try {
      setLoading(true)

      const uploadedImage = {
        file: fileData,
        id: uuidv4(),
      }
      const updatedDocuments = [...imagesData, uploadedImage]
      const fd = new FormData()

      fd.append('file', fileData, fileData.name)

      const { status } = await uploadImage(rest.history.location.state.id, fd)
      if (status === 200) {
        setImagesData(updatedDocuments)
        setFormData({
          ...formData,
          images: [...formData.images, uploadedImage]
        })
      }
    } catch ({ response: { data: { details } } }) {
      setLoading(false)
      dispatch(showToast({ message: data.response, error: true }))
    }
    finally {
      setLoading(false)
    }
  }

  const uploadDocumentWhileEditMode = async (fileData) => {
    try {
      setLoading(true)

      const uploadedFile = {
        file: fileData,
        id: uuidv4(),
      }
      const updatedDocuments = [...filesData, uploadedFile]
      const fd = new FormData()

      fd.append('file', fileData, fileData.name)

      const { status } = await uploadDocuments(rest.history.location.state.id, fd)
      if (status === 200) {
        setFilesData(updatedDocuments)
        setFormData({
          ...formData,
          documents: [...formData.documents, uploadedFile]
        })
      }
    } catch ({ response: { data: { details } } }) {
      setLoading(false)
      dispatch(showToast({ message: data.response, error: true }))
    }
    finally {
      setLoading(false)
    }
  }

  const propsData = {
    onParameterChange,
    addNewParamsRow,
    addNewMaterial,
    shallowMaterialCategories,
    fullMaterialCategories,
    saveProductData,
    deleteDownLoadedFileHandler,
    handleDeleteTechMapDocument,
    handleUploadFiles,
    filesData,
    deleteDownLoadedImageHandler,
    onChange,
    inputData,
    formData,
    categoryOptions,
    productions,
    isSemiReadyLoading,
    imagesData,
    onMaterialChange,
    materials,
    handleUploadImage,
    onTechCategoryChange,
    statusOptions,
    setActiveKey,
    isLoading,
    checkedFormData,
    printTechMap,
    isCategoryLoading,
    uploadImageWhileEditMode,
    handleDeletePhoto,
    uploadDocumentWhileEditMode,
    productionLoading,
    productsByTypeLoading,
    mainLoading,
    ...rest
  }

  return (
    <>
      <SemiReadyView {...propsData} />
    </>
  )
}

export default SemiReadyContainer
