import { useState } from "react";

const ORANGE = "#ff4e00";
const DARK = "#161616";
const OFF_WHITE = "#fcfcfc";

/* ─── Graph node definitions ─── */
const G_NODES = [
  { id: "protocol",    label: "Protocol",              nodeType: ":Protocol",       x: 370, y: 58,  r: 36, color: "#f59e0b", domain: "Protocol",    props: ["version","phase","sponsor","effectiveDate"] },
  { id: "amendment",  label: "Amendment",              nodeType: ":ProtocolAmend",  x: 160, y: 72,  r: 34, color: "#f59e0b", domain: "Protocol",    props: ["version","effectiveDate","changes[]","impactedSites[]"] },
  { id: "criteria",   label: "DoseEscalation\nCriteria", nodeType: ":DoseCriteria",x: 580, y: 80,  r: 34, color: "#3b82f6", domain: "Clinical",    props: ["criteriaText","protocolSection","threshold","unit"] },
  { id: "trial",      label: "Trial",                  nodeType: ":Trial",          x: 370, y: 220, r: 50, color: ORANGE,    domain: "Core",        props: ["trialId","phase","sponsor","status","protocolVersion"] },
  { id: "patient",    label: "Patient",                nodeType: ":Patient",        x: 105, y: 215, r: 38, color: "#3b82f6", domain: "Clinical",    props: ["patientId","enrollmentStatus","enrollmentDate","arm"] },
  { id: "site",       label: "Site",                   nodeType: ":Site",           x: 210, y: 375, r: 36, color: "#22c55e", domain: "Operational", props: ["siteId","siteName","country","tier","enrollmentTarget"] },
  { id: "investigator",label:"Investigator",           nodeType: ":Investigator",   x: 72,  y: 428, r: 32, color: "#22c55e", domain: "Operational", props: ["investigatorId","name","specialty","availability[]"] },
  { id: "sae",        label: "SAE",                    nodeType: ":SAE",            x: 620, y: 215, r: 36, color: "#ef4444", domain: "Safety",      props: ["saeId","onsetDate","severity","meddraCode","reportingStatus"] },
  { id: "saesubtype", label: "SAESubtype",             nodeType: ":SAESubtype",     x: 700, y: 340, r: 32, color: "#f59e0b", domain: "Safety",      props: ["subtypeName","meddraPreferredTerm","soc"] },
  { id: "ichrule",    label: "ICH E2A\nRule",          nodeType: ":ICH_E2A_Rule",   x: 610, y: 428, r: 32, color: "#8b5cf6", domain: "Regulatory",  props: ["ruleId","ruleType","deadlineDays","regulatoryBody"] },
  { id: "screenrec",  label: "Screening\nRecord",      nodeType: ":ScreeningRecord",x: 105, y: 335, r: 30, color: "#6b7280", domain: "Clinical",    props: ["recordId","screeningDate","outcome","criteriaChecked[]"] },
  { id: "failcat",    label: "Failure\nCategory",      nodeType: ":FailureCategory",x: 235, y: 458, r: 30, color: "#6b7280", domain: "Taxonomy",    props: ["categoryId","categoryName","protocolSection","isExclusion"] },
];

const G_EDGES = [
  { from: "patient",    to: "trial",      rel: "ENROLLED_IN",          color: "#3b82f6", props: "enrollDate · arm · protocolVer" },
  { from: "patient",    to: "screenrec",  rel: "UNDERWENT_SCREENING",  color: "#6b7280", props: "date · outcome" },
  { from: "patient",    to: "sae",        rel: "EXPERIENCED",          color: "#ef4444", props: "onsetDate · causalAssessment" },
  { from: "screenrec",  to: "failcat",    rel: "FAILED_DUE_TO",        color: "#6b7280", props: "protocol-defined category (not free text)" },
  { from: "site",       to: "trial",      rel: "PARTICIPATES_IN",      color: "#22c55e", props: "startDate · targetEnrollment" },
  { from: "investigator",to:"site",       rel: "WORKS_AT",             color: "#22c55e", props: "role · availability" },
  { from: "trial",      to: "protocol",   rel: "GOVERNED_BY",          color: "#f59e0b", props: "version · effectiveDate" },
  { from: "trial",      to: "criteria",   rel: "HAS_CRITERION",        color: ORANGE,    props: "6 criteria nodes, each anchored to §4.2" },
  { from: "protocol",   to: "amendment",  rel: "HAS_AMENDMENT",        color: "#f59e0b", props: "version · delta · impacted sites" },
  { from: "site",       to: "amendment",  rel: "IMPACTED_BY",          color: "#22c55e", props: "quantified impact: +18% screen fail rate" },
  { from: "sae",        to: "saesubtype", rel: "IS_SUBTYPE_OF",        color: "#ef4444", props: "MedDRA v27.1 hierarchy" },
  { from: "saesubtype", to: "ichrule",    rel: "GOVERNED_BY",          color: "#8b5cf6", props: "7d or 15d reporting deadline" },
];

