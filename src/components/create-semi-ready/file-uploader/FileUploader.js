import { useDropzone } from 'react-dropzone'
import { IconButton } from 'src/components/IconButton'

function PhotoUploader({ handleUploadFiles, t }) {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: async ([acceptedFile]) => {
      const fd = new FormData()
      await fd.append('file', acceptedFile, acceptedFile.name)
      await handleUploadFiles(Object.assign(acceptedFile, {
        preview: URL.createObjectURL(acceptedFile)
      }))
    }
  })

  return (
    <div {...getRootProps({ className: 'd-flex p-0 dropzone flex-column flex-md-row align-items-center justify-content-center' })}>
      <input {...getInputProps()} />
      <IconButton textWhite={false} textPrimary={true} text={t('products.content.teachMap.button.downloadFile')} icon='bluePlus' />
    </div>
  )
}

export default PhotoUploader
