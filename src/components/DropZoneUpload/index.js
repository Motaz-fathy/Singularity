import { Button } from "reactstrap";
import React, { useMemo, useState, useEffect, useContext } from "react";
import { Fragment } from "react";
import { useDropzone } from "react-dropzone";
import { emtpyImgBg } from "../../utility/images";
import { isObjEmpty } from "../../utility/Utils";
import PdfIcon from "../../assets/images/icons/ic_pdf.svg";
import DocIcon from "../../assets/images/icons/ic_doc.svg";
import { IntlContext } from "../../utility/context/Internationalization";
import { Link } from "react-router-dom";

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
};

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  marginBottom: 8,
  marginRight: 8,
  width: "auto",
  height: 115,
  boxSizing: "border-box",
};

const removeInvisible = {
  display: "none",
};

const removeBtn = {
  position: "absolute",
  top: "5%",
  left: "8%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "rgb(152 132 149)",
  color: "white",
  fontSize: "12px",
  padding: "2px 7px",
  border: "none",
  cursor: "pointer",
  borderRadius: "2rem",
};

const redRemoveBtn = {
  position: "absolute",
  top: "0%",
  left: "0%",
  backgroundColor: "red",
  color: "#FFF",
  fontSize: "12px",
  padding: "2px 7px",
  border: "none",
  cursor: "pointer",
  borderRadius: "2rem",
};

const smallThumb = {
  display: "inline-flex",
  borderRadius: 2,
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: "border-box",
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const img = {
  display: "block",
  width: "auto",
  height: "100%",
  boxShadow: "rgb(234 217 231) 1px 1px 10px 0px",
};

const activeStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

const pdfContain = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "55px",
  borderRadius: 3,
  borderWidth: 3,
  borderColor: "rgba(143, 147, 151, 1)",
  borderStyle: "dashed",
  backgroundColor: "rgb(255 255 255)",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};

