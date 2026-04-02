export default function Slide04Challenges() {
  return (
    <div className="relative w-screen h-screen overflow-hidden" style={{ background: "#161616" }}>
      <div style={{ position: "absolute", top: 0, left: 0, width: "0.35vw", height: "100%", background: "#ff4e00" }} />
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "0.35vh", background: "#ff4e00" }} />

      <div className="flex flex-col h-full px-[7vw] py-[6vh]">
        <div style={{ marginBottom: "4vh" }}>
          <p className="font-medium uppercase tracking-[0.12em]" style={{ fontSize: "1.2vw", color: "#ff4e00", marginBottom: "1.2vh" }}>
            Slide 03
          </p>
          <h2 className="font-bold tracking-tight" style={{ fontSize: "3.8vw", color: "#fcfcfc", lineHeight: "1.05" }}>
            Challenges with Traditional Approaches
          </h2>
          <div style={{ width: "4vw", height: "0.35vh", background: "#ff4e00", marginTop: "1.8vh" }} />
        </div>

        <div className="grid grid-cols-2 gap-[2vw] flex-1" style={{ minHeight: 0 }}>
          <div className="flex flex-col justify-center px-[2.5vw] rounded-sm" style={{ background: "rgba(252,252,252,0.04)", border: "1px solid rgba(252,252,252,0.08)" }}>
            <div className="font-black" style={{ fontSize: "3.5vw", color: "#ff4e00", lineHeight: 1, marginBottom: "1.5vh" }}>01</div>
            <p className="font-bold" style={{ fontSize: "2vw", color: "#fcfcfc", marginBottom: "1vh" }}>Metric Hallucination</p>
            <p style={{ fontSize: "1.35vw", color: "rgba(252,252,252,0.6)", lineHeight: "1.5", fontWeight: 300 }}>
              Agents misread column semantics. A field named <span style={{ color: "#fcfcfc", fontWeight: 500 }}>enrollment_count</span> is treated as randomized patients — silently including screen failures, withdrawals, and roll-overs.
            </p>
          </div>

          <div className="flex flex-col justify-center px-[2.5vw] rounded-sm" style={{ background: "rgba(252,252,252,0.04)", border: "1px solid rgba(252,252,252,0.08)" }}>
            <div className="font-black" style={{ fontSize: "3.5vw", color: "#ff4e00", lineHeight: 1, marginBottom: "1.5vh" }}>02</div>
            <p className="font-bold" style={{ fontSize: "2vw", color: "#fcfcfc", marginBottom: "1vh" }}>Semantic Blindness</p>
            <p style={{ fontSize: "1.35vw", color: "rgba(252,252,252,0.6)", lineHeight: "1.5", fontWeight: 300 }}>
              No understanding of trial hierarchies. An agent cannot infer that a <span style={{ color: "#fcfcfc", fontWeight: 500 }}>Serious Adverse Event</span> is an <span style={{ color: "#fcfcfc", fontWeight: 500 }}>Adverse Event</span> is a <span style={{ color: "#fcfcfc", fontWeight: 500 }}>Safety Observation</span> — unless explicitly encoded.
            </p>
          </div>

          <div className="flex flex-col justify-center px-[2.5vw] rounded-sm" style={{ background: "rgba(252,252,252,0.04)", border: "1px solid rgba(252,252,252,0.08)" }}>
            <div className="font-black" style={{ fontSize: "3.5vw", color: "#ff4e00", lineHeight: 1, marginBottom: "1.5vh" }}>03</div>
            <p className="font-bold" style={{ fontSize: "2vw", color: "#fcfcfc", marginBottom: "1vh" }}>Governance Bypass</p>
            <p style={{ fontSize: "1.35vw", color: "rgba(252,252,252,0.6)", lineHeight: "1.5", fontWeight: 300 }}>
              Direct data access bypasses patient-level data access controls and 21 CFR Part 11 audit trail requirements, risking <span style={{ color: "#fcfcfc", fontWeight: 500 }}>GCP non-compliance and regulatory findings.</span>
            </p>
          </div>

          <div className="flex flex-col justify-center px-[2.5vw] rounded-sm" style={{ background: "rgba(252,252,252,0.04)", border: "1px solid rgba(252,252,252,0.08)" }}>
            <div className="font-black" style={{ fontSize: "3.5vw", color: "#ff4e00", lineHeight: 1, marginBottom: "1.5vh" }}>04</div>
            <p className="font-bold" style={{ fontSize: "2vw", color: "#fcfcfc", marginBottom: "1vh" }}>Context Fragmentation</p>
            <p style={{ fontSize: "1.35vw", color: "rgba(252,252,252,0.6)", lineHeight: "1.5", fontWeight: 300 }}>
              Every agent independently rebuilds trial protocol logic from raw CTMS and EDC schemas. <span style={{ color: "#fcfcfc", fontWeight: 500 }}>No reuse. No consistency. No regulatory traceability.</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
