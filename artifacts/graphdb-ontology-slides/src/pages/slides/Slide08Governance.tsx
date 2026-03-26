export default function Slide08Governance() {
  return (
    <div className="relative w-screen h-screen overflow-hidden" style={{ background: "#161616" }}>
      <div style={{ position: "absolute", top: 0, left: 0, width: "0.35vw", height: "100%", background: "#ff4e00" }} />
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "0.35vh", background: "#ff4e00" }} />

      <div className="flex flex-col h-full px-[7vw] py-[6vh]">
        <div style={{ marginBottom: "4vh" }}>
          <p className="font-medium uppercase tracking-[0.12em]" style={{ fontSize: "1.2vw", color: "#ff4e00", marginBottom: "1.2vh" }}>
            Slide 07
          </p>
          <h2 className="font-bold tracking-tight" style={{ fontSize: "3.8vw", color: "#fcfcfc", lineHeight: "1.05" }}>
            Governance, Compliance &amp; Access Control
          </h2>
          <div style={{ width: "4vw", height: "0.35vh", background: "#ff4e00", marginTop: "1.8vh" }} />
        </div>

        <div className="grid grid-cols-2 gap-[2vw] flex-1" style={{ minHeight: 0 }}>

          <div className="flex flex-col justify-center px-[2.5vw] rounded-sm" style={{ background: "rgba(252,252,252,0.04)", border: "1px solid rgba(252,252,252,0.08)" }}>
            <div className="font-black" style={{ fontSize: "3.5vw", color: "#ff4e00", lineHeight: 1, marginBottom: "1.5vh" }}>01</div>
            <p className="font-bold" style={{ fontSize: "2vw", color: "#fcfcfc", marginBottom: "1vh" }}>Patient Privacy &amp; Consent</p>
            <p style={{ fontSize: "1.35vw", color: "rgba(252,252,252,0.6)", lineHeight: "1.5", fontWeight: 300 }}>
              Consent boundaries and PII classifications are encoded <span style={{ color: "#fcfcfc", fontWeight: 500 }}>directly in the ontology</span>. Agents cannot access patient-identifiable data unless consent nodes explicitly permit it — enforced at the graph layer, not the application layer.
            </p>
          </div>

          <div className="flex flex-col justify-center px-[2.5vw] rounded-sm" style={{ background: "rgba(252,252,252,0.04)", border: "1px solid rgba(252,252,252,0.08)" }}>
            <div className="font-black" style={{ fontSize: "3.5vw", color: "#ff4e00", lineHeight: 1, marginBottom: "1.5vh" }}>02</div>
            <p className="font-bold" style={{ fontSize: "2vw", color: "#fcfcfc", marginBottom: "1vh" }}>Regulatory Audit Trail</p>
            <p style={{ fontSize: "1.35vw", color: "rgba(252,252,252,0.6)", lineHeight: "1.5", fontWeight: 300 }}>
              Every agent query, traversal, and inference is timestamped and attributed to an identity — satisfying <span style={{ color: "#fcfcfc", fontWeight: 500 }}>21 CFR Part 11, ICH E6(R2), and GCP audit trail requirements</span> without additional instrumentation.
            </p>
          </div>

          <div className="flex flex-col justify-center px-[2.5vw] rounded-sm" style={{ background: "rgba(252,252,252,0.04)", border: "1px solid rgba(252,252,252,0.08)" }}>
            <div className="font-black" style={{ fontSize: "3.5vw", color: "#ff4e00", lineHeight: 1, marginBottom: "1.5vh" }}>03</div>
            <p className="font-bold" style={{ fontSize: "2vw", color: "#fcfcfc", marginBottom: "1vh" }}>Role-Based Data Access</p>
            <p style={{ fontSize: "1.35vw", color: "rgba(252,252,252,0.6)", lineHeight: "1.5", fontWeight: 300 }}>
              Site investigators see only their enrolled patients. Sponsors see aggregated cross-site views. Regulators receive <span style={{ color: "#fcfcfc", fontWeight: 500 }}>submission-ready, pre-filtered subgraphs</span>. One ontology, multiple governed views.
            </p>
          </div>

          <div className="flex flex-col justify-center px-[2.5vw] rounded-sm" style={{ background: "rgba(252,252,252,0.04)", border: "1px solid rgba(252,252,252,0.08)" }}>
            <div className="font-black" style={{ fontSize: "3.5vw", color: "#ff4e00", lineHeight: 1, marginBottom: "1.5vh" }}>04</div>
            <p className="font-bold" style={{ fontSize: "2vw", color: "#fcfcfc", marginBottom: "1vh" }}>Data Lineage &amp; Traceability</p>
            <p style={{ fontSize: "1.35vw", color: "rgba(252,252,252,0.6)", lineHeight: "1.5", fontWeight: 300 }}>
              Every data point carries a <span style={{ color: "#fcfcfc", fontWeight: 500 }}>complete provenance chain</span> — from EDC entry through ontology inference to regulatory submission — enabling end-to-end source-to-analysis traceability for inspections.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
