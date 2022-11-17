import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import omit from 'lodash.omit'
import { showToast } from 'src/store'
import CreateProductView from './CreateProductView'
import {
  getTechDataByProductId,
  createProduct,
  getProductCategories,
  getProductions,
  uploadImage,
  uploadDocuments,
  getProductMaterialCategories,
  getAllSemiReadyProducts,
  updateProduct,
  getAllProductsByProductType,
  deleteDocumentById,
  deleteImageById,
} from 'src/services'

const statusOptions = [
  { name: 'ВКЛЮЧЕНО', value: true },
  { name: 'НЕ ВКЛЮЧЕНО', value: false },
]

const CreateProductContainer = ({ setActiveKey, ...rest }) => {
  const dispatch = useDispatch()
  const [imagesData, setImagesData] = useState([])
  const [materials, setMaterials] = useState([])
  const [categoryOptions, setCategoryOptions] = useState([{ name: '' }])
  const [semiReadyProducts, setSemiReadyProducts] = useState([{ product_name: '', techData: [] }])
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
  const [allSemiReadyLoading, setAllSemiReadyLoading] = useState(false)
  const [mainLoading, setMainLoading] = useState(false)
  const [productionLoading, setProductionLoading] = useState(false)
  const [categoryLoading, setCategoryLoading] = useState(false)
  const [productsTypeLoading, setProductsTypeLoading] = useState(false)
  const [productsCategoriesLoading, setProductsCategoriesLoading] = useState(false)
  const [isEditLoading, setEditLoading] = useState(false)
  const [filesData, setFilesData] = useState([])
  const [formData, setFormData] = useState({
    main: {
      product_name: '',
      description: '',
      collection: '',
      category: '',
      is_included: statusOptions[0].value,
      color: '',
      model: '',
      net_cost: '',
      priority_price: '',
      production_id: productions[0]?.id,
      left_in_warehouse: '',
      regular_price: '',
      semi_ready_id: semiReadyProducts[0]?.id,
      type: 'ready'
    },
    techData: [{ value: '', label: '', id: '', parameters: [] }],
    images: [],
    documents: []
  })

  const checkedFormData = omit(formData.main, 'is_included', 'techData', 'category_id', 'images', 'documents', 'description', 'production_id', 'semi_ready_id')

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
    let techData = semiReadyProducts[0].techData

    let documentsToSet = []

    if (semiReadyProducts?.[0]?.documents?.length && !rest.history.location.state) setFilesData(semiReadyProducts[0].documents?.map(element => ({
      file: {
        ...element,
        preview: element.url
      }
    })))

    if (semiReadyProducts?.[0]?.documents?.length) {
      for (let doc of semiReadyProducts[0].documents) {
        const file = await fetch(doc.url, {
          mode: 'no-cors',
          headers: {
            Accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8'
          }
        })
        const blob = await file.blob()
        const f = new File([blob], doc.name)
        documentsToSet.push({ file: f, preview: doc.url })
      }
    }

    if (rest.history.location.state) techData = formData.techData

    setFormData({
      ...formData,
      techData,
      documents: documentsToSet,
      main: {
        ...formData.main,
        semi_ready_id: rest.history.location.state?.semi_ready_id || semiReadyProducts[0]?.id,
      },
    })
  }, [semiReadyProducts])

  useEffect(() => {
    setFormData({
      ...formData,
      main: {
        ...formData.main,
        production_id: productions[0]?.id
      }
    })
  }, [productions])

  useEffect(async () => {
    try {
      setProductsCategoriesLoading(true)
      let { data } = await getProductCategories()
      data = data.filter(({ status }) => status)

      if (data.length) setCategoryOptions(data)
    } catch ({ response: { data: { details } } }) {
      setProductsCategoriesLoading(false)
      dispatch(showToast({ message: details, error: true }))
    } finally {
      setProductsCategoriesLoading(false)
    }
  }, [])

  useEffect(async () => {
    try {
      setAllSemiReadyLoading(true)
      const { data } = await getAllSemiReadyProducts()
      setSemiReadyProducts(data)
    } catch ({ response: { data: { details } } }) {
      setAllSemiReadyLoading(false)
      dispatch(showToast({ message: details, error: true }))
    } finally {
      setAllSemiReadyLoading(false)
    }
  }, [])

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
        parameters: [{
          name: 'Название материала',
          value: '',
          parameter_id: uuidv4()
        }, ...element.parameters, { name: 'Итого на изделие', parameter_id: uuidv4(), value: '' }].map(el => ({
          ...el,
          id: uuidv4()
        }))
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
        setActiveKey(1)
        setEditLoading(true)

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
        setEditLoading(false)
      }
    }
  }, [rest.history.location.state])

  useEffect(() => {
    if (allSemiReadyLoading || productionLoading || productsTypeLoading || isEditLoading || categoryLoading || isLoading || productsCategoriesLoading) {
      setMainLoading(true)
    } else {
      setMainLoading(false)
    }
  }, [allSemiReadyLoading, productionLoading, isEditLoading, productsTypeLoading, categoryLoading, productsCategoriesLoading, isLoading])

  const handleDeleteTechMapDocument = async ({ target: { dataset: { product, doc } } }) => {
    try {
      const { data } = await deleteDocumentById(product, doc)
      setFilesData(data.map(element => ({ file: { ...element, preview: element.url } })))
    } catch ({ response: { data: { details } } }) {
      dispatch(showToast({ message: details, error: true }))
    }
  }

  const handleDeletePhoto = async ({ target: { dataset: { product, doc } } }) => {
    try {
      const { data } = await deleteImageById(product, doc)
      setImagesData(data.map(element => ({ file: { ...element, preview: element.url } })))
    } catch ({ response: { data: { details } } }) {
      dispatch(showToast({ message: details, error: true }))
    }
  }

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

  const uploadDocumentWhileEditMode = async (fileData) => {
    try {
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
      dispatch(showToast({ message: data.response, error: true }))
    }
  }

  const uploadImageWhileEditMode = async (fileData) => {
    try {
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
      dispatch(showToast({ message: data.response, error: true }))
    }
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

  const deleteDownLoadedFileHandler = (id) => {
    setFilesData(files => files.filter((file) => file.id !== id))
    setFormData({
      ...formData,
      documents: formData.documents.filter((image) => image.id !== id)
    })
  }

  const deleteDownLoadedImageHandler = (id) => {
    setImagesData(images => images.filter((image) => image.id !== id))
    setFormData({
      ...formData,
      images: formData.images.filter((image) => image.id !== id)
    })
  }

  const onChange = async (form, { target: { name, value } }) => {
    let techData = [...formData.techData]
    // let documentsToSet = [...formData.documents]
    let formattedDocs = []
    let currentSemiReadyTechMap

    if (name === 'semi_ready_id') {
      const [selectedItem] = semiReadyProducts.filter(product => product.id === value)
      let currentDocuments

      currentDocuments = selectedItem.documents
      currentSemiReadyTechMap = selectedItem.techData

      techData = [...currentSemiReadyTechMap]

      if (currentDocuments?.length) {
        setFilesData(currentDocuments.map(element => ({
          file: {
            ...element,
            preview: element.url,
            type: 'text/plain'
          }
        })))
        for (let doc of currentDocuments) {
          const file = await fetch(doc.url, {
            mode: 'no-cors',
            headers: {
              Accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8'
            }
          })
          const blob = await file.blob()
          const f = new File([blob], doc.name)
          formattedDocs.push({ file: f, preview: doc.url })
        }
      } else {
        formattedDocs = []
        setFilesData([])
      }
    }
    setFormData({
      ...formData,
      documents: name === 'semi_ready_id' ? formattedDocs : formData.documents,
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

  const addNewParamsRow = ({ target: { dataset: { id } } }) => {
    const techDataUpdatedWithParams = formData.techData.map(element => {
      if (element.id === id) {
        let filteredParams = [...element.parameters, element.parameters[0].map(el => ({
          ...el,
          value: ''
        }))].filter(parameter => parameter?.value !== 'name')
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
        dispatch(showToast({ message: 'Вы только что создали новый продукт!' }))
      } else {
        rest.history.push('/products')
        dispatch(showToast({ message: 'Вы только что изменили продукт!' }))
      }
    } catch (error) {
      console.log(error)
      // setLoading(false)
      // dispatch(showToast({ message: response, error: true }))
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

  const propsData = {
    onParameterChange,
    addNewParamsRow,
    printTechMap,
    addNewMaterial,
    shallowMaterialCategories,
    fullMaterialCategories,
    saveProductData,
    handleUploadFiles,
    filesData,
    deleteDownLoadedFileHandler,
    handleDeleteTechMapDocument,
    deleteDownLoadedImageHandler,
    onChange,
    formData,
    categoryOptions,
    productions,
    semiReadyProducts,
    imagesData,
    handleUploadImage,
    onTechCategoryChange,
    statusOptions,
    setActiveKey,
    materials,
    onMaterialChange,
    checkedFormData,
    uploadImageWhileEditMode,
    uploadDocumentWhileEditMode,
    handleDeletePhoto,
    mainLoading,
    ...rest
  }

  return (
    <>
      <CreateProductView { ...propsData } />
    </>
  )
}

export default CreateProductContainer
