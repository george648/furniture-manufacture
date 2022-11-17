import { CButtonGroup, CDropdown, CDropdownToggle, CDropdownItem, CDropdownMenu, CRow, CCol, CFormLabel, CFormInput, CButton } from '@coreui/react'
import RegularLoader from 'src/components/loaders/regular'
import { filteredWareHouseForm, filteredWareHouseFormMaterial } from 'src/constants/formLists'

const ProductionCategory = ({ productionLoading, typeProduction, productions, onChangeProductionHandler }) => {
  return (
    <CButtonGroup role="group" className="d-flex material-dropdown me-2">
      <CDropdown className="d-flex w-100" variant="btn-group">
        {productionLoading ?
          <RegularLoader size="sm" classes="text-white" /> :
          <CDropdownToggle className="bg-white border-body border text-black col-12">
            {typeProduction.name.toUpperCase()}
          </CDropdownToggle>}
        <CDropdownMenu className="w-100">
          {productions?.map(({ name, id }) => {
            return <CDropdownItem key={id} data-id={id} className="p-0 d-flex text-black" role="button">
              <small
                className="py-2 px-3"
                onClick={onChangeProductionHandler}
                data-id={id}
              >
                {name.toUpperCase()}
              </small>
            </CDropdownItem>
          })}
        </CDropdownMenu>
      </CDropdown>
    </CButtonGroup>
  )
}

const CategoryGroupButtons = ({ t, onProductCategoryChange, type, loading }) => {
  return (
    <CButtonGroup role="group" className="d-flex material-dropdown mx-2">
      <CDropdown className="d-flex w-100" variant="btn-group">
        <CDropdownToggle disabled={loading} className="border-body border bg-white text-black col-12">{t(type)}</CDropdownToggle>
        <CDropdownMenu className="w-100">
          <CDropdownItem className="p-0 d-flex text-black" role='button'>
            <small
              className="py-2 px-3"
              onClick={onProductCategoryChange}
              data-type="semi_ready"
            >
              {t('semi_ready')}
            </small>
          </CDropdownItem>
          <CDropdownItem className="p-0 d-flex text-black" role='button'>
            <small
              className="py-2 px-3"
              onClick={onProductCategoryChange}
              data-type="ready"
            >
              {t('ready')}
            </small>
          </CDropdownItem>
          <CDropdownItem className="p-0 d-flex text-black" role='button'>
            <small
              className="py-2 px-3"
              onClick={onProductCategoryChange}
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

export const DefaultWarehouseHeaderContent = ({ onProductCategoryChange, 
                                                resetSearchProducts,
                                                searchProducts,
                                                type,
                                                productions,
                                                onChangeProductionHandler,
                                                typeProduction,
                                                productionLoading,
                                                formData,
                                                onChange,
                                                loading,
                                                t
                                              }) => {
  return (
    <div className="d-flex justify-content-end">
      {type === 'ready' && <ProductionCategory productionLoading={productionLoading} typeProduction={typeProduction} productions={productions} onChangeProductionHandler={onChangeProductionHandler} />}
      <CategoryGroupButtons loading={loading} t={t} onProductCategoryChange={onProductCategoryChange} type={type} />
      <CDropdown className="mx-2" variant="btn-group">
        <CDropdownToggle disabled={loading} className="border-body border bg-white text-black">{t('products.header.default.buttonGroup.4')}</CDropdownToggle>
        <CDropdownMenu className="bg-primary pt-0">
          <CDropdownItem style={{ width: '26rem' }} className="text-black py-0 px-3">
            <CRow className="d-flex">
              {type === 'material' ? filteredWareHouseFormMaterial.map(({ name }) => {
                return <CCol className="text-white mt-2" xs={6} key={name}>
                  <CFormLabel>{t(`products.header.filteredGroup.label.${name}`)}</CFormLabel>
                  <CFormInput onChange={onChange} placeholder={t(`products.header.filteredGroup.label.${name}`)} value={formData[name]} name={name} />
                </CCol>
              }) :
                filteredWareHouseForm.map(({ name }) => {
                  return <CCol className="text-white mt-2" xs={6} key={name}>
                    <CFormLabel>{t(`products.header.filteredGroup.label.${name}`)}</CFormLabel>
                    <CFormInput onChange={onChange} placeholder={t(`products.header.filteredGroup.label.${name}`)} value={formData[name]} name={name} />
                  </CCol>
                })
              }
              <CCol className="mt-4 d-flex justify-content-between" xs={6}>
                <CButton onClick={searchProducts} className="border border-white mt-3 rounded-2 text-white">{t('products.header.filteredGroup.button')}</CButton>
                <CButton onClick={resetSearchProducts} className="border border-white mt-3 rounded-2 text-white">{t('products.header.filteredGroup.button.reset')}</CButton>
              </CCol>
            </CRow>
          </CDropdownItem>
        </CDropdownMenu>
      </CDropdown>
    </div>
  )
}
