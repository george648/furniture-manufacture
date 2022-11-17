import { v4 as uuidv4 } from 'uuid'
import CreatableSelect from 'react-select/creatable'
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
import { CreateCategoryMaterialHeaderContent } from 'src/components/create-category-material/create-category-material-header-content/CreateCategoryMaterialHeaderContent'
import Loader from '../loaders/intermittent'

const inputData = [
  { name: 'name', label: 'name', id: uuidv4() },
  { name: 'params', label: 'params', id: uuidv4(), isCreatableSelect: true },
  { name: 'status', label: 'status', id: uuidv4(), isDefaultSelect: true },
]

const colorStyles = {
  option: (styles) => ({
    ...styles,
    backgroundColor: 'white',
    fontSize: '.875rem',
    borderRadius: '6px'
  }),
  multiValueRemove: (styles) => ({
    ...styles,
    color: 'white',
    ':hover': {
      color: 'white',
    },
  }),
}

const CreateCategoryMaterialView = ({
  paramsOptions,
  createCategoryMaterialFormData,
  onChangeCategoryMaterial,
  locateToDefaultProductPage,
  onCreateSelectCategoryMaterial,
  loading,
  createNewMaterialCategoryHandler,
  setLoading,
  categoryLoading,
  ...rest
}) => {
  const { t } = useTranslation()
  const SelectedDropdown = (data) => {
    return (
      <div className="bg-white pb-2">
        <CRow className="bg-secondary my-2 p-0">
          <small className="small-text me-2">{t('products.content.createCategoryMaterial.form.creatableSelect.notificationDropdown')}</small>
        </CRow>
        {t('products.content.createCategoryMaterial.form.creatableSelect')}&nbsp;
        <span className="bg-primary text-white py-2 rounded-1 px-3">{data}</span>
      </div>
    )
  }

  return (
    <>
      <CardHeader title={t('products.header.materials.createMaterialTitle')}>
        <CreateCategoryMaterialHeaderContent
          loading={loading}
          createNewMaterialCategoryHandler={createNewMaterialCategoryHandler}
          t={t}
          createCategoryMaterialFormData={createCategoryMaterialFormData}
          locateToDefaultProductPage={locateToDefaultProductPage}
          rest={rest}
        />
      </CardHeader>
      <CContainer className="mt-4 px-3" fluid>
        {categoryLoading && loading && <Loader />}
        {categoryLoading || loading || inputData.map(({ name, id, label, isCreatableSelect, isDefaultSelect }) => {
          return <CRow className="mb-3 align-items-center" key={id}>
            <CCol xs={2}>
              <CFormLabel className="text-black mb-0">{t(`products.content.createCategoryMaterial.form.label.${label}`)}</CFormLabel>
            </CCol>
            <CCol className="px-0" sm={9}>
              {isCreatableSelect &&
                <CreatableSelect
                  defaultValue={rest.history.location.state && createCategoryMaterialFormData.parameters}
                  isDisabled={rest.history.location.state}
                  name='params'
                  onChange={onCreateSelectCategoryMaterial}
                  styles={colorStyles}
                  formatCreateLabel={input => SelectedDropdown(input)}
                  placeholder={t('products.content.createCategoryMaterial.form.placeholder.params')}
                  isMulti
                  options={paramsOptions}
                  className="py-2 createble-select w-100" 
                />}
              {!isCreatableSelect && !isDefaultSelect && <CFormInput className="py-2" name={name}
                onChange={onChangeCategoryMaterial}
                invalid={!createCategoryMaterialFormData[name].trim()}
                value={createCategoryMaterialFormData[name]}
                placeholder={t(`products.content.createCategoryMaterial.form.placeholder.${name}`)}
              />}
              {isDefaultSelect && <CFormSelect name={name} onChange={onChangeCategoryMaterial} value={createCategoryMaterialFormData[name]} className="py-2">
                <option value={true}>{t('included')}</option>
                <option value={false}>{t('unIncluded')}</option>
              </CFormSelect>}
            </CCol>
          </CRow>
        })}
      </CContainer>
    </>
  )
}

export default CreateCategoryMaterialView
