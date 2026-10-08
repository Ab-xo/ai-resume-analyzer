import Navbar from "~/components/Navbar";
import type { Route } from "./+types/home";
import { resumes } from "../../constants";
import ResumeCard from "~/components/ResumeCard";
import { usePuterStore } from "~/lib/puter";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [{ title: "SiraMap · Resume intelligence" }, { name: "description", content: "Turn every application into a clearer next step." }];
}

export default function Home() {
  const { auth } = usePuterStore();
  const navigate = useNavigate();
  useEffect(() => { if (!auth.isAuthenticated) navigate("/auth?next=/"); }, [auth.isAuthenticated, navigate]);

  return <main className="site-shell">
    <Navbar />
    <section className="main-section">
      <div className="page-heading hero-copy">
        <p className="eyebrow">Career signal, made clear</p>
        <h1>Make your next move with better signal.</h1>
        <h2>SiraMap turns a resume and a real job description into focused, practical feedback you can act on.</h2>
        <div className="hero-actions"><Link to="/upload" className="primary-button">Map a new opportunity <span>↗</span></Link><a href="#analyses" className="secondary-button">View recent analyses</a></div>
        <div className="stat-strip"><div className="stat-card"><strong>{resumes.length || "0"}</strong><span>saved analyses</span></div><div className="stat-card"><strong>5</strong><span>signal layers</span></div><div className="stat-card"><strong>PDF</strong><span>secure source</span></div></div>
      </div>
    </section>
    <section id="analyses" className="resumes-section-wrap"><div className="section-label"><span>Recent analysis maps</span><span>{resumes.length} total</span></div><div className="resumes-section">{resumes.map((resume) => <ResumeCard key={resume.id} resume={resume} />)}</div></section>
  </main>;
}
