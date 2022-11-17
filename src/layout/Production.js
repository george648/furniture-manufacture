import { CCard, CCardBody } from '@coreui/react'
import { useTranslation } from 'react-i18next'
import { CardHeader } from 'src/components/CardHeader'

const Production = () => {
  const { t } = useTranslation()
  return (
    <CCard>
      <CardHeader title={t('production.title.default')} />
      <CCardBody className="p-0 px-5">
      </CCardBody>
    </CCard>
  )
}

export default Production
