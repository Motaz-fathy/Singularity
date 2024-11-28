import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const createRootElement = (id) => {
  const rootElement = document.createElement("div");
  rootElement.id = id;
  return rootElement;
};

const Portal = ({ id, children }) => {
  const [rootElement, setRootElement] = useState(() =>
    document.getElementById(id)
  );
  useEffect(() => {
    const newRootElement = rootElement || createRootElement(id);
    if (!rootElement) {
      document.body.appendChild(newRootElement);
    }
    setRootElement(newRootElement);
    return () => newRootElement.remove();
  }, [id]);
  if (!rootElement) {
    return null;
  }
  return createPortal(children, rootElement);
};

export default Portal;
