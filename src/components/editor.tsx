"use client";
import { useMemo } from "react";
import dynamic from "next/dynamic";

import "react-quill/dist/styles/quill.snow.css";

const Editor = () => {
  const reactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );
  return <div>Editor</div>;
};

export default Editor;
