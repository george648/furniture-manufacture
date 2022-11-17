import { CCard, CCardBody, CListGroup, CListGroupItem, CContainer, CCol, CBadge, CLink, CRow } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { useTranslation } from 'react-i18next'
import { CardHeader } from 'src/components/CardHeader'
import { IconButton } from 'src/components/IconButton'
import { plus } from 'src/assets/icons/plus'
import { employeesList } from 'src/constants/empoyeesList'

const workersData = [1, 2, 3, 4, 5]

const InfoAboutWorkers = () => {
  const { t } = useTranslation()

  const InfoHeader = () => (
    <CRow className="m-0 py-3">
      { employeesList.map(({ item, size }, index) => item
        ? (
          <CCol key={index} className="p-0 d-flex align-items-center" xs={ size }>
            <h6 className="m-0">{ t(item) }</h6>
          </CCol>)
        : (<CCol key={index} className="p-0 me-2" xs={ 1 }/>)
      ) }
    </CRow>
  )

  const InfoAboutWorkersContent = () => {
    return (
      <CContainer className="d-flex align-items-center justify-content-center h-100">
        <hr className="m-0"/>
        {/* <CListGroup className="py-3">
          { workersData.map(
            (worker, index) => (
              <CListGroupItem className="d-flex text-black p-0" color={ index % 2 === 0 ? '' : 'light' } key={ index }>
                <CCol className="ms-2" xs={ 1 }>
                  <CBadge>
                    <CIcon icon={ index % 2 === 0 ? 'listCircleItem' : 'greenListCircleItem' }/>
                  </CBadge>
                </CCol>
                <CCol xs={ 3 }>Фамилия Имя</CCol>
                <CCol xs={ 2 }>Отдел</CCol>
                <CCol xs={ 3 }>Должность</CCol>
                <CCol xs={ 2 }>Нет доступа</CCol>
                <CCol className="text-center" xs={ 1 }>
                  <CLink role='button'>
                    <CIcon icon="pencil"/>
                  </CLink>
                </CCol>
              </CListGroupItem>
            ),
          ) }
        </CListGroup> */}
          <span className="empty-table-text-color">{t('readyForDevelopText')}</span>
      </CContainer>
    )
  }

  return (
    <CCard className="p-0 m-0 h-100 mb-3">
      <CardHeader title={ t('profile.card.workersInfo.header.title') }>
        <IconButton text={ t('profile.card.workersInfo.header.buttonCreate') } icon={ plus }/>
      </CardHeader>
      <CCardBody className="p-0">
        <InfoHeader/>
        <InfoAboutWorkersContent/>
      </CCardBody>
    </CCard>
  )
}


export default InfoAboutWorkers