/* ─── RDBMS table definitions ─── */
const RDBMS_TABLES = [
  {
    id: "trials", label: "trials", x: 265, y: 18, w: 195, color: "#f59e0b",
    cols: [
      { name: "trial_id", pk: true },
      { name: "phase", warn: false },
      { name: "sponsor", warn: false },
      { name: "protocol_ver", warn: true, tip: "VARCHAR — version stored as string, no semantic link to actual protocol document" },
    ],
  },
  {
    id: "patients", label: "patients", x: 18, y: 165, w: 215, color: "#3b82f6",
    cols: [
      { name: "patient_id", pk: true },
      { name: "trial_id", fk: "trials" },
      { name: "site_id", fk: "sites" },
      { name: "status", warn: true, tip: "VARCHAR — 'active' has no canonical definition. Does it include screen-pending? Withdrawn?" },
      { name: "dose_esc_flag", warn: true, tip: "INT — meaning inferred from column name only. No protocol definition. 0/1 with no context." },
    ],
  },
  {
    id: "sites", label: "sites", x: 265, y: 195, w: 195, color: "#22c55e",
    cols: [
      { name: "site_id", pk: true },
      { name: "trial_id", fk: "trials" },
      { name: "site_name", warn: false },
      { name: "country", warn: false },
    ],
  },
  {
    id: "adverse_events", label: "adverse_events", x: 510, y: 140, w: 215, color: "#ef4444",
    cols: [
      { name: "ae_id", pk: true },
      { name: "patient_id", fk: "patients" },
      { name: "serious", warn: true, tip: "INT (0/1) — fatal, life-threatening, and hospitalisation all map to serious=1. Subtype lost." },
      { name: "description", warn: true, tip: "TEXT — free text. MedDRA coding absent. Cannot group by SOC or preferred term." },
      { name: "reported_dt", warn: false },
    ],
  },
  {
    id: "screening_records", label: "screening_records", x: 18, y: 380, w: 215, color: "#6b7280",
    cols: [
      { name: "sr_id", pk: true },
      { name: "patient_id", fk: "patients" },
      { name: "site_id", fk: "sites" },
      { name: "outcome", warn: false },
      { name: "fail_reason", warn: true, tip: "TEXT — free text. Cannot group by protocol-defined category. Root cause patterns invisible." },
    ],
  },
  {
    id: "amendments", label: "amendments", x: 510, y: 20, w: 215, color: "#f59e0b",
    cols: [
      { name: "amendment_id", pk: true },
      { name: "trial_id", fk: "trials" },
      { name: "version", warn: false },
      { name: "effective_date", warn: false },
    ],
    gap: "No FK to sites table — IMPACTED_BY relationship is invisible. Cannot trace: Amendment → Site impact.",
  },
];

/* ─── FK relationships ─── */
const FK_LINES = [
  { from: "patients",          fromAnchor: "right", to: "trials",           toAnchor: "left",   label: "trial_id" },
  { from: "patients",          fromAnchor: "right", to: "sites",            toAnchor: "left",   label: "site_id" },
  { from: "adverse_events",    fromAnchor: "left",  to: "patients",         toAnchor: "right",  label: "patient_id" },
  { from: "screening_records", fromAnchor: "top",   to: "patients",         toAnchor: "bottom", label: "patient_id" },
  { from: "screening_records", fromAnchor: "right", to: "sites",            toAnchor: "bottom", label: "site_id" },
  { from: "amendments",        fromAnchor: "left",  to: "trials",           toAnchor: "right",  label: "trial_id" },
];

function nodeById(id: string) { return G_NODES.find(n => n.id === id)!; }

function edgePts(fromId: string, toId: string) {
  const f = nodeById(fromId), t = nodeById(toId);
  const dx = t.x - f.x, dy = t.y - f.y;
  const dist = Math.sqrt(dx * dx + dy * dy) || 1;
  const ux = dx / dist, uy = dy / dist;
  return {
    x1: f.x + ux * f.r, y1: f.y + uy * f.r,
    x2: t.x - ux * (t.r + 7), y2: t.y - uy * (t.r + 7),
    mx: (f.x + t.x) / 2 + (-uy * 13),
    my: (f.y + t.y) / 2 + (ux * 13),
  };
}

