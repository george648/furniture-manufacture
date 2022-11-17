import React from 'react'

const Products = React.lazy(() => import('./layout/products'))
const Orders = React.lazy(() => import('./layout/orders/Orders'))
const Clients = React.lazy(() => import('./layout/Clients'))
const Production = React.lazy(() => import('./layout/Production'))
const Plan = React.lazy(() => import('./layout/Plan'))
const Dashboard = React.lazy(() => import('./layout/Dashboard'))
const Reports = React.lazy(() => import('./layout/Reports'))
const Tasks = React.lazy(() => import('./layout/Tasks'))
const Warehouse = React.lazy(() => import('./layout/warehouse/Warehouse'))
const Profile = React.lazy(() => import('./layout/Profile'))

const routes = [
  { path: '/products', name: 'Products', component: Products },
  { path: '/orders', name: 'Orders', component: Orders },
  { path: '/production', name: 'Production', component: Production },
  { path: '/clients', name: 'Clients', component: Clients },
  { path: '/plan', name: 'Plan', component: Plan },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/reports', name: 'Reports', component: Reports },
  { path: '/tasks', name: 'Tasks', component: Tasks },
  { path: '/warehouse', name: 'Warehouse', component: Warehouse },
  { path: '/profile', name: 'Profile', component: Profile },
]

export default routes
