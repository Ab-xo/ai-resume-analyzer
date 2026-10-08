import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { formatSize } from "~/lib/utils";

interface FileUploaderProps { onFileSelect?: (file: File | null) => void; }

const FileUploader = ({ onFileSelect }: FileUploaderProps) => {
  const onDrop = useCallback((acceptedFiles: File[]) => onFileSelect?.(acceptedFiles[0] || null), [onFileSelect]);
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
    onDrop, multiple: false, accept: { "application/pdf": [".pdf"] }, maxSize: 20 * 1024 * 1024,
  });
  const file = acceptedFiles[0] || null;

  return <div {...getRootProps()} className="upload-zone">
    <input {...getInputProps({ id: "uploader" })} />
    {file ? <div className="uploader-selected-file">
      <div><p><strong>{file.name}</strong></p><p>{formatSize(file.size)} · PDF ready for analysis</p></div>
      <button type="button" aria-label="Remove selected resume" onClick={(event) => { event.stopPropagation(); onFileSelect?.(null); }}>×</button>
    </div> : <div>
      <p className="eyebrow" style={{ marginBottom: 8 }}>{isDragActive ? "Drop to continue" : "Resume source"}</p>
      <strong>{isDragActive ? "Release your PDF here" : "Choose a resume or drag it here"}</strong>
      <p style={{ color: "#68746f", fontSize: 12, margin: "8px 0 0" }}>PDF only · maximum {formatSize(20 * 1024 * 1024)}</p>
    </div>}
  </div>;
};

export default FileUploader;
