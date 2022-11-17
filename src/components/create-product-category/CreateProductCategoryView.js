import { v4 as uuidv4 } from 'uuid'
import {
  CRow,
  CCol,
  CFormLabel,
  CFormInput,
  CContainer,
  CFormSelect,
} from '@coreui/react'
import { useTranslation } from 'react-i18next'
import Loader from 'src/components/loaders/intermittent'
import { CardHeader } from 'src/components/CardHeader'
import { CreateProductCategoryHeaderContent } from 'src/components/create-product-category/create-product-category-header-content/CreateProductCategoryHeaderContent'

const createProductCategoryInputData = [
  { name: 'name', label: 'name', id: uuidv4() },
  { name: 'status', label: 'status', id: uuidv4(), isFormSelect: true },
]

const CreateProductCategoryView = ({ createProductCategoryFormData, locateToDefaultProductPage, loading, setLoading, onCreateProductCategoryChange, ...rest }) => {
  const { t } = useTranslation()
  return (
    <>
      <CardHeader title={t('products.header.createProductCategory.title')}>
        <CreateProductCategoryHeaderContent
          createProductCategoryFormData={createProductCategoryFormData}
          loading={loading} 
          setLoading={setLoading}
          locateToDefaultProductPage={locateToDefaultProductPage}
          t={t}
          {...rest}
        />
      </CardHeader>
      <CContainer className="mt-4 px-3" fluid>
        {loading ? <Loader /> : createProductCategoryInputData.map(({ name, id, label, isFormSelect }) => {
          return <CRow className="mb-3 align-items-center" key={id}>
            <CCol xs={3}>
              <CFormLabel className="fs-6 mb-0 text-black">{t(`products.content.createProductCategory.form.label.${label}`)}</CFormLabel>
            </CCol>
            <CCol className="px-0" sm={8}>
              {isFormSelect ? <CFormSelect onChange={onCreateProductCategoryChange} value={createProductCategoryFormData.status} name='status'>
                <option value={true}>{t('included')}</option>
                <option value={false}>{t('unIncluded')}</option>
              </CFormSelect> :
                <CFormInput
                  value={createProductCategoryFormData.name}
                  onChange={onCreateProductCategoryChange}
                  invalid={!createProductCategoryFormData.name.trim()}
                  name='name'
                  placeholder={t(`products.content.createMaterial.form.placeholder.${name}`)}
                />}
            </CCol>
          </CRow>
        })}
      </CContainer>
    </>
  )
}

export default CreateProductCategoryView
