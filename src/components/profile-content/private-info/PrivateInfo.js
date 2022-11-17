import { CCard, CCardBody, CListGroup, CListGroupItem, CCol, CBadge } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { CardHeader } from 'src/components/CardHeader'

const PrivateInfo = () => {
  const { t } = useTranslation()
  const { firstName, lastName, type, id } = useSelector(({ user }) => user)

  const profileData = [{
    label: 'fullName',
    data: `${firstName} ${lastName}`
  },
  // {
  //   label: 'department',
  //   data: 'Замоканный деп'
  // }, 
  {
    label: 'workPosition',
    data: t(type)
  }, {
    label: 'personalNumber',
    data: id
  }]

  const ProfileContent = () => {
    return (
      <CListGroup>
        {profileData.map(
          ({ label, data }, index) => (
            <CListGroupItem className="d-flex align-items-center py-2 text-black p-0" color={index % 2 === 0 || 'light'} key={index}>
              <CBadge className="ms-2">
                <CIcon icon="listCircleItem" />
              </CBadge>
              <CCol className="fw-bold">
                <span className="font-size-14">
                  {t(label)}
                </span>
              </CCol>
              <CCol>
                <span className="font-size-14">
                  {data}
                </span>
              </CCol>
            </CListGroupItem>
          ),
        )}
      </CListGroup>
    )
  }

  return (
    <CCard className="p-0 m-0 h-100 mb-3">
      <CardHeader title={t('profile.card.info.header.title')} />
      <CCardBody className="p-0">
        <ProfileContent />
      </CCardBody>
    </CCard>
  )
}
export default PrivateInfo