const DOMAIN_COLORS: Record<string, string> = {
  Core: ORANGE, Clinical: "#3b82f6", Operational: "#22c55e",
  Protocol: "#f59e0b", Safety: "#ef4444", Regulatory: "#8b5cf6",
  Taxonomy: "#6b7280",
};

/* ─── Semantic gap comparison rows ─── */
const GAP_ROWS = [
  {
    need: "Patient eligibility definition",
    rdbms: "dose_esc_flag = 1  (INT column, no definition)",
    gap: "Agent infers meaning from column name only — 6 eligibility criteria in protocol never applied",
    graph: "6 DoseEscalationCriteria nodes, each anchored to Protocol v3.2 §4.2. Patient → [:MEETS_CRITERION] → each criterion.",
  },
  {
    need: "SAE urgency classification",
    rdbms: "serious = 1  (flat INT — fatal, hospitalisation, life-threatening all equal)",
    gap: "Fatal SAE (7-day deadline) and hospitalisation SAE (15-day) are indistinguishable in schema",
    graph: "SAE → [:IS_SUBTYPE_OF] → SAESubtype → [:GOVERNED_BY] → ICH_E2A_Rule { deadlineDays: 7 or 15 }",
  },
  {
    need: "Screen failure root cause",
    rdbms: "fail_reason TEXT  (free text per operator)",
    gap: "Cannot group by category. Root cause patterns across sites are invisible. Each site writes different text.",
    graph: "ScreeningRecord → [:FAILED_DUE_TO] → FailureCategory (11 protocol-defined nodes, not free text)",
  },
  {
    need: "Causal chain: Amendment → Site impact",
    rdbms: "No FK between amendments and sites tables",
    gap: "The IMPACTED_BY relationship cannot be modelled as a FK. Root cause traversal requires a human analyst.",
    graph: "Site → [:IMPACTED_BY { deltaScreenFailRate: +18% }] → ProtocolAmendment. Single 5-hop traversal reveals root cause.",
  },
];

/* ─── Domain legend ─── */
const LEGEND = Object.entries(DOMAIN_COLORS).map(([domain, color]) => ({ domain, color }));

