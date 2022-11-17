import { CCard, CCardBody } from '@coreui/react'
import { useTranslation } from 'react-i18next'
import OrdersContainer from 'src/components/orders'

const Orders = ({}) => {
  const { t } = useTranslation()

  return (
    <CCard>
      <CCardBody className="p-0">
        <OrdersContainer t={t} />
      </CCardBody>
    </CCard>
  )
}

export default Orders
