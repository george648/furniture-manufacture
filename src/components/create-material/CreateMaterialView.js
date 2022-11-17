import {
  CRow,
  CCol,
  CFormLabel,
  CFormInput,
  CContainer,
  CFormSelect,
} from '@coreui/react'
import { useTranslation } from 'react-i18next'
import { CardHeader } from 'src/components/CardHeader'
import { CreateMaterialHeaderContent } from 'src/components/create-material/create-material-header-content/CreateMaterialHeaderContent'
import Loader from '../loaders/intermittent'
import { defaultParamsList } from 'src/constants/formLists'

const CreateMaterialView = ({
  onChange,
  onCategoryChange,
  formData,
  paramsOptions,
  locateToDefaultProductPage,
  loading,
  onCreateMaterialHandler,
  onDefaultInputChange,
  statusOptions,
  checkedFormData,
  onStatusChange,
}) => {
  const { t } = useTranslation()

  return (
    <>
      <CardHeader title={t('products.header.createMaterial.title')}>
        <CreateMaterialHeaderContent
          t={t}
          loading={loading}
          formData={formData}
          t={t}
          checkedFormData={checkedFormData}
          locateToDefaultProductPage={locateToDefaultProductPage}
          onCreateMaterialHandler={onCreateMaterialHandler}
        />
      </CardHeader>
      {loading ? <Loader /> : <CContainer className="mt-4 px-3" fluid>
        <CRow className="mb-3 align-items-center">
          <CCol xs={3}>
            <CFormLabel className="fs-6 text-black mb-0">{t('products.header.createMaterial.label.category')}</CFormLabel>
          </CCol>
          <CCol className="px-0" sm={8}>
            <CFormSelect value={formData.category_id} onChange={onCategoryChange}>
              {paramsOptions?.map(({ name, id }) =>
                <option key={name} value={id}>{name}</option>
              )}
            </CFormSelect>
          </CCol>
        </CRow>
        {defaultParamsList.map(({ name, label, id }) => (
          <CRow className="mb-3 align-items-center" key={id}>
            <CCol xs={3}>
              <CFormLabel className="fs-6 text-black mb-0">
                {t(`products.header.createMaterial.label.${label}`).toUpperCase()}
              </CFormLabel>
            </CCol>
            <CCol className="px-0" sm={8}>
              <CFormInput
                onChange={onDefaultInputChange}
                value={formData.defaultParams[name]}
                name={name}
                placeholder={t(`products.header.createMaterial.placeholder.${name}`).toUpperCase()}
                invalid={!formData.defaultParams[name].trim()}
              />
            </CCol>
          </CRow>
        ))}
        {formData.parameters.map(({ name, parameter_id, value }) => (
          <CRow className="mb-3 align-items-center" key={parameter_id}>
            <CCol xs={3}>
              <CFormLabel className="fs-6 text-black mb-0">{name.toUpperCase()}</CFormLabel>
            </CCol>
            <CCol className="px-0" sm={8}>
              <CFormInput
                data-id={parameter_id}
                onChange={onChange}
                value={value}
                placeholder={name.toUpperCase()}
                invalid={!value?.trim()}
              />
            </CCol>
          </CRow>
        ))}
        <CRow className="mb-3">
          <CCol xs={3}>
            <CFormLabel className="fs-6 text-black mb-0">{t('products.header.createMaterial.label.status')}</CFormLabel>
          </CCol>
          <CCol className="px-0" sm={8}>
            <CFormSelect onChange={onStatusChange} value={formData.defaultParams.is_included} name='is_included'>
              {statusOptions?.map(({ value, name, id }) =>
                <option key={id} value={value}>{name}</option>
              )}
            </CFormSelect>
          </CCol>
        </CRow>
      </CContainer>}
    </>
  )
}

export default CreateMaterialView
