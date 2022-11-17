import { CRow, CCol, CButton, CNav, CNavItem, CNavLink } from '@coreui/react'
import { IconButton } from 'src/components/IconButton'
import { isEmpty } from 'src/utils/emptyObject'

const NavCreateTab = ({ activeKey, setActiveKey, t }) => {
  return (
    <CCol className="d-flex p-0">
      <CCol md={2} />
      <CNav className="ms-3 align-items-center" variant="pills" role="tablist">
        <CNavItem>
          <CNavLink
            className="ps-0 pe-2"
            role="button"
            active={activeKey === 1}
            onClick={() => setActiveKey(1)}
          >
            {t('products.header.create.navTab.data')}
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink
            className="px-0"
            role="button"
            active={activeKey === 2}
            onClick={() => setActiveKey(2)}
          >
            {t('products.header.create.navTab.teachMap')}
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink
            className="ps-2"
            role="button"
            active={activeKey === 3}
            onClick={() => setActiveKey(3)}
          >
            {t('products.header.create.navTab.photo')}
          </CNavLink>
        </CNavItem>
      </CNav>
    </CCol>
  )
}

const ButtonsBlock = ({t, locateToDefaultProductPage, mainLoading, saveProductData, activeKey, checkedFormData, printTechMap }) => {
  return (
    <CCol className="p-0 d-flex justify-content-end">
      {activeKey === 2 && 
      <CButton className="text-white border-white" onClick={printTechMap}>
        {t('print')}
      </CButton>
      }
      <CButton 
        onClick={saveProductData}
        disabled={mainLoading || isEmpty(checkedFormData)}
        className="text-primary bg-white mx-2"
      >
        {t('saveButton')}
      </CButton>
      <IconButton 
        onClickHandler={locateToDefaultProductPage}
        text={t('cancel')}
        icon="crossUnSave"
      />
    </CCol>
  )
}

export const CreateProductsHeaderContent = ({ saveProductData, activeKey, setActiveKey, locateToDefaultProductPage, mainLoading, checkedFormData, printTechMap, t }) => {
  return (
    <CRow className="p-0 m-0 d-flex justify-content-between align-items-center w-100">
      <NavCreateTab activeKey={activeKey} setActiveKey={setActiveKey} t={t} />
      <ButtonsBlock activeKey={activeKey}
                    saveProductData={saveProductData}
                    locateToDefaultProductPage={locateToDefaultProductPage}
                    t={t}
                    printTechMap={printTechMap}
                    mainLoading={mainLoading}
                    checkedFormData={checkedFormData}
      />
    </CRow>
  )
}

export default CreateProductsHeaderContent
