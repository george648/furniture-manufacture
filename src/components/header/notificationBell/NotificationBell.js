import {
  CRow,
  CLink,
  CDropdownMenu,
  CDropdownToggle,
  CDropdownItem,
  CCol,
  CDropdownHeader,
  CDropdown
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import bellIcon from 'src/assets/images/svg/bellWithNotification.svg'
import emptyBell from 'src/assets/images/svg/emptyBell.svg'

const NotificationBell = ({ notifications, t }) => (
    <CDropdown>
      <CDropdownToggle className="p-0 border-0 position-relative bg-transparent" caret={false}>
        <CLink role='button'>
          <img src={notifications.length ? bellIcon : emptyBell} />
        </CLink>
      </CDropdownToggle>
      <CDropdownMenu className="overflow-auto notification-dropdown pb-0">
        <CDropdownHeader className="fw-semi1bold ms-4 py-2">{ notifications.length ? t('header.dropdown.menu.title') : 'У вас пока нет уведомлений.'}</CDropdownHeader> 
        <CRow className="m-2 px-2">
          { !!notifications.length && notifications.map(({ title, id, notification }) => {
            return <CDropdownItem key={id} className="p-0 d-flex">
              <CCol md={1} className="mt-1 me-2">
                <CIcon icon="warningNotification" />
              </CCol>
              <CCol md={10}>
                <small className="fw-bold">{title}</small>
                <p className="text-wrap">{notification}</p>
              </CCol>
              <CCol md={1} role='button' className="ms-2 mt-1">
                <CIcon icon="crossClose"/>
              </CCol>
            </CDropdownItem>
          })}
        </CRow>
      </CDropdownMenu>
    </CDropdown>
  )

export default NotificationBell
