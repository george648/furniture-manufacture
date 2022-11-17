import { useState, useEffect } from 'react'
import { OrdersView } from "./OrdersView"

const OrdersContainer = ({ rest, t }) => {
  const [loading, setLoading] = useState(false)
  const [orders, setOrders] = useState([])
  const [ordersFormData, setOrdersFormData] = useState({
    orderNumber: '',
    status: '',
    buyer: '',
    orderPrice: '',
    creatingDate: '',
  })

  const onOrdersChange = ({ target: {name, value}}) => {
    setOrdersFormData({
      ...ordersFormData,
      [name]: value
    })
  }
  const propsData = {
    t,
    orders,
    loading,
    ordersFormData,
    onOrdersChange,
    ...rest
  }

  return <OrdersView {...propsData} />
}

export default OrdersContainer
