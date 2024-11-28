import React, { useState, useEffect } from "react";
import { EditorState, ContentState, convertFromHTML } from "draft-js";
import { useLocation } from "react-router-dom";
import qs from "query-string";

import { Editor } from "react-draft-wysiwyg";
import { convertToHTML } from "draft-convert";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

// ** Styles
import "./styles.scss";

const RichText = ({ title, onChangefield, placeholder, initValue }) => {
  //for edit product
  const location = useLocation();
  const queryParam = qs.parse(location.search);
  let editMode = JSON.parse(queryParam.editMode || queryParam.editRequest|| null);

  const [editorState, setEditorState] = useState(() => EditorState.createEmpty(""));
  const [convertedContent, setConvertedContent] = useState(null);
  const [gard, setGard] = useState(false);

  useEffect(() => {
    onChangefield(convertedContent);
  }, [convertedContent]);

  useEffect(() => {
    if (editMode && initValue && !gard) {
      setGard(true);
      setEditorState(
        EditorState.createWithContent(
          ContentState.createFromBlockArray(convertFromHTML(initValue || "")),
        ),
      );
    }
  }, [editMode, initValue]);

  const handleEditorChange = (state) => {
    setEditorState(state);
    setConvertedContent(convertToHTML(editorState.getCurrentContent()));
  };

  return (
    <div className="rich_container">
      <p className="label__title">{title}</p>
      <Editor
        placeholder={placeholder}
        editorState={editorState}
        onEditorStateChange={handleEditorChange}
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
        toolbar={{
          options: ["inline", "link", "textAlign"],
          inline: {
            inDropdown: false,
            className: undefined,
            component: undefined,
            dropdownClassName: undefined,
            options: ["bold", "italic", "underline"],
          },
          link: {
            inDropdown: false,
            className: undefined,
            component: undefined,
            popupClassName: undefined,
            dropdownClassName: undefined,
            showOpenOptionOnHover: true,
            defaultTargetOption: "_self",
            options: ["link"],
            linkCallback: undefined,
          },
        }}
      />
    </div>
  );
};
export default RichText;
