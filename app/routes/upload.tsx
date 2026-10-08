import { useState, type FormEvent } from "react";
import FileUploader from "~/components/FileUploader";
import Navbar from "~/components/Navbar";
import { usePuterStore } from "~/lib/puter";
import { useNavigate } from "react-router";
import { convertPdfToImage } from "~/lib/pdf2img";
import { generateUUID } from "~/lib/utils";
import { prepareInstructions } from "constants/index";

const Upload = () => {
  const { fs, ai, kv } = usePuterStore();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusText, setStatusText] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const mapOpportunity = async ({ companyName, jobTitle, jobDescription, file: resumeFile }: { companyName: string; jobTitle: string; jobDescription: string; file: File }) => {
    setIsProcessing(true); setStatusText("Uploading your source...");
    try {
      const uploadFile = await fs.upload([resumeFile]); if (!uploadFile) throw new Error("Resume upload failed.");
      setStatusText("Reading the first page..."); const imageFile = await convertPdfToImage(resumeFile); if (!imageFile.file) throw new Error(imageFile.error || "Preview generation failed.");
      setStatusText("Building your analysis map..."); const uploadImage = await fs.upload([imageFile.file]); if (!uploadImage) throw new Error("Preview upload failed.");
      const id = generateUUID(); const data: any = { id, resumePath: uploadFile.path, imagePath: uploadImage.path, companyName, jobTitle, jobDescription, feedback: "" };
      await kv.set(`resume:${id}`, JSON.stringify(data)); setStatusText("Finding your strongest signals...");
      const result = await ai.feedback(uploadFile.path, prepareInstructions({ jobTitle, jobDescription })); if (!result) throw new Error("Analysis did not return feedback.");
      const content = typeof result.message.content === "string" ? result.message.content : result.message.content[0].text;
      data.feedback = JSON.parse(content); await kv.set(`resume:${id}`, JSON.stringify(data)); setStatusText("Map complete. Returning to your workspace..."); navigate("/");
    } catch (error) { setStatusText(error instanceof Error ? error.message : "Something went wrong. Please try again."); setIsProcessing(false); }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    if (!file) { setStatusText("Add a PDF resume to continue."); return; }
    mapOpportunity({ companyName: String(formData.get("company-name") || ""), jobTitle: String(formData.get("job-title") || ""), jobDescription: String(formData.get("job-description") || ""), file });
  };

  return <main className="site-shell">
    <Navbar />
    <section className="main-section upload-page-section">
      <div className="upload-intro"><p className="eyebrow">New opportunity map</p><h1>Give your resume a clearer direction.</h1><h2>Share the role you want. SiraMap will surface the signals that help you move closer to it.</h2>
        <div className="upload-benefits"><div className="benefit-item"><span className="benefit-number">01</span><div><strong>Upload once</strong><p>Your PDF stays the source of truth.</p></div></div><div className="benefit-item"><span className="benefit-number">02</span><div><strong>Match with intent</strong><p>Add the role context for sharper feedback.</p></div></div><div className="benefit-item"><span className="benefit-number">03</span><div><strong>Move with clarity</strong><p>Get practical signals, not generic advice.</p></div></div></div>
      </div>
      {isProcessing ? <div className="process-card"><span className="process-kicker">SiraMap is working</span><h3>{statusText}</h3><div className="process-progress"><span /></div><div className="process-step"><span className="step-dot" />Your resume is being read</div><div className="process-step"><span className="step-dot" />Role alignment is being mapped</div><div className="process-step"><span className="step-dot" />Actionable improvements are next</div></div> : <form className="upload-panel" onSubmit={handleSubmit}>
        <div className="form-panel-heading"><div><span className="panel-index">01 / 03</span><h3>Set your target</h3></div><span className="panel-note">Takes about 2 minutes</span></div>
        <div className="field-grid"><div className="form-div"><label htmlFor="company-name">Company or team</label><input required name="company-name" id="company-name" placeholder="e.g. Northstar Labs" /></div><div className="form-div"><label htmlFor="job-title">Target role</label><input required name="job-title" id="job-title" placeholder="e.g. Product Designer" /></div></div>
        <div className="form-div"><div className="label-row"><label htmlFor="job-description">Job description</label><span>Optional but recommended</span></div><textarea rows={5} name="job-description" id="job-description" placeholder="Paste the role context for a sharper match map..." /></div>
        <div className="form-div"><div className="label-row"><label htmlFor="uploader">Resume PDF</label><span>Private by design</span></div><FileUploader onFileSelect={setFile} /></div>
        <div className="form-submit-row"><p>By continuing, you agree to let SiraMap process this resume for analysis.</p><button type="submit" className="primary-button">Build my analysis map <span>↗</span></button></div>{statusText && <p className="form-status" role="status">{statusText}</p>}
      </form>}
    </section>
    <footer className="site-footer"><div className="footer-brand"><span className="brand-mark"><span /><span /><span /></span><strong>SiraMap</strong><p>Turn career uncertainty into a clearer next move.</p></div><div className="footer-links"><span>Resume intelligence</span><span>Built for focused applications</span><span>© 2026 SiraMap</span></div></footer>
  </main>;
};
export default Upload;
