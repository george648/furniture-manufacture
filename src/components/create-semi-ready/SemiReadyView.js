import classnames from 'classnames'
import {
  CCardBody,
  CRow,
  CCol,
  CFormLabel,
  CFormInput,
  CContainer,
  CFormSelect,
  CFormTextarea,
  CTabContent,
  CTabPane,
  CImage,
  CLink,
  CForm,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { useTranslation } from 'react-i18next'
import { IconButton } from '../IconButton'
import PhotoUploader from './photo-uploader/PhotoUploader'
import FileUploader from './file-uploader/FileUploader'
import { CardHeader } from '../CardHeader'
import Loader from '../loaders/intermittent'
import CreateSemiReadyHeaderContent
  from 'src/components/create-semi-ready/create-semi-ready-header-content/CreateSemiReadyHeaderContent'
import document from '../../assets/images/svg/document.svg'

const CompositionForm = ({
                           onMaterialChange,
                           checkedCategory,
                           materials,
                           parameters,
                           id: form,
                           formIndex,
                           addNewParamsRow,
                           t,
                           formData,
                           onParameterChange
                         }) => {
  const [headerTitle] = parameters
  return (
    <CContainer key={ form }
                className="border border-secondary rounded-3 col-8 align-items-center overflow-auto ms-0 py-3 px-0">
      <CRow className="flex-nowrap ms-0">
        { headerTitle?.map((element, index) => {
            return (
              <CCol
                xs={ index === 0 ? 4 : Math.floor(12 / headerTitle.length) < 3 ? 4 : Math.floor(12 / headerTitle.length) }
                className="py-2 ps-4"
                key={ `${ formIndex }${ form }${ element.value }${ element.name }${ element.parameter_id }` }>
                <small className="ms-1">{ element.name }</small>
              </CCol>
            )
          }
        ) }
      </CRow>
      { parameters.map((element, i) => (
        <CRow key={ `${ i }${ formIndex }${ form }` }
              className={ classnames("flex-nowrap ms-0", { "bg-secondary": i % 2 === 0 }) }>
          { element?.map(({ name, parameter_id }, index) => {
            return (
              index === 0
                ? (
                  <CCol key={ `${ element.id }${ form }${ index }` } className={ classnames("pt-2 pb-2 ps-4", { "bg-secondary": i % 2 === 0 })}
                        xs={ 4 }>
                    <CFormSelect className="ps-1 border-secondary"
                                 name={ parameter_id }
                                 onChange={ onMaterialChange }
                                 value={ formData.techData[formIndex].parameters[i][index].value }
                    >
                      { materials.map(({ product_name, id }) => {
                        return (<option
                          key={ `${ formIndex }${ product_name }${ element.id }${ id }${ index }` }
                          data-form={ form }
                          data-row={ i }
                          value={ id }
                          label={ product_name }
                        />)
                      }) }
                    </CFormSelect>
                  </CCol>)
                : (
                  <CCol key={ `${ element.id }${ form }${ index }` } className={ classnames("pt-2 pb-2 ps-4", { "bg-secondary": i % 2 === 0 })}
                        xs={ Math.floor(12 / headerTitle.length) < 3 ? 4 : Math.floor(12 / headerTitle.length) }>
                    <CFormInput
                      key={ `${ name }${ index }${ parameter_id }` }
                      className="border-0 bg-transparent ps-1 small-text"
                      name={ parameter_id }
                      value={ formData.techData[formIndex].parameters[i][index].value || '' }
                      data-form={ form }
                      data-row={ i }
                      onChange={ onParameterChange }
                      placeholder={ name.toUpperCase() }
                    />
                  </CCol>)
            )
          }) }
        </CRow>
      )) }
      <CRow className="mt-3">
        <CCol className="ms-4" xs={ 10 }>
          <IconButton
            data-id={ form }
            onClickHandler={ addNewParamsRow }
            textWhite={ false }
            icon="bluePlus"
            textPrimary={ true }
            text={ t('products.content.teachMap.form.inputGroup.addButton') }/>
        </CCol>
      </CRow>
    </CContainer>
  )
}
const CreateNewProductForm = ({
                                onMaterialChange,
                                materials,
                                addNewParamsRow,
                                onParameterChange,
                                formData,
                                parameters,
                                id,
                                checkedCategory,
                                formIndex,
                                onTechCategoryChange,
                                shallowMaterialCategories,
                                t
                              }) => {
  const options = shallowMaterialCategories.map(el => ({ ...el, formId: id }))
  const suggestedMaterials = materials.filter(material => material.category_id === checkedCategory && material.is_included)
  return (
    <CContainer fluid className="mx-0 mb-4">
      <CRow className="mb-3 align-items-center">
        <CCol xs={ 3 } className="ps-0">
          <CFormLabel className="ps-0 fs-5 text-black">{ t('products.content.teachMap.form.label.name') }</CFormLabel>
        </CCol>
        <CCol sm={ 8 } className="px-0">
          <CFormSelect className="ps-4 border-secondary"
                       onChange={ onTechCategoryChange }
                       name='newProductName'
                       value={ checkedCategory }
          >
            { options.map(({ value, label, formId }) => (
              <option key={ `${ formId }${ value }` } data-id={ formId } value={ value }>{ label }</option>
            )) }
          </CFormSelect>
        </CCol>
      </CRow>
      <CRow>
        <CCol className="ps-0" xs={ 3 }>
          <small className="ps-0">{ t('products.content.teachMap.form.label.composition') }:</small>
        </CCol>
        <CompositionForm onMaterialChange={ onMaterialChange } materials={ suggestedMaterials } formData={ formData }
                         t={ t } addNewParamsRow={ addNewParamsRow } onParameterChange={ onParameterChange }
                         key={ `composition_form_${ formIndex }${ id }` } formIndex={ formIndex } id={ id }
                         parameters={ parameters }/>
      </CRow>
    </CContainer>
  )
}

const TechMap = ({
                   onMaterialChange,
                   materials,
                   activeKey,
                   deleteDownLoadedFileHandler,
                   handleDeleteTechMapDocument,
                   formData,
                   filesData,
                   addNewMaterial,
                   t,
                   handleUploadFiles,
                   addNewParamsRow,
                   onParameterChange,
                   shallowMaterialCategories,
                   onTechCategoryChange,
                   isCategoryLoading,
                   uploadDocumentWhileEditMode,
                   ...rest
                 }) => {
  return (
    <CTabContent>
      <CTabPane key='tab_pane_2' visible={ activeKey === 2 }>
        <div key="stable" className="tech-data">
          { formData.techData.map((el, formIndex) => <CreateNewProductForm onMaterialChange={ onMaterialChange }
                                                                           materials={ materials } formData={ formData }
                                                                           t={ t } addNewParamsRow={ addNewParamsRow }
                                                                           onParameterChange={ onParameterChange }
                                                                           shallowMaterialCategories={ shallowMaterialCategories }
                                                                           onTechCategoryChange={ onTechCategoryChange }
                                                                           key={ el.id }
                                                                           formIndex={ formIndex } { ...el } />) }
          { !!filesData.length && <CContainer fluid className="px-0 d-flex flex-wrap">
            { filesData.map(({ id, file: {preview, name, id: fileId }}) => {
              return (
                <CCol key={ id || fileId } md={ 3 }
                      className="p-0 position-relative rounded-3 image-card-photo border mb-3 border-primary d-flex me-4">
                    <CLink
                      onClick={ rest.rest.history.location.state ? handleDeleteTechMapDocument : () => deleteDownLoadedFileHandler(id || fileId) }
                      role='button'
                      data-doc={fileId}
                      data-product={rest.rest.history.location.state?.id}
                      className="position-absolute top-0 start-100 translate-middle">
                      <CIcon icon='crossClose' className="pointer-event-none" />
                    </CLink>
                  <CRow className="align-items-center justify-content-center overflow-hidden mx-0">
                    <CImage className="w-50 h-50 rounded-3 object-fit-cover" src={ document }/>
                    <CLink target="_blank" href={preview}>{`Загрузить ${name || 'документ'}`}</CLink>
                  </CRow>
                </CCol>
              )
            }) }
          </CContainer>
          }
          <CContainer fluid className="mt-4 d-flex mx-0 mb-3 px-0">
            { !!formData.techData.length && <CCol xs={ 3 }/> }
            <div className='me-3'>
              <IconButton
                onClickHandler={ addNewMaterial }
                textWhite={ false }
                textPrimary={ true }
                text={ t('products.content.teachMap.button.additionMaterial') }
                icon='bluePlus'
              />
            </div>
            <div>
              <FileUploader t={t} handleUploadFiles={ rest.rest.history.location.state ? uploadDocumentWhileEditMode : handleUploadFiles }/>
            </div>
          </CContainer>
        </div>

        <div key="to_print" className="tech-data-to-print">
          <span className="text-black fs-5">ТЕХ. КАРТА ЛОТ №{formData.main?.model || ''} </span>
          <br />
          <br />
          <span className="fs-6 text-black">ИЗДЕЛИЕ: {formData.main?.product_name || ''}</span>
          <br />
          <br />
          {formData.techData.map((el, formIndex) => {
            return (
              <div className="border-bottom border-primary border-2 pb-3" key={`to_print_${formIndex}`}>
                <div className="text-black mt-2">{shallowMaterialCategories.find(element => element.value === el.checkedCategory)?.label}</div>
                <br />
                {el.parameters.map((element, paramIndex) => {

                  return (<CRow className="d-inline-block d-flex" key={`to_print_element_${paramIndex}${formIndex}`}>{
                    element.map(({name, value}, index) => {
                      const materialName = materials.filter(material => material.is_included).find(elem => {
                        return elem.id === value
                      })?.product_name

                      return (
                        <CCol key={`${name}${paramIndex}${formIndex}${value}`}>
                          <CCol className="printed-tech-map">
                            <CRow>
                              <small className="text-black text-nowrap">
                                {name}
                              </small>
                            </CRow>
                            <CRow className="mb-2">
                              <small className="text-black">
                                {index === 0
                                  ? materialName || materials.find(filtered => filtered.category_id === el.checkedCategory)?.product_name
                                  : value}
                              </small>
                            </CRow>
                          </CCol>
                        </CCol>
                      )
                    })
                  }</CRow>)
                })}
              </div>
            )
          })}
        </div>
      </CTabPane>
    </CTabContent>
  )
}

const Photo = ({ activeKey, imagesData, deleteDownLoadedImageHandler, handleUploadImage, uploadImageWhileEditMode, handleDeletePhoto, t, ...rest }) => {
  return (
    <CTabContent>
      <CTabPane key='tab_pane_3' visible={ activeKey === 3 }>
        <CRow className="m-0">
          { !!imagesData?.length && imagesData.map(({ id, file: {preview, id: photoId} }) => {
            return (
              <CCol key={ id || photoId } md={ 3 }
                    className="p-0 position-relative rounded-3 image-card-photo border mb-3 border-primary d-flex me-4">
                <CLink
                  onClick={ rest.rest.history.location.state ? handleDeletePhoto : () => deleteDownLoadedImageHandler(id) }
                  data-doc={photoId}
                  data-product={rest.rest.history.location.state?.id}
                  role='button'
                  className="position-absolute top-0 start-100 translate-middle">
                  <CIcon icon="crossClose" className="pointer-event-none" />
                </CLink>
                <CImage className="w-100 h-100 rounded-3 object-fit-cover" src={ preview }/>
              </CCol>
            )
          })}
          <PhotoUploader handleUploadImage={rest.rest.history.location.state ? uploadImageWhileEditMode : handleUploadImage} />
        </CRow>
      </CTabPane>
    </CTabContent>
  )
}

const SemiReadyView = ({
                         handleDeleteTechMapDocument,
                         materials,
                         saveProductData,
                         validated,
                         filesData,
                         handleUploadFiles,
                         imagesData,
                         formData,
                         deleteDownLoadedImageHandler,
                         handleUploadImage,
                         onChange,
                         addNewMaterial,
                         addNewParamsToProduct,
                         inputData,
                         activeKey,
                         setActiveKey,
                         categoryOptions,
                         shallowMaterialCategories,
                         addNewParamsRow,
                         onTechCategoryChange,
                         statusOptions,
                         onParameterChange,
                         onMaterialChange,
                         isLoading,
                         checkedFormData,
                         deleteDownLoadedFileHandler,
                         isSemiReadyLoading,
                         printTechMap,
                         isCategoryLoading,
                         uploadImageWhileEditMode,
                         handleDeletePhoto,
                         uploadDocumentWhileEditMode,
                         productionLoading,
                         productsByTypeLoading,
                         mainLoading,
                         ...rest
                       }) => {
  const { t } = useTranslation()
  return (
    <>
      <CardHeader title={ t('products.title.create') } className="tech-data-header">
        <CreateSemiReadyHeaderContent
          checkedFormData={checkedFormData}
          saveProductData={ saveProductData }
          activeKey={ activeKey }
          printTechMap={printTechMap}
          setActiveKey={ setActiveKey }
          mainLoading={ mainLoading }
          t={t}
          { ...rest }
        />
      </CardHeader>
      <CCardBody className="p-0">
      { mainLoading ? <Loader /> : <CContainer className="mt-4 px-3" fluid>
            <CTabContent>
              <CTabPane key='tab_pane_1' visible={ activeKey === 1 }>
                <CForm>
                  {inputData.map(({ name, label, isTextArea, isFormSelect, category, id }) => {
                    return <CRow noValidate className={classnames('mb-3', { 'align-items-center': !isTextArea })} key={id}>
                      <CCol xs={2}>
                        <CFormLabel className="text-black mb-0">
                          {t(`products.content.create.form.label.${label}`)}
                        </CFormLabel>
                      </CCol>
                      <CCol className="ps-0" sm={9}>
                        {
                          isTextArea && <CFormTextarea className="resize-0"
                                                       placeholder={ t(`products.content.create.form.placeholder.${ name }`) }
                                                       onChange={ (event) => onChange('main', event) }
                                                       value={ formData.main[name] }
                                                       name='description'
                                                       rows='4'
                          />
                        }
                        { isFormSelect &&
                        <CFormSelect
                          value={ formData.main[name] }
                          name={ name }
                          onChange={ (event) => onChange('main', event) }>
                          { category && categoryOptions?.map(({ name, id }) =>
                            <option key={ id+1 } value={ name }>{ name }</option>
                          ) }
                          { !category && statusOptions?.map(({ value, name }) =>
                            <option key={ name } value={ value }>{ name }</option>
                          ) }
                        </CFormSelect> }
                        { !isFormSelect && !isTextArea &&
                        <CFormInput value={ formData.main[name] }
                                    name={ name }
                                    key={ name }
                                    invalid={ (!formData.main[name].trim()) }
                                    onChange={ (event) => onChange('main', event) }
                                    placeholder={ t(`products.content.create.form.placeholder.${ name }`) }
                        /> }
                      </CCol>
                    </CRow>
                  }) }
                </CForm>
              </CTabPane>
              <TechMap key='techMap' onMaterialChange={ onMaterialChange }
                       onParameterChange={ onParameterChange }
                       handleDeleteTechMapDocument={ handleDeleteTechMapDocument }
                       shallowMaterialCategories={ shallowMaterialCategories }
                       onTechCategoryChange={ onTechCategoryChange }
                       addNewParamsRow={ addNewParamsRow }
                       formData={ formData }
                       t={ t }
                       uploadDocumentWhileEditMode={uploadDocumentWhileEditMode}
                       isCategoryLoading={ isCategoryLoading }
                       materials={ materials }
                       activeKey={ activeKey }
                       filesData={ filesData }
                       addNewMaterial={ addNewMaterial }
                       deleteDownLoadedFileHandler={ deleteDownLoadedFileHandler }
                       handleUploadFiles={ handleUploadFiles }
                       rest={rest}
              />
              <Photo key='photo' 
                     t={t} 
                     deleteDownLoadedImageHandler={ deleteDownLoadedImageHandler } 
                     activeKey={ activeKey }
                     handleUploadImage={ handleUploadImage } 
                     handleDeletePhoto={handleDeletePhoto} 
                     imagesData={ imagesData } 
                     uploadImageWhileEditMode={uploadImageWhileEditMode} 
                     rest={ rest }/>
            </CTabContent>
        </CContainer>}
      </CCardBody>
    </>
  )
}

export default SemiReadyView
