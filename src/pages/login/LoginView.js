import {
  CButton,
  CCard,
  CCol,
  CForm,
  CFormInput,
  CRow,
} from '@coreui/react'
import {useTranslation} from 'react-i18next'
import {CardHeader} from 'src/components/CardHeader'
import RegularLoader from 'src/components/loaders/regular'

const LOGIN_FORM = ['email', 'password']

const LoginView = ({logInHandler, onChange, formData, isLoading}) => {
  const {t} = useTranslation()
  return (
    <div className="min-vh-100 login-container d-flex align-items-center justify-content-center">
      <span className="position-absolute mt-5 ms-5 top-0 start-0 col-1 fw-bold fs-4 text-black">
        {t('login.title')}
      </span>
      <CCol xs={4}>
        <CCard>
          <CardHeader title={t('login.form.title')}/>
          <CForm className="m-0 px-5 py-4 bg-secondary">
            {LOGIN_FORM.map((item) => {
              return (
                <CRow key={item} className="mb-3">
                  <CCol xs={2} className="d-flex align-items-center">
                    <small>
                      {t(`login.form.label.${item}`)}
                    </small>
                  </CCol>
                  <CCol xs={8}>
                    <CFormInput type={item} value={formData?.[item]} name={item} onChange={onChange} id={item}/>
                  </CCol>
                </CRow>
              )
            })}
            <CCol className="d-flex justify-content-center mt-4">
              <CButton onClick={logInHandler} disabled={isLoading} className="px-4 text-white">
                {isLoading ? <RegularLoader classes="text-white"/> : t('login.form.submitButton')}
              </CButton>
            </CCol>
          </CForm>
        </CCard>
      </CCol>
    </div>
  )
}

export default LoginView
