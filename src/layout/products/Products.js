import React, { Suspense, useState } from 'react'
import { CCard } from '@coreui/react'
import Loader from 'src/components/loaders/intermittent'
import { useHistory } from "react-router-dom"
import { Route, Switch } from 'react-router-dom'
import routes from './routes'
import { createNewCategoryParameters } from 'src/services'

const Products = () => {
  const history = useHistory()

  const [createProductCategoryFormData, setCreateProductCategoryFormData] = useState({
    name: '',
    status: false
  })
  const onCreateProductCategoryChange = ({ target: { name, value } }) => {
    setCreateProductCategoryFormData({
      ...createProductCategoryFormData,
      [name]: value === 'false' ? false : value
    })
  }

  const [paramsOptions, setParamsOptions] = useState([])
  const [createCategoryMaterialFormData, setCreateCategoryMaterialFormData] = useState({
    name: '',
    parameters: [],
    status: false,
  })
  const onChangeCategoryMaterial = ({ target: { name, value } }) => {
    setCreateCategoryMaterialFormData({
      ...createCategoryMaterialFormData,
      [name]: value
    })
  }
  const onCreateSelectCategoryMaterial = async (currentOptionsArray, { action, option }) => {
    if (action === 'remove-value') {
      setCreateCategoryMaterialFormData({
        ...createCategoryMaterialFormData,
        parameters: currentOptionsArray.map(parameter => parameter.value)
      })
    }

    if (action !== 'remove-value') {
      const existingValue = paramsOptions.find(parameter => parameter.value === option.value)
      if (existingValue) {
        setCreateCategoryMaterialFormData({
          ...createCategoryMaterialFormData,
          parameters: currentOptionsArray.map(parameter => parameter.value)
        })
      } else {
        const response = await createNewCategoryParameters({ name: option.value })
        if (response.status === 200) {
          const mappedOptions = response.data.map(parameter => {
            return { value: parameter.id, label: parameter.name }
          })
          setParamsOptions(mappedOptions)
          const [newValue] = response.data.filter(item => item.name === option.label).map(parameter => {
            return { value: parameter.id, label: parameter.name }
          })
          currentOptionsArray.splice(-1, 1, newValue)

          setCreateCategoryMaterialFormData({
            ...createCategoryMaterialFormData,
            parameters: currentOptionsArray.map(parameter => parameter.value)
          })
        }
      }
    }
  }

  const [type, setType] = useState('ready')

  const onRadioChange = ({ target: { dataset: { type } } }) => {
    setType(type)
  }

  const [activeKey, setActiveKey] = useState(1)

  const locateToCreateProductPage = () => {
    history.push('/products/create')
  }

  const moveToCreateSemiReadyPage = () => {
    history.push('/products/create-semi-ready')
  }

  const locateToDefaultProductPage = () => {
    history.push('/products')
  }

  const locateToCreateProductCategoryPage = () => {
    history.push('/products/create-product-category')
  }

  const locateToCreateCategoryMaterialPage = () => {
    history.push('/products/create-category-material')
  }

  const locateToCreateMaterialPage = () => {
    history.push('/products/create-material')
  }

  const moveToCategoriesPage = () => {
    history.push('/products/categories')
  }

  return (
    <CCard>
      <Suspense fallback={<Loader />}>
        <Switch>
          {routes.map((route, idx) => {
            return (
              route.component && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  render={(props) => (
                    <>
                      <route.component
                        locateToDefaultProductPage={locateToDefaultProductPage}
                        locateToCreateMaterialPage={locateToCreateMaterialPage}
                        locateToCreateProductCategoryPage={locateToCreateProductCategoryPage}
                        locateToCreateCategoryMaterialPage={locateToCreateCategoryMaterialPage}
                        locateToCreateProductPage={locateToCreateProductPage}
                        onRadioChange={onRadioChange}
                        setParamsOptions={setParamsOptions}
                        paramsOptions={paramsOptions}
                        moveToCreateSemiReadyPage={moveToCreateSemiReadyPage}
                        createCategoryMaterialFormData={createCategoryMaterialFormData}
                        onChangeCategoryMaterial={onChangeCategoryMaterial}
                        onCreateSelectCategoryMaterial={onCreateSelectCategoryMaterial}
                        onCreateProductCategoryChange={onCreateProductCategoryChange}
                        createProductCategoryFormData={createProductCategoryFormData}
                        activeKey={activeKey}
                        moveToCategoriesPage={moveToCategoriesPage}
                        setActiveKey={setActiveKey}
                        history={history}
                        setCreateCategoryMaterialFormData={setCreateCategoryMaterialFormData}
                        setCreateProductCategoryFormData={setCreateProductCategoryFormData}
                        type={type}
                        {...props} />
                    </>
                  )}
                />
              )
            )
          })}
        </Switch>
      </Suspense>
    </CCard>
  )
}

export default Products
