import { CRow, CCol, CButton } from '@coreui/react'
import { IconButton } from 'src/components/IconButton'

export const CreateCategoryMaterialHeaderContent = ({
  locateToDefaultProductPage,
  createCategoryMaterialFormData,
  t,
  createNewMaterialCategoryHandler,
  loading,
  ...rest
}) => (
  <CRow>
    <CCol className="d-flex">
      <CButton 
        onClick={createNewMaterialCategoryHandler}
        disabled={Boolean(!createCategoryMaterialFormData.name.trim()) || loading || Boolean(!createCategoryMaterialFormData.parameters.length)}
        className="text-black bg-white me-3 px-4">
        {t('saveButton')}
      </CButton>
      <IconButton 
        onClickHandler={locateToDefaultProductPage}
        text={t('cancel')}
        icon="crossUnSave"
      />
    </CCol>
  </CRow>
)
