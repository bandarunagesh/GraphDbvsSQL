export type Step = {
  label: string;
  detail: string;
  duration: number;
  type: "info" | "warn" | "error" | "success";
};

export type ContextGap = {
  field: string;
  issue: string;
  impact: "critical" | "high" | "medium";
};

export type OntologyStep = {
  node: string;
  nodeType: string;
  edge?: string;
  edgeSemantics?: string;
};

export type HopStep = {
  hop: number;
  traversal: string;
  finding: string;
  impact: string;
  type: "discovery" | "cause" | "root";
};

export type AuditEntry = {
  logId: string;
  timestamp: string;
  userId: string;
  userRole: string;
  userOrg: string;
  authMethod: string;
  ipAddress: string;
  systemId: string;
  systemVersion: string;
  action: string;
  queryHash: string;
  dataScope: string[];
  consentValidated: boolean;
  privacyBoundary: string;
  regulatoryBasis: string[];
  integrityHash: string;
  previousLogHash: string;
  electronicSignature: string;
  signatureReason: string;
};

export type TraditionalResult = {
  query: string;
  queryLang: "SQL" | "REST";
  answer: string;
  contextGaps: ContextGap[];
  timeTaken: string;
  riskLevel: "high" | "medium";
};

export type GraphResult = {
  query: string;
  queryLang: "Cypher" | "SPARQL";
  answer: string;
  nodesTraversed: number;
  edgesTraversed: number;
  ontologyPath: OntologyStep[];
  multiHopChain?: HopStep[];
  timeTaken: string;
  lineage: string;
  auditEntry: AuditEntry;
};

export type Scenario = {
  id: string;
  title: string;
  subtitle: string;
  question: string;
  traditional: {
    agentName: string;
    steps: Step[];
    result: TraditionalResult;
  };
  graphdb: {
    agentName: string;
    steps: Step[];
    result: GraphResult;
  };
};

