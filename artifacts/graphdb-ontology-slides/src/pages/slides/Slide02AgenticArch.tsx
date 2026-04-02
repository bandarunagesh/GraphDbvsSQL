export default function Slide02AgenticArch() {
  return (
    <div className="relative w-screen h-screen overflow-hidden" style={{ background: "#fcfcfc" }}>
      <div style={{ position: "absolute", top: 0, left: 0, width: "0.35vw", height: "100%", background: "#ff4e00" }} />

      <div className="flex flex-col h-full px-[7vw] py-[6vh]">
        <div style={{ marginBottom: "4vh" }}>
          <p className="font-medium uppercase tracking-[0.12em]" style={{ fontSize: "1.2vw", color: "#ff4e00", marginBottom: "1.2vh" }}>
            Slide 01
          </p>
          <h2 className="font-bold tracking-tight" style={{ fontSize: "3.8vw", color: "#161616", lineHeight: "1.05" }}>
            Typical Agentic AI Architecture
          </h2>
          <div style={{ width: "4vw", height: "0.35vh", background: "#161616", marginTop: "1.8vh" }} />
        </div>

        <div className="flex flex-col gap-[1.8vh] flex-1">
          <div className="flex gap-[2vw] items-stretch" style={{ flex: 1 }}>
            <div className="flex flex-col justify-center rounded-sm px-[2.5vw]" style={{ flex: 1, background: "#161616", minHeight: "0" }}>
              <p className="font-semibold tracking-[0.08em] uppercase" style={{ fontSize: "1vw", color: "#ff4e00", marginBottom: "1vh" }}>User Layer</p>
              <p className="font-bold" style={{ fontSize: "2vw", color: "#fcfcfc", marginBottom: "0.8vh" }}>Natural Language Interface</p>
              <p style={{ fontSize: "1.35vw", color: "rgba(252,252,252,0.65)", fontWeight: 300 }}>Chat, voice, and API — how humans and systems communicate intent to agents</p>
            </div>
            <div className="flex items-center" style={{ width: "2.5vw", color: "#dadada" }}>
              <svg viewBox="0 0 40 80" fill="none" width="100%" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 0 L20 65 M8 52 L20 68 L32 52" stroke="#dadada" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="flex flex-col justify-center rounded-sm px-[2.5vw]" style={{ flex: 1, background: "#f5f5f5", minHeight: "0" }}>
              <p className="font-semibold tracking-[0.08em] uppercase" style={{ fontSize: "1vw", color: "#ff4e00", marginBottom: "1vh" }}>Orchestration Layer</p>
              <p className="font-bold" style={{ fontSize: "2vw", color: "#161616", marginBottom: "0.8vh" }}>Agent Orchestrator</p>
              <p style={{ fontSize: "1.35vw", color: "#7a7a7a", fontWeight: 400 }}>Planning, memory management, tool routing, and multi-agent coordination</p>
            </div>
          </div>

          <div className="flex gap-[2vw]" style={{ flex: 1.2 }}>
            <div className="flex flex-col justify-center rounded-sm px-[2vw]" style={{ flex: 1, background: "#f5f5f5", minHeight: "0" }}>
              <p className="font-semibold tracking-[0.08em] uppercase" style={{ fontSize: "0.9vw", color: "#ff4e00", marginBottom: "0.8vh" }}>Cognitive Core</p>
              <p className="font-bold" style={{ fontSize: "1.7vw", color: "#161616", marginBottom: "0.5vh" }}>Large Language Model</p>
              <p style={{ fontSize: "1.2vw", color: "#7a7a7a" }}>Reasoning, language understanding, and decision-making</p>
            </div>
            <div className="flex flex-col justify-center rounded-sm px-[2vw]" style={{ flex: 1, background: "#f5f5f5", minHeight: "0" }}>
              <p className="font-semibold tracking-[0.08em] uppercase" style={{ fontSize: "0.9vw", color: "#ff4e00", marginBottom: "0.8vh" }}>Persistent Memory</p>
              <p className="font-bold" style={{ fontSize: "1.7vw", color: "#161616", marginBottom: "0.5vh" }}>Short + Long-term Context</p>
              <p style={{ fontSize: "1.2vw", color: "#7a7a7a" }}>Episodic memory, retrieval, and session state</p>
            </div>
            <div className="flex flex-col justify-center rounded-sm px-[2vw]" style={{ flex: 1, background: "#f5f5f5", minHeight: "0" }}>
              <p className="font-semibold tracking-[0.08em] uppercase" style={{ fontSize: "0.9vw", color: "#ff4e00", marginBottom: "0.8vh" }}>Tool Use</p>
              <p className="font-bold" style={{ fontSize: "1.7vw", color: "#161616", marginBottom: "0.5vh" }}>APIs, Databases & Web</p>
              <p style={{ fontSize: "1.2vw", color: "#7a7a7a" }}>Actions that interact with the external world</p>
            </div>
          </div>

          <div className="flex flex-col justify-center rounded-sm px-[2.5vw]" style={{ flex: 0.7, background: "#161616" }}>
            <p style={{ fontSize: "1.4vw", color: "rgba(252,252,252,0.5)", fontWeight: 300 }}>
              Core insight —
              <span className="font-semibold" style={{ color: "#fcfcfc" }}> Agents are only as capable as the quality and structure of the context they access.</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
