import { useState, useCallback, useRef } from "react";
import { scenarios, type Scenario, type Step, type AuditEntry, type OntologyStep, type HopStep, type ContextGap } from "@/data/scenarios";

type RunState = "idle" | "running" | "done";

function useAgentRunner(steps: Step[]) {
  const [visibleSteps, setVisibleSteps] = useState<number>(0);
  const [state, setState] = useState<RunState>("idle");
  const cancelled = useRef(false);
  const run = useCallback(async () => {
    cancelled.current = false;
    setState("running");
    setVisibleSteps(0);
    for (let i = 0; i < steps.length; i++) {
      if (cancelled.current) break;
      await new Promise((r) => setTimeout(r, i === 0 ? 200 : steps[i - 1]?.duration ?? 400));
      if (cancelled.current) break;
      setVisibleSteps(i + 1);
    }
    if (!cancelled.current) setState("done");
  }, [steps]);
  const reset = useCallback(() => { cancelled.current = true; setState("idle"); setVisibleSteps(0); }, []);
  return { visibleSteps, state, run, reset };
}

const ORANGE = "#ff4e00";
const DARK = "#161616";
const OFF_WHITE = "#fcfcfc";
const stepColor: Record<string, string> = { info: "rgba(252,252,252,0.55)", warn: "#f59e0b", error: "#ef4444", success: "#22c55e", discovery: "#818cf8" };
const stepBullet: Record<string, string> = { info: "○", warn: "⚠", error: "✕", success: "✓", discovery: "◆" };
const impactColor: Record<string, string> = { critical: "#ef4444", high: "#f59e0b", medium: "#a3a3a3" };

