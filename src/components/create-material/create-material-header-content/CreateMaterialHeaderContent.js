import { CRow, CCol, CButton } from '@coreui/react'
import { IconButton } from 'src/components/IconButton'
import { isEmpty } from 'src/utils/emptyObject'

export const CreateMaterialHeaderContent = ({ locateToDefaultProductPage, loading, onCreateMaterialHandler, formData, checkedFormData, t }) => {
  return (
    <CRow>
      <CCol className="d-flex">
        <CButton  onClick={onCreateMaterialHandler}
                  disabled={loading || !formData.category_id || formData.parameters.some(element => !element.value) || isEmpty(checkedFormData) }
                  className="text-primary bg-white me-3 px-4"
        >
          {t('saveButton')}
        </CButton>
        <IconButton onClickHandler={locateToDefaultProductPage}
                    text={t('cancel')}
                    icon="crossUnSave"
        />
      </CCol>
    </CRow>
  )
}
