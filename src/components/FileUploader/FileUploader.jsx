import React, { useState, useEffect, useContext } from "react";
import { Label } from "reactstrap";
import PropTypes from "prop-types";
import { File } from "react-feather";
import { IntlContext } from "../../utility/context/Internationalization";
import Button from "../Button/Button";
import "./FileUploader.scss";

const FileUploader = ({
  value: { file, fileExtension, fileName },
  label,
  onUploadFile,
  onResetFile,
  allowedFileTypes,
  allowedFileSize,
  errMsg,
  isFileHasErr,
  uploadBtnClass,
  errMsgClass,
  containerClass,
  labelClass,
  uploadFileWrapperClass,
  fileUploaderClass,
  note,
  isFormData,
  emptyImgPlaceholder,
  placeholderType,
  required,
  uploadBtnLabel,
  showFileName,
  uploadBtnDisabled,
  resetBtnDisabled,
  showResetBtn,
}) => {
  const { messages, locale } = useContext(IntlContext);
  const [formDataImg, setFormDataImg] = useState(null);
  useEffect(() => {
    if (file) {
      if (isFormData && typeof file !== "string") {
        let selectedFileBase64;
        let reader = new FileReader();
        reader.onloadend = () => {
          selectedFileBase64 = reader.result;
          setFormDataImg(selectedFileBase64);
        };
        reader.readAsDataURL(file);
      } else {
        setFormDataImg(file);
      }
    }
  }, [file]);

  const previewFile = (e) => {
    const selectedFile = e.target.files[0];
    const extension = e.target.files[0].name.split(".").pop();
    let isTypeMatched = false;
    allowedFileTypes.forEach((type) => {
      if (type === extension.toLowerCase()) {
        isTypeMatched = true;
      }
    });
    if (isFormData) {
      if (isTypeMatched && selectedFile.size / 1024 / 1024 <= allowedFileSize) {
        onUploadFile({
          fileName: selectedFile.name,
          fileExtension: extension,
          file: selectedFile,
          isSizeValid: true,
          isTypeValid: true,
        });
      } else if (selectedFile.size / 1024 / 1024 > allowedFileSize) {
        onUploadFile({
          fileName: "",
          fileExtension: "",
          file: null,
          isSizeValid: false,
          isTypeValid: true,
        });
      } else {
        onUploadFile({
          fileName: "",
          fileExtension: "",
          file: null,
          isSizeValid: true,
          isTypeValid: false,
        });
      }
    } else {
      if (isTypeMatched && selectedFile.size / 1024 / 1024 <= allowedFileSize) {
        let selectedFileBase64;
        let reader = new FileReader();
        reader.onloadend = () => {
          selectedFileBase64 = reader.result;
          onUploadFile({
            fileName: selectedFile.name,
            fileExtension: extension,
            file: selectedFileBase64,
            isSizeValid: true,
            isTypeValid: true,
          });
        };
        reader.readAsDataURL(selectedFile);
      } else if (selectedFile.size / 1024 / 1024 > allowedFileSize) {
        onUploadFile({
          fileName: "",
          fileExtension: "",
          file: null,
          isSizeValid: false,
          isTypeValid: true,
        });
      } else {
        onUploadFile({
          fileName: "",
          fileExtension: "",
          file: null,
          isSizeValid: true,
          isTypeValid: false,
        });
      }
    }

    e.target.value = null;
  };
  const handleRemoveFile = () => {
    onUploadFile({
      fileName: "",
      fileExtension: "",
      file: null,
      isSizeValid: true,
      isTypeValid: true,
    });
    onResetFile();
  };
  return (
    <div className={`file_upload_container ${fileUploaderClass}`}>
      {label && (
        <Label className={`form-label f_size_12 ${labelClass}`}>{`${label} ${
          required ? "*" : ""
        }`}</Label>
      )}
      <div className={`${containerClass}`}>
        <div className="file_preview_container">
          {file ? (
            fileExtension.toLowerCase() === "png" ||
            fileExtension.toLowerCase() === "jpg" ||
            fileExtension.toLowerCase() === "jpeg" ? (
              <div
                className="img_preview"
                style={{
                  backgroundImage: `url(${formDataImg})`,
                }}
              ></div>
            ) : (
              <div className="file_preview">
                <File size={40} />
              </div>
            )
          ) : placeholderType === "img" ? (
            <div className="empty_img_placeholder">{emptyImgPlaceholder}</div>
          ) : (
            <div className="file_preview">
              <File size={40} />
            </div>
          )}
        </div>
        <div className="btn-msg-container">
          <div className="d-flex justify-content-start">
            <div className={`upload_file_wrapper ${uploadFileWrapperClass}`}>
              <label
                className={`upload_file_label pointer px-4 ${uploadBtnClass}`}
              >
                <input
                  type="file"
                  onChange={previewFile}
                  disabled={uploadBtnDisabled}
                />
              </label>
              <Button
                label={uploadBtnLabel}
                className="upload_file_btn"
                disabled={uploadBtnDisabled}
              />
            </div>
            {showResetBtn && (
              <Button
                label={messages.BUTTONS.RESET}
                outline={true}
                color="secondary"
                onClick={handleRemoveFile}
                className={"mx-1 reset_btn"}
                disabled={resetBtnDisabled || !file}
              />
            )}
          </div>
          {showFileName && fileName && (
            <div
              className={`word-break upload-file-name ${
                locale === "en" ? "text-left" : "text-right"
              }`}
            >
              <p>{fileName}</p>
            </div>
          )}
          {note && <p className={`mb-0 mt-50`}>{note}</p>}
          {isFileHasErr && (
            <div className={`file_upload_err_msg ${errMsgClass}`}>
              <span className="error_text f_size_12">
                {messages.ERRORS[errMsg]}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileUploader;

FileUploader.propTypes = {
  file: PropTypes.string,
  fileExtension: PropTypes.string,
  fileName: PropTypes.string,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  onUploadFile: PropTypes.func.isRequired,
  onResetFile: PropTypes.func,
  allowedFileTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
  allowedFileSize: PropTypes.number,
  errMsg: PropTypes.string,
  isFileHasErr: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  uploadBtnClass: PropTypes.string,
  errMsgClass: PropTypes.string,
  containerClass: PropTypes.string,
  labelClass: PropTypes.string,
  fileUploaderClass: PropTypes.string,
  uploadFileWrapperClass: PropTypes.string,
  note: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  isFormData: PropTypes.bool,
  required: PropTypes.bool,
  emptyImgPlaceholder: PropTypes.element,
  placeholderType: PropTypes.oneOf(["img", "file"]),
  uploadBtnLabel: PropTypes.string,
  showFileName: PropTypes.bool,
  uploadBtnDisabled: PropTypes.bool,
  resetBtnDisabled: PropTypes.bool,
  showResetBtn: PropTypes.bool,
};
FileUploader.defaultProps = {
  file: null,
  fileExtension: "",
  fileName: "",
  showResetBtn: true,
};