function StepItem({ step, visible }: { step: Step; visible: boolean }) {
  const color = stepColor[step.type] ?? stepColor.info;
  const bullet = stepBullet[step.type] ?? "○";
  return (
    <div style={{ display: "flex", gap: "0.6rem", alignItems: "flex-start", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(5px)", transition: "opacity 0.3s ease, transform 0.3s ease", marginBottom: "0.55rem" }}>
      <span style={{ color, fontFamily: "monospace", fontSize: "0.7rem", marginTop: "2px", flexShrink: 0, fontWeight: 700 }}>{bullet}</span>
      <div>
        <p style={{ color, fontSize: "0.75rem", fontWeight: 600, margin: 0, lineHeight: 1.3 }}>{step.label}</p>
        <p style={{ color: "rgba(252,252,252,0.32)", fontSize: "0.65rem", fontFamily: "monospace", margin: "2px 0 0", lineHeight: 1.4 }}>{step.detail}</p>
      </div>
    </div>
  );
}

function QueryBlock({ code, lang, side }: { code: string; lang: string; side: "traditional" | "graph" }) {
  const accent = side === "traditional" ? "#ef4444" : ORANGE;
  return (
    <div style={{ background: side === "traditional" ? "rgba(239,68,68,0.05)" : "rgba(255,78,0,0.05)", borderRadius: "4px", border: `1px solid ${side === "traditional" ? "rgba(239,68,68,0.15)" : "rgba(255,78,0,0.18)"}`, padding: "0.6rem 0.85rem", marginBottom: "0.65rem" }}>
      <p style={{ fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: accent, margin: "0 0 0.35rem" }}>{lang}</p>
      <pre style={{ margin: 0, fontSize: "0.62rem", fontFamily: "monospace", color: "rgba(252,252,252,0.72)", whiteSpace: "pre-wrap", lineHeight: 1.6 }}>{code}</pre>
    </div>
  );
}

function ContextGapsPanel({ gaps }: { gaps: ContextGap[] }) {
  return (
    <div style={{ marginBottom: "0.65rem" }}>
      <p style={{ fontSize: "0.58rem", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: "#ef4444", margin: "0 0 0.4rem" }}>Context Gaps — Agent is Guessing</p>
      {gaps.map((gap, i) => (
        <div key={i} style={{ display: "flex", gap: "0.5rem", alignItems: "flex-start", marginBottom: "0.45rem", background: "rgba(239,68,68,0.04)", border: "1px solid rgba(239,68,68,0.12)", borderRadius: "3px", padding: "0.4rem 0.6rem" }}>
          <div style={{ flexShrink: 0, marginTop: "2px" }}>
            <span style={{ fontSize: "0.58rem", fontWeight: 800, color: impactColor[gap.impact], background: `${impactColor[gap.impact]}18`, padding: "1px 5px", borderRadius: "2px", letterSpacing: "0.06em" }}>{gap.impact.toUpperCase()}</span>
          </div>
          <div>
            <p style={{ fontSize: "0.65rem", fontWeight: 700, color: "rgba(252,252,252,0.75)", margin: "0 0 1px", fontFamily: "monospace" }}>{gap.field}</p>
            <p style={{ fontSize: "0.63rem", color: "#fca5a5", margin: 0, lineHeight: 1.4 }}>{gap.issue}</p>
          </div>
        </div>
      ))}
      <div style={{ padding: "0.4rem 0.6rem", background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.15)", borderRadius: "3px", marginTop: "0.35rem" }}>
        <p style={{ fontSize: "0.6rem", fontWeight: 700, color: "#ef4444", margin: "0 0 0.15rem" }}>NO SHARED CONTEXT — REBUILT FROM SCRATCH</p>
        <p style={{ fontSize: "0.59rem", color: "rgba(252,252,252,0.38)", margin: 0, lineHeight: 1.5 }}>Every agent independently guesses the meaning of raw schema fields. If a second agent runs the same query, it may reach a different answer.</p>
      </div>
    </div>
  );
}

function OntologyPathPanel({ path }: { path: OntologyStep[] }) {
  return (
    <div style={{ marginBottom: "0.65rem" }}>
      <p style={{ fontSize: "0.58rem", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: ORANGE, margin: "0 0 0.5rem" }}>Context Stitched in Graph — Agent Inherits</p>
      <div style={{ overflowX: "auto", paddingBottom: "0.25rem" }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 0, minWidth: "max-content" }}>
          {path.map((step, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{ padding: "0.3rem 0.55rem", background: "rgba(255,78,0,0.1)", border: `1px solid rgba(255,78,0,0.3)`, borderRadius: "4px", minWidth: "80px", textAlign: "center" }}>
                  <p style={{ fontSize: "0.62rem", fontWeight: 700, color: OFF_WHITE, margin: 0, lineHeight: 1.2 }}>{step.node}</p>
                  <p style={{ fontSize: "0.52rem", color: ORANGE, margin: "1px 0 0", fontWeight: 600, letterSpacing: "0.05em" }}>{step.nodeType}</p>
                </div>
              </div>
              {step.edge && i < path.length - 1 && (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "0 0.2rem", marginTop: "0.15rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
                    <div style={{ width: "12px", height: "1px", background: "rgba(255,78,0,0.45)" }} />
                    <span style={{ fontSize: "0.52rem", fontWeight: 700, color: ORANGE, fontFamily: "monospace", whiteSpace: "nowrap", background: "rgba(255,78,0,0.08)", border: "1px solid rgba(255,78,0,0.2)", borderRadius: "2px", padding: "1px 4px" }}>{step.edge}</span>
                    <div style={{ width: "12px", height: "1px", background: "rgba(255,78,0,0.45)" }} />
                    <span style={{ fontSize: "0.65rem", color: ORANGE }}>▶</span>
                  </div>
                  {step.edgeSemantics && (
                    <p style={{ fontSize: "0.52rem", color: "rgba(252,252,252,0.4)", margin: "2px 0 0", textAlign: "center", maxWidth: "100px", lineHeight: 1.3 }}>{step.edgeSemantics}</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div style={{ padding: "0.4rem 0.6rem", background: "rgba(255,78,0,0.05)", border: "1px solid rgba(255,78,0,0.15)", borderRadius: "3px", marginTop: "0.45rem" }}>
        <p style={{ fontSize: "0.6rem", fontWeight: 700, color: ORANGE, margin: "0 0 0.15rem" }}>CONTEXT PRE-STITCHED — EVERY AGENT INHERITS</p>
        <p style={{ fontSize: "0.59rem", color: "rgba(252,252,252,0.38)", margin: 0, lineHeight: 1.5 }}>Meaning is encoded in edges, not reconstructed from column names. Any agent — recruitment, safety, regulatory — traversing this graph gets the same semantics automatically.</p>
      </div>
    </div>
  );
}

function MultiHopPanel({ hops }: { hops: HopStep[] }) {
  const hopBg: Record<string, string> = { discovery: "rgba(129,140,248,0.07)", cause: "rgba(251,191,36,0.06)", root: "rgba(34,197,94,0.08)" };
  const hopBorder: Record<string, string> = { discovery: "rgba(129,140,248,0.2)", cause: "rgba(251,191,36,0.2)", root: "rgba(34,197,94,0.25)" };
  const hopColor: Record<string, string> = { discovery: "#818cf8", cause: "#fbbf24", root: "#22c55e" };
  const hopLabel: Record<string, string> = { discovery: "DISCOVERY", cause: "CAUSE", root: "ROOT CAUSE" };
  return (
    <div style={{ marginBottom: "0.65rem" }}>
      <p style={{ fontSize: "0.58rem", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: "#818cf8", margin: "0 0 0.5rem" }}>Multi-Hop Causal Chain — Single Query Traversal</p>
      {hops.map((hop) => (
        <div key={hop.hop} style={{ display: "flex", gap: "0.6rem", marginBottom: "0.4rem" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
            <div style={{ width: "22px", height: "22px", borderRadius: "50%", background: hopBg[hop.type], border: `1px solid ${hopBorder[hop.type]}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: "0.58rem", fontWeight: 800, color: hopColor[hop.type] }}>{hop.hop}</span>
            </div>
            {hop.hop < hops.length && <div style={{ width: "1px", flex: 1, background: "rgba(129,140,248,0.2)", margin: "2px 0" }} />}
          </div>
          <div style={{ flex: 1, background: hopBg[hop.type], border: `1px solid ${hopBorder[hop.type]}`, borderRadius: "4px", padding: "0.4rem 0.6rem", marginBottom: "0.15rem" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.2rem" }}>
              <p style={{ fontSize: "0.58rem", fontFamily: "monospace", color: hopColor[hop.type], margin: 0, fontWeight: 700 }}>{hop.traversal}</p>
              <span style={{ fontSize: "0.52rem", fontWeight: 800, color: hopColor[hop.type], background: `${hopColor[hop.type]}15`, padding: "1px 5px", borderRadius: "2px", letterSpacing: "0.06em", flexShrink: 0, marginLeft: "0.4rem" }}>{hopLabel[hop.type]}</span>
            </div>
            <p style={{ fontSize: "0.65rem", fontWeight: 600, color: OFF_WHITE, margin: "0 0 0.15rem", lineHeight: 1.35 }}>{hop.finding}</p>
            <p style={{ fontSize: "0.6rem", color: "rgba(252,252,252,0.45)", margin: 0, lineHeight: 1.4 }}>{hop.impact}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function AuditRow({ label, value, mono = false, highlight = false }: { label: string; value: string; mono?: boolean; highlight?: boolean }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "10rem 1fr", gap: "0.4rem", alignItems: "flex-start", padding: "0.25rem 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
      <span style={{ fontSize: "0.56rem", fontWeight: 700, color: "rgba(252,252,252,0.3)", textTransform: "uppercase", letterSpacing: "0.08em", lineHeight: 1.6 }}>{label}</span>
      <span style={{ fontSize: mono ? "0.58rem" : "0.62rem", fontFamily: mono ? "monospace" : "inherit", color: highlight ? "#22c55e" : "rgba(252,252,252,0.7)", lineHeight: 1.5, wordBreak: "break-all" }}>{value}</span>
    </div>
  );
}

function AuditSectionHeader({ label, icon }: { label: string; icon: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", margin: "0.55rem 0 0.3rem" }}>
      <span style={{ fontSize: "0.65rem" }}>{icon}</span>
      <span style={{ fontSize: "0.56rem", fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: ORANGE }}>{label}</span>
      <div style={{ flex: 1, height: "1px", background: "rgba(255,78,0,0.15)" }} />
    </div>
  );
}

function AuditTrailPanel({ entry, visible }: { entry: AuditEntry; visible: boolean }) {
  const [open, setOpen] = useState(false);
  if (!visible) return null;
  return (
    <div style={{ marginTop: "0.6rem", border: "1px solid rgba(255,78,0,0.25)", borderRadius: "4px", overflow: "hidden" }}>
      <button onClick={() => setOpen((o) => !o)} style={{ width: "100%", padding: "0.5rem 0.75rem", background: "rgba(255,78,0,0.07)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between", fontFamily: "inherit" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 5px #22c55e" }} />
          <span style={{ fontSize: "0.65rem", fontWeight: 700, color: OFF_WHITE }}>View 21 CFR Part 11 Audit Log</span>
          <span style={{ fontSize: "0.56rem", fontFamily: "monospace", color: "rgba(252,252,252,0.35)", background: "rgba(0,0,0,0.3)", padding: "1px 5px", borderRadius: "2px" }}>{entry.logId}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
          <span style={{ fontSize: "0.56rem", fontWeight: 700, color: "#22c55e", background: "rgba(34,197,94,0.08)", padding: "2px 6px", borderRadius: "2px" }}>IMMUTABLE</span>
          <span style={{ fontSize: "0.6rem", color: ORANGE, transform: open ? "rotate(180deg)" : "none", display: "inline-block", transition: "transform 0.2s" }}>▾</span>
        </div>
      </button>
      {open && (
        <div style={{ padding: "0.5rem 0.75rem 0.75rem", background: "rgba(0,0,0,0.3)", maxHeight: "320px", overflowY: "auto" }}>
          <AuditSectionHeader icon="🪪" label="Identity & Authentication" />
          <AuditRow label="Log ID" value={entry.logId} mono />
          <AuditRow label="Timestamp (UTC)" value={entry.timestamp} mono />
          <AuditRow label="User ID" value={entry.userId} mono />
          <AuditRow label="User Role" value={entry.userRole} />
          <AuditRow label="Organization" value={entry.userOrg} />
          <AuditRow label="Auth Method" value={entry.authMethod} mono />
          <AuditRow label="IP Address" value={entry.ipAddress} mono />
          <AuditSectionHeader icon="⚙️" label="System" />
          <AuditRow label="System ID" value={entry.systemId} mono />
          <AuditRow label="Version" value={entry.systemVersion} mono />
          <AuditSectionHeader icon="🔍" label="Action & Query" />
          <AuditRow label="Action" value={entry.action} mono />
          <AuditRow label="Query Hash" value={entry.queryHash} mono />
          <AuditSectionHeader icon="🗂️" label="Data Scope" />
          {entry.dataScope.map((s, i) => <AuditRow key={i} label={i === 0 ? "Scope" : ""} value={`· ${s}`} />)}
          <AuditRow label="Consent Validated" value={entry.consentValidated ? "YES — consent gate enforced at traversal layer" : "NO"} highlight={entry.consentValidated} />
          <AuditRow label="Privacy Boundary" value={entry.privacyBoundary} />
          <AuditSectionHeader icon="⚖️" label="Regulatory Basis" />
          {entry.regulatoryBasis.map((r, i) => <AuditRow key={i} label={i === 0 ? "References" : ""} value={`· ${r}`} />)}
          <AuditSectionHeader icon="🔗" label="Integrity Chain" />
          <AuditRow label="Entry Hash" value={entry.integrityHash} mono />
          <AuditRow label="Previous Entry" value={entry.previousLogHash} mono />
          <div style={{ margin: "0.3rem 0", padding: "0.3rem 0.5rem", background: "rgba(34,197,94,0.05)", border: "1px solid rgba(34,197,94,0.12)", borderRadius: "3px" }}>
            <p style={{ fontSize: "0.58rem", color: "#86efac", margin: 0, fontFamily: "monospace" }}>✓ Chain integrity verified — tampering with any entry breaks the cryptographic chain and is immediately detectable.</p>
          </div>
          <AuditSectionHeader icon="✍️" label="Electronic Signature" />
          <AuditRow label="Signature" value={entry.electronicSignature} mono />
          <AuditRow label="Reason" value={entry.signatureReason} />
        </div>
      )}
    </div>
  );
}

function TraditionalPanel({ result, visible }: { result: Scenario["traditional"]["result"]; visible: boolean }) {
  return (
    <div style={{ opacity: visible ? 1 : 0, transition: "opacity 0.4s ease", marginTop: "0.65rem" }}>
      <QueryBlock code={result.query} lang={result.queryLang} side="traditional" />
      <div style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.22)", borderRadius: "4px", padding: "0.6rem 0.85rem", marginBottom: "0.6rem" }}>
        <p style={{ fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#ef4444", margin: "0 0 0.2rem" }}>Result</p>
        <p style={{ fontSize: "0.95rem", fontWeight: 700, color: OFF_WHITE, margin: 0 }}>{result.answer}</p>
      </div>
      <ContextGapsPanel gaps={result.contextGaps} />
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", paddingTop: "0.5rem", borderTop: "1px solid rgba(252,252,252,0.06)" }}>
        <span style={{ fontSize: "0.6rem", color: "rgba(252,252,252,0.3)" }}>Time: <strong style={{ color: "rgba(252,252,252,0.55)" }}>{result.timeTaken}</strong></span>
        <span style={{ fontSize: "0.58rem", color: "#ef4444", fontWeight: 700, background: "rgba(239,68,68,0.1)", padding: "2px 7px", borderRadius: "2px", letterSpacing: "0.06em" }}>
          {result.riskLevel === "high" ? "HIGH RISK" : "MEDIUM RISK"} · NO AUDIT TRAIL
        </span>
      </div>
    </div>
  );
}

function GraphPanel({ result, visible }: { result: Scenario["graphdb"]["result"]; visible: boolean }) {
  return (
    <div style={{ opacity: visible ? 1 : 0, transition: "opacity 0.4s ease", marginTop: "0.65rem" }}>
      <QueryBlock code={result.query} lang={result.queryLang} side="graph" />
      <div style={{ background: "rgba(255,78,0,0.07)", border: "1px solid rgba(255,78,0,0.25)", borderRadius: "4px", padding: "0.6rem 0.85rem", marginBottom: "0.6rem" }}>
        <p style={{ fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: ORANGE, margin: "0 0 0.2rem" }}>Result</p>
        <p style={{ fontSize: "0.95rem", fontWeight: 700, color: OFF_WHITE, margin: 0 }}>{result.answer}</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.35rem", marginBottom: "0.6rem" }}>
        {[["Nodes traversed", result.nodesTraversed.toLocaleString()], ["Edges traversed", result.edgesTraversed.toLocaleString()]].map(([label, val]) => (
          <div key={label} style={{ background: "rgba(255,78,0,0.05)", border: "1px solid rgba(255,78,0,0.1)", borderRadius: "3px", padding: "0.3rem 0.5rem" }}>
            <p style={{ fontSize: "0.56rem", color: "rgba(252,252,252,0.35)", margin: "0 0 1px", textTransform: "uppercase", letterSpacing: "0.07em" }}>{label}</p>
            <p style={{ fontSize: "0.75rem", fontWeight: 700, color: ORANGE, margin: 0 }}>{val}</p>
          </div>
        ))}
      </div>
      <OntologyPathPanel path={result.ontologyPath} />
      {result.multiHopChain && <MultiHopPanel hops={result.multiHopChain} />}
      <div style={{ paddingTop: "0.5rem", borderTop: "1px solid rgba(252,252,252,0.06)", marginBottom: "0.5rem" }}>
        <p style={{ fontSize: "0.56rem", color: "rgba(252,252,252,0.3)", margin: "0 0 2px", textTransform: "uppercase", letterSpacing: "0.07em" }}>Data Lineage</p>
        <p style={{ fontSize: "0.62rem", fontFamily: "monospace", color: "rgba(252,252,252,0.45)", margin: 0, lineHeight: 1.5 }}>{result.lineage}</p>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", paddingTop: "0.5rem", borderTop: "1px solid rgba(252,252,252,0.06)" }}>
        <span style={{ fontSize: "0.6rem", color: "rgba(252,252,252,0.3)" }}>Time: <strong style={{ color: "rgba(252,252,252,0.55)" }}>{result.timeTaken}</strong></span>
        <span style={{ fontSize: "0.58rem", color: "#22c55e", fontWeight: 700, background: "rgba(34,197,94,0.08)", padding: "2px 7px", borderRadius: "2px", letterSpacing: "0.06em" }}>GOVERNED · AUDIT-READY</span>
      </div>
      <AuditTrailPanel entry={result.auditEntry} visible={true} />
    </div>
  );
}

function AgentPanel({ side, scenario }: { side: "traditional" | "graph"; scenario: Scenario }) {
  const data = side === "traditional" ? scenario.traditional : scenario.graphdb;
  const { visibleSteps, state, run, reset } = useAgentRunner(data.steps);
  const isRunning = state === "running";
  const isDone = state === "done";
  const accentColor = side === "traditional" ? "#ef4444" : ORANGE;
  const isRCA = scenario.id === "rca";

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "rgba(255,255,255,0.025)", border: `1px solid ${side === "traditional" ? "rgba(239,68,68,0.18)" : "rgba(255,78,0,0.22)"}`, borderRadius: "6px", overflow: "hidden", minWidth: 0 }}>
      <div style={{ padding: "0.75rem 1rem", background: side === "traditional" ? "rgba(239,68,68,0.07)" : "rgba(255,78,0,0.09)", borderBottom: `1px solid ${side === "traditional" ? "rgba(239,68,68,0.12)" : "rgba(255,78,0,0.18)"}`, display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
        <div>
          <span style={{ fontSize: "0.56rem", fontWeight: 700, letterSpacing: "0.14em", color: accentColor, textTransform: "uppercase", display: "block", marginBottom: "2px" }}>
            {side === "traditional" ? "TRADITIONAL — SQL AGENT" : isRCA ? "GRAPH DB — MULTI-HOP TRAVERSAL" : "GRAPH DB — ONTOLOGY-AWARE AGENT"}
          </span>
          <p style={{ fontSize: "0.78rem", fontWeight: 600, color: OFF_WHITE, margin: 0 }}>{data.agentName}</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
          {isRunning && [0,1,2].map(i => <div key={i} style={{ width: "4px", height: "4px", borderRadius: "50%", background: accentColor, animation: `pulse 1.2s ease-in-out ${i*0.2}s infinite` }} />)}
          {isDone && <span style={{ fontSize: "0.58rem", fontWeight: 700, color: side === "traditional" ? "#ef4444" : "#22c55e" }}>{side === "traditional" ? "CONTEXT GAPS FOUND" : "CONTEXT INHERITED"}</span>}
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "0.75rem 1rem" }}>
        <p style={{ fontSize: "0.56rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(252,252,252,0.3)", margin: "0 0 0.4rem" }}>Execution Trace</p>
        {data.steps.map((step, i) => <StepItem key={i} step={step} visible={i < visibleSteps} />)}
        {isDone && (
          side === "traditional"
            ? <TraditionalPanel result={scenario.traditional.result} visible={true} />
            : <GraphPanel result={scenario.graphdb.result} visible={true} />
        )}
      </div>

      <div style={{ padding: "0.6rem 1rem", borderTop: `1px solid ${side === "traditional" ? "rgba(239,68,68,0.1)" : "rgba(255,78,0,0.1)"}`, flexShrink: 0 }}>
        {state === "idle"
          ? <button onClick={run} style={{ width: "100%", padding: "0.5rem", borderRadius: "4px", border: `1px solid ${accentColor}`, background: `${accentColor}15`, color: accentColor, fontSize: "0.68rem", fontWeight: 700, cursor: "pointer", letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "inherit" }} onMouseOver={e => e.currentTarget.style.background=`${accentColor}28`} onMouseOut={e => e.currentTarget.style.background=`${accentColor}15`}>Run Agent</button>
          : <button onClick={reset} style={{ width: "100%", padding: "0.5rem", borderRadius: "4px", border: "1px solid rgba(252,252,252,0.1)", background: "transparent", color: "rgba(252,252,252,0.35)", fontSize: "0.68rem", fontWeight: 700, cursor: "pointer", letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "inherit" }}>Reset</button>
        }
      </div>
    </div>
  );
}

export default function Demo() {
  const [activeId, setActiveId] = useState(scenarios[0].id);
  const scenario = scenarios.find(s => s.id === activeId)!;
  const isRCA = scenario.id === "rca";

  return (
    <div style={{ minHeight: "100vh", background: DARK, color: OFF_WHITE, fontFamily: "'Inter', sans-serif", display: "flex", flexDirection: "column" }}>
      <style>{`
        @keyframes pulse { 0%,100%{opacity:0.3} 50%{opacity:1} }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,78,0,0.2); border-radius: 2px; }
      `}</style>

      <div style={{ borderBottom: "1px solid rgba(252,252,252,0.06)", padding: "0 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", minHeight: "48px", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
          <div style={{ width: "3px", height: "16px", background: ORANGE }} />
          <div>
            <p style={{ fontSize: "0.68rem", fontWeight: 700, color: ORANGE, margin: 0, letterSpacing: "0.1em", textTransform: "uppercase" }}>Live Demo</p>
            <p style={{ fontSize: "0.6rem", color: "rgba(252,252,252,0.35)", margin: 0 }}>Graph DB Ontology Layer — Agent Behavior Comparison</p>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
          <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 5px #22c55e" }} />
          <span style={{ fontSize: "0.58rem", color: "rgba(252,252,252,0.35)" }}>Clinical Trials Operations</span>
        </div>
      </div>

      <div style={{ padding: "0.6rem 1.5rem", borderBottom: "1px solid rgba(252,252,252,0.05)", flexShrink: 0 }}>
        <p style={{ fontSize: "0.56rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(252,252,252,0.25)", margin: "0 0 0.4rem" }}>Scenario</p>
        <div style={{ display: "flex", gap: "0.4rem" }}>
          {scenarios.map(s => (
            <button key={s.id} onClick={() => setActiveId(s.id)}
              style={{ padding: "0.4rem 0.75rem", borderRadius: "4px", border: activeId === s.id ? `1px solid ${ORANGE}` : "1px solid rgba(252,252,252,0.08)", background: activeId === s.id ? "rgba(255,78,0,0.1)" : "transparent", color: activeId === s.id ? ORANGE : "rgba(252,252,252,0.5)", fontSize: "0.67rem", fontWeight: activeId === s.id ? 700 : 500, cursor: "pointer", fontFamily: "inherit", textAlign: "left" }}>
              <span style={{ display: "block", fontWeight: 700 }}>{s.title}</span>
              <span style={{ display: "block", fontSize: "0.57rem", opacity: 0.65 }}>{s.subtitle}</span>
            </button>
          ))}
        </div>
      </div>

      <div style={{ padding: "0.6rem 1.5rem", background: isRCA ? "rgba(129,140,248,0.04)" : "rgba(255,78,0,0.03)", borderBottom: `1px solid ${isRCA ? "rgba(129,140,248,0.12)" : "rgba(255,78,0,0.08)"}`, flexShrink: 0 }}>
        <p style={{ fontSize: "0.56rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(252,252,252,0.25)", margin: "0 0 0.2rem" }}>Query</p>
        <p style={{ fontSize: "0.9rem", fontWeight: 600, color: OFF_WHITE, margin: 0, lineHeight: 1.4 }}>"{scenario.question}"</p>
        {isRCA && <p style={{ fontSize: "0.6rem", color: "#818cf8", margin: "0.3rem 0 0", fontWeight: 600 }}>↳ Multi-hop graph traversal — traces causal chain across 5 relationship hops in a single query</p>}
      </div>

      <div style={{ flex: 1, display: "flex", gap: "0.6rem", padding: "0.6rem 1.5rem 0.75rem", minHeight: 0 }}>
        <AgentPanel side="traditional" scenario={scenario} key={`trad-${scenario.id}`} />
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flexShrink: 0, gap: "0.3rem" }}>
          <div style={{ width: "1px", flex: 1, background: "rgba(252,252,252,0.06)" }} />
          <div style={{ padding: "0.3rem 0.4rem", border: "1px solid rgba(255,78,0,0.2)", borderRadius: "3px", background: "rgba(255,78,0,0.05)" }}>
            <p style={{ fontSize: "0.52rem", fontWeight: 700, color: ORANGE, margin: 0, textTransform: "uppercase", letterSpacing: "0.08em", writingMode: "vertical-rl" }}>vs</p>
          </div>
          <div style={{ width: "1px", flex: 1, background: "rgba(252,252,252,0.06)" }} />
        </div>
        <AgentPanel side="graph" scenario={scenario} key={`graph-${scenario.id}`} />
      </div>

      <div style={{ padding: "0.4rem 1.5rem", borderTop: "1px solid rgba(252,252,252,0.04)", flexShrink: 0, display: "flex", justifyContent: "space-between" }}>
        <p style={{ fontSize: "0.56rem", color: "rgba(252,252,252,0.18)", margin: 0 }}>Simulated agent behavior · Clinical Trials Operations · 2026</p>
        <p style={{ fontSize: "0.56rem", color: "rgba(252,252,252,0.18)", margin: 0 }}>Leveraging Graph DB as the Semantic & Ontology Layer for Agentic AI</p>
      </div>
    </div>
  );
}
