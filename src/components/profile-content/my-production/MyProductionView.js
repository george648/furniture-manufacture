import { CCard, CCardBody, CListGroup, CListGroupItem, CCol, CBadge, CLink } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { useTranslation } from 'react-i18next'
import { IconButton } from 'src/components/IconButton'
import { CardHeader } from 'src/components/CardHeader'
import { Modal } from 'src/components/profile-content/my-production/production-modal/ProductionModal'
import Loader from 'src/components/loaders/intermittent'

const MyProductionContent = ({ productions, onDeleteProduction, t }) => {
  return (
    <CListGroup>
      {productions.length ? productions.map(
        ({ name, id }, index) => (
          <CListGroupItem className="d-flex text-black py-3 p-0" color={index % 2 === 0 ? '' : 'light'} key={id}>
            <CBadge className="ms-5 me-2 ps-0">
              <CIcon icon={index % 2 === 0 ? 'listCircleItem' : 'greenListCircleItem'} />
            </CBadge>
            <CCol className="d-flex justify-content-between">
              <span className="font-size-14">
                {name}
              </span>
              <CLink onClick={onDeleteProduction} className="text-decoration-none me-3" data-id={id} role='button'>
                <CIcon className="pointer-event-none" icon='bucket' />
              </CLink>
            </CCol>
          </CListGroupItem>
        )
      ) :
        <div className="d-flex align-items-center justify-content-center">
          <span className="my-5 empty-table-text-color">
            {t('readyForDevelopText')}
          </span>
        </div>
      }
    </CListGroup>
  )
}

const MyProductionView = ({ visible, setVisible, loading, productions, createProductionHandler, formData, onChange, onDeleteProduction }) => {
  const { t } = useTranslation()
  const openCreateProductionForm = () => setVisible(true)

  return (
    <CCard className="p-0 m-0 h-100">
      <CardHeader title={t('profile.card.production.header.title')}>
        <IconButton onClickHandler={openCreateProductionForm} text={t('profile.card.production.header.createButton')} icon='plus' />
      </CardHeader>
      <CCardBody className="p-0">
        {loading ? <Loader /> : <MyProductionContent t={t} productions={productions} onDeleteProduction={onDeleteProduction} />}
        {visible && <Modal setVisible={setVisible} visible={visible} formData={formData} onChange={onChange} createProductionHandler={createProductionHandler} />}
      </CCardBody>
    </CCard>
  )
}

export default MyProductionView
