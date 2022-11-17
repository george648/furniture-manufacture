import {
  CContainer,
  CHeader,
  CRow,
  CCol,
  CLink,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { useTranslation } from 'react-i18next'
import RegularLoader from 'src/components/loaders/regular/RegularLoader'
import AppHeaderDropdown from './dropdown/AppHeaderDropdown'
import { NotificationBell } from './notificationBell'

const AppHeaderView = ({ profileData, isLoading, locatePrivateRoomHandler, notifications }) => {
  const { t } = useTranslation()
  const { firstName, lastName, type } = profileData

  const PersonalInfo = () => {
    return (
      <CContainer className="d-flex p-0">
        <CRow className="align-items-center">
          <CCol col={1}>
            <CLink role="button">
              {/* <CIcon icon="arrowMenu" /> */}
            </CLink>
          </CCol>
          <CCol col={3} className="me-2">
            {
              isLoading ? <RegularLoader classes="text-white" /> :
                <CRow className="me-1">
                  <h6 className="p-0 mb-0 text-white text-nowrap text-start">{`${firstName} ${lastName}`}</h6>
                  <small className="text-start ps-0">{t(type)}</small>
                </CRow>
            }
          </CCol>
        </CRow>
      </CContainer>
    )
  }

  return (
    <CHeader className="px-3 text-white rounded-3 mb-3 main-header" position="sticky">
      <CContainer fluid className="p-0 me-0 justify-content-end">
        <div className="align-items-center text-end d-flex">
          <CCol>
            <NotificationBell t={t} notifications={notifications} />
          </CCol>
          <CCol md={6} className="ms-3">
            <PersonalInfo />
          </CCol>
          <CCol className="ms-1">
            <AppHeaderDropdown locatePrivateRoomHandler={locatePrivateRoomHandler} />
          </CCol>
        </div>
      </CContainer>
    </CHeader>
  )
}

export default AppHeaderView
