export default function Slide09ProsAndCons() {
  return (
    <div className="relative w-screen h-screen overflow-hidden" style={{ background: "#fcfcfc" }}>
      <div style={{ position: "absolute", top: 0, left: 0, width: "0.35vw", height: "100%", background: "#ff4e00" }} />
      <div className="flex flex-col h-full px-[7vw] py-[6vh]">
        <div style={{ marginBottom: "3vh" }}>
          <p className="font-medium uppercase tracking-[0.12em]" style={{ fontSize: "1.2vw", color: "#ff4e00", marginBottom: "1.2vh" }}>
            Slide 09
          </p>
          <h2 className="font-bold tracking-tight" style={{ fontSize: "3.5vw", color: "#161616", lineHeight: "1.05" }}>Assessment — Strengths, Challenges & Mitigations</h2>
          <div style={{ width: "4vw", height: "0.35vh", background: "#161616", marginTop: "1.8vh" }} />
        </div>

        <div className="flex gap-[2vw] flex-1" style={{ minHeight: 0 }}>
          <div className="flex flex-col rounded-sm overflow-hidden flex-1">
            <div className="px-[2vw] py-[1.5vh]" style={{ background: "#161616" }}>
              <p className="font-bold uppercase tracking-[0.1em]" style={{ fontSize: "1.1vw", color: "#fcfcfc" }}>Strengths</p>
            </div>
            <div className="flex flex-col flex-1 px-[2vw] py-[2vh]" style={{ background: "#f5f5f5", gap: "1.5vh" }}>
              <div style={{ display: "flex", gap: "1vw", alignItems: "flex-start" }}>
                <div style={{ width: "0.35vw", height: "2.5vh", background: "#ff4e00", marginTop: "0.3vh", flexShrink: 0 }} />
                <div>
                  <p className="font-semibold" style={{ fontSize: "1.2vw", color: "#161616" }}>Reusable Semantic Context</p>
                  <p style={{ fontSize: "1.05vw", color: "#7a7a7a" }}>Build once, inherit everywhere across all agents</p>
                </div>
              </div>
              <div style={{ display: "flex", gap: "1vw", alignItems: "flex-start" }}>
                <div style={{ width: "0.35vw", height: "2.5vh", background: "#ff4e00", marginTop: "0.3vh", flexShrink: 0 }} />
                <div>
                  <p className="font-semibold" style={{ fontSize: "1.2vw", color: "#161616" }}>Explainable Reasoning Paths</p>
                  <p style={{ fontSize: "1.05vw", color: "#7a7a7a" }}>Deterministic graph traversal — auditable and trustworthy</p>
                </div>
              </div>
              <div style={{ display: "flex", gap: "1vw", alignItems: "flex-start" }}>
                <div style={{ width: "0.35vw", height: "2.5vh", background: "#ff4e00", marginTop: "0.3vh", flexShrink: 0 }} />
                <div>
                  <p className="font-semibold" style={{ fontSize: "1.2vw", color: "#161616" }}>Enforced Governance</p>
                  <p style={{ fontSize: "1.05vw", color: "#7a7a7a" }}>Access control, data lineage, and security built in</p>
                </div>
              </div>
              <div style={{ display: "flex", gap: "1vw", alignItems: "flex-start" }}>
                <div style={{ width: "0.35vw", height: "2.5vh", background: "#ff4e00", marginTop: "0.3vh", flexShrink: 0 }} />
                <div>
                  <p className="font-semibold" style={{ fontSize: "1.2vw", color: "#161616" }}>Ecosystem Scalability</p>
                  <p style={{ fontSize: "1.05vw", color: "#7a7a7a" }}>Every new agent automatically inherits the full ontology</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col rounded-sm overflow-hidden flex-1">
            <div className="px-[2vw] py-[1.5vh]" style={{ background: "#484848" }}>
              <p className="font-bold uppercase tracking-[0.1em]" style={{ fontSize: "1.1vw", color: "#fcfcfc" }}>Challenges</p>
            </div>
            <div className="flex flex-col flex-1 px-[2vw] py-[2vh]" style={{ background: "#f5f5f5", gap: "1.5vh" }}>
              <div style={{ display: "flex", gap: "1vw", alignItems: "flex-start" }}>
                <div style={{ width: "0.35vw", height: "2.5vh", background: "#7a7a7a", marginTop: "0.3vh", flexShrink: 0 }} />
                <div>
                  <p className="font-semibold" style={{ fontSize: "1.2vw", color: "#161616" }}>Initial Ontology Investment</p>
                  <p style={{ fontSize: "1.05vw", color: "#7a7a7a" }}>Requires domain expertise to model correctly upfront</p>
                </div>
              </div>
              <div style={{ display: "flex", gap: "1vw", alignItems: "flex-start" }}>
                <div style={{ width: "0.35vw", height: "2.5vh", background: "#7a7a7a", marginTop: "0.3vh", flexShrink: 0 }} />
                <div>
                  <p className="font-semibold" style={{ fontSize: "1.2vw", color: "#161616" }}>Specialized Engineering Skills</p>
                  <p style={{ fontSize: "1.05vw", color: "#7a7a7a" }}>SPARQL/Cypher expertise is not yet mainstream</p>
                </div>
              </div>
              <div style={{ display: "flex", gap: "1vw", alignItems: "flex-start" }}>
                <div style={{ width: "0.35vw", height: "2.5vh", background: "#7a7a7a", marginTop: "0.3vh", flexShrink: 0 }} />
                <div>
                  <p className="font-semibold" style={{ fontSize: "1.2vw", color: "#161616" }}>Data Sync Complexity</p>
                  <p style={{ fontSize: "1.05vw", color: "#7a7a7a" }}>Keeping the graph in sync with source systems at scale</p>
                </div>
              </div>
              <div style={{ display: "flex", gap: "1vw", alignItems: "flex-start" }}>
                <div style={{ width: "0.35vw", height: "2.5vh", background: "#7a7a7a", marginTop: "0.3vh", flexShrink: 0 }} />
                <div>
                  <p className="font-semibold" style={{ fontSize: "1.2vw", color: "#161616" }}>Query Complexity for End Users</p>
                  <p style={{ fontSize: "1.05vw", color: "#7a7a7a" }}>Non-technical users cannot query directly</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col rounded-sm overflow-hidden flex-1">
            <div className="px-[2vw] py-[1.5vh]" style={{ background: "#ff4e00" }}>
              <p className="font-bold uppercase tracking-[0.1em]" style={{ fontSize: "1.1vw", color: "#fcfcfc" }}>How Challenges Are Solved</p>
            </div>
            <div className="flex flex-col flex-1 px-[2vw] py-[2vh]" style={{ background: "#f5f5f5", gap: "1.5vh" }}>
              <div style={{ display: "flex", gap: "1vw", alignItems: "flex-start" }}>
                <div style={{ width: "0.35vw", height: "2.5vh", background: "#ff4e00", marginTop: "0.3vh", flexShrink: 0 }} />
                <div>
                  <p className="font-semibold" style={{ fontSize: "1.2vw", color: "#161616" }}>Incremental Approach</p>
                  <p style={{ fontSize: "1.05vw", color: "#7a7a7a" }}>Start with one domain, expand iteratively — proven pattern</p>
                </div>
              </div>
              <div style={{ display: "flex", gap: "1vw", alignItems: "flex-start" }}>
                <div style={{ width: "0.35vw", height: "2.5vh", background: "#ff4e00", marginTop: "0.3vh", flexShrink: 0 }} />
                <div>
                  <p className="font-semibold" style={{ fontSize: "1.2vw", color: "#161616" }}>Managed Services + AI Tooling</p>
                  <p style={{ fontSize: "1.05vw", color: "#7a7a7a" }}>Neo4j, Stardog, Amazon Neptune lower the skills barrier</p>
                </div>
              </div>
              <div style={{ display: "flex", gap: "1vw", alignItems: "flex-start" }}>
                <div style={{ width: "0.35vw", height: "2.5vh", background: "#ff4e00", marginTop: "0.3vh", flexShrink: 0 }} />
                <div>
                  <p className="font-semibold" style={{ fontSize: "1.2vw", color: "#161616" }}>CDC Pipelines + Event Streaming</p>
                  <p style={{ fontSize: "1.05vw", color: "#7a7a7a" }}>Debezium, Kafka keep the graph current in real time</p>
                </div>
              </div>
              <div style={{ display: "flex", gap: "1vw", alignItems: "flex-start" }}>
                <div style={{ width: "0.35vw", height: "2.5vh", background: "#ff4e00", marginTop: "0.3vh", flexShrink: 0 }} />
                <div>
                  <p className="font-semibold" style={{ fontSize: "1.2vw", color: "#161616" }}>LLM as Query Translator</p>
                  <p style={{ fontSize: "1.05vw", color: "#7a7a7a" }}>Natural language is translated to Cypher/SPARQL by the agent</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