export default function OntologyModel() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [hoveredEdge, setHoveredEdge] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"graph" | "rdbms" | "compare">("graph");

  const hNode = hoveredNode ? nodeById(hoveredNode) : null;
  const hEdge = hoveredEdge !== null ? G_EDGES[hoveredEdge] : null;

  return (
    <div style={{ minHeight: "100vh", background: DARK, color: OFF_WHITE, fontFamily: "'Inter', sans-serif", display: "flex", flexDirection: "column" }}>
      <style>{`
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,78,0,0.2); border-radius: 2px; }
        .hover-node { cursor: pointer; transition: opacity 0.15s; }
        .hover-node:hover { opacity: 0.85; }
        .hover-edge { cursor: pointer; }
      `}</style>

      {/* Page header */}
      <div style={{ padding: "0.6rem 1.5rem", borderBottom: "1px solid rgba(252,252,252,0.06)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <p style={{ fontSize: "0.56rem", fontWeight: 700, color: ORANGE, margin: "0 0 1px", letterSpacing: "0.12em", textTransform: "uppercase" }}>Ontology Model</p>
          <p style={{ fontSize: "0.85rem", fontWeight: 700, color: OFF_WHITE, margin: 0 }}>Graph DB Ontology Layer vs RDBMS Schema</p>
        </div>
        <p style={{ fontSize: "0.6rem", color: "rgba(252,252,252,0.35)", margin: 0 }}>Clinical Trials Operations — Neo4j Property Graph</p>
      </div>

      {/* Sub-tab switcher */}
      <div style={{ padding: "0.5rem 1.5rem", borderBottom: "1px solid rgba(252,252,252,0.05)", display: "flex", gap: "0.4rem" }}>
        {([["graph","Graph DB Ontology"],["rdbms","RDBMS Schema"],["compare","Semantic Gap Analysis"]] as const).map(([id, label]) => (
          <button key={id} onClick={() => setActiveTab(id)}
            style={{ padding: "0.4rem 0.9rem", borderRadius: "4px", border: activeTab === id ? `1px solid ${ORANGE}` : "1px solid rgba(252,252,252,0.08)", background: activeTab === id ? "rgba(255,78,0,0.1)" : "transparent", color: activeTab === id ? ORANGE : "rgba(252,252,252,0.5)", fontSize: "0.68rem", fontWeight: activeTab === id ? 700 : 500, cursor: "pointer", fontFamily: "inherit", transition: "all 0.15s" }}>
            {label}
          </button>
        ))}
      </div>

      {/* ═══════════════════ GRAPH TAB ═══════════════════ */}
      {activeTab === "graph" && (
        <div style={{ flex: 1, display: "flex", gap: 0, minHeight: 0, overflow: "hidden" }}>
          {/* SVG graph */}
          <div style={{ flex: 1, overflowY: "auto", padding: "0.75rem 0.75rem 0.75rem 1.5rem" }}>
            <p style={{ fontSize: "0.6rem", color: "rgba(252,252,252,0.3)", margin: "0 0 0.5rem", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              Hover any node or relationship to see its properties
            </p>
            <svg viewBox="0 0 760 500" style={{ width: "100%", maxWidth: 820, display: "block" }}>
              <defs>
                {G_EDGES.map((e, i) => (
                  <marker key={i} id={`arrow-${i}`} markerWidth="9" markerHeight="6" refX="8" refY="3" orient="auto">
                    <polygon points="0 0, 9 3, 0 6" fill={e.color} opacity="0.8" />
                  </marker>
                ))}
              </defs>

              {/* Edges */}
              {G_EDGES.map((edge, i) => {
                const p = edgePts(edge.from, edge.to);
                const isHovered = hoveredEdge === i;
                return (
                  <g key={i} className="hover-edge"
                    onMouseEnter={() => setHoveredEdge(i)}
                    onMouseLeave={() => setHoveredEdge(null)}>
                    <line
                      x1={p.x1} y1={p.y1} x2={p.x2} y2={p.y2}
                      stroke={edge.color}
                      strokeWidth={isHovered ? 2.5 : 1.5}
                      strokeOpacity={isHovered ? 1 : 0.55}
                      markerEnd={`url(#arrow-${i})`}
                    />
                    {/* Edge label background */}
                    <rect
                      x={p.mx - 38} y={p.my - 7} width={76} height={14}
                      rx={2} fill={DARK} fillOpacity={isHovered ? 0.95 : 0.75}
                    />
                    <text
                      x={p.mx} y={p.my + 4.5}
                      textAnchor="middle"
                      fontSize={isHovered ? 7.5 : 7}
                      fontFamily="monospace"
                      fill={edge.color}
                      opacity={isHovered ? 1 : 0.8}
                      fontWeight={isHovered ? "bold" : "normal"}
                    >
                      {edge.rel}
                    </text>
                  </g>
                );
              })}

              {/* Nodes */}
              {G_NODES.map((node) => {
                const isHovered = hoveredNode === node.id;
                const lines = node.label.split("\n");
                return (
                  <g key={node.id} className="hover-node"
                    onMouseEnter={() => setHoveredNode(node.id)}
                    onMouseLeave={() => setHoveredNode(null)}>
                    {/* Glow ring when hovered */}
                    {isHovered && (
                      <circle cx={node.x} cy={node.y} r={node.r + 6}
                        fill="none" stroke={node.color} strokeWidth={2} opacity={0.4} />
                    )}
                    {/* Node fill */}
                    <circle cx={node.x} cy={node.y} r={node.r}
                      fill={node.color} fillOpacity={isHovered ? 0.22 : 0.13}
                      stroke={node.color} strokeWidth={isHovered ? 2 : 1.5}
                      strokeOpacity={isHovered ? 1 : 0.7}
                    />
                    {/* Node label */}
                    {lines.map((line, li) => (
                      <text key={li} x={node.x} y={node.y + (lines.length === 1 ? 4 : li * 12 - 4)}
                        textAnchor="middle" fontSize={node.r >= 44 ? 10 : 8.5}
                        fontWeight={700} fontFamily="Inter, sans-serif"
                        fill={OFF_WHITE} opacity={0.92}>
                        {line}
                      </text>
                    ))}
                    {/* Node type label below */}
                    <text x={node.x} y={node.y + node.r + 11}
                      textAnchor="middle" fontSize={6.5}
                      fontFamily="monospace" fill={node.color} opacity={0.7}>
                      {node.nodeType}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Domain legend */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginTop: "0.6rem" }}>
              {LEGEND.map(l => (
                <div key={l.domain} style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                  <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: l.color }} />
                  <span style={{ fontSize: "0.58rem", color: "rgba(252,252,252,0.45)" }}>{l.domain}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Property inspector */}
          <div style={{ width: "260px", borderLeft: "1px solid rgba(252,252,252,0.06)", padding: "0.75rem", overflowY: "auto", flexShrink: 0, background: "rgba(255,255,255,0.015)" }}>
            {!hNode && !hEdge && (
              <div style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "0.4rem" }}>
                <div style={{ width: "32px", height: "32px", borderRadius: "50%", border: `1px solid rgba(255,78,0,0.2)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: "0.9rem", color: ORANGE }}>↗</span>
                </div>
                <p style={{ fontSize: "0.63rem", color: "rgba(252,252,252,0.25)", textAlign: "center", lineHeight: 1.5, margin: 0 }}>
                  Hover a node or relationship on the graph to inspect its schema definition
                </p>
              </div>
            )}
            {hNode && (
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.6rem" }}>
                  <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: hNode.color, flexShrink: 0 }} />
                  <div>
                    <p style={{ fontSize: "0.65rem", fontWeight: 800, color: OFF_WHITE, margin: 0 }}>{hNode.label.replace("\n", " ")}</p>
                    <p style={{ fontSize: "0.58rem", fontFamily: "monospace", color: hNode.color, margin: 0 }}>{hNode.nodeType}</p>
                  </div>
                </div>
                <div style={{ padding: "0.3rem 0.5rem", background: "rgba(255,255,255,0.03)", borderRadius: "3px", marginBottom: "0.5rem" }}>
                  <p style={{ fontSize: "0.55rem", fontWeight: 700, color: "rgba(252,252,252,0.3)", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 0.3rem" }}>Domain</p>
                  <span style={{ fontSize: "0.62rem", fontWeight: 700, color: DOMAIN_COLORS[hNode.domain], background: `${DOMAIN_COLORS[hNode.domain]}18`, padding: "2px 7px", borderRadius: "2px" }}>{hNode.domain}</span>
                </div>
                <p style={{ fontSize: "0.55rem", fontWeight: 700, color: "rgba(252,252,252,0.3)", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 0.3rem" }}>Node Properties</p>
                {hNode.props.map(prop => (
                  <div key={prop} style={{ display: "flex", alignItems: "center", gap: "0.35rem", padding: "0.22rem 0.4rem", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                    <span style={{ fontSize: "0.6rem", color: "rgba(252,252,252,0.2)" }}>·</span>
                    <span style={{ fontSize: "0.62rem", fontFamily: "monospace", color: "rgba(252,252,252,0.65)" }}>{prop}</span>
                  </div>
                ))}
                <div style={{ marginTop: "0.65rem", padding: "0.4rem 0.5rem", background: "rgba(255,78,0,0.05)", border: "1px solid rgba(255,78,0,0.15)", borderRadius: "3px" }}>
                  <p style={{ fontSize: "0.59rem", color: "rgba(252,252,252,0.4)", margin: 0, lineHeight: 1.5 }}>
                    Each node type has a canonical definition shared across all agents. Any agent traversing this graph inherits the same semantic context.
                  </p>
                </div>
              </div>
            )}
            {hEdge && !hNode && (
              <div>
                <p style={{ fontSize: "0.55rem", fontWeight: 700, color: "rgba(252,252,252,0.3)", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 0.5rem" }}>Relationship</p>
                <div style={{ padding: "0.4rem 0.6rem", background: `${hEdge.color}12`, border: `1px solid ${hEdge.color}35`, borderRadius: "4px", marginBottom: "0.6rem" }}>
                  <p style={{ fontSize: "0.7rem", fontWeight: 800, fontFamily: "monospace", color: hEdge.color, margin: 0 }}>[:{hEdge.rel}]</p>
                  <p style={{ fontSize: "0.6rem", color: "rgba(252,252,252,0.4)", margin: "2px 0 0" }}>
                    ({nodeById(hEdge.from).label.replace("\n"," ")}) → ({nodeById(hEdge.to).label.replace("\n"," ")})
                  </p>
                </div>
                <p style={{ fontSize: "0.55rem", fontWeight: 700, color: "rgba(252,252,252,0.3)", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 0.3rem" }}>Semantic Properties Carried</p>
                <div style={{ padding: "0.35rem 0.5rem", background: "rgba(255,255,255,0.03)", borderRadius: "3px", marginBottom: "0.6rem" }}>
                  <p style={{ fontSize: "0.63rem", fontFamily: "monospace", color: "rgba(252,252,252,0.65)", margin: 0, lineHeight: 1.6 }}>{hEdge.props}</p>
                </div>
                <div style={{ padding: "0.4rem 0.5rem", background: "rgba(255,78,0,0.05)", border: "1px solid rgba(255,78,0,0.15)", borderRadius: "3px" }}>
                  <p style={{ fontSize: "0.59rem", color: "rgba(252,252,252,0.4)", margin: 0, lineHeight: 1.5 }}>
                    This relationship is a typed, named first-class object in the graph — not a foreign key integer. Any agent traversing this edge inherits its semantic properties automatically.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ═══════════════════ RDBMS TAB ═══════════════════ */}
      {activeTab === "rdbms" && (
        <div style={{ flex: 1, overflowY: "auto", padding: "0.75rem 1.5rem" }}>
          <p style={{ fontSize: "0.6rem", color: "rgba(252,252,252,0.3)", margin: "0 0 0.75rem", letterSpacing: "0.08em", textTransform: "uppercase" }}>
            Hover ⚠ columns to see the semantic gap. Dashed lines are FK joins — the only way to connect entities in RDBMS.
          </p>
          <svg viewBox="0 0 740 510" style={{ width: "100%", maxWidth: 900, display: "block" }}>
            <defs>
              <marker id="fk-arrow" markerWidth="8" markerHeight="5" refX="7" refY="2.5" orient="auto">
                <polygon points="0 0, 8 2.5, 0 5" fill="rgba(252,252,252,0.2)" />
              </marker>
            </defs>

            {/* FK lines (dashed) */}
            {/* patients → trials */}
            <line x1={233} y1={195} x2={265} y2={78} stroke="rgba(252,252,252,0.18)" strokeWidth={1} strokeDasharray="4,3" markerEnd="url(#fk-arrow)" />
            {/* patients → sites */}
            <line x1={233} y1={215} x2={265} y2={235} stroke="rgba(252,252,252,0.18)" strokeWidth={1} strokeDasharray="4,3" markerEnd="url(#fk-arrow)" />
            {/* adverse_events → patients */}
            <line x1={510} y1={195} x2={233} y2={215} stroke="rgba(252,252,252,0.18)" strokeWidth={1} strokeDasharray="4,3" markerEnd="url(#fk-arrow)" />
            {/* screening_records → patients */}
            <line x1={130} y1={380} x2={130} y2={310} stroke="rgba(252,252,252,0.18)" strokeWidth={1} strokeDasharray="4,3" markerEnd="url(#fk-arrow)" />
            {/* screening_records → sites */}
            <line x1={233} y1={415} x2={265} y2={310} stroke="rgba(252,252,252,0.18)" strokeWidth={1} strokeDasharray="4,3" markerEnd="url(#fk-arrow)" />
            {/* amendments → trials */}
            <line x1={510} y1={55} x2={460} y2={55} stroke="rgba(252,252,252,0.18)" strokeWidth={1} strokeDasharray="4,3" markerEnd="url(#fk-arrow)" />

            {/* MISSING relationship callout */}
            <line x1={460} y1={195} x2={580} y2={100} stroke="#ef4444" strokeWidth={1} strokeDasharray="3,3" opacity={0.5} />
            <rect x={480} y={140} width={200} height={36} rx={3} fill="rgba(239,68,68,0.07)" stroke="rgba(239,68,68,0.3)" strokeWidth={1} />
            <text x={580} y={154} textAnchor="middle" fontSize={8.5} fill="#ef4444" fontWeight="bold">NO FK: amendments ↔ sites</text>
            <text x={580} y={168} textAnchor="middle" fontSize={7.5} fill="rgba(239,68,68,0.6)">IMPACTED_BY relationship invisible</text>

            {/* Tables */}
            {RDBMS_TABLES.map((table) => {
              const rowH = 20;
              const headerH = 26;
              const totalH = headerH + table.cols.length * rowH + 8;
              return (
                <g key={table.id}>
                  {/* Table border */}
                  <rect x={table.x} y={table.y} width={table.w} height={totalH}
                    rx={4} fill="rgba(255,255,255,0.025)" stroke={table.color} strokeWidth={1.5} strokeOpacity={0.45} />
                  {/* Header */}
                  <rect x={table.x} y={table.y} width={table.w} height={headerH}
                    rx={4} fill={`${table.color}20`} />
                  <rect x={table.x} y={table.y + headerH - 4} width={table.w} height={4} fill={`${table.color}20`} />
                  <text x={table.x + 10} y={table.y + 17} fontSize={10} fontWeight="bold"
                    fontFamily="monospace" fill={table.color}>{table.label}</text>

                  {/* Columns */}
                  {table.cols.map((col, ci) => (
                    <g key={col.name}>
                      <rect x={table.x} y={table.y + headerH + ci * rowH}
                        width={table.w} height={rowH}
                        fill={ci % 2 === 0 ? "rgba(255,255,255,0.015)" : "transparent"} />
                      {/* PK/FK badge */}
                      {col.pk && (
                        <text x={table.x + 8} y={table.y + headerH + ci * rowH + 13.5}
                          fontSize={7} fontWeight="bold" fill="#f59e0b" fontFamily="monospace">PK</text>
                      )}
                      {col.fk && (
                        <text x={table.x + 8} y={table.y + headerH + ci * rowH + 13.5}
                          fontSize={7} fontWeight="bold" fill="rgba(252,252,252,0.3)" fontFamily="monospace">FK</text>
                      )}
                      {/* Column name */}
                      <text x={table.x + (col.pk || col.fk ? 26 : 10)}
                        y={table.y + headerH + ci * rowH + 13.5}
                        fontSize={8.5} fontFamily="monospace"
                        fill={col.warn ? "#fbbf24" : "rgba(252,252,252,0.6)"}>
                        {col.name}
                      </text>
                      {/* Warning icon */}
                      {col.warn && (
                        <text x={table.x + table.w - 14}
                          y={table.y + headerH + ci * rowH + 14}
                          fontSize={10} fill="#fbbf24" textAnchor="middle">⚠</text>
                      )}
                    </g>
                  ))}

                  {/* Semantic gap note */}
                  {table.gap && (
                    <>
                      <rect x={table.x} y={table.y + totalH + 3} width={table.w} height={28}
                        rx={2} fill="rgba(239,68,68,0.06)" stroke="rgba(239,68,68,0.2)" strokeWidth={1} />
                      <text x={table.x + 6} y={table.y + totalH + 14} fontSize={7} fill="#ef4444">⚠ {table.gap.substring(0,48)}</text>
                      <text x={table.x + 6} y={table.y + totalH + 25} fontSize={7} fill="#ef4444">{table.gap.substring(48)}</text>
                    </>
                  )}
                </g>
              );
            })}
          </svg>

          {/* Legend */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginTop: "0.75rem", paddingTop: "0.6rem", borderTop: "1px solid rgba(252,252,252,0.06)" }}>
            {[["PK", "#f59e0b", "Primary key"], ["FK", "rgba(252,252,252,0.3)", "Foreign key join (integer, no semantics)"], ["⚠", "#fbbf24", "Semantic gap — hover to see details"]].map(([badge, color, desc]) => (
              <div key={badge} style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                <span style={{ fontSize: "0.62rem", fontFamily: "monospace", fontWeight: 700, color }}>{badge}</span>
                <span style={{ fontSize: "0.6rem", color: "rgba(252,252,252,0.35)" }}>{desc}</span>
              </div>
            ))}
            <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
              <div style={{ width: "22px", height: "1px", background: "rgba(252,252,252,0.2)", borderTop: "1px dashed rgba(252,252,252,0.2)" }} />
              <span style={{ fontSize: "0.6rem", color: "rgba(252,252,252,0.35)" }}>FK join (integer pointer, no relationship semantics)</span>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════ COMPARE TAB ═══════════════════ */}
      {activeTab === "compare" && (
        <div style={{ flex: 1, overflowY: "auto", padding: "0.75rem 1.5rem" }}>
          <p style={{ fontSize: "0.6rem", color: "rgba(252,252,252,0.3)", margin: "0 0 0.75rem", letterSpacing: "0.08em", textTransform: "uppercase" }}>
            4 examples where RDBMS loses semantic context that the Ontology Graph preserves
          </p>

          {/* Summary stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0.4rem", marginBottom: "0.75rem" }}>
            {[
              ["12", "Ontology Node Types", ORANGE],
              ["12", "Typed Relationships", "#22c55e"],
              ["7", "Semantic Gaps in RDBMS", "#ef4444"],
              ["5-hop", "Max Causal Traversal", "#818cf8"],
            ].map(([val, label, color]) => (
              <div key={label} style={{ padding: "0.6rem 0.75rem", background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "4px" }}>
                <p style={{ fontSize: "1.2rem", fontWeight: 800, color, margin: "0 0 1px" }}>{val}</p>
                <p style={{ fontSize: "0.58rem", color: "rgba(252,252,252,0.35)", margin: 0, lineHeight: 1.3 }}>{label}</p>
              </div>
            ))}
          </div>

          {/* Gap table */}
          <div style={{ border: "1px solid rgba(252,252,252,0.07)", borderRadius: "4px", overflow: "hidden" }}>
            {/* Header */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", background: "rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(252,252,252,0.06)" }}>
              {["What leadership asked", "RDBMS approach", "Semantic gap", "Graph DB ontology"].map((h, i) => (
                <div key={h} style={{ padding: "0.5rem 0.75rem", borderLeft: i > 0 ? "1px solid rgba(252,252,252,0.06)" : "none" }}>
                  <p style={{ fontSize: "0.58rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em", color: i === 0 ? "rgba(252,252,252,0.5)" : i === 1 ? "#ef4444" : i === 2 ? "#f59e0b" : "#22c55e", margin: 0 }}>{h}</p>
                </div>
              ))}
            </div>
            {GAP_ROWS.map((row, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", borderBottom: i < GAP_ROWS.length - 1 ? "1px solid rgba(252,252,252,0.04)" : "none" }}>
                <div style={{ padding: "0.65rem 0.75rem" }}>
                  <p style={{ fontSize: "0.68rem", fontWeight: 700, color: OFF_WHITE, margin: 0, lineHeight: 1.4 }}>{row.need}</p>
                </div>
                <div style={{ padding: "0.65rem 0.75rem", borderLeft: "1px solid rgba(252,252,252,0.04)", background: "rgba(239,68,68,0.03)" }}>
                  <p style={{ fontSize: "0.62rem", fontFamily: "monospace", color: "#fca5a5", margin: 0, lineHeight: 1.5 }}>{row.rdbms}</p>
                </div>
                <div style={{ padding: "0.65rem 0.75rem", borderLeft: "1px solid rgba(252,252,252,0.04)", background: "rgba(251,191,36,0.03)" }}>
                  <p style={{ fontSize: "0.62rem", color: "#fde68a", margin: 0, lineHeight: 1.5 }}>{row.gap}</p>
                </div>
                <div style={{ padding: "0.65rem 0.75rem", borderLeft: "1px solid rgba(252,252,252,0.04)", background: "rgba(34,197,94,0.03)" }}>
                  <p style={{ fontSize: "0.62rem", fontFamily: "monospace", color: "#86efac", margin: 0, lineHeight: 1.5 }}>{row.graph}</p>
                </div>
              </div>
            ))}
          </div>

          {/* How the ontology was built */}
          <div style={{ marginTop: "0.75rem", padding: "0.75rem 1rem", background: "rgba(255,78,0,0.05)", border: "1px solid rgba(255,78,0,0.18)", borderRadius: "4px" }}>
            <p style={{ fontSize: "0.65rem", fontWeight: 800, color: ORANGE, margin: "0 0 0.5rem", letterSpacing: "0.06em" }}>How the Ontology Layer was built for this POC</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.5rem" }}>
              {[
                ["1. Define Node Types", "Identified 12 canonical entity types from the clinical trial protocol — Patient, Trial, Site, SAE, Protocol, Amendment, etc. Each type maps to a real clinical operations concept, not a table."],
                ["2. Model Relationships as First-Class Objects", "Defined 12 typed, directed relationships with semantic names (ENROLLED_IN, IS_SUBTYPE_OF, GOVERNED_BY). Each relationship carries properties — not just an integer FK pointer."],
                ["3. Encode Protocol Rules as Graph Nodes", "6 DoseEscalationCriteria, 11 FailureCategories, and ICH E2A rules encoded as nodes — meaning any agent traversing the graph inherits regulatory context without a lookup table."],
              ].map(([title, body]) => (
                <div key={title} style={{ padding: "0.5rem 0.65rem", background: "rgba(255,255,255,0.03)", borderRadius: "3px" }}>
                  <p style={{ fontSize: "0.62rem", fontWeight: 700, color: ORANGE, margin: "0 0 0.3rem" }}>{title}</p>
                  <p style={{ fontSize: "0.6rem", color: "rgba(252,252,252,0.45)", margin: 0, lineHeight: 1.5 }}>{body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
