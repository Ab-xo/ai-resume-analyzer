import { Link, useLocation } from "react-router";

const navItems = [
  { label: "Workspace", href: "/" },
  { label: "New analysis", href: "/upload" },
];

const SiraMark = () => (
  <span className="brand-mark" aria-hidden="true">
    <span />
    <span />
    <span />
  </span>
);

const Navbar = () => {
  const location = useLocation();

  return (
    <header className="site-header">
      <Link to="/" className="brand-lockup" aria-label="SiraMap workspace">
        <SiraMark />
        <span className="brand-name">SiraMap</span>
      </Link>
      <nav className="desktop-nav" aria-label="Primary navigation">
        {navItems.map((item) => (
          <Link key={item.href} to={item.href} className={`nav-link ${location.pathname === item.href ? "nav-link-active" : ""}`}>
            {item.label}
          </Link>
        ))}
      </nav>
      <Link to="/upload" className="header-action">
        <span className="plus-icon" aria-hidden="true">+</span>
        Start an analysis
      </Link>
    </header>
  );
};

export default Navbar;
