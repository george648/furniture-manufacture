import { useTranslation } from 'react-i18next'
import { CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CLink } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import classnames from 'classnames'
import Loader from 'src/components/loaders/intermittent'
import { CardHeader } from 'src/components/CardHeader'
import { CategoriesHeaderContent } from 'src/components/all-categories/categories-header-content/CategoriesHeaderContent'

const categoryHeaderTitles = ['category_name', 'category_status']

const EmptyCategoriesContent = ({ t }) => {
  return (
    <CTableBody>
      <tr>
        <td colSpan={8}>
          <CTable cols={8}>
            <CTableBody>
              <tr>
                <td colSpan={8} className="d-flex align-items-center justify-content-center h-100">
                  <span className="empty-table-text-color">{t('products.content.categories.title.empty_text')}</span>
                </td>
              </tr>
            </CTableBody>
          </CTable>
        </td>
      </tr>
    </CTableBody>
  )
}

const LoaderCategory = () => {
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

const TableBodyContent = ({ categories, t, onEditClick }) => {
  return (
    <CTableBody>
      {categories.map(({ name, id, status }) => {
        return (
          <CTableRow className="border-top" key={id}>
            <CTableDataCell><small className="ps-2">{name}</small></CTableDataCell>
            <CTableDataCell className="d-flex justify-content-between">
              <small>{status ? t('products.content.text.included') : t('products.content.text.unIncluded')}</small>
              <CLink role='button' data-id={id} onClick={onEditClick}>
                <CIcon className="pointer-event-none me-3" icon='pencil' />
              </CLink>
            </CTableDataCell>
          </CTableRow>)
      })}
    </CTableBody>
  )
}

const CategoriesTable = ({ isLoading, onEditClick, t, categories, onFilterCategory }) => {
  return (
    <>
      <CTable className={classnames({ 'h-100': !categories.length })} align="middle" striped>
        <CTableHead className="default-product-view striped-bg-color border-top">
          <CTableRow>
            {categoryHeaderTitles.map((name) => {
              return <CTableHeaderCell className="py-2 col-md-10" key={name}>
                <small>{t(`products.content.categories.title.${name}`)}</small>
                {name === 'category_name' && <CLink onClick={onFilterCategory} role='button'>
                  <CIcon className="ms-2" icon='filteredTriangles' />
                </CLink>}
              </CTableHeaderCell>
            })}
          </CTableRow>
        </CTableHead>
        {isLoading && <LoaderCategory />}
        {(!isLoading && !!categories.length) && <TableBodyContent categories={categories} onEditClick={onEditClick} t={t} />}
        {(!isLoading && !categories.length) && <EmptyCategoriesContent t={t} />}
      </CTable>
    </>
  )
}

const AllCategoriesView = ({
  productType,
  isLoading,
  locateToDefaultProductPage,
  onEditClick,
  categories,
  onFilterCategory,
  locateToCreateCategoryMaterialPage,
  locateToCreateProductCategoryPage,
  ...rest
}) => {
  const { t } = useTranslation()
  return (
    <>
      <CardHeader bgColor={true} titleColor={true} title={t('products.categories.title')}>
        <CategoriesHeaderContent
          isLoading={isLoading}
          locateToCreateCategoryMaterialPage={locateToCreateCategoryMaterialPage}
          locateToCreateProductCategoryPage={locateToCreateProductCategoryPage}        
          type={productType}
          t={t}
          locateToDefaultProductPage={locateToDefaultProductPage}
          {...rest}
        />
      </CardHeader>
      <CategoriesTable
        onEditClick={onEditClick}
        onFilterCategory={onFilterCategory}
        t={t}
        categories={categories}
        isLoading={isLoading}
      />
    </>
  )
}

export default AllCategoriesView
