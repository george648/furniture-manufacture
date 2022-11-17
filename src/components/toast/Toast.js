import React, {} from 'react'
import {
  CToast,
  CToastBody,
  CToastHeader
} from '@coreui/react'
import { useTranslation } from 'react-i18next'

export const Toasts = ({title, message, error = true, autohide = true}) => {
  const { t } = useTranslation()

  return (
    <CToast title='' autohide={true}>
      <CToastHeader close>
        <svg
          className="rounded me-2"
          width="20"
          height="20"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
          focusable="false"
          role="img"
        >
          {/*<rect width="100%" height="100%" fill={error ? '#EB5757' : '#6FCF97'}></rect>*/}
        </svg>
        <strong className="me-auto">{''}</strong>
      </CToastHeader>
      <CToastBody>{''}</CToastBody>
    </CToast>
  )
}
