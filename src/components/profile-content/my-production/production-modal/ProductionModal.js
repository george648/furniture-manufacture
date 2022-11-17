import { CButton, CModal, CModalBody, CModalFooter, CRow, CCol, CFormSelect, CFormInput, CFormText } from '@coreui/react'
import { CardHeader } from 'src/components/CardHeader'
import { useTranslation } from 'react-i18next'
import { IconButton } from 'src/components/IconButton'
import CIcon from '@coreui/icons-react'

export const Modal = ({ createProductionHandler, visible, setVisible, formData, onChange }) => {
  const { t } = useTranslation()
  
  return (
    <>
      {/* <CButton onClick={() => setVisible(!visible)}>Vertically centered modal</CButton> */}
      <CModal size='lg' alignment="center" className="border-0" visible={visible} onClose={() => setVisible(false)}>
        {/* <CModalHeader> */}
        {/* <CModalTitle>Modal title</CModalTitle> */}
        {/* <CModalTitle>Modal title</CModalTitle> */}
        {/* </CModalHeader> */}
        <CardHeader title={t('profile.card.production.modal.title')}>
          <IconButton onClickHandler={() => setVisible(false)} text={t('profile.card.production.modal.closeButton')} icon="crossUnSave"></IconButton>
        </CardHeader>
        <CModalBody className="p-0">
          <CRow className="px-5 mt-3">
            <CCol>
              <small>{t('profile.card.production.modal.content.title.productionName')}</small>
            </CCol>
            {/* <CCol> */}
            {/* <small>{t('profile.card.production.modal.content.title.productionsStation')}</small> */}
            {/* </CCol> */}
          </CRow>
          <hr></hr>
          <CRow className="px-5 mb-2">
            <CCol className="d-flex align-items-center" md={6}>
              <CFormInput
                type="text"
                value={formData.name}
                className="w-50 border-0"
                name="name"
                placeholder={t('profile.card.production.modal.inputPlaceholder')}
                onChange={onChange}
              />
              {/* <CIcon icon='pencil' /> */}
            </CCol>
            {/* <CCol md={3} className="text-start">
              <CFormSelect className="border-0 ps-0 w-75" options={[
                `${t('profile.card.production.modal.content.title.productionsStation')}`,
                { label: 'One', value: '1' },
                { label: 'Two', value: '2' },
              ]}>
                Станции
              </CFormSelect>
            </CCol> */}
          </CRow>
        </CModalBody>
        <CModalFooter className="pe-3">
          <CButton onClick={() => createProductionHandler(formData)} disabled={!Boolean(formData.name.trim())} className="text-white col-2" color="primary">{t('profile.card.production.modal.saveButton')}</CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}
