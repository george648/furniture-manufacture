import { CButtonGroup, CDropdown, CDropdownToggle, CDropdownItem, CDropdownMenu, CRow, CCol, CFormLabel, CFormInput, CButton } from '@coreui/react'

const filteredForm = [
  { name: 'model' },
  { name: 'collection' },
  { name: 'category' },
]

const filteredFormMaterial = [
  { name: 'model' },
  { name: 'category' },
]

const CategoryGroupButtons = ({ type, onRadioChange, t, isLoading }) => {
  return (
    <CButtonGroup role="group" className="d-flex material-dropdown" aria-label="Button group with nested dropdown">
      <CDropdown className="d-flex w-100" variant="btn-group">
        <CDropdownToggle disabled={isLoading} className="bg-white border-body border text-black col-12">{t(type)}</CDropdownToggle>
        <CDropdownMenu className="w-100">
          <CDropdownItem className="p-0 d-flex" role='button'>
            <small
              className="py-2 px-3 text-black"
              onClick={onRadioChange}
              data-type="semi_ready"
            >
              {t('semi_ready')}
            </small>
          </CDropdownItem>
          <CDropdownItem className="p-0 d-flex" role='button'>
            <small
              className="py-2 text-black px-3"
              onClick={onRadioChange}
              data-type="ready"
            >
              {t('ready')}
            </small>
          </CDropdownItem>
          <CDropdownItem className="p-0 d-flex" role='button'>
            <small
              className="py-2 text-black px-3"
              onClick={onRadioChange}
              data-type="material"
            >
              {t('material')}
            </small>
          </CDropdownItem>
        </CDropdownMenu>
      </CDropdown>
    </CButtonGroup>
  )
}

