export default function Slide07TechArchitecture() {
  return (
    <div className="relative w-screen h-screen overflow-hidden" style={{ background: "#161616" }}>
      <div style={{ position: "absolute", top: 0, left: 0, width: "0.35vw", height: "100%", background: "#ff4e00" }} />

      <div className="flex flex-col h-full px-[7vw] py-[6vh]">
        <div style={{ marginBottom: "3.5vh" }}>
          <p className="font-medium uppercase tracking-[0.12em]" style={{ fontSize: "1.2vw", color: "#ff4e00", marginBottom: "1.2vh" }}>
            Slide 06
          </p>
          <h2 className="font-bold tracking-tight" style={{ fontSize: "3.8vw", color: "#fcfcfc", lineHeight: "1.05" }}>
            Technical Architecture of the Ontology Layer
          </h2>
          <div style={{ width: "4vw", height: "0.35vh", background: "#ff4e00", marginTop: "1.8vh" }} />
        </div>

        <div className="flex flex-col gap-[1.5vh] flex-1" style={{ minHeight: 0 }}>
          <div className="flex gap-[1.5vw] flex-1" style={{ minHeight: 0 }}>
            <div className="flex flex-col justify-center items-start px-[2vw] rounded-sm" style={{ width: "22vw", flexShrink: 0, background: "rgba(252,252,252,0.05)", border: "1px solid rgba(252,252,252,0.1)" }}>
              <p className="font-semibold uppercase tracking-[0.1em]" style={{ fontSize: "0.95vw", color: "#ff4e00", marginBottom: "1.5vh" }}>Agent Ecosystem</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.8vh", width: "100%" }}>
                <div className="px-[1.2vw] py-[0.8vh] rounded-sm" style={{ background: "rgba(252,252,252,0.08)" }}>
                  <p style={{ fontSize: "1.1vw", color: "#fcfcfc", fontWeight: 500 }}>Domain Agents</p>
                  <p style={{ fontSize: "0.95vw", color: "rgba(252,252,252,0.5)" }}>Recruitment, Safety, Data Management, Regulatory</p>
                </div>
                <div className="px-[1.2vw] py-[0.8vh] rounded-sm" style={{ background: "rgba(252,252,252,0.08)" }}>
                  <p style={{ fontSize: "1.1vw", color: "#fcfcfc", fontWeight: 500 }}>Orchestrators</p>
                  <p style={{ fontSize: "0.95vw", color: "rgba(252,252,252,0.5)" }}>LangGraph, CrewAI, AutoGen</p>
                </div>
                <div className="px-[1.2vw] py-[0.8vh] rounded-sm" style={{ background: "rgba(252,252,252,0.08)" }}>
                  <p style={{ fontSize: "1.1vw", color: "#fcfcfc", fontWeight: 500 }}>Analytics & Applications</p>
                  <p style={{ fontSize: "0.95vw", color: "rgba(252,252,252,0.5)" }}>Dashboards, copilots, APIs</p>
                </div>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", flexShrink: 0, width: "2.5vw" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", height: "60%" }}>
                <div style={{ width: "0.2vw", flex: 1, background: "#ff4e00" }} />
                <div style={{ width: 0, height: 0, borderLeft: "0.8vw solid transparent", borderRight: "0.8vw solid transparent", borderTop: "1.2vw solid #ff4e00" }} />
              </div>
            </div>

            <div className="flex flex-col justify-center flex-1 rounded-sm px-[2.5vw]" style={{ border: "2px solid #ff4e00", background: "rgba(255,78,0,0.05)" }}>
              <p className="font-bold uppercase tracking-[0.1em]" style={{ fontSize: "1.1vw", color: "#ff4e00", marginBottom: "2vh" }}>
                Graph DB Ontology Layer — The Semantic Middleware
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.2vh 2vw" }}>
                <div>
                  <p className="font-semibold" style={{ fontSize: "1.1vw", color: "#fcfcfc", marginBottom: "0.3vh" }}>Entity Catalog</p>
                  <p style={{ fontSize: "1vw", color: "rgba(252,252,252,0.5)" }}>Canonical trial entities — patients, sites, protocols, endpoints</p>
                </div>
                <div>
                  <p className="font-semibold" style={{ fontSize: "1.1vw", color: "#fcfcfc", marginBottom: "0.3vh" }}>Relationship Graph</p>
                  <p style={{ fontSize: "1vw", color: "rgba(252,252,252,0.5)" }}>How entities connect — arm assignments, site–patient links, SAE chains</p>
                </div>
                <div>
                  <p className="font-semibold" style={{ fontSize: "1.1vw", color: "#fcfcfc", marginBottom: "0.3vh" }}>Protocol Rules & Inference</p>
                  <p style={{ fontSize: "1vw", color: "rgba(252,252,252,0.5)" }}>SPARQL / Cypher reasoning engine</p>
                </div>
                <div>
                  <p className="font-semibold" style={{ fontSize: "1.1vw", color: "#fcfcfc", marginBottom: "0.3vh" }}>Governance & Access Control</p>
                  <p style={{ fontSize: "1vw", color: "rgba(252,252,252,0.5)" }}>Row-level security and data lineage</p>
                </div>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", flexShrink: 0, width: "2.5vw" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", height: "60%" }}>
                <div style={{ width: "0.2vw", flex: 1, background: "#ff4e00" }} />
                <div style={{ width: 0, height: 0, borderLeft: "0.8vw solid transparent", borderRight: "0.8vw solid transparent", borderTop: "1.2vw solid #ff4e00" }} />
              </div>
            </div>

            <div className="flex flex-col justify-center items-start px-[2vw] rounded-sm" style={{ width: "22vw", flexShrink: 0, background: "rgba(252,252,252,0.05)", border: "1px solid rgba(252,252,252,0.1)" }}>
              <p className="font-semibold uppercase tracking-[0.1em]" style={{ fontSize: "0.95vw", color: "#ff4e00", marginBottom: "1.5vh" }}>Enterprise Data Lake</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.8vh", width: "100%" }}>
                <div className="px-[1.2vw] py-[0.8vh] rounded-sm" style={{ background: "rgba(252,252,252,0.08)" }}>
                  <p style={{ fontSize: "1.1vw", color: "#fcfcfc", fontWeight: 500 }}>Structured Sources</p>
                  <p style={{ fontSize: "0.95vw", color: "rgba(252,252,252,0.5)" }}>CTMS, EDC, eTMF, safety databases</p>
                </div>
                <div className="px-[1.2vw] py-[0.8vh] rounded-sm" style={{ background: "rgba(252,252,252,0.08)" }}>
                  <p style={{ fontSize: "1.1vw", color: "#fcfcfc", fontWeight: 500 }}>Unstructured Sources</p>
                  <p style={{ fontSize: "0.95vw", color: "rgba(252,252,252,0.5)" }}>Protocols, ICFs, case narratives, CSRs</p>
                </div>
                <div className="px-[1.2vw] py-[0.8vh] rounded-sm" style={{ background: "rgba(252,252,252,0.08)" }}>
                  <p style={{ fontSize: "1.1vw", color: "#fcfcfc", fontWeight: 500 }}>Real-time Streams</p>
                  <p style={{ fontSize: "0.95vw", color: "rgba(252,252,252,0.5)" }}>ePRO, wearables, SAE feeds, lab results</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-sm px-[2.5vw] flex items-center" style={{ height: "7vh", background: "rgba(255,78,0,0.1)", border: "1px solid rgba(255,78,0,0.3)" }}>
            <p style={{ fontSize: "1.4vw", color: "rgba(252,252,252,0.6)", fontWeight: 300 }}>
              The ontology layer is —
              <span className="font-semibold" style={{ color: "#fcfcfc" }}> protocol-agnostic, exposing SPARQL, Cypher, REST, and GraphQL endpoints so any agent framework can connect.</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
