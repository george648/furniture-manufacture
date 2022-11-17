import { CRow, CCol, CButton } from '@coreui/react'
import { useDispatch } from 'react-redux'
import { IconButton } from 'src/components/IconButton'
import { createProductCategory, updateProductCategory } from 'src/services'
import { showToast } from 'src/store'

export const CreateProductCategoryHeaderContent = ({ locateToDefaultProductPage, createProductCategoryFormData, loading, t, setLoading, ...rest }) => {
  const dispatch = useDispatch()

  const createNewProductCategory = async () => {
    try {
      setLoading(true)
      let editedCategory

      if(rest.history.location.state) {
        editedCategory = rest.history.location.state
      }

      const {status} = rest.history.location.state ?
      await updateProductCategory({ name: createProductCategoryFormData.name, id: editedCategory.id, status: createProductCategoryFormData.status }) :
      await createProductCategory(createProductCategoryFormData)

      if(status === 201 || status === 200) {
        rest.history.location.state ? 
        rest.history.push('/products/categories'):
        rest.history.push('/products')

        dispatch(showToast({ message: status === 200 ? 'Вы только что изменили категорию товара!' : 'Вы только что создали новую категорию товара!' }))
      }
    } catch ({ response: { data: { details } } }) {
      dispatch(showToast({ message: details, error: true }))
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }

  return (
    <CRow>
      <CCol className="d-flex">
        <CButton onClick={createNewProductCategory} 
                 disabled={Boolean(!createProductCategoryFormData.name.trim()) || loading} className="text-black bg-white me-3 px-4">
          {t('saveButton')}
        </CButton>
        <IconButton onClickHandler={locateToDefaultProductPage} text={t('cancel')} icon="crossUnSave" />
      </CCol>
    </CRow>
  )
}
