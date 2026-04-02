export default function Slide06ContextSolution() {
  return (
    <div className="relative w-screen h-screen overflow-hidden" style={{ background: "#fcfcfc" }}>
      <div style={{ position: "absolute", top: 0, left: 0, width: "0.35vw", height: "100%", background: "#ff4e00" }} />

      <div className="flex flex-col h-full px-[7vw] py-[6vh]">
        <div style={{ marginBottom: "3.5vh" }}>
          <p className="font-medium uppercase tracking-[0.12em]" style={{ fontSize: "1.2vw", color: "#ff4e00", marginBottom: "1.2vh" }}>
            Slide 05
          </p>
          <h2 className="font-bold tracking-tight" style={{ fontSize: "3.8vw", color: "#161616", lineHeight: "1.05" }}>
            How Graph DB Solves the Context Problem
          </h2>
          <div style={{ width: "4vw", height: "0.35vh", background: "#161616", marginTop: "1.8vh" }} />
        </div>

        <div className="flex gap-[3vw] flex-1" style={{ minHeight: 0 }}>
          <div className="flex flex-col flex-1 rounded-sm overflow-hidden" style={{ border: "1px solid #dadada" }}>
            <div className="px-[2vw] py-[1.5vh] flex items-center gap-[1vw]" style={{ background: "#f5f5f5", borderBottom: "1px solid #dadada" }}>
              <div style={{ width: "0.8vw", height: "0.8vw", borderRadius: "50%", background: "#dadada" }} />
              <p className="font-bold uppercase tracking-[0.1em]" style={{ fontSize: "1vw", color: "#7a7a7a" }}>Before — Direct Access</p>
            </div>
            <div className="flex flex-col justify-around flex-1 px-[2vw] py-[2vh]" style={{ gap: "1.2vh" }}>
              <div className="flex items-center gap-[1.2vw] px-[1.5vw] py-[1.2vh] rounded-sm" style={{ background: "#f5f5f5" }}>
                <div style={{ width: "1.2vw", height: "1.2vw", borderRadius: "50%", background: "#dadada", flexShrink: 0 }} />
                <div>
                  <p className="font-semibold" style={{ fontSize: "1.2vw", color: "#161616" }}>Recruitment Agent</p>
                  <p style={{ fontSize: "1vw", color: "#7a7a7a" }}>Builds its own SQL context</p>
                </div>
              </div>
              <div className="flex items-center gap-[1.2vw] px-[1.5vw] py-[1.2vh] rounded-sm" style={{ background: "#f5f5f5" }}>
                <div style={{ width: "1.2vw", height: "1.2vw", borderRadius: "50%", background: "#dadada", flexShrink: 0 }} />
                <div>
                  <p className="font-semibold" style={{ fontSize: "1.2vw", color: "#161616" }}>Safety Agent</p>
                  <p style={{ fontSize: "1vw", color: "#7a7a7a" }}>Builds its own SQL context</p>
                </div>
              </div>
              <div className="flex items-center gap-[1.2vw] px-[1.5vw] py-[1.2vh] rounded-sm" style={{ background: "#f5f5f5" }}>
                <div style={{ width: "1.2vw", height: "1.2vw", borderRadius: "50%", background: "#dadada", flexShrink: 0 }} />
                <div>
                  <p className="font-semibold" style={{ fontSize: "1.2vw", color: "#161616" }}>Regulatory Agent</p>
                  <p style={{ fontSize: "1vw", color: "#7a7a7a" }}>Builds its own SQL context</p>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center py-[1.5vh]" style={{ borderTop: "1px dashed #dadada", marginTop: "0.5vh" }}>
                <p style={{ fontSize: "1vw", color: "#7a7a7a", textAlign: "center" }}>3 agents. 3 separate interpretations.<br/>0 shared knowledge.</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center" style={{ width: "4vw", flexShrink: 0 }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5vh" }}>
              <div style={{ width: "0.3vw", flex: 1, background: "#dadada" }} />
              <div style={{ width: 0, height: 0, borderLeft: "1.2vw solid transparent", borderRight: "1.2vw solid transparent", borderTop: "1.5vw solid #ff4e00" }} />
            </div>
          </div>

          <div className="flex flex-col flex-1 rounded-sm overflow-hidden" style={{ border: "2px solid #ff4e00" }}>
            <div className="px-[2vw] py-[1.5vh] flex items-center gap-[1vw]" style={{ background: "#ff4e00" }}>
              <div style={{ width: "0.8vw", height: "0.8vw", borderRadius: "50%", background: "#fcfcfc" }} />
              <p className="font-bold uppercase tracking-[0.1em]" style={{ fontSize: "1vw", color: "#fcfcfc" }}>After — Ontology Layer</p>
            </div>
            <div className="flex flex-col flex-1 px-[2vw] py-[2vh]" style={{ gap: "1.2vh" }}>
              <div className="flex items-center gap-[1.2vw] px-[1.5vw] py-[1.2vh] rounded-sm" style={{ background: "#f5f5f5" }}>
                <div style={{ width: "1.2vw", height: "1.2vw", borderRadius: "50%", background: "#161616", flexShrink: 0 }} />
                <p className="font-semibold" style={{ fontSize: "1.2vw", color: "#161616" }}>Recruitment Agent</p>
              </div>
              <div className="flex items-center gap-[1.2vw] px-[1.5vw] py-[1.2vh] rounded-sm" style={{ background: "#f5f5f5" }}>
                <div style={{ width: "1.2vw", height: "1.2vw", borderRadius: "50%", background: "#161616", flexShrink: 0 }} />
                <p className="font-semibold" style={{ fontSize: "1.2vw", color: "#161616" }}>Safety Agent</p>
              </div>
              <div className="flex items-center gap-[1.2vw] px-[1.5vw] py-[1.2vh] rounded-sm" style={{ background: "#f5f5f5" }}>
                <div style={{ width: "1.2vw", height: "1.2vw", borderRadius: "50%", background: "#161616", flexShrink: 0 }} />
                <p className="font-semibold" style={{ fontSize: "1.2vw", color: "#161616" }}>Regulatory Agent</p>
              </div>
              <div className="flex flex-col items-center justify-center py-[1.5vh] px-[1.5vw] rounded-sm" style={{ background: "#161616", marginTop: "0.5vh" }}>
                <p style={{ fontSize: "1.1vw", color: "rgba(252,252,252,0.7)", textAlign: "center", marginBottom: "0.5vh" }}>All agents query</p>
                <p className="font-bold" style={{ fontSize: "1.4vw", color: "#ff4e00", textAlign: "center" }}>Graph DB Ontology Layer</p>
                <p style={{ fontSize: "1vw", color: "rgba(252,252,252,0.5)", textAlign: "center", marginTop: "0.5vh" }}>One shared semantic brain</p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-sm px-[2.5vw] flex items-center" style={{ marginTop: "2.5vh", height: "7vh", background: "#161616" }}>
          <p style={{ fontSize: "1.4vw", color: "rgba(252,252,252,0.5)", fontWeight: 300 }}>
            The result —
            <span className="font-semibold" style={{ color: "#fcfcfc" }}> Build the ontology once. Every agent in your ecosystem inherits trial protocol context, regulatory compliance, and semantic consistency.</span>
          </p>
        </div>
      </div>
    </div>
  );
}
