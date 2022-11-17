import { CCard, CCardBody } from '@coreui/react'
import { useTranslation } from 'react-i18next'
import { CardHeader } from 'src/components/CardHeader'

export const Reports = () => {
  const { t } = useTranslation()
  return (
    <CCard>
      <CardHeader title={t('reports.title.default')}/>
      <CCardBody className="p-0 px-5">
      </CCardBody>
    </CCard>
  )
}

export default Reports
