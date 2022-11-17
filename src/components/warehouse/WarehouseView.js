import { useTranslation } from 'react-i18next'
import CIcon from '@coreui/icons-react'
import { CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CImage, CLink } from '@coreui/react'
import classnames from 'classnames'
import Loader from 'src/components/loaders/intermittent'
import defaultProductImage from 'src/assets/images/svg/defaultProductImage.svg'
import { CardHeader } from 'src/components/CardHeader'
import { DefaultWarehouseHeaderContent } from 'src/components/warehouse/default-warehouse-header/DefaultWarehouseHeader'

const materialTableHeader = ['photo', 'material_name', 'model', 'category', 'left_in_warehouse', 'is_included', 'empty']
const headerItems = [1, 2, 3, 4, 5, 6, 7, 8, 9]

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

const TableBodyContent = ({ productType, onEditClick, t, products }) => {
  return (
    <CTableBody>
      {products.map(({ images, category, id, collection, is_included, left_in_warehouse, model, net_cost, priority_price, product_name, regular_price, type }) => {
        return <CTableRow className="border-top" key={id}>
          <CTableDataCell>
            <CImage className="rounded-circle object-fit-cover ms-2" width={50} height={50} alt={product_name} src={images.length ? images[0]?.url : defaultProductImage} />
          </CTableDataCell>
          <CTableDataCell><small className="fw-bold">{product_name}</small></CTableDataCell>
          <CTableDataCell><small className="fw-bold">{model}</small></CTableDataCell>
          {productType !== 'material' && <CTableDataCell>
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
          {productType !== 'material' && <CTableDataCell><small className="fw-bold">{collection}</small></CTableDataCell>}
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

const ProductsTable = ({ productType, loading, products, onEditClick, onFilterCategory, t }) => {
  return (
    <>
      <CTable className={classnames({ 'h-100': !products.length })} align="middle" striped>
        <CTableHead className="default-product-view striped-bg-color border-top">
          <CTableRow>
            {productType !== 'material' ? headerItems.map((number) => {
              return <CTableHeaderCell className="py-3 text-nowrap" key={number} scope="col"><small>{t(`products.content.header.text.${number}`)}</small>
                {number === 2 &&
                  <CLink onClick={onFilterCategory} role='button'>
                    <CIcon className="ms-2" icon='filteredTriangles' />
                  </CLink>
                }
              </CTableHeaderCell>
            }) :
              materialTableHeader.map(title => {
                return <CTableHeaderCell className="py-3 text-nowrap" key={title} scope="col">
                  <small>
                    {t(`products.content.material.header.title.${title}`)}
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
        {(!loading && !!products.length) && <TableBodyContent productType={productType} onEditClick={onEditClick} t={t} products={products} />}
        {(!loading && !products.length) && <EmptyProductsContent t={t} />}
      </CTable>
    </>
  )
}

const WarehouseView = ({ loading,
  onProductCategoryChange,
  productType,
  products,
  productions,
  onChangeProductionHandler,
  typeProduction,
  productionLoading,
  onEditClick,
  onChange,
  resetSearchProducts,
  searchProducts,
  formData,
  onFilterCategory,
  ...rest
}) => {
  const { t } = useTranslation()
  return (
    <>
      <CardHeader bgColor={true} titleColor={true} title={t('warehouse.title.default')}>
        <DefaultWarehouseHeaderContent
          productions={productions}
          typeProduction={typeProduction}
          productionLoading={productionLoading}
          loading={loading}
          products={products}
          resetSearchProducts={resetSearchProducts}
          searchProducts={searchProducts}
          onProductCategoryChange={onProductCategoryChange}
          type={productType}
          onChange={onChange}
          formData={formData}
          t={t}
          onChangeProductionHandler={onChangeProductionHandler}
        />
      </CardHeader>
      <ProductsTable
        loading={loading}
        t={t}
        onFilterCategory={onFilterCategory}
        typeProduction={typeProduction}
        productionLoading={productionLoading}
        onEditClick={onEditClick}
        onProductCategoryChange={onProductCategoryChange}
        productType={productType}
        products={products}
        productions={productions}
        onChangeProductionHandler={onChangeProductionHandler}
        rest={rest}
      />
    </>
  )
}

export default WarehouseView
