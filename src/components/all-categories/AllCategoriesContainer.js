import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import AllCategoriesView from './AllCategoriesView'
import { getProductCategories, getMaterialCategories } from 'src/services'
import { showToast } from 'src/store'

const AllCategoriesContainer = ({
  locateToDefaultProductPage,
  type: productType,
  history,
  locateToCreateCategoryMaterialPage,
  locateToCreateProductCategoryPage,
  ...rest
}) => {
  const dispatch = useDispatch()
  const [isLoading, setLoading] = useState(false)
  const [categories, setCategories] = useState([])
  const [reverseCategories, setReverseCategories] = useState(true)

  useEffect(async () => {
    try {
      setLoading(true)

      const { data } = productType === 'material' ?
        await getMaterialCategories() :
        await getProductCategories()

      if (data.length) {
        data.sort((a, b) => a.name.localeCompare(b.name))
        setCategories(data)
      }
    } catch ({ response: { data: { details } } }) {
      setLoading(false)
      dispatch(showToast({ message: details, error: true }))
    } finally {
      setLoading(false)
    }
  }, [])

  const onEditClick = ({ target: { dataset: { id } } }) => {
    const [category] = categories.filter(element => element.id === id)
    if (productType === 'ready') {
      history.push('/products/create-product-category', category)
    } else {
      history.push('/products/create-category-material', category)
    }
  }

  const onFilterCategory = () => {
    if (reverseCategories) {
      categories.sort((a, b) => b.name.localeCompare(a.name))
      setCategories(categories)
      setReverseCategories(false)
    } else {
      categories.sort((a, b) => a.name.localeCompare(b.name))
      setCategories(categories)
      setReverseCategories(true)
    }
  }

  const propsData = {
    isLoading,
    locateToDefaultProductPage,
    productType,
    categories,
    onFilterCategory,
    onEditClick,
    locateToCreateCategoryMaterialPage,
    locateToCreateProductCategoryPage,  
    ...rest
  }

  return (
    <>
      <AllCategoriesView {...propsData} />
    </>
  )
}

export default AllCategoriesContainer
