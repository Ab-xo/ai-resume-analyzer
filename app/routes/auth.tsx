import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";

export const meta = () => [{ title: "SiraMap · Sign in" }, { name: "description", content: "Sign in to your SiraMap workspace." }];

const Auth = () => {
  const { isLoading, auth } = usePuterStore(); const location = useLocation(); const navigate = useNavigate();
  const next = new URLSearchParams(location.search).get("next") || "/";
  useEffect(() => { if (auth.isAuthenticated) navigate(next); }, [auth.isAuthenticated, navigate, next]);
  return <main className="auth-page"><section className="auth-card"><div className="brand-lockup" style={{justifyContent:"center"}}><span className="brand-mark"><span /><span /><span /></span><span className="brand-name">SiraMap</span></div><p className="eyebrow" style={{justifyContent:"center",marginTop:30}}>Your career signal workspace</p><h1>Start with a clearer map.</h1><h2>Sign in to save your analyses, compare roles, and keep your next move in view.</h2>{isLoading ? <button className="auth-button">Preparing your workspace...</button> : auth.isAuthenticated ? <button className="auth-button" onClick={auth.signOut}>Sign out</button> : <button className="auth-button" onClick={auth.signIn}>Continue with Puter</button>}</section></main>;
};
export default Auth;
