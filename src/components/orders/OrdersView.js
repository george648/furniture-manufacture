import CIcon from '@coreui/icons-react'
import { CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CImage, CLink } from '@coreui/react'
import classnames from 'classnames'
import Loader from 'src/components/loaders/intermittent'
import defaultProductImage from 'src/assets/images/svg/defaultProductImage.svg'
import { CardHeader } from 'src/components/CardHeader'
import { ordersHeaderTable } from 'src/constants/formLists'
import { OrdersHeaderContent } from './orders-header-content/OrdersHeaderContent'

const EmptyProductsContent = ({ t }) => {
  return (
    <CTableBody>
      <tr>
        <td colSpan={8}>
          <CTable cols={8}>
            <CTableBody>
              <tr>
                <td colSpan={8} className="d-flex align-items-center justify-content-center h-100">
                  <span className="empty-table-text-color">{t('warehouse.content.empty_content.text')}</span>
                </td>
              </tr>
            </CTableBody>
          </CTable>
        </td>
      </tr>
    </CTableBody>
  )
}

const LoaderProduct = () => {
  return (
    <CTableBody>
      <tr>
        <td colSpan={8}>
          <CTable cols={8}>
            <CTableBody>
              <tr>
                <td colSpan={8} className="d-flex align-items-c1enter justify-content-center">
                  <Loader />
                </td>
              </tr>
            </CTableBody>
          </CTable>
        </td>
      </tr>
    </CTableBody>
  )
}

const TableBodyContent = ({ orders, onEditClick, t, products }) => {
  return (
    <CTableBody>
      {orders.map(({ images, category, id, collection, is_included, left_in_warehouse, model, net_cost, priority_price, product_name, regular_price, type }) => {
        return <CTableRow className="border-top" key={id}>
          <CTableDataCell>
            <CImage className="rounded-circle object-fit-cover ms-2" width={50} height={50} alt={product_name} src={images.length ? images[0]?.url : defaultProductImage} />
          </CTableDataCell>
          <CTableDataCell><small className="fw-bold">{product_name}</small></CTableDataCell>
          <CTableDataCell><small className="fw-bold">{model}</small></CTableDataCell>
          {<CTableDataCell>
            <div className="price-bg-color justify-content-around d-flex rounded-1 mx-0">
              <div className="pe-0">
                <small>{regular_price}</small>
              </div>
              <div>
                <small className="border-end border-end-dark" />
              </div>
              <div className="pe-0">
                <small>{priority_price}</small>
              </div>
            </div>
          </CTableDataCell>}
          <CTableDataCell><small className="fw-bold">{category}</small></CTableDataCell>
          <CTableDataCell><small className="fw-bold">{left_in_warehouse}</small></CTableDataCell>
          {<CTableDataCell><small className="fw-bold">{collection}</small></CTableDataCell>}
          <CTableDataCell><small className="fw-bold">{is_included ? t('products.content.text.included') : t('products.content.text.unIncluded')}</small></CTableDataCell>
          <CTableDataCell>
            <CLink data-id={id} onClick={onEditClick} role='button'>
              <CIcon className="pointer-event-none" icon='pencil' />
            </CLink>
          </CTableDataCell>
        </CTableRow>
      })}
    </CTableBody>
  )
}

const OrdersTable = ({ productType, loading, orders, onEditClick, onFilterCategory, t }) => {
  return (
    <>
      <CTable align="middle" striped>
        <CTableHead className="default-product-view striped-bg-color border-top">
          <CTableRow>
            {ordersHeaderTable.map(title => {
                return <CTableHeaderCell className="py-3 text-nowrap" key={title} scope="col">
                  <small>
                    {t(`orders.content.table.header.${title}`)}
                  </small>
                  {title === 'material_name' &&
                    <CLink onClick={onFilterCategory} role='button'>
                      <CIcon className="ms-2" icon='filteredTriangles' />
                    </CLink>
                  }
                </CTableHeaderCell>
              })}
          </CTableRow>
        </CTableHead>
        {loading && <LoaderProduct />}
        {(!loading && !!orders.length) && <TableBodyContent productType={productType} onEditClick={onEditClick} t={t} orders={orders} />}
        {(!loading && !orders.length) && <EmptyProductsContent t={t} />}
      </CTable>
    </>
  )
}

export const OrdersView = ({t, ordersFormData, onOrdersChange, orders}) => {
  return (
    <>
      <CardHeader title={t('orders.title.default')}>
        <OrdersHeaderContent t={t}
                             ordersFormData={ordersFormData}
                             onOrdersChange={onOrdersChange}
        />
      </CardHeader>
      <OrdersTable orders={orders} t={t} />
    </>
  )
}
