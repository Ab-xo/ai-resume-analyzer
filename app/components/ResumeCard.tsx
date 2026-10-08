import { Link } from "react-router";
import ScoreCircle from "./ScoreCircle";

const ResumeCard = ({ resume }: { resume: Resume }) => (
  <Link to={`/resume/${resume.id}`} className="resume-card">
    <div className="resume-card-header">
      <div><h2>{resume.companyName || "Untitled workspace"}</h2><h3>{resume.jobTitle || "Role not specified"}</h3></div>
      <ScoreCircle score={resume.feedback.overallScore} />
    </div>
    <div className="resume-preview"><img src={resume.imagePath} alt="Resume preview" /></div>
  </Link>
);

export default ResumeCard;
