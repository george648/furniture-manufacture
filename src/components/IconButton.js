import { CButton } from "@coreui/react"
import CIcon from '@coreui/icons-react'
import classnames from 'classnames'

export const IconButton = ({ text, icon, onClickHandler, textWhite = true, textPrimary, ...rest }) => {
  return (
    <CButton onClick={onClickHandler}
             className={classnames('d-flex align-items-center text-nowrap', { 'text-white border-white': textWhite, 'text-primary bg-white': textPrimary })}
             {...rest}
    >
      <span className="me-2 ps-0 pointer-event-none">
        {text}
      </span>
      <CIcon icon={icon} className="pointer-event-none"/>
    </CButton>
  )
}
