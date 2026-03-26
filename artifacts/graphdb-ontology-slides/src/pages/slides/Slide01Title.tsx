const base = import.meta.env.BASE_URL;

export default function Slide01Title() {
  return (
    <div className="relative w-screen h-screen overflow-hidden" style={{ background: "#161616" }}>
      <div
        className="absolute inset-0 w-full h-full"
        style={{ background: "linear-gradient(to bottom, rgba(22,22,22,0.05) 0%, rgba(22,22,22,0.7) 50%, rgba(22,22,22,0.98) 100%)" }}
      />
      <img
        src={`${base}hero-graph.png`}
        crossOrigin="anonymous"
        alt="Knowledge graph network visualization"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 0.45 }}
      />
      <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(22,22,22,0.92) 50%, rgba(22,22,22,0.3) 100%)" }} />
      <div className="relative flex flex-col justify-between h-full px-[7vw] py-[7vh]">
        <div className="flex items-center gap-[1.5vw]">
          <div style={{ width: "0.35vw", height: "2.5vh", background: "#ff4e00" }} />
          <span className="text-[1.3vw] tracking-[0.15em] uppercase font-medium" style={{ color: "rgba(252,252,252,0.6)" }}>
            Enterprise AI Strategy
          </span>
        </div>

        <div className="max-w-[58vw]">
          <div
            style={{ width: "5vw", height: "0.4vh", background: "#ff4e00", marginBottom: "3vh" }}
          />
          <h1
            className="font-bold tracking-tight leading-none"
            style={{ fontSize: "5.2vw", color: "#fcfcfc", lineHeight: "1.0" }}
          >
            Leveraging Graph DB
            <br />
            as the Semantic &
            <br />
            <span style={{ color: "#ff4e00" }}>Ontology Layer</span>
          </h1>
          <p
            className="font-light"
            style={{ fontSize: "1.9vw", color: "rgba(252,252,252,0.75)", marginTop: "3.5vh", lineHeight: "1.45", maxWidth: "46vw" }}
          >
            Building a reusable intelligence foundation for enterprise data lakes — shared by every agent in your ecosystem.
          </p>
        </div>

        <div className="flex items-center justify-between">
          <span className="font-light" style={{ fontSize: "1.3vw", color: "rgba(252,252,252,0.45)" }}>
            2026
          </span>
          <div className="flex items-center gap-[0.8vw]">
            <div style={{ width: "2.5vw", height: "0.25vh", background: "rgba(252,252,252,0.2)" }} />
            <span style={{ fontSize: "1.2vw", color: "rgba(252,252,252,0.35)", fontWeight: 300 }}>Nagesh Bandaru</span>
          </div>
        </div>
      </div>
    </div>
  );
}
