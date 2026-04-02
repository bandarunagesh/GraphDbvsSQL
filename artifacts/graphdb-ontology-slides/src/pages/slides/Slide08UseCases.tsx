const QR_SIZE = "52";

const refs = {
  uc1: [
    { url: "https://www.nature.com/articles/s41467-024-53081-z", label: "TrialGPT" },
    { url: "https://www.nature.com/articles/s41598-022-08454-z", label: "CTKG" },
  ],
  uc2: [
    { url: "https://pubmed.ncbi.nlm.nih.gov/38981792/", label: "KG-PV Review" },
    { url: "https://www.sciencedirect.com/science/article/pii/S0149291824000717", label: "KG-PV Guide" },
  ],
};

function QRRef({ url, label }: { url: string; label: string }) {
  const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=${QR_SIZE}x${QR_SIZE}&margin=3&data=${encodeURIComponent(url)}`;
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.25vh", textDecoration: "none" }}
    >
      <img src={qrSrc} alt={label} width={QR_SIZE} height={QR_SIZE} style={{ display: "block", borderRadius: "2px" }} />
      <p style={{ fontSize: "0.6vw", color: "rgba(252,252,252,0.45)", textAlign: "center", lineHeight: 1.2 }}>{label}</p>
    </a>
  );
}

export default function Slide08UseCases() {
  return (
    <div className="relative w-screen h-screen overflow-hidden" style={{ background: "#fcfcfc" }}>
      <div style={{ position: "absolute", top: 0, left: 0, width: "0.35vw", height: "100%", background: "#ff4e00" }} />

      <div className="flex flex-col h-full px-[7vw] py-[4vh]">
        {/* Slide header */}
        <div style={{ marginBottom: "2vh" }}>
          <p className="font-medium uppercase tracking-[0.12em]" style={{ fontSize: "1.2vw", color: "#ff4e00", marginBottom: "0.8vh" }}>
            Slide 08
          </p>
          <h2 className="font-bold tracking-tight" style={{ fontSize: "3.4vw", color: "#161616", lineHeight: "1.05" }}>
            Real-World Use Cases — Clinical Trials Operations
          </h2>
          <div style={{ width: "4vw", height: "0.35vh", background: "#161616", marginTop: "1.2vh" }} />
        </div>

        <div className="flex gap-[2.5vw] flex-1" style={{ minHeight: 0 }}>

          {/* Use Case 01 */}
          <div className="flex flex-col flex-1 rounded-sm overflow-hidden">
            <div
              style={{
                background: "#161616",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "1vw",
                padding: "1.4vh 2.5vw",
                flexShrink: 0,
              }}
            >
              <div style={{ flex: 1, minWidth: 0 }}>
                <p className="font-semibold uppercase tracking-[0.1em]" style={{ fontSize: "1vw", color: "#ff4e00", marginBottom: "0.5vh" }}>Use Case 01</p>
                <p className="font-bold" style={{ fontSize: "2vw", color: "#fcfcfc", lineHeight: "1.1" }}>Patient Cohort Matching</p>
                <p style={{ fontSize: "1.2vw", color: "rgba(252,252,252,0.6)", marginTop: "0.3vh" }}>Site Selection and Trial Recruitment</p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.4vh", flexShrink: 0 }}>
                <p style={{ fontSize: "0.65vw", color: "rgba(252,252,252,0.3)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Sources</p>
                <div style={{ display: "flex", gap: "0.6vw" }}>
                  {refs.uc1.map((r) => <QRRef key={r.url} {...r} />)}
                </div>
              </div>
            </div>
            <div className="flex flex-col flex-1 px-[2.5vw] py-[2vh]" style={{ background: "#f5f5f5", minHeight: 0 }}>
              <p style={{ fontSize: "1.2vw", color: "#161616", lineHeight: "1.55", marginBottom: "1.8vh" }}>
                An enterprise connected <span className="font-semibold">15M+ patient records</span> — diagnoses, medications, lab values, genomic profiles, and comorbidities — across fragmented EHR systems in a graph ontology.
              </p>
              <p style={{ fontSize: "1.2vw", color: "#161616", lineHeight: "1.55" }}>
                Recruitment agents traverse <span className="font-semibold">inclusion and exclusion criteria as graph paths</span>, matching eligible patients across sites without moving raw patient data — preserving privacy and compliance.
              </p>
              <div style={{ marginTop: "auto", paddingTop: "1.5vh", borderTop: "1px solid #dadada" }}>
                <div style={{ display: "flex", gap: "3vw" }}>
                  <div>
                    <p className="font-black" style={{ fontSize: "3.2vw", color: "#ff4e00", lineHeight: 1 }}>87.3%</p>
                    <p style={{ fontSize: "1.05vw", color: "#7a7a7a", marginTop: "0.4vh" }}>Patient–trial matching accuracy</p>
                  </div>
                  <div>
                    <p className="font-black" style={{ fontSize: "3.2vw", color: "#161616", lineHeight: 1 }}>90%+</p>
                    <p style={{ fontSize: "1.05vw", color: "#7a7a7a", marginTop: "0.4vh" }}>Relevant trials recalled vs. 6% search scope</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Use Case 02 */}
          <div className="flex flex-col flex-1 rounded-sm overflow-hidden">
            <div
              style={{
                background: "#161616",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "1vw",
                padding: "1.4vh 2.5vw",
                flexShrink: 0,
              }}
            >
              <div style={{ flex: 1, minWidth: 0 }}>
                <p className="font-semibold uppercase tracking-[0.1em]" style={{ fontSize: "1vw", color: "#ff4e00", marginBottom: "0.5vh" }}>Use Case 02</p>
                <p className="font-bold" style={{ fontSize: "2vw", color: "#fcfcfc", lineHeight: "1.1" }}>Safety Signal Detection</p>
                <p style={{ fontSize: "1.2vw", color: "rgba(252,252,252,0.6)", marginTop: "0.3vh" }}>Pharmacovigilance and Adverse Event Analysis</p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.4vh", flexShrink: 0 }}>
                <p style={{ fontSize: "0.65vw", color: "rgba(252,252,252,0.3)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Sources</p>
                <div style={{ display: "flex", gap: "0.6vw" }}>
                  {refs.uc2.map((r) => <QRRef key={r.url} {...r} />)}
                </div>
              </div>
            </div>
            <div className="flex flex-col flex-1 px-[2.5vw] py-[2vh]" style={{ background: "#f5f5f5", minHeight: 0 }}>
              <p style={{ fontSize: "1.2vw", color: "#161616", lineHeight: "1.55", marginBottom: "1.8vh" }}>
                A global pharma enterprise linked <span className="font-semibold">adverse event reports, drug compound relationships, patient populations, and clinical outcomes</span> as a unified property graph ontology.
              </p>
              <p style={{ fontSize: "1.2vw", color: "#161616", lineHeight: "1.55" }}>
                Safety agents traverse <span className="font-semibold">multi-hop drug–event–population paths</span> to surface emerging signals before they reach statistical thresholds — enabling proactive regulatory response.
              </p>
              <div style={{ marginTop: "auto", paddingTop: "1.5vh", borderTop: "1px solid #dadada" }}>
                <div style={{ display: "flex", gap: "3vw" }}>
                  <div>
                    <p className="font-black" style={{ fontSize: "3.2vw", color: "#ff4e00", lineHeight: 1 }}>47</p>
                    <p style={{ fontSize: "1.05vw", color: "#7a7a7a", marginTop: "0.4vh" }}>Peer-reviewed KG pharmacovigilance studies</p>
                  </div>
                  <div>
                    <p className="font-black" style={{ fontSize: "3.2vw", color: "#161616", lineHeight: 1 }}>4</p>
                    <p style={{ fontSize: "1.05vw", color: "#7a7a7a", marginTop: "0.4vh" }}>Validated PV use cases across signal lifecycle</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
