import { useDropzone } from 'react-dropzone'
import { CCol } from '@coreui/react'
import CIcon from '@coreui/icons-react'

function PhotoUploader({ handleUploadImage }) {
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: async ([acceptedFile]) => {
      const fd = new FormData()
      await fd.append('file', acceptedFile, acceptedFile.name)
      await handleUploadImage(Object.assign(acceptedFile, {
        preview: URL.createObjectURL(acceptedFile)
      }))
    }
  })

  return (
    <CCol md={3} {...getRootProps({ className: 'd-flex p-0 border-primary border dropzone flex-column flex-md-row align-items-center justify-content-center image-card-photo rounded-3' })}>
      <input {...getInputProps()} />
      <CIcon width={80} height={80} icon='addImagePlus' />
    </CCol>
  );
}

export default PhotoUploader
