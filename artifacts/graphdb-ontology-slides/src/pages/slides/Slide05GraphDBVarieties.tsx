export default function Slide05GraphDBVarieties() {
  return (
    <div className="relative w-screen h-screen overflow-hidden" style={{ background: "#fcfcfc" }}>
      <div style={{ position: "absolute", top: 0, left: 0, width: "0.35vw", height: "100%", background: "#ff4e00" }} />

      <div className="flex flex-col h-full px-[7vw] py-[6vh]">
        <div style={{ marginBottom: "3.5vh" }}>
          <p className="font-medium uppercase tracking-[0.12em]" style={{ fontSize: "1.2vw", color: "#ff4e00", marginBottom: "1.2vh" }}>
            Slide 04
          </p>
          <h2 className="font-bold tracking-tight" style={{ fontSize: "3.8vw", color: "#161616", lineHeight: "1.05" }}>
            Graph Databases — The Landscape
          </h2>
          <div style={{ width: "4vw", height: "0.35vh", background: "#161616", marginTop: "1.8vh" }} />
        </div>

        <div className="flex gap-[2vw] flex-1" style={{ minHeight: 0 }}>
          <div className="flex flex-col rounded-sm overflow-hidden" style={{ flex: 1 }}>
            <div className="px-[2vw] py-[2vh]" style={{ background: "#161616" }}>
              <p className="font-semibold uppercase tracking-[0.1em]" style={{ fontSize: "0.95vw", color: "#ff4e00", marginBottom: "0.8vh" }}>Standard: W3C OWL / SPARQL</p>
              <p className="font-bold" style={{ fontSize: "2vw", color: "#fcfcfc", lineHeight: "1.1" }}>RDF Knowledge Graphs</p>
            </div>
            <div className="flex flex-col flex-1 px-[2vw] py-[2vh]" style={{ background: "#f5f5f5" }}>
              <p style={{ fontSize: "1.2vw", color: "#7a7a7a", marginBottom: "2vh", fontWeight: 400, lineHeight: "1.5" }}>
                Formal ontology modeling using triples (subject-predicate-object). Best for regulatory compliance, semantic web, and knowledge representation.
              </p>
              <div style={{ marginTop: "auto" }}>
                <p className="font-semibold" style={{ fontSize: "1vw", color: "#161616", marginBottom: "1vh", textTransform: "uppercase", letterSpacing: "0.08em" }}>Key Platforms</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.6vh" }}>
                  <p style={{ fontSize: "1.2vw", color: "#161616" }}>Stardog</p>
                  <p style={{ fontSize: "1.2vw", color: "#161616" }}>Amazon Neptune (RDF)</p>
                  <p style={{ fontSize: "1.2vw", color: "#161616" }}>Ontotext GraphDB</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col rounded-sm overflow-hidden" style={{ flex: 1 }}>
            <div className="px-[2vw] py-[2vh]" style={{ background: "#161616" }}>
              <p className="font-semibold uppercase tracking-[0.1em]" style={{ fontSize: "0.95vw", color: "#ff4e00", marginBottom: "0.8vh" }}>Standard: Cypher / GQL</p>
              <p className="font-bold" style={{ fontSize: "2vw", color: "#fcfcfc", lineHeight: "1.1" }}>Property Graphs</p>
            </div>
            <div className="flex flex-col flex-1 px-[2vw] py-[2vh]" style={{ background: "#f5f5f5" }}>
              <p style={{ fontSize: "1.2vw", color: "#7a7a7a", marginBottom: "2vh", fontWeight: 400, lineHeight: "1.5" }}>
                Nodes and edges with properties. Optimized for operational queries, network analysis, and traversal-heavy workloads at enterprise scale.
              </p>
              <div style={{ marginTop: "auto" }}>
                <p className="font-semibold" style={{ fontSize: "1vw", color: "#161616", marginBottom: "1vh", textTransform: "uppercase", letterSpacing: "0.08em" }}>Key Platforms</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.6vh" }}>
                  <p style={{ fontSize: "1.2vw", color: "#161616" }}>Neo4j</p>
                  <p style={{ fontSize: "1.2vw", color: "#161616" }}>TigerGraph</p>
                  <p style={{ fontSize: "1.2vw", color: "#161616" }}>AWS Neptune Analytics</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col rounded-sm overflow-hidden" style={{ flex: 1 }}>
            <div className="px-[2vw] py-[2vh]" style={{ background: "#161616" }}>
              <p className="font-semibold uppercase tracking-[0.1em]" style={{ fontSize: "0.95vw", color: "#ff4e00", marginBottom: "0.8vh" }}>Standard: Emerging Hybrid APIs</p>
              <p className="font-bold" style={{ fontSize: "2vw", color: "#fcfcfc", lineHeight: "1.1" }}>Vector-Enhanced Graphs</p>
            </div>
            <div className="flex flex-col flex-1 px-[2vw] py-[2vh]" style={{ background: "#f5f5f5" }}>
              <p style={{ fontSize: "1.2vw", color: "#7a7a7a", marginBottom: "2vh", fontWeight: 400, lineHeight: "1.5" }}>
                Combines graph traversal with vector similarity search. Natively designed for LLM-powered agents that blend semantic and structured reasoning.
              </p>
              <div style={{ marginTop: "auto" }}>
                <p className="font-semibold" style={{ fontSize: "1vw", color: "#161616", marginBottom: "1vh", textTransform: "uppercase", letterSpacing: "0.08em" }}>Key Platforms</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.6vh" }}>
                  <p style={{ fontSize: "1.2vw", color: "#161616" }}>FalkorDB</p>
                  <p style={{ fontSize: "1.2vw", color: "#161616" }}>Weaviate</p>
                  <p style={{ fontSize: "1.2vw", color: "#161616" }}>Memgraph</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-sm px-[2.5vw] flex items-center" style={{ marginTop: "2.5vh", height: "7vh", background: "#161616" }}>
          <p style={{ fontSize: "1.4vw", color: "rgba(252,252,252,0.5)", fontWeight: 300 }}>
            Shared principle —
            <span className="font-semibold" style={{ color: "#fcfcfc" }}> Relationships are first-class citizens. Connections carry meaning, not just pointers.</span>
          </p>
        </div>
      </div>
    </div>
  );
}
