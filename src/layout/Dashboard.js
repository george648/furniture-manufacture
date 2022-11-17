import { CCard, CCardBody } from '@coreui/react'
import { CardHeader } from 'src/components/CardHeader'

export const Dashboard = () => {
  return (
    <CCard>
      <CardHeader title='ГЛАВНАЯ'/>
      <CCardBody className="p-0 px-5">
      </CCardBody>
    </CCard>
  )
}

export default Dashboard
