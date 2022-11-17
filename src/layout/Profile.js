import { CCard, CCardBody, CCol, CContainer, CRow } from '@coreui/react'
import { useTranslation } from 'react-i18next'
import { CardHeader } from 'src/components/CardHeader'
import { IconButton } from 'src/components/IconButton'
import { plus } from 'src/assets/icons/plus'
import PrivateInfo from 'src/components/profile-content/private-info'
import MyProduction from 'src/components/profile-content/my-production'
import InfoAboutWorkers from 'src/components/profile-content/info-about-workers'

export const Profile = () => {
  const { t } = useTranslation()

  const ActivitySchedule = () => {
    return (
      <CCard className="p-0 m-0 h-100 mb-3">
        <CardHeader title={t('profile.card.schedule.header.title')} />
        <CCardBody className="p-0 mx-3 items-center justify-content-center my-5 d-flex">
          <span className="empty-table-text-color">{t('readyForDevelopText')}</span>
        </CCardBody>
      </CCard>
    )
  }

  const PrivateTasks = () => {
    return (
      <CCard className="p-0 m-0 h-100">
        <CardHeader title={t('profile.card.tasks.header.title')}>
          <IconButton text={t('profile.card.tasks.header.createButton')} icon={plus} />
        </CardHeader>
        <CCardBody className="p-0 d-flex my-5 align-items-center justify-content-center">
          <span className="empty-table-text-color">{t('readyForDevelopText')}</span>
        </CCardBody>
      </CCard>
    )
  }

  return (
    <CContainer fluid className="p-0">
      <CRow className="p-0 m-0">
        <CCol md={5} className="p-0">
          <CRow className="p-0 m-0">
            <PrivateInfo />
          </CRow>
          <CRow className="p-0 m-0">
            <ActivitySchedule />
          </CRow>
          <CRow className="p-0 m-0">
            <MyProduction />
          </CRow>
        </CCol>
        <CCol className="ms-3 p-0">
          <InfoAboutWorkers />
        </CCol>
      </CRow>
      <CRow className="p-0 m-0 mt-3">
        <PrivateTasks />
      </CRow>
    </CContainer>
  )
}

export default Profile