const IncludedFilterButtons = ({ filterProductsByStatus, t, isLoading }) => {
  return (
    <CDropdown>
      <CDropdownToggle disabled={isLoading} className="border-body border bg-white text-black me-2" caret={false}>
        {t('products.header.includedFilter.status')}
      </CDropdownToggle>
      <CDropdownMenu className="px-2" placement="bottom-end">
          <CDropdownItem className="p-0" role="button">
            <small
              onClick={filterProductsByStatus}
              data-status="all"
            >
              {t('products.header.includedFilter.all')}
            </small>
          </CDropdownItem>
          <CDropdownItem className="p-0" role="button">
            <small
              onClick={filterProductsByStatus}
              data-status="included"
            >
              {t('products.header.includedFilter.included')}
            </small>
          </CDropdownItem>
          <CDropdownItem className="p-0" role="button">
            <small onClick={filterProductsByStatus}
              data-status="unIncluded"
            >
              {t('products.header.includedFilter.unIncluded')}
            </small>
          </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

const CreateGroupButton = ({ locateToCreateMaterialPage, moveToCreateSemiReadyPage, type, locateToCreateCategoryMaterialPage, locateToCreateProductCategoryPage, locateToCreateProductPage, t }) => {
  return (
    <CDropdown>
      <CDropdownToggle className="border-body border bg-white text-black ms-2" caret={false}>
        {t('products.header.default.buttonGroup.7')}
      </CDropdownToggle>
      <CDropdownMenu placement="bottom-end">
        <CRow className="mx-2">
          {type === 'material' && <> <CDropdownItem onClick={locateToCreateCategoryMaterialPage} className="p-0" role="button">
            <small>
              {t('products.header.default.buttonGroup.5')}
            </small>
          </CDropdownItem>
            <CDropdownItem className="p-0 mt-2" role="button">
              <small onClick={locateToCreateMaterialPage}>
                {t('products.header.default.buttonGroup.9')}
              </small>
            </CDropdownItem>
          </>
          }
          {type === 'ready' && <>
            <CDropdownItem className="p-0" role="button">
              <small onClick={locateToCreateProductCategoryPage}>
                {t('products.header.default.buttonGroup.8')}
              </small>
            </CDropdownItem>
            <CDropdownItem onClick={locateToCreateProductPage} className="p-0 mt-2" role="button">
              <small>
                {t('products.header.default.buttonGroup.6')}
              </small>
            </CDropdownItem>
          </>}
          {type === 'semi_ready' && <CDropdownItem onClick={moveToCreateSemiReadyPage} className="p-0" role="button">
            <small>
              {t('products.header.default.buttonGroup.10')}
            </small>
          </CDropdownItem>}
        </CRow>
      </CDropdownMenu>
    </CDropdown>
  )
}

export const DefaultProductsHeaderContent = ({
  onRadioChange,
  type,
  locateToCreateProductPage,
  moveToCreateSemiReadyPage,
  locateToCreateCategoryMaterialPage,
  locateToCreateProductCategoryPage,
  locateToCreateMaterialPage,
  filteredFormData,
  onFilterChange,
  resetSearchProducts,
  searchProducts,
  isLoading,
  moveToCategoriesPage,
  filterProductsByStatus,
  areProductsIncluded,
  t
}) => {
  return (
    <div className="d-flex justify-content-end">
      <IncludedFilterButtons areProductsInclude={areProductsIncluded} filterProductsByStatus={filterProductsByStatus} isLoading={isLoading} onRadioChange={onRadioChange} t={t} type={type} />
      {type === 'semi_ready' || <CButton className="bg-transparent border-body px-4 me-2 border text-black" onClick={moveToCategoriesPage}>{t('products.header.default.categories')}</CButton>}
      <CategoryGroupButtons isLoading={isLoading} onRadioChange={onRadioChange} t={t} type={type} />
      <CDropdown className="ms-2" variant="btn-group">
        <CDropdownToggle disabled={isLoading} className="bg-white text-black border-body border">{t('products.header.default.buttonGroup.4')}</CDropdownToggle>
        <CDropdownMenu className="bg-primary pt-0">
          <CDropdownItem style={{ width: '26rem' }} className="py-0 px-3">
            <CRow className="d-flex">
              {type === 'material' ? filteredFormMaterial.map(({ name }) => {
                return <CCol className="text-white mt-2" xs={6} key={name}>
                  <CFormLabel>{t(`products.header.products.filteredGroup.label.${name}`)}</CFormLabel>
                  <CFormInput onChange={onFilterChange} placeholder={t(`products.header.products.filteredGroup.label.${name}`)} value={filteredFormData[name]} name={name} />
                </CCol>
              }) :
                filteredForm.map(({ name }) => {
                  return <CCol className="text-white mt-2" xs={6} key={name}>
                    <CFormLabel>{t(`products.header.products.filteredGroup.label.${name}`)}</CFormLabel>
                    <CFormInput onChange={onFilterChange} placeholder={t(`products.header.products.filteredGroup.label.${name}`)} value={filteredFormData[name]} name={name} />
                  </CCol>
                })}
              <CCol className="mt-4 d-flex justify-content-between" xs={6}>
                <CButton onClick={searchProducts} className="border border-white rounded-2 mt-3 text-white">{t('products.header.filteredGroup.button')}</CButton>
                <CButton onClick={resetSearchProducts} className="border border-white rounded-2 mt-3 text-white">{t('products.header.filteredGroup.button.reset')}</CButton>
              </CCol>
            </CRow>
          </CDropdownItem>
        </CDropdownMenu>
      </CDropdown>
      <CreateGroupButton
        t={t}
        type={type}
        locateToCreateProductPage={locateToCreateProductPage}
        locateToCreateProductCategoryPage={locateToCreateProductCategoryPage}
        locateToCreateMaterialPage={locateToCreateMaterialPage}
        locateToCreateCategoryMaterialPage={locateToCreateCategoryMaterialPage}
        moveToCreateSemiReadyPage={moveToCreateSemiReadyPage}
      />
    </div>
  )
}
