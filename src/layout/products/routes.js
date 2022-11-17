import CreateProduct from 'src/components/create-product'
import DefaultProductsContent from 'src/components/default-products-content'
import CreateCategoryMaterialContainer from 'src/components/create-category-material'
import CreateProductCategory from 'src/components/create-product-category'
import CreateMaterial from 'src/components/create-material'
import CreateSemiReady  from 'src/components/create-semi-ready'
import Categories from 'src/components/all-categories'

const routes = [
  { path: '/products', exact: true, name: 'Create Product', component: DefaultProductsContent },
  { path: '/products/create', exact: true, name: 'Create Product', component: CreateProduct },
  { path: '/products/create-category-material', exact: true, name: 'Create Material', component: CreateCategoryMaterialContainer },
  { path: '/products/create-product-category', exact: true, name: 'Create Product Category', component: CreateProductCategory },
  { path: '/products/create-material', exact: true, name: 'Create Material', component: CreateMaterial },
  { path: '/products/create-semi-ready', exact: true, name: 'Create Semi Ready ', component: CreateSemiReady },
  { path: '/products/categories', exact: true, name: 'All Categories ', component: Categories },
]

export default routes
