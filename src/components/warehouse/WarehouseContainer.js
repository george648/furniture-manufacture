import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getProductions, getProducts } from 'src/services'
import { showToast } from 'src/store'
import WarehouseView from './WarehouseView'

const WarehouseContainer = ({ type: productType, history, onProductCategoryChange, ...rest }) => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [productionLoading, setProductionLoading] = useState(false)
  const [products, setAllProducts] = useState([])
  const [data, setData] = useState([])
  const [productions, setProductions] = useState([])
  const [typeProduction, setTypeProduction] = useState({ name: '' })
  const [reverseProducts, setReverseProducts] = useState(true)
  const [formData, setFormData] = useState({
    model: '',
    collection: '',
    category: '',
  })

  const onChange = ({ target: { name, value } }) => {
    setFormData({
      ...formData,
      [name]: value
    })
  }

  useEffect(async () => {
    try {
      setProductionLoading(true)
      const { data } = await getProductions()
      setProductions(data)
      setTypeProduction(data[0])
    } catch ({ response: { data: { details } } }) {
      setProductionLoading(false)
      dispatch(showToast({ message: details, error: true }))
    } finally {
      setProductionLoading(false)
    }
  }, [])

  useEffect(async () => {
    if (typeProduction.id) {
      try {
        setLoading(true)
        const { data } = await getProducts()
        const filteredProducts = data
          .filter(({ is_included }) => is_included)
          .filter(({ type, production_id }) => {
            if (type === 'ready') {
              return production_id === typeProduction.id
            } else {
              return type === productType
            }
          })
          .sort((a, b) => a.product_name.localeCompare(b.product_name))

        setData(data)
        setAllProducts(filteredProducts)
      } catch ({ response: { data: { details } } }) {
        setLoading(false)
        dispatch(showToast({ message: details, error: true }))
      } finally {
        setLoading(false)
      }
    }
  }, [typeProduction])

  useEffect(() => {
    if (productType === 'ready' && typeProduction.id) {
      const filtered = data
        .filter(({ production_id, type, is_included }) => (production_id === typeProduction.id && type === 'ready' && is_included))
        .sort((a, b) => a.product_name.localeCompare(b.product_name))
      setAllProducts(filtered)
      setReverseProducts(true)
    }
  }, [typeProduction])

  useEffect(() => {
    const filtered = data
      .filter(({ is_included }) => is_included)
      .filter(({ type, production_id }) => {
        if (productType === 'ready') {
          return (production_id === typeProduction.id && type === 'ready')
        } else {
          return type === productType
        }
      })
      .sort((a, b) => a.product_name.localeCompare(b.product_name))
    setAllProducts(filtered)
    setReverseProducts(true)
  }, [productType])

  const onChangeProductionHandler = ({ target: { dataset: { id } } }) => {
    const [currentProduction] = productions.filter((production) => production.id === id)
    setTypeProduction(currentProduction)
  }

  const onFilterCategory = () => {
    let filtered = data
      .filter(({ is_included }) => is_included)
      .filter(({ type, production_id }) => {
        if (productType === 'ready') {
          return (production_id === typeProduction.id && type === 'ready')
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

  const searchProducts = () => {
    let result = [...products]
    Object.keys(formData).forEach(key => {
      if (formData[key]) {
        result = result.filter(product => product[key].toLowerCase().trim().includes(formData[key].toLowerCase().trim()))
      }
    })
    setAllProducts(result)
  }

  const resetSearchProducts = () => {
    setFormData({
      model: '',
      collection: '',
      category: '',
    })

    const filteredProducts = data
      .filter(({ type, is_included }) => type === productType && is_included)
      .sort((a, b) => a.product_name.localeCompare(b.product_name))
    setAllProducts(filteredProducts)
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

  const propsData = {
    loading,
    resetSearchProducts,
    searchProducts,
    onEditClick,
    productType,
    productionLoading,
    products,
    typeProduction,
    onChange,
    formData,
    onChangeProductionHandler,
    onProductCategoryChange,
    productions,
    onFilterCategory,
    ...rest
  }

  return <WarehouseView {...propsData} />
}

export default WarehouseContainer
