import { Link } from "react-router";
import ScoreCircle from "./ScoreCircle";

const ResumeCard = ({ resume }: { resume: Resume }) => (
  <Link to={`/resume/${resume.id}`} className="resume-card">
    <div className="resume-card-header">
      <div className="resume-card-title"><span className="card-kicker">Application map</span><h2>{resume.companyName || "Untitled workspace"}</h2><h3>{resume.jobTitle || "Role not specified"}</h3></div>
      <ScoreCircle score={resume.feedback.overallScore} />
    </div>
    <div className="resume-preview"><img src={resume.imagePath} alt={`${resume.companyName || "Resume"} preview`} /><div className="preview-overlay"><span>Open map</span><span>↗</span></div></div>
    <div className="resume-card-footer"><span>Resume signal</span><span className="card-arrow">→</span></div>
  </Link>
);

export default ResumeCard;
