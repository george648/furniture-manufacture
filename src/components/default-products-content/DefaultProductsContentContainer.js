import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import DefaultProductsContentView from './DefaultProductsContentView'
import { getProducts } from 'src/services'
import { showToast } from 'src/store'

const DefaultProductsContentContainer = ({
  history,
  locateToCreateProductPage,
  moveToCreateSemiReadyPage,
  locateToCreateCategoryMaterialPage,
  locateToCreateProductCategoryPage,
  locateToCreateMaterialPage,
  onRadioChange,
  type: productType,
  ...rest
}) => {
  const dispatch = useDispatch()
  const [isLoading, setLoading] = useState(false)
  const [products, setAllProducts] = useState([])
  const [data, setData] = useState([])
  const [reverseProducts, setReverseProducts] = useState(true)
  const [filteredFormData, setFilteredFormData] = useState({
    model: '',
    collection: '',
    category: '',
  })
  const onFilterChange = ({ target: { name, value } }) => {
    setFilteredFormData({
      ...filteredFormData,
      [name]: value
    })
  }

  useEffect(async () => {
    try {
      setLoading(true)
      const { data } = await getProducts()
      const filteredProducts = data
        .filter(({ type }) => type === productType)
        .sort((a, b) => a.product_name.localeCompare(b.product_name))
      setData(data)
      setAllProducts(filteredProducts)
      setReverseProducts(true)
    } catch ({ response: { data: { details } } }) {
      setLoading(false)
      dispatch(showToast({ message: details, error: true }))
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const filteredProducts = data
      .filter(({ type }) => type === productType)
      .sort((a, b) => a.product_name.localeCompare(b.product_name))

    setAllProducts(filteredProducts)
    setReverseProducts(true)
  }, [productType])

  const searchProducts = () => {
    let result = [...products]

    Object.keys(filteredFormData).forEach(key => {
      if (filteredFormData[key]) {
        result = result.filter(product => product[key].toLowerCase().trim().includes(filteredFormData[key].toLowerCase().trim()))
      }
    })

    setAllProducts(result)
  }

  const filterProductsByStatus = ({ target: { dataset: { status } } }) => {
    if (status === 'all') {
      const filteredProducts = data
        .filter(({ type }) => type === productType)
        .sort((a, b) => a.product_name.localeCompare(b.product_name))
      setAllProducts(filteredProducts)
    } else if (status === 'included') {
      const includedProducts = data
        .filter(({ type, is_included }) => type === productType && is_included)
        .sort((a, b) => a.product_name.localeCompare(b.product_name))
      setAllProducts(includedProducts)
    } else if (status === 'unIncluded') {
      const unIncludedProducts = data
        .filter(({ type, is_included }) => type === productType && !is_included)
        .sort((a, b) => a.product_name.localeCompare(b.product_name))
      setAllProducts(unIncludedProducts)
    }
  }

  const resetSearchProducts = () => {
    setFilteredFormData({
      model: '',
      collection: '',
      category: ''
    })
    const filteredProducts = data
      .filter(({ type }) => type === productType)
      .sort((a, b) => a.product_name.localeCompare(b.product_name))

    setAllProducts(filteredProducts)
    setReverseProducts(true)
  }

  const onEditClick = ({ target: { dataset: { id } } }) => {
    const [product] = products.filter(element => element.id === id)
    if (productType === 'ready') {
      history.push('/products/create', product)
    } else if (productType === 'material') {
      history.push('/products/create-material', product)
    } else {
      history.push('/products/create-semi-ready', product)
    }
  }

  const onFilterCategory = () => {
    let filtered = data.filter(({ type }) => {
      if (productType === 'ready') {
        return (type === 'ready')
      } else {
        return type === productType
      }
    })

    if (reverseProducts) {
      filtered.sort((a, b) => b.product_name.localeCompare(a.product_name))
      setAllProducts(filtered)
      setReverseProducts(false)
    } else {
      filtered.sort((a, b) => a.product_name.localeCompare(b.product_name))
      setAllProducts(filtered)
      setReverseProducts(true)
    }
  }

  const propsData = {
    onEditClick,
    searchProducts,
    onFilterChange,
    filteredFormData,
    resetSearchProducts,
    locateToCreateCategoryMaterialPage,
    locateToCreateProductCategoryPage,
    locateToCreateMaterialPage,
    isLoading,
    products,
    productType,
    moveToCreateSemiReadyPage,
    onRadioChange,
    locateToCreateProductPage,
    setAllProducts,
    onFilterCategory,
    filterProductsByStatus,
    ...rest
  }

  return (
    <>
      <DefaultProductsContentView {...propsData} />
    </>
  )
}

export default DefaultProductsContentContainer
