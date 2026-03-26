export default function Slide03DataInteraction() {
  return (
    <div className="relative w-screen h-screen overflow-hidden" style={{ background: "#fcfcfc" }}>
      <div style={{ position: "absolute", top: 0, left: 0, width: "0.35vw", height: "100%", background: "#ff4e00" }} />

      <div className="flex flex-col h-full px-[7vw] py-[6vh]">
        <div style={{ marginBottom: "4vh" }}>
          <p className="font-medium uppercase tracking-[0.12em]" style={{ fontSize: "1.2vw", color: "#ff4e00", marginBottom: "1.2vh" }}>
            Slide 02
          </p>
          <h2 className="font-bold tracking-tight" style={{ fontSize: "3.8vw", color: "#161616", lineHeight: "1.05" }}>
            How Agents Interact with Data
          </h2>
          <div style={{ width: "4vw", height: "0.35vh", background: "#161616", marginTop: "1.8vh" }} />
        </div>

        <div className="flex gap-[3vw] flex-1" style={{ minHeight: 0 }}>
          <div className="flex flex-col justify-center items-center rounded-sm" style={{ width: "20vw", background: "#161616", flexShrink: 0 }}>
            <div style={{ width: "4vw", height: "4vw", borderRadius: "50%", background: "#ff4e00", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.5vh" }}>
              <svg width="50%" height="50%" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="8" r="4" fill="#fcfcfc"/>
                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="#fcfcfc" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <p className="font-bold text-center" style={{ fontSize: "1.8vw", color: "#fcfcfc", lineHeight: "1.1" }}>AI Agent</p>
            <p style={{ fontSize: "1.1vw", color: "rgba(252,252,252,0.55)", marginTop: "0.8vh", textAlign: "center" }}>Receives task in natural language</p>
          </div>

          <div className="flex flex-col justify-around flex-1" style={{ minHeight: 0 }}>
            <div className="flex items-stretch gap-[1.5vw]" style={{ flex: 1, marginBottom: "1.5vh" }}>
              <div className="flex items-center" style={{ width: "6vw", flexShrink: 0 }}>
                <div style={{ flex: 1, height: "0.2vh", background: "#dadada" }} />
                <div style={{ width: 0, height: 0, borderTop: "1vh solid transparent", borderBottom: "1vh solid transparent", borderLeft: "1.2vw solid #dadada" }} />
              </div>
              <div className="flex flex-col justify-center rounded-sm px-[2vw] flex-1" style={{ background: "#f5f5f5" }}>
                <p className="font-semibold uppercase tracking-[0.1em]" style={{ fontSize: "0.95vw", color: "#ff4e00", marginBottom: "0.5vh" }}>Relational Database</p>
                <p className="font-bold" style={{ fontSize: "1.7vw", color: "#161616" }}>Text-to-SQL</p>
                <p style={{ fontSize: "1.15vw", color: "#7a7a7a", marginTop: "0.4vh" }}>Agent interprets column names and generates SQL — prone to semantic mismatches</p>
              </div>
            </div>

            <div className="flex items-stretch gap-[1.5vw]" style={{ flex: 1, marginBottom: "1.5vh" }}>
              <div className="flex items-center" style={{ width: "6vw", flexShrink: 0 }}>
                <div style={{ flex: 1, height: "0.2vh", background: "#dadada" }} />
                <div style={{ width: 0, height: 0, borderTop: "1vh solid transparent", borderBottom: "1vh solid transparent", borderLeft: "1.2vw solid #dadada" }} />
              </div>
              <div className="flex flex-col justify-center rounded-sm px-[2vw] flex-1" style={{ background: "#f5f5f5" }}>
                <p className="font-semibold uppercase tracking-[0.1em]" style={{ fontSize: "0.95vw", color: "#ff4e00", marginBottom: "0.5vh" }}>Vector Store</p>
                <p className="font-bold" style={{ fontSize: "1.7vw", color: "#161616" }}>Semantic Search / RAG</p>
                <p style={{ fontSize: "1.15vw", color: "#7a7a7a", marginTop: "0.4vh" }}>Similarity-based retrieval — lacks structural relationships and business logic</p>
              </div>
            </div>

            <div className="flex items-stretch gap-[1.5vw]" style={{ flex: 1 }}>
              <div className="flex items-center" style={{ width: "6vw", flexShrink: 0 }}>
                <div style={{ flex: 1, height: "0.2vh", background: "#dadada" }} />
                <div style={{ width: 0, height: 0, borderTop: "1vh solid transparent", borderBottom: "1vh solid transparent", borderLeft: "1.2vw solid #dadada" }} />
              </div>
              <div className="flex flex-col justify-center rounded-sm px-[2vw] flex-1" style={{ background: "#f5f5f5" }}>
                <p className="font-semibold uppercase tracking-[0.1em]" style={{ fontSize: "0.95vw", color: "#ff4e00", marginBottom: "0.5vh" }}>Enterprise Data Lake</p>
                <p className="font-bold" style={{ fontSize: "1.7vw", color: "#161616" }}>Direct Query / File Parsing</p>
                <p style={{ fontSize: "1.15vw", color: "#7a7a7a", marginTop: "0.4vh" }}>Raw data at scale — no shared semantics, each agent rebuilds its own context</p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-sm px-[2.5vw] flex items-center" style={{ marginTop: "2.5vh", height: "7vh", background: "#161616" }}>
          <p style={{ fontSize: "1.4vw", color: "rgba(252,252,252,0.5)", fontWeight: 300 }}>
            The problem —
            <span className="font-semibold" style={{ color: "#fcfcfc" }}> Every agent independently interprets raw schemas, recreating business knowledge from scratch, every time.</span>
          </p>
        </div>
      </div>
    </div>
  );
}
