import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import { I18nextProvider } from 'react-i18next'
import i18n from './i18n';
import { CToast, CToastBody, CToaster, CToastHeader, CToastClose } from '@coreui/react'
import './scss/style.scss'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./pages/login'))
const Register = React.lazy(() => import('./pages/register/Register'))
const Page404 = React.lazy(() => import('./pages/page404/Page404'))
const Page500 = React.lazy(() => import('./pages/page500/Page500'))

const App = ({ isLoggedIn, toast }) => {
  const [push, addToast] = useState()
  const toaster = useRef()

  useEffect(() => {
    if (toast) {
      addToast(() => show(toast))
    }
  }, [toast])

  const show = () => {
    return (
      <CToast title={ toast.error ? i18n.t('defaultErrorTitle') : 'Спасибо!' } autohide={true}>
        <CToastHeader close>
          <svg
            className="rounded me-2"
            width="20"
            height="20"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid slice"
            focusable="false"
            role="img"
          >
            <rect width="100%" height="100%" fill={ toast.error ? '#EB5757' : '#6FCF97' }/>
          </svg>
          <strong className="me-auto">
            { toast.error ? i18n.t('defaultErrorTitle') : i18n.t('congratulations') }
          </strong>
          <CToastClose className="me-2 m-auto" />
        </CToastHeader>
        <CToastBody>{ toast.message || i18n.t('default400Error') }</CToastBody>
      </CToast>
    )
  }

  return (
    <BrowserRouter>
      <React.Suspense fallback={ loading }>
        <I18nextProvider i18n={ i18n }>
          <CToaster ref={ toaster } push={ push } placement="top-end"/>
          <Switch>
            { !isLoggedIn &&
            <Route exact path="/login" name="Login Page" render={ (props) => <Login { ...props } /> }/> }
            <Route
              exact
              path="/register"
              name="Register Page"
              render={ (props) => <Register { ...props } /> }
            />
            <Route exact path="/404" name="Page 404" render={ (props) => <Page404 { ...props } /> }/>
            <Route exact path="/500" name="Page 500" render={ (props) => <Page500 { ...props } /> }/>
            { isLoggedIn
              ? <Route path="/" name="Home" render={ (props) => <DefaultLayout { ...props } /> }/>
              : <Redirect to="/login"/> }
          </Switch>
        </I18nextProvider>
      </React.Suspense>
    </BrowserRouter>
  )
}

const mapStateToProps = ({ isLoggedIn, toast }) => ({
  isLoggedIn,
  toast
})

export default connect(mapStateToProps, null)(App)
