import { NavLink } from 'react-router-dom'
import CIcon from '@coreui/icons-react'
import { CNavItem } from '@coreui/react'
import i18n from 'i18next'


const _nav = [
  {
    component: CNavItem,
    name: i18n.t('sidebar.nav.link.1'),
    as: NavLink,
    anchor: i18n.t('sidebar.nav.link.1'),
    to: '/dashboard',
    icon: <CIcon icon="home" customClassName="nav-icon no-events" />,
  },
  {
    component: CNavItem,
    name: i18n.t('sidebar.nav.link.2'),
    as: NavLink,
    anchor: i18n.t('sidebar.nav.link.2'),
    to: '/products',
    icon: <CIcon icon="products" customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: i18n.t('sidebar.nav.link.3'),
    as: NavLink,
    anchor: i18n.t('sidebar.nav.link.3'),
    to: '/warehouse',
    icon: <CIcon icon="warehouse" customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: i18n.t('sidebar.nav.link.4'),
    as: NavLink,
    anchor: i18n.t('sidebar.nav.link.4'),
    to: '/production',
    icon: <CIcon icon="launchIntoProduction" customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: i18n.t('sidebar.nav.link.5'),
    as: NavLink,
    anchor: i18n.t('sidebar.nav.link.5'),
    to: '/orders',
    icon: <CIcon icon="orders" customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: i18n.t('sidebar.nav.link.6'),
    as: NavLink,
    anchor: i18n.t('sidebar.nav.link.6'),
    to: '/plan',
    icon: <CIcon icon="productionPlan" customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: i18n.t('sidebar.nav.link.7'),
    as: NavLink,
    anchor: i18n.t('sidebar.nav.link.7'),
    to: '/clients',
    icon: <CIcon icon="clients" customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: i18n.t('sidebar.nav.link.8'),
    as: NavLink,
    anchor: i18n.t('sidebar.nav.link.8'),
    to: '/tasks',
    icon: <CIcon icon="tasks" customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: i18n.t('sidebar.nav.link.9'),
    as: NavLink,
    anchor: i18n.t('sidebar.nav.link.9'),
    to: '/reports',
    icon: <CIcon icon="reports" customClassName="nav-icon" />,
  },
]

export default _nav
