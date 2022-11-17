import { useTranslation } from 'react-i18next'
import { CRow, CCol, CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CImage, CLink } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import classnames from 'classnames'
import defaultProductImage from 'src/assets/images/svg/defaultProductImage.svg'
import Loader from 'src/components/loaders/intermittent'
import { CardHeader } from 'src/components/CardHeader'
import { DefaultProductsHeaderContent } from 'src/components/default-products-content/default-products-header-content/DefaultProductsHeaderContent'

const headerItems = [1, 2, 3, 4, 5, 6, 7, 8, 9]
const materialTableHeader = ['photo', 'material_name', 'model', 'category', 'left_in_warehouse', 'is_included', 'empty']

const EmptyProductsContent = ({ productType, locateToCreateProductPage, t, locateToCreateMaterialPage, moveToCreateSemiReadyPage }) => {
  return (
    <CTableBody>
      <tr>
        <td colSpan={8}>
          <CTable cols={8}>
            <CTableBody>
              <tr>
                <td colSpan={8} className="d-flex align-items-center justify-content-center h-100">
                  <span className="empty-table-text-color">{t('products.emptyContent.text')}&nbsp;</span>
                  {productType === 'ready' &&
                    <CLink onClick={locateToCreateProductPage} className="text-decoration-none" role="button">
                      {t('products.emptyContent.button')}
                    </CLink>
                  }
                  {productType === 'material' &&
                    <CLink onClick={locateToCreateMaterialPage} className="text-decoration-none" role="button">
                      {t('products.emptyContent.button.material')}
                    </CLink>
                  }
                  {productType === 'semi_ready' &&
                    <CLink onClick={moveToCreateSemiReadyPage} className="text-decoration-none" role="button">
                      {t('products.emptyContent.button.semi_ready')}
                    </CLink>
                  }
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

const TableBodyContent = ({ productType, products, t, onEditClick }) => {
  return (
    <CTableBody>
      {products.map(({ images, category, id, collection, is_included, left_in_warehouse, model, net_cost, priority_price, product_name, regular_price, type }) => {
        return <CTableRow className="border-top" key={id}>
          <CTableDataCell>
            <CImage className="rounded-circle object-fit-cover ms-2" width={50} height={50} alt={product_name} src={images.length ? images[0]?.url : defaultProductImage} />
          </CTableDataCell>
          <CTableDataCell><small>{product_name}</small></CTableDataCell>
          <CTableDataCell><small>{model}</small></CTableDataCell>
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
          <CTableDataCell><small>{category}</small></CTableDataCell>
          <CTableDataCell><small>{left_in_warehouse}</small></CTableDataCell>
          {productType !== 'material' && <CTableDataCell><small>{collection}</small></CTableDataCell>}
          <CTableDataCell><small>{is_included ? t('products.content.text.included') : t('products.content.text.unIncluded')}</small></CTableDataCell>
          <CTableDataCell className="text-end">
            <CLink className="me-3" role='button' data-id={id} onClick={onEditClick}>
              <CIcon className="pointer-event-none" icon='pencil' />
            </CLink>
          </CTableDataCell>
        </CTableRow>
      })}
    </CTableBody>
  )
}

const ProductsTable = ({ isLoading, products, productType, locateToCreateProductPage, locateToCreateMaterialPage, moveToCreateSemiReadyPage, onFilterCategory, onEditClick, t }) => {
  return (
    <>
      <CTable className={classnames({ 'h-100': !products.length })} align="middle" striped>
        <CTableHead className="default-product-view striped-bg-color border-top">
          <CTableRow>
            {productType !== 'material' ? headerItems.map((number) => {
              return <CTableHeaderCell className="py-3 text-nowrap" key={number}>
                <small>
                  {t(`products.content.header.text.${number}`)}
                </small>
                {number === 2 && <CLink onClick={onFilterCategory} role='button'>
                  <CIcon className="ms-2" icon='filteredTriangles' />
                </CLink>
                }
              </CTableHeaderCell>
            }) :
              materialTableHeader.map(title => {
                return <CTableHeaderCell className="py-3 text-nowrap" key={title}>
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
        {isLoading && <LoaderProduct />}
        {(!isLoading && !!products.length) && <TableBodyContent onEditClick={onEditClick} products={products} t={t} productType={productType} />}
        {(!isLoading && !products.length) && <EmptyProductsContent productType={productType}
          locateToCreateProductPage={locateToCreateProductPage}
          locateToCreateMaterialPage={locateToCreateMaterialPage}
          moveToCreateSemiReadyPage={moveToCreateSemiReadyPage}
          t={t}
        />}
      </CTable>
    </>
  )
}

const DefaultProductsContentView = ({
  onEditClick,
  materialData,
  locateToCreateCategoryMaterialPage,
  moveToCreateSemiReadyPage,
  locateToCreateProductCategoryPage,
  locateToCreateMaterialPage,
  products,
  productType,
  isLoading,
  locateToCreateProductPage,
  onRadioChange,
  searchProducts,
  resetSearchProducts,
  onFilterChange,
  filteredFormData,
  onFilterCategory,
  filterProductsByStatus,
  ...rest
}) => {
  const { t } = useTranslation()
  return (
    <>
      <CardHeader bgColor={true} titleColor={true} title={t('products.title.default')}>
        <DefaultProductsHeaderContent
          isLoading={isLoading}
          searchProducts={searchProducts}
          onFilterChange={onFilterChange}
          resetSearchProducts={resetSearchProducts}
          filteredFormData={filteredFormData}
          locateToCreateCategoryMaterialPage={locateToCreateCategoryMaterialPage}
          locateToCreateProductCategoryPage={locateToCreateProductCategoryPage}
          locateToCreateMaterialPage={locateToCreateMaterialPage}
          moveToCreateSemiReadyPage={moveToCreateSemiReadyPage}
          locateToCreateProductPage={locateToCreateProductPage}
          type={productType}
          t={t}
          filterProductsByStatus={filterProductsByStatus}
          products={products}
          onRadioChange={onRadioChange}
          {...rest}
        />
      </CardHeader>
      <ProductsTable onEditClick={onEditClick}
        materialData={materialData}
        t={t}
        onFilterCategory={onFilterCategory}
        products={products}
        productType={productType}
        isLoading={isLoading}
        locateToCreateProductPage={locateToCreateProductPage}
        locateToCreateMaterialPage={locateToCreateMaterialPage}
        moveToCreateSemiReadyPage={moveToCreateSemiReadyPage}
      />
    </>
  )
}

export default DefaultProductsContentView
