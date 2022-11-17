import { useState, useEffect } from 'react'
import CreateProductCategoryView from './CreateProductCategoryView'

const CreateProductCategoryContainer = ({ createProductCategoryFormData, locateToDefaultProductPage, onCreateProductCategoryChange, setCreateProductCategoryFormData, ...rest }) => {
  const [loading, setLoading] = useState(false)

  useEffect(async ()=> {
    if(rest.history.location.state) {
      try {
        setLoading(true)
        const editedCategory = rest.history.location.state
        
        setCreateProductCategoryFormData({
          ...createProductCategoryFormData,
          name: editedCategory.name,
          status: editedCategory.status
        })
      }
      finally {
        setLoading(false)
      }
    } else {
      setCreateProductCategoryFormData({
        ...createProductCategoryFormData,
        name: '',
        status: true
      })
    }
  }, [rest.history.location.state])

  const propsData = {
    loading,
    setLoading,
    onCreateProductCategoryChange,
    createProductCategoryFormData,
    locateToDefaultProductPage,
    ...rest
  }

  return (
    <CreateProductCategoryView {...propsData} />
  )
}

export default CreateProductCategoryContainer
