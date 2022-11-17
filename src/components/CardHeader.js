import {
  CCardHeader,
  CCol,
  CRow,
  CCardTitle
} from '@coreui/react'
import classnames from 'classnames'

export const CardHeader = ({children, title, bgColor, titleColor, ...rest }) => {
  return (
    <CCardHeader className={classnames('d-flex', { 'bg-white': bgColor })} {...rest}>
      <CRow className="m-0 p-0 align-items-center w-100 justify-content-between">
        <CCol md={`${children}` ? 2 : 12} className="m-0 p-0">
          <CCardTitle className={classnames('text-nowrap mb-0 text-white me-3', { 'text-body': titleColor })}>
            {title}
          </CCardTitle>
        </CCol>
        {children && <CCol className="m-0 p-0 d-flex w-100 justify-content-end">
          {children}
        </CCol>}
      </CRow>
    </CCardHeader>
  )
}
