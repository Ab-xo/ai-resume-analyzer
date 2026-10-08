import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { formatSize } from "~/lib/utils";

interface FileUploaderProps {
  onFileSelect?: (file: File | null) => void;
}

const UploadGlyph = () => (
  <span className="upload-glyph" aria-hidden="true">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 16V4m0 0L7.5 8.5M12 4l4.5 4.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 14.5v3A2.5 2.5 0 0 0 7.5 20h9a2.5 2.5 0 0 0 2.5-2.5v-3" strokeLinecap="round" />
    </svg>
  </span>
);

const FileUploader = ({ onFileSelect }: FileUploaderProps) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => onFileSelect?.(acceptedFiles[0] || null),
    [onFileSelect],
  );
  const { getRootProps, getInputProps, isDragActive, acceptedFiles, fileRejections } = useDropzone({
    onDrop,
    multiple: false,
    accept: { "application/pdf": [".pdf"] },
    maxSize: 20 * 1024 * 1024,
  });
  const file = acceptedFiles[0] || null;
  const rejectionMessage = fileRejections[0]?.errors[0]?.message;

  return (
    <div {...getRootProps()} className={`upload-zone ${isDragActive ? "upload-zone-active" : ""}`}>
      <input {...getInputProps({ id: "uploader" })} />
      {file ? (
        <div className="uploader-selected-file">
          <div className="file-icon" aria-hidden="true">PDF</div>
          <div className="selected-file-copy">
            <p><strong>{file.name}</strong></p>
            <p>{formatSize(file.size)} <span className="file-status">· Ready to map</span></p>
          </div>
          <button type="button" aria-label="Remove selected resume" onClick={(event) => { event.stopPropagation(); onFileSelect?.(null); }}>×</button>
        </div>
      ) : (
        <div className="upload-empty-state">
          <UploadGlyph />
          <div>
            <p className="upload-title">{isDragActive ? "Release to add your resume" : "Drop your resume here"}</p>
            <p className="upload-subtitle"><span>Browse files</span> or drag and drop a PDF</p>
            <p className="upload-meta">PDF only · maximum {formatSize(20 * 1024 * 1024)}</p>
          </div>
        </div>
      )}
      {rejectionMessage && <p className="upload-error" role="alert">{rejectionMessage}. Please choose a PDF under 20 MB.</p>}
    </div>
  );
};

export default FileUploader;
