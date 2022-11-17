import {
  CDropdown,
  CButton,
  CDropdownMenu,
  CDropdownToggle,
  CRow,
  CDropdownItem
} from '@coreui/react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { logout } from 'src/store'
import userIcon from 'src/assets/images/svg/userIcon.svg'

const AppHeaderDropdown = ({ locatePrivateRoomHandler }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <CDropdown>
      <CDropdownToggle placement="bottom-end" className="p-0 rounded-circle" caret={false}>
        <img src={userIcon} />
      </CDropdownToggle>
      <CDropdownMenu className="px-3" placement="bottom-end">
        <CRow className="mx-3">
          <CDropdownItem className="p-0">
            <CButton onClick={locatePrivateRoomHandler} variant='outline'>
              {t('header.dropdown.menu.1')}
            </CButton>
          </CDropdownItem>
          <CDropdownItem className="p-0 mt-3 d-flex">
            <CButton onClick={logoutHandler} className="w-100 text-white">
              {t('header.dropdown.menu.2')}
            </CButton>
          </CDropdownItem>
        </CRow>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
