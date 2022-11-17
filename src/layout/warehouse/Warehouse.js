import React, { useState } from 'react'
import { CCard, CCardBody } from '@coreui/react'
import WarehouseContent from 'src/components/warehouse'

const Warehouse = ({history}) => {
  const [type, setType] = useState('ready')

  const onProductCategoryChange = ({ target: { dataset: { type } } }) => {
    setType(type)
  }

  return (
    <CCard>
      <CCardBody className="p-0">
        <WarehouseContent type={type} history={history} onProductCategoryChange={onProductCategoryChange} />
      </CCardBody>
    </CCard>
  )
}

export default Warehouse