export const scenarios: Scenario[] = [
  {
    id: "eligibility",
    title: "Patient Eligibility",
    subtitle: "Context Stitching",
    question: "How many patients qualify for dose escalation in Trial NCT-2024-001?",
    traditional: {
      agentName: "SQL-Based Recruitment Agent",
      steps: [
        { label: "Parsing natural language query", detail: "Extracting intent: count patients, filter by trial and eligibility", duration: 600, type: "info" },
        { label: "Scanning raw schema for relevant tables", detail: "Tables found: patients, trials, screening_records — no semantic metadata available", duration: 800, type: "info" },
        { label: "Inferring column meaning from names only", detail: "'dose_esc_flag' — no definition found. Assuming: 1 = eligible. Protocol not consulted.", duration: 700, type: "warn" },
        { label: "Context gap: population boundary unknown", detail: "'status' column has values: active, withdrawn, screen_fail, pending. No rule to filter — using status='active' as best guess.", duration: 600, type: "warn" },
        { label: "Context gap: no protocol-aware eligibility", detail: "6 dose escalation criteria in protocol v3.2 — none encoded in schema. Agent cannot apply them.", duration: 600, type: "error" },
        { label: "Executing query with guessed context", detail: "Running query against raw EDC tables — semantic meaning assembled ad hoc from column names", duration: 500, type: "warn" },
        { label: "Returning count — context incomplete", detail: "Result cannot be validated against protocol criteria. 3 context gaps unresolved.", duration: 400, type: "warn" },
      ],
      result: {
        query: `SELECT COUNT(*) AS eligible_count
FROM patients p
WHERE p.dose_esc_flag = 1        -- meaning inferred from name
  AND p.status = 'active'        -- 'active' definition unknown
  AND p.trial_id = 'NCT-2024-001'
  -- ⚠ 6 protocol criteria NOT applied
  -- ⚠ withdrawn patients may be included`,
        queryLang: "SQL",
        answer: "142 patients found",
        contextGaps: [
          { field: "dose_esc_flag", issue: "Meaning inferred from column name only. No protocol definition consulted. Flag may include ineligible sub-populations.", impact: "critical" },
          { field: "status = 'active'", issue: "'Active' has no canonical definition in this schema. Screen-pending and withdrawn patients may be included.", impact: "high" },
          { field: "Eligibility Criteria §4.2", issue: "6 dose escalation criteria from Protocol v3.2 not encoded anywhere — cannot be applied by any SQL agent without manual mapping.", impact: "critical" },
        ],
        timeTaken: "1.4s",
        riskLevel: "high",
      },
    },
    graphdb: {
      agentName: "Ontology-Aware Recruitment Agent",
      steps: [
        { label: "Parsing natural language query", detail: "Mapping to ontology concept: DoseEscalationEligibility — Trial NCT-2024-001", duration: 600, type: "info" },
        { label: "Traversing: Patient → Trial enrollment edge", detail: "Edge [:ENROLLED_IN] carries: enrollment date, arm assignment, protocol version — no guessing needed", duration: 700, type: "info" },
        { label: "Inheriting protocol context from graph", detail: "DoseEscalationCriteria node loaded: 6 criteria from Protocol v3.2 §4.2 — pre-encoded at ontology build time", duration: 800, type: "success" },
        { label: "Traversing: Patient → EligibilityCriteria edges", detail: "[:MEETS_CRITERION] edges pre-computed during trial data ingestion. Each edge carries pass/fail + evidence source.", duration: 700, type: "success" },
        { label: "Resolving canonical population boundary", detail: "'Active enrollee' defined in graph: enrolled=true AND withdrawn=false AND screen_failed=false — per Protocol §3.1", duration: 500, type: "success" },
        { label: "Context fully inherited — no reconstruction", detail: "Zero semantic gaps. All meanings pre-stitched at ontology layer. Any agent querying this graph gets the same context.", duration: 400, type: "success" },
        { label: "Returning protocol-validated count", detail: "Result verified against 6 eligibility criteria. Context is reusable by every downstream agent.", duration: 300, type: "success" },
      ],
      result: {
        query: `MATCH (p:Patient)-[:ENROLLED_IN]->(t:Trial {id:'NCT-2024-001'})
WHERE p.enrollmentStatus = 'active'   // canonical: per Protocol §3.1
  AND ALL(c IN [(t)-[:HAS_CRITERION]->(c:DoseEscalationCriterion) | c]
          WHERE (p)-[:MEETS_CRITERION]->(c))
RETURN count(p) AS eligible_count`,
        queryLang: "Cypher",
        answer: "87 eligible patients",
        nodesTraversed: 341,
        edgesTraversed: 892,
        ontologyPath: [
          { node: "Patient", nodeType: "Entity", edge: "ENROLLED_IN", edgeSemantics: "Carries: arm, date, protocol version" },
          { node: "Trial NCT-2024-001", nodeType: "Trial", edge: "HAS_CRITERION", edgeSemantics: "Links all 6 eligibility criteria from Protocol v3.2 §4.2" },
          { node: "DoseEscalationCriteria", nodeType: "RuleSet", edge: "MEETS_CRITERION", edgeSemantics: "Per-patient pass/fail pre-computed at ingestion" },
          { node: "EligiblePatient", nodeType: "Filtered Set", },
        ],
        timeTaken: "1.1s",
        lineage: "Protocol v3.2 §4.2 → DoseEscalationCriteria ontology node → MEETS_CRITERION edge traversal → active enrollee population",
        auditEntry: {
          logId: "AUDIT-2026-03-26-0091-4A7F",
          timestamp: "2026-03-26T09:14:02.341Z",
          userId: "usr_k.patel@sponsor.com",
          userRole: "Clinical Data Manager — Sponsor (Read-Only)",
          userOrg: "MedTrial Pharmaceuticals Inc.",
          authMethod: "SSO · MFA (TOTP) · Session token: sess_8f2a…d91c",
          ipAddress: "10.44.21.87 [internal VPN]",
          systemId: "GraphOntology-CTK v2.4.1",
          systemVersion: "Ontology Schema v3.2 · Neo4j 5.18 · TLS 1.3",
          action: "GRAPH_QUERY — PatientEligibilityCount — Trial NCT-2024-001 — DoseEscalationCohort",
          queryHash: "SHA-256: 9a3f1bc2d74e8a05f3c29871de40b6ea5c12f7088d3a94c1b0e7625d4f8a19c3",
          dataScope: ["Patient nodes: Trial NCT-2024-001 (active enrollees only)", "DoseEscalationCriteria nodes: Protocol v3.2 §4.2 (6 criteria)", "Excluded: withdrawn, screen-failed, screen-pending populations"],
          consentValidated: true,
          privacyBoundary: "Consent gate enforced at graph traversal layer",
          regulatoryBasis: ["21 CFR Part 11.10(e) — Audit trail", "21 CFR Part 11.10(a) — System validation", "ICH E6(R3) 5.5.3 — Data integrity"],
          integrityHash: "SHA-256: 7c4e9b1f2a8d053e6f4127c98b3d5a0e1f7c2d8b4a9e6c3f1d5b2a7e9c4f8d1b",
          previousLogHash: "SHA-256: 2b8e5a1c9f3d7048e5c3216a79b4d8f2c0e5a3b7d9f1c6e4b2a8d3f5c7e9b1a4",
          electronicSignature: "ES-2026-03-26-K.PATEL-4A7F · RSA-4096 · PKCS#1 v2.1",
          signatureReason: "Automated system-generated signature — agent query execution",
        },
      },
    },
  },

  {
    id: "safety",
    title: "Safety Signal Detection",
    subtitle: "Context Stitching",
    question: "Are there unreported SAEs linked to Compound X in the last 30 days?",
    traditional: {
      agentName: "SQL-Based Safety Agent",
      steps: [
        { label: "Parsing natural language query", detail: "Extracting: SAEs, Compound-X, 30-day window, unreported status", duration: 600, type: "info" },
        { label: "Joining adverse_events to compound_exposures", detail: "JOIN on patient_id — temporal causality not captured. Co-occurrence ≠ causation in flat schema.", duration: 800, type: "warn" },
        { label: "Context gap: SAE hierarchy not available", detail: "'serious=1' flag used. Fatal, life-threatening, hospitalization sub-types are not distinguishable in schema.", duration: 700, type: "error" },
        { label: "Context gap: MedDRA coding absent", detail: "event_description is free text — no MedDRA preferred term hierarchy to traverse. Cannot group by system organ class.", duration: 600, type: "error" },
        { label: "Context gap: reporting timelines unknown", detail: "ICH E2A 7-day / 15-day windows not encoded anywhere in schema. Cannot compute urgency without manual lookup.", duration: 600, type: "error" },
        { label: "Returning flat list — all events equal weight", detail: "23 records returned. Fatal and non-fatal SAEs ranked identically. Regulatory urgency invisible.", duration: 400, type: "warn" },
      ],
      result: {
        query: `SELECT ae.event_id, ae.patient_id,
       ae.description,  -- free text, no MedDRA
       ae.onset_date
FROM adverse_events ae
JOIN compound_exposures ce
  ON ae.patient_id = ce.patient_id   -- co-occurrence join, not causal
WHERE ce.compound = 'Compound-X'
  AND ae.serious = 1                 -- subtype unknown
  AND ae.reported_to_sponsor IS NULL
  AND ae.onset_date >= DATEADD(day,-30,GETDATE())
-- ⚠ ICH E2A deadlines not computed
-- ⚠ MedDRA hierarchy not traversed`,
        queryLang: "SQL",
        answer: "23 records returned — all equal weight",
        contextGaps: [
          { field: "serious = 1", issue: "Flat flag — cannot distinguish fatal (7-day) from hospitalization (15-day). All SAEs treated identically. Regulatory deadline invisible.", impact: "critical" },
          { field: "MedDRA hierarchy", issue: "event_description is free text. No system-organ-class grouping possible. Agent cannot identify signal patterns across preferred terms.", impact: "critical" },
          { field: "Causality (JOIN)", issue: "JOIN on patient_id captures co-occurrence only. Temporal causal edge between compound exposure and adverse event is not modelled.", impact: "high" },
        ],
        timeTaken: "2.1s",
        riskLevel: "high",
      },
    },
    graphdb: {
      agentName: "Ontology-Aware Safety Agent",
      steps: [
        { label: "Parsing query → mapping to SAE ontology", detail: "SAE node class located. MedDRA v27.1 hierarchy pre-loaded in graph at ontology build time.", duration: 600, type: "info" },
        { label: "Traversing SAE subtype hierarchy", detail: "[:IS_SUBTYPE_OF] edges walk: Fatal → Life-Threatening → Hospitalization → Other SAE. Subtype context inherited automatically.", duration: 800, type: "success" },
        { label: "Following causal exposure edges", detail: "[:CAUSED_BY_EXPOSURE] carries: compound, dose, start date, temporal gap — not a JOIN, a semantically typed causal edge", duration: 700, type: "success" },
        { label: "Applying ICH E2A rule nodes", detail: "ReportingRule nodes pre-encoded: FATAL_OR_LIFE_THREATENING→7d, OTHER_SAE→15d. Agent traverses rules, not a lookup table.", duration: 600, type: "success" },
        { label: "Context fully stitched — hierarchy + causality + timelines", detail: "Every piece of context pre-exists as graph structure. Agent traverses — it does not reconstruct.", duration: 400, type: "success" },
        { label: "Returning ranked by regulatory urgency", detail: "7 actionable SAEs with deadline priority. Context reusable by regulatory submission agent, PV agent, DSMB agent.", duration: 300, type: "success" },
      ],
      result: {
        query: `MATCH (sae:SAE)-[:CAUSED_BY_EXPOSURE]->(exp:Exposure {compound:'Compound-X'})
WHERE sae.reportingStatus = 'unreported'
  AND sae.onsetDate >= date() - duration('P30D')
MATCH (sae)-[:IS_SUBTYPE_OF]->(subtype:SAESubtype)
MATCH (subtype)-[:GOVERNED_BY]->(rule:ICH_E2A_Rule)
RETURN sae, subtype.name, rule.deadlineDays,
       date() + duration({days: rule.deadlineDays}) AS dueDate
ORDER BY rule.deadlineDays ASC`,
        queryLang: "Cypher",
        answer: "7 SAEs — prioritised by ICH E2A deadline",
        nodesTraversed: 1204,
        edgesTraversed: 2891,
        ontologyPath: [
          { node: "SAE", nodeType: "Event", edge: "CAUSED_BY_EXPOSURE", edgeSemantics: "Typed causal edge: compound + dose + temporal gap (not a JOIN)" },
          { node: "Exposure (Compound-X)", nodeType: "Intervention", edge: "IS_SUBTYPE_OF", edgeSemantics: "MedDRA v27.1 hierarchy — fatal / life-threatening / hospitalization / other" },
          { node: "SAESubtype", nodeType: "Classification", edge: "GOVERNED_BY", edgeSemantics: "Links subtype to ICH E2A reporting rule (7d or 15d)" },
          { node: "ICH_E2A_Rule", nodeType: "RegulatoryRule" },
        ],
        timeTaken: "1.7s",
        lineage: "SAE ontology → MedDRA v27.1 hierarchy → ICH E2A rule nodes → causal exposure edge",
        auditEntry: {
          logId: "AUDIT-2026-03-26-0147-9C2E",
          timestamp: "2026-03-26T11:02:48.817Z",
          userId: "usr_m.okonkwo@safety.sponsor.com",
          userRole: "Pharmacovigilance Officer — Sponsor",
          userOrg: "MedTrial Pharmaceuticals Inc. — Global Safety",
          authMethod: "SSO · MFA (TOTP) · Session token: sess_3a9f…c44d",
          ipAddress: "10.44.22.113 [internal VPN]",
          systemId: "GraphOntology-CTK v2.4.1",
          systemVersion: "MedDRA v27.1 · ICH E2A Rule Engine v4.0 · Neo4j 5.18",
          action: "GRAPH_QUERY — SAEUnreportedDetection — CompoundX — 30DayWindow — PriorityRanked",
          queryHash: "SHA-256: 4d8b2e9a1c5f703b6e4219d87c3a5f0b2e7d1a9c4f6b8e3d5a1c7f9b2e4d6a8c",
          dataScope: ["SAE nodes: Compound-X exposure (last 30 days)", "MedDRA v27.1 preferred term classification", "ICH E2A reporting timeline rules (7-day / 15-day)"],
          consentValidated: true,
          privacyBoundary: "Safety data access scope enforced — patient identifiers masked for PV officer role",
          regulatoryBasis: ["21 CFR Part 11.10(e) — Immutable audit trail", "21 CFR Part 312.32 — IND safety reporting", "ICH E2A 3.2 — SAE reporting timelines"],
          integrityHash: "SHA-256: 3f7a1d9c5e2b804f7a3b16d95c8e4a2f0b6d8e1c3a5f9b2d4e7c1a8f3b6d9e2c",
          previousLogHash: "SHA-256: 9a3f1bc2d74e8a05f3c29871de40b6ea5c12f7088d3a94c1b0e7625d4f8a19c3",
          electronicSignature: "ES-2026-03-26-M.OKONKWO-9C2E · RSA-4096 · PKCS#1 v2.1",
          signatureReason: "Automated system-generated signature — safety signal detection query",
        },
      },
    },
  },

  {
    id: "sites",
    title: "Site Performance",
    subtitle: "Context Stitching",
    question: "Which sites have the highest screen failure rates across our Phase III trial?",
    traditional: {
      agentName: "SQL-Based Data Management Agent",
      steps: [
        { label: "Parsing query — site performance ranking", detail: "Intent: screen failure rate by site, Phase III filter", duration: 600, type: "info" },
        { label: "Generating multi-table JOIN query", detail: "Joining: sites, patients, screening_records — 4 tables. Relationship semantics not preserved.", duration: 800, type: "info" },
        { label: "Context gap: 'screen failure' undefined", detail: "screen_fail_reason is free text. No canonical definition of what counts as a screen failure. Each site uses different criteria.", duration: 700, type: "error" },
        { label: "Context gap: denominator ambiguous", detail: "'Enrolled' has 4 different operational definitions across sites. Failure rate denominator is inconsistent.", duration: 600, type: "error" },
        { label: "Context gap: failure reasons uncategorised", detail: "Reasons are free text strings — cannot group by protocol-defined failure category. Root cause patterns invisible.", duration: 600, type: "warn" },
        { label: "Returning ranking — definition inconsistent", detail: "Numbers computed on different bases. Sites are not comparable. Ranking is misleading.", duration: 400, type: "warn" },
      ],
      result: {
        query: `SELECT s.site_name,
  COUNT(CASE WHEN sr.screen_fail_reason IS NOT NULL
             THEN 1 END) * 100.0 / COUNT(*) AS fail_rate
FROM sites s
JOIN patients p ON p.site_id = s.site_id
JOIN screening_records sr ON sr.patient_id = p.patient_id
WHERE s.phase = 'III'
GROUP BY s.site_name
ORDER BY fail_rate DESC
-- ⚠ 'screen failure' undefined — free text reasons
-- ⚠ denominator varies by site's local definition`,
        queryLang: "SQL",
        answer: "Site 12: 42%  ·  Site 07: 38%  ·  Site 03: 31%",
        contextGaps: [
          { field: "Screen failure definition", issue: "No canonical definition. Each site operationalises differently. Numerator is not comparable across sites.", impact: "critical" },
          { field: "Denominator: 'enrolled'", issue: "4 different operational definitions across sites — sites reporting against different baselines. Rates not comparable.", impact: "critical" },
          { field: "Failure reason taxonomy", issue: "Free text field. Cannot group by protocol category. Root cause patterns (exclusion criterion, withdrawal, CRO gap) are invisible.", impact: "high" },
        ],
        timeTaken: "2.4s",
        riskLevel: "medium",
      },
    },
    graphdb: {
      agentName: "Ontology-Aware Data Management Agent",
      steps: [
        { label: "Parsing query → mapping to site ontology", detail: "ScreenFailureRate concept located. Canonical formula pre-encoded from Protocol v4.1 §3.2.", duration: 600, type: "info" },
        { label: "Traversing: Site → ScreeningRecord edges", detail: "[:UNDERWENT_SCREENING] edge carries: screening date, criteria checked, outcome — not a JOIN on patient_id", duration: 800, type: "success" },
        { label: "Inheriting canonical failure definition", detail: "FailureCategory ontology: 11 protocol-defined categories pre-encoded. Free text mapped to categories at ingestion time.", duration: 700, type: "success" },
        { label: "Resolving canonical denominator", detail: "'Screened population' defined as graph node type: all patients who entered a ScreeningRecord, per Protocol §3.2. Consistent across all sites.", duration: 600, type: "success" },
        { label: "Context stitched once — reused across all agents", detail: "Definition built into graph. Recruitment agent, DSMB agent, site monitor agent all inherit the same metric definition.", duration: 400, type: "success" },
        { label: "Returning comparable, audit-traceable ranking", detail: "All sites measured on identical canonical definition. Numbers are genuinely comparable.", duration: 300, type: "success" },
      ],
      result: {
        query: `MATCH (site:Site)-[:PARTICIPATES_IN]->(t:Trial {phase:'III'})
MATCH (p:Patient)-[:UNDERWENT_SCREENING {site: site}]->(sr:ScreeningRecord)
OPTIONAL MATCH (sr)-[:FAILED_DUE_TO]->(cat:FailureCategory)
// FailureCategory: 11 protocol-defined nodes, not free text
WITH site,
     count(sr) AS total_screened,   // canonical per Protocol §3.2
     count(cat) AS total_failed
RETURN site.name,
       round(total_failed * 100.0 / total_screened, 1) AS fail_rate
ORDER BY fail_rate DESC`,
        queryLang: "Cypher",
        answer: "Site 12: 31%  ·  Site 03: 28%  ·  Site 07: 24%",
        nodesTraversed: 2104,
        edgesTraversed: 5677,
        ontologyPath: [
          { node: "Site", nodeType: "Entity", edge: "UNDERWENT_SCREENING", edgeSemantics: "Carries screening date, outcome, criteria checked — typed, not a JOIN" },
          { node: "ScreeningRecord", nodeType: "Event", edge: "FAILED_DUE_TO", edgeSemantics: "Links to 1 of 11 protocol-defined FailureCategory nodes — not free text" },
          { node: "FailureCategory", nodeType: "Taxonomy", edge: "DEFINED_IN", edgeSemantics: "Category is anchored to Protocol v4.1 §3.2 — canonical, shared" },
          { node: "Protocol §3.2", nodeType: "RuleSource" },
        ],
        timeTaken: "1.9s",
        lineage: "Protocol v4.1 §3.2 → canonical ScreenFailureRate formula → FailureCategory taxonomy → site-patient traversal",
        auditEntry: {
          logId: "AUDIT-2026-03-26-0203-7B1D",
          timestamp: "2026-03-26T14:37:19.552Z",
          userId: "usr_r.santos@ctm.sponsor.com",
          userRole: "Clinical Trial Manager — Sponsor",
          userOrg: "MedTrial Pharmaceuticals Inc. — Clinical Operations",
          authMethod: "SSO · MFA (TOTP) · Session token: sess_7d1b…a83f",
          ipAddress: "10.44.23.041 [internal VPN]",
          systemId: "GraphOntology-CTK v2.4.1",
          systemVersion: "Protocol Schema v4.1 · ScreenFailureOntology v2.1 · Neo4j 5.18",
          action: "GRAPH_QUERY — SiteScreenFailureRanking — PhaseIII — CanonicalDenominator",
          queryHash: "SHA-256: 1e5c9a3f7d2b048a6e9c3128d74f5b1e3c8a2d6f9b4e1c7a5d3f8b2e6c9a4d7f",
          dataScope: ["Site nodes: Phase III trial", "ScreeningRecord nodes: canonical 'screened population' per Protocol v4.1", "FailureCategory nodes: 11 protocol-defined failure reasons"],
          consentValidated: true,
          privacyBoundary: "Site-level aggregate data only — no patient-level identifiers exposed",
          regulatoryBasis: ["21 CFR Part 11.10(e) — Audit trail", "ICH E6(R3) 5.18.4 — On-site monitoring data access logging", "ICH E6(R3) 5.5.3 — Role-based data access and audit integrity"],
          integrityHash: "SHA-256: 8b2e6c1a9f4d703a5e8c2174b96d3a1f5c9e4b2a7d1f6c3e8a5b9d2f4c7a1e3b",
          previousLogHash: "SHA-256: 4d8b2e9a1c5f703b6e4219d87c3a5f0b2e7d1a9c4f6b8e3d5a1c7f9b2e4d6a8c",
          electronicSignature: "ES-2026-03-26-R.SANTOS-7B1D · RSA-4096 · PKCS#1 v2.1",
          signatureReason: "Automated system-generated signature — site performance query",
        },
      },
    },
  },

  {
    id: "rca",
    title: "Root Cause Analysis",
    subtitle: "Multi-Hop Traversal",
    question: "Why did Site 07 miss its Q1 enrollment target by 34%?",
    traditional: {
      agentName: "SQL-Based Data Management Agent",
      steps: [
        { label: "Query 1 of 4 — enrollment actuals", detail: "SELECT: Site 07 enrolled 16 patients vs target 24. Gap identified. Cause unknown.", duration: 700, type: "info" },
        { label: "Query 2 of 4 — screen failure table", detail: "Separate query to screening_records. Screen failure rate: 41%. Cannot connect to enrollment gap causally.", duration: 700, type: "warn" },
        { label: "Query 3 of 4 — protocol amendment log", detail: "Separate query to amendments table. Amendment v3.1 found in January. No link to site performance encoded in schema.", duration: 700, type: "warn" },
        { label: "Query 4 of 4 — site visit schedule", detail: "Separate query to site_visits. 3-week scheduling gap in January found. Cannot connect to protocol amendment.", duration: 700, type: "warn" },
        { label: "Cannot connect findings — no causal chain", detail: "4 disconnected datasets. No relationships between amendment → screen failures → schedule gap → enrollment shortfall.", duration: 600, type: "error" },
        { label: "Returning symptoms, not causes", detail: "Agent reports what happened. Cannot determine why. Root cause requires manual analyst to connect dots across 4 queries.", duration: 400, type: "error" },
      ],
      result: {
        query: `-- Query 1: Enrollment actuals
SELECT enrolled_count, target FROM site_metrics
WHERE site_id = 'S07' AND quarter = 'Q1-2026';
-- Result: 16 enrolled vs 24 target

-- Query 2: Screen failures (separate query)
SELECT COUNT(*) FROM screening_records
WHERE site_id = 'S07' AND outcome = 'failed';
-- Result: 41% fail rate  ← disconnected from Query 1

-- Query 3: Protocol amendments (separate query)
SELECT * FROM amendments WHERE effective_date
BETWEEN '2026-01-01' AND '2026-03-31';
-- Result: Amendment v3.1 Jan 8  ← no link to site

-- Query 4: Site visits (separate query)
SELECT * FROM site_visits WHERE site_id = 'S07';
-- Result: 3-week gap Jan 9–Feb 1  ← no link to amendment`,
        queryLang: "SQL",
        answer: "Enrollment: 16 vs 24 target. Cause: unknown.",
        contextGaps: [
          { field: "Amendment → Site impact", issue: "Protocol amendments and site performance are in separate tables with no relationship encoded. Agent cannot trace amendment impact to Site 07.", impact: "critical" },
          { field: "Screen failure → Enrollment causality", issue: "Screen failure rate and enrollment shortfall are both present but no causal edge exists. Agent sees correlation only.", impact: "critical" },
          { field: "Scheduling gap → Root cause", issue: "3-week investigator absence is in site_visits. No graph relationship connects it to the performance drop. Root cause invisible.", impact: "high" },
        ],
        timeTaken: "3.8s — 4 separate queries, no causal synthesis",
        riskLevel: "high",
      },
    },
    graphdb: {
      agentName: "Multi-Hop Graph Traversal Agent",
      steps: [
        { label: "Hop 1 — Site07 → enrollment gap node", detail: "[:FELL_SHORT_OF] edge → EnrollmentTarget Q1-2026. Gap: 8 patients (34%). Starting multi-hop root cause traversal.", duration: 700, type: "info" },
        { label: "Hop 2 — Traversing [:IMPACTED_BY] → Protocol Amendment", detail: "Site07 → [:IMPACTED_BY] → ProtocolAmendment_v3.1 (Jan 8). Edge carries: tightened eligibility §4.2a — 3 new exclusion criteria.", duration: 800, type: "discovery" },
        { label: "Hop 3 — Amendment → Screen failure escalation", detail: "ProtocolAmendment_v3.1 → [:INCREASED] → ScreenFailureRate. Edge carries: pre-amendment rate 23%, post-amendment rate 41%. Delta: +18%.", duration: 800, type: "discovery" },
        { label: "Hop 4 — Screen failures → Scheduling pressure", detail: "ScreenFailureEscalation → [:CREATED_PRESSURE_ON] → InvestigatorSchedule. Dr. J. Chen: 34% more re-screenings required in Jan.", duration: 700, type: "discovery" },
        { label: "Hop 5 — Scheduling pressure → 3-week gap", detail: "InvestigatorOverload → [:CAUSED] → ScreeningGap (Jan 9 – Feb 1). 3-week window with zero new screenings.", duration: 600, type: "discovery" },
        { label: "Root cause chain complete in a single traversal", detail: "5-hop path traced automatically. Single agent query — no manual analyst needed to connect 4 datasets.", duration: 400, type: "success" },
        { label: "Returning full causal chain + corrective actions", detail: "Root cause identified. Downstream agent can now trigger: site support visit, protocol deviation waiver, CRO escalation.", duration: 300, type: "success" },
      ],
      result: {
        query: `// Multi-hop root cause traversal — single query
MATCH path = (site:Site {id:'S07'})
  -[:FELL_SHORT_OF]->(gap:EnrollmentGap {quarter:'Q1-2026'})
  <-[:CONTRIBUTED_TO]-(sfRate:ScreenFailureEscalation)
  <-[:INCREASED]-(amend:ProtocolAmendment {id:'v3.1'})
  -[:IMPACTED]-(site)

// Extend: find what caused the screen failure spike
MATCH (sfRate)-[:CREATED_PRESSURE_ON]->(inv:Investigator)
MATCH (inv)-[:EXPERIENCED]->(gap2:SchedulingGap)

RETURN
  amend.description AS root_cause,
  sfRate.delta AS screen_failure_increase,
  gap2.duration AS scheduling_gap,
  gap.count AS patients_missed`,
        queryLang: "Cypher",
        answer: "Root cause: Protocol Amendment v3.1 → +18% screen failures → 3-week scheduling gap → 8 patients missed",
        nodesTraversed: 47,
        edgesTraversed: 31,
        ontologyPath: [
          { node: "Site 07", nodeType: "Site", edge: "IMPACTED_BY", edgeSemantics: "Carries: amendment scope, effective date, criteria changed" },
          { node: "Amendment v3.1", nodeType: "ProtocolChange", edge: "INCREASED", edgeSemantics: "Quantified impact: +18% screen failures at Site 07 (pre/post comparison)" },
          { node: "Screen Failure Escalation", nodeType: "OperationalEvent", edge: "CREATED_PRESSURE_ON", edgeSemantics: "Investigator re-screening load increased 34% in January" },
          { node: "Scheduling Gap (3 wks)", nodeType: "CausalFactor", edge: "CAUSED", edgeSemantics: "Zero screenings Jan 9 – Feb 1 → 8 patients missed" },
          { node: "Enrollment Shortfall", nodeType: "Outcome" },
        ],
        multiHopChain: [
          { hop: 1, traversal: "Site07 →[FELL_SHORT_OF]→ EnrollmentGap Q1", finding: "8 patients short of 24-patient Q1 target (34% miss)", impact: "Trigger: begin root cause traversal", type: "discovery" },
          { hop: 2, traversal: "Site07 →[IMPACTED_BY]→ ProtocolAmendment v3.1", finding: "Amendment effective Jan 8 — tightened eligibility §4.2a, 3 new exclusion criteria added", impact: "New exclusions narrowed eligible pool before site could adapt screening approach", type: "cause" },
          { hop: 3, traversal: "Amendment v3.1 →[INCREASED]→ ScreenFailureRate", finding: "Screen failure rate: 23% (pre) → 41% (post). +18 percentage point spike at Site 07 specifically.", impact: "Investigator required 74% more screening visits to enroll same number of patients", type: "cause" },
          { hop: 4, traversal: "ScreenFailureEscalation →[OVERWHELMED]→ Dr. J. Chen", finding: "Lead investigator scheduling capacity exceeded — 3-week gap in screening calendar opened Jan 9", impact: "Zero new patient screenings for 22 days during peak Q1 enrollment window", type: "cause" },
          { hop: 5, traversal: "SchedulingGap →[CAUSED]→ EnrollmentShortfall", finding: "ROOT CAUSE: Protocol amendment tightened criteria → screen failure surge → investigator overload → scheduling gap → 8 missed patients", impact: "Corrective: protocol deviation waiver for §4.2a + CRO backup investigator + site support visit", type: "root" },
        ],
        timeTaken: "1.2s — single traversal, full causal chain",
        lineage: "Site07 enrollment graph → ProtocolAmendment node → ScreenFailureEscalation edge → InvestigatorSchedule → SchedulingGap → EnrollmentOutcome",
        auditEntry: {
          logId: "AUDIT-2026-03-26-0318-2F9A",
          timestamp: "2026-03-26T16:11:44.092Z",
          userId: "usr_d.kim@clinops.sponsor.com",
          userRole: "VP Clinical Operations — Sponsor",
          userOrg: "MedTrial Pharmaceuticals Inc. — Clinical Operations",
          authMethod: "SSO · MFA (TOTP) · Session token: sess_2f9a…b17c",
          ipAddress: "10.44.24.009 [internal VPN]",
          systemId: "GraphOntology-CTK v2.4.1",
          systemVersion: "RCA Engine v1.3 · Multi-hop Traversal · Neo4j 5.18",
          action: "GRAPH_QUERY — RootCauseAnalysis — Site07 — Q1EnrollmentShortfall — MultiHop5",
          queryHash: "SHA-256: 7b3e1f9a2c6d048b5e7c3149a82f6d1c4e9b3a7d2f5c8a1e6b4d9f2c7a5e3b8d",
          dataScope: ["Site07 enrollment nodes: Q1 2026", "ProtocolAmendment nodes: v3.1 (Jan 8)", "ScreeningRecord nodes: Jan–Mar 2026", "InvestigatorSchedule nodes: Dr. J. Chen"],
          consentValidated: true,
          privacyBoundary: "Aggregate site-level causal analysis — no patient-level identifiers in multi-hop chain",
          regulatoryBasis: ["21 CFR Part 11.10(e) — Audit trail: full traversal path logged", "ICH E6(R3) 5.18.4 — Site performance monitoring", "ICH E6(R3) 5.0.1 — Risk-based quality management"],
          integrityHash: "SHA-256: 5c9a3f1e7b2d048c6a9e3127d85f4b2a1e6c9b3f7d2a5e8c4b1f9a3d7c5e2b4f",
          previousLogHash: "SHA-256: 8b2e6c1a9f4d703a5e8c2174b96d3a1f5c9e4b2a7d1f6c3e8a5b9d2f4c7a1e3b",
          electronicSignature: "ES-2026-03-26-D.KIM-2F9A · RSA-4096 · PKCS#1 v2.1",
          signatureReason: "Automated system-generated signature — multi-hop root cause analysis on behalf of authenticated VP Clinical Operations",
        },
      },
    },
  },
];
