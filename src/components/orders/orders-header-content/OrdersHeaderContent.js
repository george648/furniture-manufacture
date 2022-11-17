import CIcon from '@coreui/icons-react'
import { CRow, CCol, CButtonGroup, CDropdown, CDropdownToggle, CDropdownItem, CDropdownMenu, CFormLabel, CFormInput, CButton } from '@coreui/react'
import classnames from 'classnames'
import Loader from 'src/components/loaders/intermittent'
import { filterOrdersForm } from 'src/constants/formLists'
import defaultProductImage from 'src/assets/images/svg/defaultProductImage.svg'
import { IconButton } from 'src/components/IconButton'

const FilterOrders = ({ searchProducts, resetSearchProducts, ordersFormData, loading, onOrdersChange, t }) => {
  return (
    <CDropdown className="ms-2" variant="btn-group">
      <CDropdownToggle disabled={loading} className="border-white border text-white">{t('products.header.default.buttonGroup.4')}</CDropdownToggle>
      <CDropdownMenu className="bg-primary pt-0">
        <CDropdownItem style={{ width: '26rem' }} className="text-black py-0 px-3">
          <CRow className="d-flex">
            {filterOrdersForm.map(({ name }) => {
              return (
                <CCol className="text-white mt-2" xs={6} key={name}>
                  <CFormLabel>{t(`orders.header.filter.label.${name}`)}</CFormLabel>
                  <CFormInput onChange={onOrdersChange} className="orders-filter" placeholder={t(`orders.header.filter.placeholder.${name}`)} value={ordersFormData[name]} name={name} />
                </CCol>
              )
            })
            }
            <CCol className="mt-4 d-flex justify-content-between" xs={6}>
              <CButton onClick={searchProducts} className="border border-white mt-3 rounded-2 text-white">{t('orders.header.filter.button.filter')}</CButton>
              <CButton onClick={resetSearchProducts} className="border border-white mt-3 rounded-2 text-white">{t('orders.header.filter.button.reset')}</CButton>
            </CCol>
          </CRow>
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export const OrdersHeaderContent = ({ searchProducts, onOrdersChange, loading, ordersFormData, resetSearchProducts, t }) => {
  return (
    <CRow className="justify-content-between align-items-center">
      <CCol>
        <CCol className="d-flex align-items-center border border-white py-1 px-2 rounded-1">
          <CButton className="bg-white text-primary">{t('orders.header.generateButton')}</CButton>
          <small className="mx-2">{t('orders.header.period')}</small>
          <small className="border rounded-1 py-1 px-2 border-white">01.12.21 по 31.12.21</small>
        </CCol>
      </CCol>
      <CCol className="d-flex">
          <CButton className="text-nowrap text-white border-white me-2">{t('orders.header.button.sendToProduction')}</CButton>
          <IconButton
            text={t('orders.header.button.createOrder')}
            icon="plus"
          />
          <FilterOrders searchProducts={searchProducts} onOrdersChange={onOrdersChange} loading={loading} ordersFormData={ordersFormData} t={t} resetSearchProducts={resetSearchProducts} />
      </CCol>
    </CRow>
  )
}