function AcceptMaxFiles(props) {
  const { messages, locale } = useContext(IntlContext);

  const {
    baseStyle,
    Icon,
    title,
    subTitle,
    name,
    data,
    setValues,
    singleImage,
    type,
    disabled,
    editMode,
    fetchedData,
    makeItPrimary,
    setDisplayWrap,
    setFieldValue,
    deleteSingleImage,
    setIsImagesArrayEmpty,
  } = props;
  const [files, setFiles] = useState([]);
  const [previewFiles, setPreviewFiles] = useState([]);

  const [primary, setPrimary] = useState(false);
  // useEffect(() => {
  //   setFieldValue("main_image", parameter);
  // }, [data[name]]);

  let noOfCurrentFiles = fetchedData?.multi_files?.length;
  const imageValidation = "image/jpeg, image/png";
  const fileValidation = "image/*,.pdf,.doc,.docx";
  const one_million = 1000000;

  useEffect(() => {
    if (!isObjEmpty(fetchedData) && fetchedData.multi_files) {
      if (files.length > 0) {
        setIsImagesArrayEmpty(false);
      }
    }
  }, [files.length, fetchedData?.multi_files]);

  // const arrayMove = index => {
  //   let newFiles = [...files]
  //   newFiles.splice(index, 1)
  //   newFiles.unshift(file)
  //   setFiles(newFiles)
  // }
  const handlePrimary = (index) => {
    setPrimary(index);
  };

  const dataPreviewStatus = isObjEmpty(fetchedData);
  useEffect(() => {
    setPreviewFiles(fetchedData?.multi_files);
  }, [dataPreviewStatus]);

  useEffect(() => {
    if (type == "file" && files.length > 2) {
      const slicedArray = files.slice(0, 3);
      setFiles(slicedArray);
    }
    if (type == "image" && files.length > 9) {
      const slicedArray = files.slice(0, 10);
      setFiles(slicedArray);
    }
    if (singleImage) {
      const slicedArray = files.slice(0, 1);
      setFiles(slicedArray);
    }

    if (files.length > 3 && type == "image") {
      setDisplayWrap(true);
    }
  }, [files.length]);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    fileRejections,
  } = useDropzone({
    maxFiles: 10 - files.length - noOfCurrentFiles,
    accept: type === "image" ? imageValidation : fileValidation,
    maxSize: type === "image" ? 2 * one_million : 5 * one_million,
    multiple: singleImage ? false : true,
    disabled: 10 - files.length - noOfCurrentFiles <= 0,
    onDropRejected: (rejectedFiles) => {},
    onDrop: (acceptedFiles) => {
      let acceptedFilesArray = files.concat(
        acceptedFiles.map((file) => {
          return Object.assign(file, {
            preview: URL.createObjectURL(file),
          });
        })
      );
      setFiles(acceptedFilesArray);
    },
  });

  useEffect(() => {
    if (setValues) {
      setValues({ ...data, [name]: files });
    }
    if (setFieldValue) {
      setFieldValue(name, files);
    }
  }, [files]);
  const removeFile = (file) => () => {
    if (disabled === true) {
      return;
    }

    let exceptIndex = files.indexOf(file);
    let newFiles = files.filter((value, index) => exceptIndex !== index);
    setFiles(newFiles);
  };

  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <div key={file.path} style={{ color: "red" }}>
      {file.path} - {Math.round(file.size / 1000000)} MB
      <ul>
        {errors.map((e) => (
          <li key={e.code}>
            {e.code === "file-too-large"
              ? "the is file too large and more than 5 Mb"
              : e.message}
          </li>
        ))}
      </ul>
    </div>
  ));

  const thumbs = files.map((file, index) => {
    return (
      <>
        <div
          style={singleImage ? smallThumb : thumb}
          key={file.name}
          onClick={() => handlePrimary(index, file)}
        >
          {file.type == "application/pdf" || file.type == "application/doc" ? (
            <div
              style={{
                position: "relative",
                width: "100%",
                margin: "10px",
              }}
            >
              <div style={pdfContain}>
                <img
                  src={file.type.includes("pdf") ? PdfIcon : DocIcon}
                  style={{
                    display: "block",
                    width: "auto",
                    height: "100%",
                  }}
                />
                <span style={removeBtn} onClick={removeFile(file)}>
                  x
                </span>
              </div>
            </div>
          ) : (
            <div
              style={{
                position: "relative",
                width: singleImage ? "65%" : "50%",
                margin: "10px",
              }}
            >
              <img
                src={file.preview}
                style={{
                  display: "block",
                  width: singleImage ? "100px" : "auto",
                  height: singleImage ? "100px" : "100%",
                }}
              />
              <span style={removeBtn} onClick={removeFile(file)}>
                x
              </span>
            </div>
          )}
        </div>
      </>
    );
  });

  const viewThumbs = fetchedData?.multi_files?.map((file) => {
    return (
      <div style={thumb} key={file.id}>
        <div style={thumbInner}>
          {type == "file" ? (
            <Link to={{ pathname: `${file.document_path}` }} target="_blank">
              <img
                src={name === "verify_docs" ? DocIcon : file.image_path}
                style={img}
              />
            </Link>
          ) : (
            <>
              <div
                style={{
                  display: "flex",
                  position: "relative",
                  margin: "10px",
                }}
              >
                <img
                  src={name === "verify_docs" ? DocIcon : file.image_path}
                  style={img}
                />

                <span
                  style={redRemoveBtn}
                  onClick={() => deleteSingleImage(file.id)}
                >
                  x
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    );
  });

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  return (
    <>
      {singleImage ? (
        <Fragment>
          {files.length > 0 ? (
            thumbs
          ) : (
            <img
              src={
                disabled || editMode ? fetchedData?.single_image : emtpyImgBg
              }
              width={100}
              height={100}
            />
          )}

          <div className="upload_action">
            <div className="container">
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <Button color="primary" disabled={disabled} type="button">
                  {messages.SERVICE_PROVIDER.WIZARD.UPLOAD}
                </Button>
              </div>
            </div>
            <p className="mt-1">
              {messages.SERVICE_PROVIDER.WIZARD.ALLOWED_IMAGES}
            </p>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          {disabled || editMode ? viewThumbs : null}
          {thumbs}

          <div
            className="container"
            style={{
              display: files.length > 0 ? "contents" : "",
              display: type == "file" ? "flex" : "",
            }}
          >
            <div {...getRootProps({ style })}>
              <input {...getInputProps()} />
              <img src={Icon} />
              <p>{title} </p>
              <p>{subTitle}</p>
            </div>
            {type == "file" ? (
              <div
                style={{
                  position: "relative",
                  top: "30px",
                  left: "20px",
                  right: "20px",
                }}
              >
                <p>{messages.SERVICE_PROVIDER.WIZARD.ALLOWED_FILES}</p>
                <p>{messages.SERVICE_PROVIDER.WIZARD.ALLOWED_FILES2}</p>
              </div>
            ) : null}
          </div>
          <div>{fileRejectionItems}</div>
        </Fragment>
      )}
    </>
  );
}

export default AcceptMaxFiles;
