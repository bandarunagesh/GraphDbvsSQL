import { Switch, Route, Router as WouterRouter, Link, useLocation } from "wouter";
import Demo from "@/pages/Demo";
import OntologyModel from "@/pages/OntologyModel";

const ORANGE = "#ff4e00";
const DARK = "#161616";
const OFF_WHITE = "#fcfcfc";

function GlobalNav() {
  const [location] = useLocation();
  const isOntology = location === "/ontology";

  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 1.5rem", height: "42px", flexShrink: 0,
      background: "#0e0e0e", borderBottom: `2px solid ${ORANGE}`,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <div style={{ width: "3px", height: "14px", background: ORANGE, borderRadius: "1px" }} />
        <span style={{ fontSize: "0.7rem", fontWeight: 800, color: ORANGE, letterSpacing: "0.1em", textTransform: "uppercase" }}>Graph DB</span>
        <span style={{ fontSize: "0.7rem", fontWeight: 400, color: "rgba(252,252,252,0.3)", margin: "0 0.15rem" }}>vs</span>
        <span style={{ fontSize: "0.7rem", fontWeight: 800, color: "rgba(252,252,252,0.55)", letterSpacing: "0.1em", textTransform: "uppercase" }}>SQL Agents</span>
        <span style={{ fontSize: "0.55rem", color: "rgba(252,252,252,0.2)", margin: "0 0.25rem" }}>·</span>
        <span style={{ fontSize: "0.6rem", color: "rgba(252,252,252,0.25)" }}>Clinical Trials Operations</span>
      </div>
      <nav style={{ display: "flex", gap: "0.25rem" }}>
        {[
          { to: "/", label: "Agent Demo", active: !isOntology },
          { to: "/ontology", label: "Ontology Model", active: isOntology },
        ].map(({ to, label, active }) => (
          <Link key={to} href={to} style={{
            display: "inline-block", padding: "0.3rem 0.8rem", borderRadius: "3px",
            border: active ? `1px solid ${ORANGE}` : "1px solid rgba(252,252,252,0.07)",
            background: active ? "rgba(255,78,0,0.12)" : "transparent",
            color: active ? ORANGE : "rgba(252,252,252,0.4)",
            fontSize: "0.65rem", fontWeight: active ? 700 : 500,
            textDecoration: "none", cursor: "pointer", transition: "all 0.15s",
          }}>
            {label}
          </Link>
        ))}
      </nav>
    </div>
  );
}

function Router() {
  return (
    <>
      <GlobalNav />
      <Switch>
        <Route path="/" component={Demo} />
        <Route path="/ontology" component={OntologyModel} />
      </Switch>
    </>
  );
}

export default function App() {
  return (
    <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
      <Router />
    </WouterRouter>
  );
}
