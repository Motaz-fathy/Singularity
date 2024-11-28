import React, { useMemo, useState, useEffect } from "react"
import { Fragment } from "react"
import { useDropzone } from "react-dropzone"

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16
}

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 200,
  height: 115,
  padding: 4,
  boxSizing: "border-box"
}

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden"
}

const img = {
  display: "block",
  width: "auto",
  height: "100%"
}

const activeStyle = {
  borderColor: "#2196f3"
}

const acceptStyle = {
  borderColor: "#00e676"
}

const rejectStyle = {
  borderColor: "#ff1744"
}

function AcceptMaxFiles(props) {
  const [files, setFiles] = useState([])
  const { baseStyle, Icon, title, subTitle, name, control } = props

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({
    accept: "image/*",
    onDrop: acceptedFiles => {
      setFiles(
        acceptedFiles.map(file =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        )
      )
    }
  })

  const thumbs = files.map(file => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img src={file.preview} style={img} />
      </div>
    </div>
  ))
  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach(file => URL.revokeObjectURL(file.preview))
    },
    [files]
  )

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {})
    }),
    [isDragActive, isDragReject, isDragAccept]
  )

  return (
    <Fragment>
      {thumbs}
      <div className="container">
        <div {...getRootProps({ style })}>
          <input {...getInputProps()} />
          <img src={Icon} />
          <p>{title} </p>
          <p>{subTitle}</p>
        </div>
      </div>
    </Fragment>
  )
}

export default AcceptMaxFiles
