const base = import.meta.env.BASE_URL;

export default function Slide10ThankYou() {
  return (
    <div className="relative w-screen h-screen overflow-hidden" style={{ background: "#161616" }}>
      <img
        src={`${base}hero-graph.png`}
        crossOrigin="anonymous"
        alt="Knowledge graph network visualization"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 0.2 }}
      />
      <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(22,22,22,0.97) 40%, rgba(22,22,22,0.6) 100%)" }} />

      <div style={{ position: "absolute", top: 0, left: 0, width: "0.35vw", height: "100%", background: "#ff4e00" }} />
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "0.35vh", background: "#ff4e00" }} />

      <div className="relative flex flex-col justify-between h-full px-[7vw] py-[7vh]">

        <div className="flex items-center gap-[1.5vw]">
          <div style={{ width: "0.35vw", height: "2.5vh", background: "#ff4e00" }} />
          <span className="font-medium uppercase tracking-[0.15em]" style={{ fontSize: "1.3vw", color: "rgba(252,252,252,0.5)" }}>
            Clinical Trials Operations · Enterprise AI Strategy
          </span>
        </div>

        <div>
          <div style={{ width: "5vw", height: "0.4vh", background: "#ff4e00", marginBottom: "3.5vh" }} />
          <h1 className="font-bold tracking-tight" style={{ fontSize: "7vw", color: "#fcfcfc", lineHeight: "1.0", marginBottom: "3.5vh" }}>
            Thank You
          </h1>
          <p className="font-light" style={{ fontSize: "1.9vw", color: "rgba(252,252,252,0.7)", lineHeight: "1.5", maxWidth: "50vw", marginBottom: "4vh" }}>
            Graph databases are not just a storage technology — they are the shared semantic memory that makes enterprise agentic AI trustworthy, consistent, and governable at scale.
          </p>
          <div style={{ display: "flex", gap: "2.5vw", alignItems: "center" }}>
            <div style={{ padding: "1.2vh 2vw", border: "1px solid rgba(255,78,0,0.4)", borderRadius: "2px", background: "rgba(255,78,0,0.08)" }}>
              <p style={{ fontSize: "1.1vw", color: "rgba(252,252,252,0.5)", marginBottom: "0.3vh", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 500 }}>Next Step</p>
              <p className="font-semibold" style={{ fontSize: "1.4vw", color: "#fcfcfc" }}>Schedule a discovery session</p>
            </div>
            <div style={{ padding: "1.2vh 2vw", border: "1px solid rgba(252,252,252,0.1)", borderRadius: "2px" }}>
              <p style={{ fontSize: "1.1vw", color: "rgba(252,252,252,0.5)", marginBottom: "0.3vh", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 500 }}>Deep Dive</p>
              <p className="font-semibold" style={{ fontSize: "1.4vw", color: "#fcfcfc" }}>Request a proof-of-concept</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[2vw]">
            <div style={{ display: "flex", alignItems: "center", gap: "0.6vw" }}>
              <div style={{ width: "0.35vw", height: "1.5vh", background: "#ff4e00" }} />
              <span style={{ fontSize: "1.2vw", color: "rgba(252,252,252,0.35)", fontWeight: 300 }}>2026 · Confidential</span>
            </div>
          </div>
          <p style={{ fontSize: "1.1vw", color: "rgba(252,252,252,0.25)", fontWeight: 300 }}>Graph DB as the Semantic &amp; Ontology Layer for Agentic AI</p>
        </div>

      </div>
    </div>
  );
}
