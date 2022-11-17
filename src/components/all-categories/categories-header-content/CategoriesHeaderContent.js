import { CButton } from '@coreui/react'

export const CategoriesHeaderContent = ({
  type,
  locateToCreateCategoryMaterialPage,
  locateToCreateProductCategoryPage,
  locateToDefaultProductPage,
  t,
}) => {
  return (
    <div className="d-flex justify-content-end">
      <CButton onClick={ type=== 'ready' ? locateToCreateProductCategoryPage : locateToCreateCategoryMaterialPage } className="text-black border border-body bg-white me-3">{t('products.categories.create_button')}</CButton>
      <CButton onClick={locateToDefaultProductPage} className="text-black border border-body bg-white">{t('products.categories.back_button')}</CButton>
    </div>
  )
}
