import { CCard, CCardBody } from '@coreui/react'
import { useTranslation } from 'react-i18next'
import { CardHeader } from 'src/components/CardHeader'

export const Clients = () => {
  const { t } = useTranslation()
  return (
    <CCard>
      <CardHeader title={t('clients.title.default')} />
      <CCardBody className="p-0 px-5">
      </CCardBody>
    </CCard>
  )
}

export default Clients
