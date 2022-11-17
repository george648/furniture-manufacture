import React, { useEffect, useState } from 'react'
import { CSidebar, CSidebarBrand, CSidebarNav } from '@coreui/react'
import { useTranslation } from 'react-i18next'
import { AppSidebarNav } from './AppSidebarNav'
import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'
import navigation from '../_nav'

const AppSidebar = () => {
  const { t } = useTranslation()
  const [nav, setNav] = useState([])

  useEffect(() => {
    const withTranslationsNav = navigation.map((navItem, index) => {
      navItem.anchor = t(`sidebar.nav.link.${index}`)
      navItem.name = t(`sidebar.nav.link.${index}`)

      return navItem
    })
    setNav(withTranslationsNav)
  }, [])

  return (
    <CSidebar position="fixed">
      <CSidebarBrand className="pe-4 me-5" to="/">
        <span className="fs-6 fw-bold ms-5">{t('sidebar.title')}</span>
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar className="ms-4 nav-tabs">
          {nav.length && <AppSidebarNav items={ nav }/> }
        </SimpleBar>
      </CSidebarNav>
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
