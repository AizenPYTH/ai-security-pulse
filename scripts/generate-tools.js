const fs = require("fs");
const path = require("path");

const logo = (domain) => `https://logo.clearbit.com/${domain}`;
const img = (id) => `https://images.unsplash.com/${id}?w=800`;

const categories = [
  "Threat Detection & Response",
  "Vulnerability Management",
  "Malware & Malware Analysis",
  "Network Security",
  "Access Control & IAM",
  "Incident Response",
  "Security Monitoring & SIEM",
  "Phishing & Email Security",
  "Data Protection & Privacy",
  "Compliance & Security Audit",
];

const catalog = {
  "Threat Detection & Response": [
    {
      slug: "iasecure",
      name: "iasecure",
      domain: "iasecure.fr",
      description: "Détection prompt injection en temps réel pour APIs LLM",
      features: ["Real-time detection", "Easy API", "Free trial", "Dashboard"],
      pricing: "Free + $29/mo",
      website: "https://iasecure.fr",
      rating: 4.9,
      reviews: 245,
      whyBest:
        "Seul outil spécialisé en détection d'injections de prompts. Critical pour la sécurité des LLMs.",
    },
    {
      slug: "crowdstrike-falcon",
      name: "CrowdStrike Falcon",
      domain: "crowdstrike.com",
      description: "EDR/XDR cloud-native avec détection IA avancée",
      features: ["ML detection", "Incident response", "Cloud-native"],
      pricing: "$$$",
      website: "https://www.crowdstrike.com",
      rating: 4.7,
      reviews: 890,
    },
    {
      slug: "sentinelone",
      name: "SentinelOne Singularity",
      domain: "sentinelone.com",
      description: "Autonomous endpoint protection powered by AI",
      features: ["Autonomous response", "Rollback", "AI models"],
      pricing: "$$$",
      website: "https://www.sentinelone.com",
      rating: 4.6,
      reviews: 720,
    },
    {
      slug: "microsoft-defender-xdr",
      name: "Microsoft Defender XDR",
      domain: "microsoft.com",
      description: "Suite XDR unifiée pour endpoints, identité et cloud",
      features: ["Unified XDR", "Microsoft 365", "Automation"],
      pricing: "$$",
      website: "https://www.microsoft.com/security",
      rating: 4.5,
      reviews: 1100,
    },
    {
      slug: "palo-alto-cortex-xdr",
      name: "Palo Alto Cortex XDR",
      domain: "paloaltonetworks.com",
      description: "Detection & response cross-data avec analytics",
      features: ["Behavioral analytics", "SOAR integration", "Threat intel"],
      pricing: "$$$",
      website: "https://www.paloaltonetworks.com",
      rating: 4.5,
      reviews: 640,
    },
    {
      slug: "darktrace",
      name: "Darktrace",
      domain: "darktrace.com",
      description: "Self-learning AI pour détecter les menaces inconnues",
      features: ["Self-learning AI", "Autonomous response", "Visibility"],
      pricing: "$$$",
      website: "https://www.darktrace.com",
      rating: 4.4,
      reviews: 510,
    },
    {
      slug: "elastic-security",
      name: "Elastic Security",
      domain: "elastic.co",
      description: "SIEM + endpoint detection open et scalable",
      features: ["Open platform", "ML jobs", "Cost-efficient"],
      pricing: "$$",
      website: "https://www.elastic.co/security",
      rating: 4.4,
      reviews: 430,
    },
    {
      slug: "cybereason",
      name: "Cybereason",
      domain: "cybereason.com",
      description: "Operation-centric detection pour attackers",
      features: ["MalOps detection", "Hunting", "EDR"],
      pricing: "$$$",
      website: "https://www.cybereason.com",
      rating: 4.3,
      reviews: 290,
    },
    {
      slug: "carbon-black",
      name: "VMware Carbon Black",
      domain: "vmware.com",
      description: "Next-gen antivirus et EDR enterprise",
      features: ["NGAV", "Threat hunting", "App control"],
      pricing: "$$",
      website: "https://www.vmware.com",
      rating: 4.2,
      reviews: 380,
    },
    {
      slug: "sophos-intercept-x",
      name: "Sophos Intercept X",
      domain: "sophos.com",
      description: "Endpoint protection avec deep learning",
      features: ["Deep learning", "CryptoGuard", "Central console"],
      pricing: "$$",
      website: "https://www.sophos.com",
      rating: 4.2,
      reviews: 560,
    },
  ],
  "Vulnerability Management": [
    {
      slug: "tenable-io",
      name: "Tenable Vulnerability Management",
      domain: "tenable.com",
      description: "Scan et priorisation continue des vulnérabilités",
      features: ["Asset discovery", "CVSS + VPR", "Cloud scanners"],
      pricing: "$$",
      website: "https://www.tenable.com",
      rating: 4.6,
      reviews: 980,
      whyBest: "Couverture assets la plus mature et scoring VPR actionnable.",
    },
    {
      slug: "qualys-vmdr",
      name: "Qualys VMDR",
      domain: "qualys.com",
      description: "Vulnerability Management, Detection & Response",
      features: ["Agent-based", "Patch orchestration", "TruRisk"],
      pricing: "$$",
      website: "https://www.qualys.com",
      rating: 4.5,
      reviews: 870,
    },
    {
      slug: "rapid7-insightvm",
      name: "Rapid7 InsightVM",
      domain: "rapid7.com",
      description: "Risk-based vulnerability management",
      features: ["Live dashboards", "Remediation projects", "Integrations"],
      pricing: "$$",
      website: "https://www.rapid7.com",
      rating: 4.5,
      reviews: 640,
    },
    {
      slug: "snyk",
      name: "Snyk",
      domain: "snyk.io",
      description: "Security for code, deps, containers et IaC",
      features: ["Developer-first", "Fix PRs", "AI prioritization"],
      pricing: "Free + $$",
      website: "https://snyk.io",
      rating: 4.6,
      reviews: 1200,
    },
    {
      slug: "wiz",
      name: "Wiz",
      domain: "wiz.io",
      description: "Cloud security posture & vulnerability graph",
      features: ["Agentless", "Attack path", "Multi-cloud"],
      pricing: "$$$",
      website: "https://www.wiz.io",
      rating: 4.7,
      reviews: 420,
    },
    {
      slug: "orca-security",
      name: "Orca Security",
      domain: "orca.security",
      description: "Agentless CNAPP pour cloud workloads",
      features: ["SideScanning", "Risk prioritization", "Compliance"],
      pricing: "$$$",
      website: "https://orca.security",
      rating: 4.5,
      reviews: 310,
    },
    {
      slug: "invicti",
      name: "Invicti",
      domain: "invicti.com",
      description: "DAST enterprise pour apps web & APIs",
      features: ["Proof-based scanning", "API security", "CI/CD"],
      pricing: "$$",
      website: "https://www.invicti.com",
      rating: 4.4,
      reviews: 280,
    },
    {
      slug: "acunetix",
      name: "Acunetix",
      domain: "acunetix.com",
      description: "Web vulnerability scanner automatisé",
      features: ["Malware detection", "CI integration", "Reports"],
      pricing: "$$",
      website: "https://www.acunetix.com",
      rating: 4.3,
      reviews: 350,
    },
    {
      slug: "nuclei",
      name: "ProjectDiscovery Nuclei",
      domain: "projectdiscovery.io",
      description: "Fast vulnerability scanner based on templates",
      features: ["Community templates", "CLI-first", "Automation"],
      pricing: "Free + Cloud",
      website: "https://projectdiscovery.io",
      rating: 4.8,
      reviews: 190,
    },
    {
      slug: "openvas",
      name: "Greenbone OpenVAS",
      domain: "greenbone.net",
      description: "Scanner open source de vulnérabilités réseau",
      features: ["Open source", "Network scans", "Reports"],
      pricing: "Free / Enterprise",
      website: "https://www.greenbone.net",
      rating: 4.1,
      reviews: 220,
    },
  ],
  "Malware & Malware Analysis": [
    {
      slug: "virustotal",
      name: "VirusTotal",
      domain: "virustotal.com",
      description: "Multi-engine malware scanning et hunting",
      features: ["70+ engines", "Graph", "API"],
      pricing: "Free + Premium",
      website: "https://www.virustotal.com",
      rating: 4.8,
      reviews: 1500,
      whyBest: "Référence mondiale pour le triage malware multi-engines.",
    },
    {
      slug: "any-run",
      name: "ANY.RUN",
      domain: "any.run",
      description: "Interactive malware sandbox en temps réel",
      features: ["Interactive analysis", "MITRE mapping", "Team sharing"],
      pricing: "Free + $$",
      website: "https://any.run",
      rating: 4.7,
      reviews: 410,
    },
    {
      slug: "hybrid-analysis",
      name: "Hybrid Analysis",
      domain: "hybrid-analysis.com",
      description: "Falcon Sandbox malware analysis community",
      features: ["Falcon Sandbox", "IOC export", "Free tier"],
      pricing: "Free + Paid",
      website: "https://www.hybrid-analysis.com",
      rating: 4.5,
      reviews: 320,
    },
    {
      slug: "cuckoo-sandbox",
      name: "Cuckoo Sandbox",
      domain: "cuckoosandbox.org",
      description: "Open-source automated malware analysis",
      features: ["Open source", "Extensible", "Reports"],
      pricing: "Free",
      website: "https://cuckoosandbox.org",
      rating: 4.2,
      reviews: 180,
    },
    {
      slug: "joe-sandbox",
      name: "Joe Sandbox",
      domain: "joesecurity.org",
      description: "Deep malware analysis multi-platform",
      features: ["Windows/macOS/Android", "AI classification", "API"],
      pricing: "$$$",
      website: "https://www.joesecurity.org",
      rating: 4.4,
      reviews: 150,
    },
    {
      slug: "recorded-future",
      name: "Recorded Future",
      domain: "recordedfuture.com",
      description: "Threat intelligence augmentée par IA",
      features: ["Threat intel", "Malware intel", "Brand protection"],
      pricing: "$$$",
      website: "https://www.recordedfuture.com",
      rating: 4.5,
      reviews: 390,
    },
    {
      slug: "malwarebytes",
      name: "Malwarebytes",
      domain: "malwarebytes.com",
      description: "Anti-malware endpoint pour entreprises",
      features: ["Ransomware rollback", "EDR lite", "Cloud console"],
      pricing: "$$",
      website: "https://www.malwarebytes.com",
      rating: 4.3,
      reviews: 780,
    },
    {
      slug: "intezer",
      name: "Intezer",
      domain: "intezer.com",
      description: "Genetic malware analysis & triage",
      features: ["Code reuse analysis", "Auto-triage", "SOC integrations"],
      pricing: "$$",
      website: "https://www.intezer.com",
      rating: 4.4,
      reviews: 140,
    },
    {
      slug: "triage-hatching",
      name: "Triage (Hatching)",
      domain: "tria.ge",
      description: "High-volume malware sandbox cloud",
      features: ["Fast detonation", "YARA", "API-first"],
      pricing: "Free + Paid",
      website: "https://tria.ge",
      rating: 4.6,
      reviews: 210,
    },
    {
      slug: "cape-sandbox",
      name: "CAPE Sandbox",
      domain: "capesandbox.com",
      description: "Config & payload extraction sandbox",
      features: ["Config extraction", "Malware family ID", "Open source"],
      pricing: "Free",
      website: "https://capesandbox.com",
      rating: 4.3,
      reviews: 95,
    },
  ],
  "Network Security": [
    {
      slug: "cloudflare-one",
      name: "Cloudflare One",
      domain: "cloudflare.com",
      description: "Zero Trust network & secure web gateway",
      features: ["ZTNA", "SWG", "DDoS"],
      pricing: "Free + $$",
      website: "https://www.cloudflare.com",
      rating: 4.7,
      reviews: 980,
      whyBest:
        "Plateforme Zero Trust la plus accessible et performante à l'échelle.",
    },
    {
      slug: "zscaler",
      name: "Zscaler",
      domain: "zscaler.com",
      description: "SSE / Zero Trust cloud security",
      features: ["ZIA", "ZPA", "DLP"],
      pricing: "$$$",
      website: "https://www.zscaler.com",
      rating: 4.5,
      reviews: 760,
    },
    {
      slug: "palo-alto-prisma",
      name: "Prisma Access",
      domain: "paloaltonetworks.com",
      description: "SASE enterprise de Palo Alto",
      features: ["SASE", "Threat prevention", "CASB"],
      pricing: "$$$",
      website: "https://www.paloaltonetworks.com",
      rating: 4.4,
      reviews: 520,
    },
    {
      slug: "cisco-secure-firewall",
      name: "Cisco Secure Firewall",
      domain: "cisco.com",
      description: "Next-gen firewall avec threat intelligence",
      features: ["NGFW", "Snort", "Umbrella intel"],
      pricing: "$$$",
      website: "https://www.cisco.com",
      rating: 4.3,
      reviews: 690,
    },
    {
      slug: "fortinet-fortigate",
      name: "Fortinet FortiGate",
      domain: "fortinet.com",
      description: "Firewall & SD-WAN security fabric",
      features: ["ASIC acceleration", "SD-WAN", "UTM"],
      pricing: "$$",
      website: "https://www.fortinet.com",
      rating: 4.4,
      reviews: 840,
    },
    {
      slug: "check-point-harmony",
      name: "Check Point Harmony",
      domain: "checkpoint.com",
      description: "Consolidated network & internet security",
      features: ["ThreatCloud AI", "SASE", "Endpoint"],
      pricing: "$$$",
      website: "https://www.checkpoint.com",
      rating: 4.3,
      reviews: 410,
    },
    {
      slug: "illumio",
      name: "Illumio",
      domain: "illumio.com",
      description: "Zero Trust segmentation micro-réseau",
      features: ["Microsegmentation", "Visibility", "Breach containment"],
      pricing: "$$$",
      website: "https://www.illumio.com",
      rating: 4.5,
      reviews: 180,
    },
    {
      slug: "extra-hop",
      name: "ExtraHop Reveal(x)",
      domain: "extrahop.com",
      description: "NDR avec machine learning",
      features: ["NDR", "Encrypted traffic", "Cloud"],
      pricing: "$$$",
      website: "https://www.extrahop.com",
      rating: 4.4,
      reviews: 160,
    },
    {
      slug: "netskope",
      name: "Netskope",
      domain: "netskope.com",
      description: "SSE platform for cloud & network",
      features: ["CASB", "SWG", "Data protection"],
      pricing: "$$$",
      website: "https://www.netskope.com",
      rating: 4.5,
      reviews: 350,
    },
    {
      slug: "tailscale",
      name: "Tailscale",
      domain: "tailscale.com",
      description: "WireGuard mesh VPN Zero Trust simple",
      features: ["WireGuard", "ACL", "Easy setup"],
      pricing: "Free + $",
      website: "https://tailscale.com",
      rating: 4.8,
      reviews: 620,
    },
  ],
  "Access Control & IAM": [
    {
      slug: "okta",
      name: "Okta",
      domain: "okta.com",
      description: "Identity platform leader pour workforce & customers",
      features: ["SSO", "MFA", "Lifecycle"],
      pricing: "$$",
      website: "https://www.okta.com",
      rating: 4.5,
      reviews: 1400,
      whyBest:
        "Écosystème IAM le plus large avec intégrations et UX excellents.",
    },
    {
      slug: "microsoft-entra",
      name: "Microsoft Entra ID",
      domain: "microsoft.com",
      description: "Cloud identity & access management",
      features: ["Conditional Access", "Passwordless", "Governance"],
      pricing: "$$",
      website: "https://www.microsoft.com/security",
      rating: 4.5,
      reviews: 1600,
    },
    {
      slug: "ping-identity",
      name: "Ping Identity",
      domain: "pingidentity.com",
      description: "Enterprise IAM et customer identity",
      features: ["Federation", "CIAM", "Risk-based auth"],
      pricing: "$$$",
      website: "https://www.pingidentity.com",
      rating: 4.3,
      reviews: 320,
    },
    {
      slug: "cyberark",
      name: "CyberArk",
      domain: "cyberark.com",
      description: "Privileged Access Management leader",
      features: ["PAM", "Secrets", "Endpoint privilege"],
      pricing: "$$$",
      website: "https://www.cyberark.com",
      rating: 4.6,
      reviews: 540,
    },
    {
      slug: "beyondtrust",
      name: "BeyondTrust",
      domain: "beyondtrust.com",
      description: "Privileged access & identity security",
      features: ["Passwordless PAM", "Remote access", "Vulnerability"],
      pricing: "$$$",
      website: "https://www.beyondtrust.com",
      rating: 4.4,
      reviews: 290,
    },
    {
      slug: "auth0",
      name: "Auth0",
      domain: "auth0.com",
      description: "Developer-first authentication platform",
      features: ["Universal Login", "Social IdP", "Extensibility"],
      pricing: "Free + $$",
      website: "https://auth0.com",
      rating: 4.6,
      reviews: 980,
    },
    {
      slug: "duo-security",
      name: "Cisco Duo",
      domain: "duo.com",
      description: "MFA et Zero Trust access simple",
      features: ["MFA", "Device trust", "SSO"],
      pricing: "$",
      website: "https://duo.com",
      rating: 4.6,
      reviews: 720,
    },
    {
      slug: "sailpoint",
      name: "SailPoint",
      domain: "sailpoint.com",
      description: "Identity governance & administration",
      features: ["IGA", "AI recommendations", "Access reviews"],
      pricing: "$$$",
      website: "https://www.sailpoint.com",
      rating: 4.4,
      reviews: 260,
    },
    {
      slug: "hashicorp-vault",
      name: "HashiCorp Vault",
      domain: "hashicorp.com",
      description: "Secrets management et dynamic credentials",
      features: ["Secrets", "PKI", "Encryption as a service"],
      pricing: "Free + $$",
      website: "https://www.hashicorp.com",
      rating: 4.7,
      reviews: 510,
    },
    {
      slug: "1password-business",
      name: "1Password Business",
      domain: "1password.com",
      description: "Password manager enterprise & secrets",
      features: ["Vaults", "SSO", "Developer secrets"],
      pricing: "$",
      website: "https://1password.com",
      rating: 4.8,
      reviews: 890,
    },
  ],
  "Incident Response": [
    {
      slug: "pagerduty",
      name: "PagerDuty",
      domain: "pagerduty.com",
      description: "Incident management et on-call automation",
      features: ["On-call", "AIOps", "Status pages"],
      pricing: "$$",
      website: "https://www.pagerduty.com",
      rating: 4.5,
      reviews: 920,
      whyBest:
        "Standard de facto pour l'orchestration des incidents et on-call.",
    },
    {
      slug: "splunk-soar",
      name: "Splunk SOAR",
      domain: "splunk.com",
      description: "Security orchestration automation & response",
      features: ["Playbooks", "App ecosystem", "Case mgmt"],
      pricing: "$$$",
      website: "https://www.splunk.com",
      rating: 4.4,
      reviews: 380,
    },
    {
      slug: "palo-alto-xsoar",
      name: "Cortex XSOAR",
      domain: "paloaltonetworks.com",
      description: "SOAR leader avec marketplace de playbooks",
      features: ["Playbooks", "Threat intel mgmt", "Cases"],
      pricing: "$$$",
      website: "https://www.paloaltonetworks.com",
      rating: 4.5,
      reviews: 340,
    },
    {
      slug: "torq",
      name: "Torq",
      domain: "torq.io",
      description: "No-code security hyperautomation",
      features: ["No-code", "AI workflows", "Integrations"],
      pricing: "$$",
      website: "https://torq.io",
      rating: 4.6,
      reviews: 120,
    },
    {
      slug: "swimlane",
      name: "Swimlane",
      domain: "swimlane.com",
      description: "Low-code SOAR pour SOC modernes",
      features: ["Low-code", "Case management", "Dashboards"],
      pricing: "$$$",
      website: "https://swimlane.com",
      rating: 4.3,
      reviews: 110,
    },
    {
      slug: "thehive",
      name: "TheHive",
      domain: "strangebee.com",
      description: "Open-source security incident response platform",
      features: ["Cases", "Observables", "Cortex analyzers"],
      pricing: "Free / Enterprise",
      website: "https://strangebee.com",
      rating: 4.4,
      reviews: 200,
    },
    {
      slug: "dfir-iris",
      name: "DFIR-IRIS",
      domain: "dfir-iris.org",
      description: "Collaborative incident response platform",
      features: ["Collaborative IR", "Timeline", "IOC"],
      pricing: "Free",
      website: "https://dfir-iris.org",
      rating: 4.5,
      reviews: 85,
    },
    {
      slug: "rootly",
      name: "Rootly",
      domain: "rootly.com",
      description: "Incident management for modern engineering",
      features: ["Slack-native", "Retros", "Automation"],
      pricing: "$$",
      website: "https://rootly.com",
      rating: 4.7,
      reviews: 150,
    },
    {
      slug: "firehydrant",
      name: "FireHydrant",
      domain: "firehydrant.com",
      description: "Reliability & incident response platform",
      features: ["Runbooks", "Status pages", "Analytics"],
      pricing: "$$",
      website: "https://firehydrant.com",
      rating: 4.5,
      reviews: 130,
    },
    {
      slug: "tines",
      name: "Tines",
      domain: "tines.com",
      description: "No-code automation for security teams",
      features: ["Stories", "AI assist", "Audit logs"],
      pricing: "$$",
      website: "https://www.tines.com",
      rating: 4.7,
      reviews: 170,
    },
  ],
  "Security Monitoring & SIEM": [
    {
      slug: "splunk-enterprise-security",
      name: "Splunk Enterprise Security",
      domain: "splunk.com",
      description: "SIEM enterprise de référence",
      features: ["Search", "UEBA", "Dashboards"],
      pricing: "$$$",
      website: "https://www.splunk.com",
      rating: 4.5,
      reviews: 1100,
      whyBest:
        "Puissance d'analyse et écosystème app inégalés pour le SIEM.",
    },
    {
      slug: "microsoft-sentinel",
      name: "Microsoft Sentinel",
      domain: "microsoft.com",
      description: "Cloud-native SIEM & SOAR sur Azure",
      features: ["AI detection", "Cost control", "Playbooks"],
      pricing: "$$",
      website: "https://azure.microsoft.com",
      rating: 4.5,
      reviews: 760,
    },
    {
      slug: "chronicle-security",
      name: "Google Security Operations",
      domain: "cloud.google.com",
      description: "Chronicle SIEM at petabyte scale",
      features: ["Retrohunt", "YARA-L", "Threat intel"],
      pricing: "$$$",
      website: "https://cloud.google.com/security",
      rating: 4.4,
      reviews: 280,
    },
    {
      slug: "sumo-logic",
      name: "Sumo Logic",
      domain: "sumologic.com",
      description: "Cloud log analytics & SIEM",
      features: ["Cloud-native", "CSE", "Observability"],
      pricing: "$$",
      website: "https://www.sumologic.com",
      rating: 4.3,
      reviews: 420,
    },
    {
      slug: "elastic-siem",
      name: "Elastic SIEM",
      domain: "elastic.co",
      description: "Open SIEM built on Elasticsearch",
      features: ["Detection rules", "Timeline", "Affordable"],
      pricing: "$$",
      website: "https://www.elastic.co",
      rating: 4.4,
      reviews: 530,
    },
    {
      slug: "logrhythm",
      name: "LogRhythm",
      domain: "logrhythm.com",
      description: "SIEM + NDR + UEBA unifiés",
      features: ["AI Engine", "Case mgmt", "Compliance"],
      pricing: "$$$",
      website: "https://logrhythm.com",
      rating: 4.2,
      reviews: 240,
    },
    {
      slug: "exabeam",
      name: "Exabeam",
      domain: "exabeam.com",
      description: "UEBA-centric SIEM moderne",
      features: ["Behavioral analytics", "Timelines", "Automation"],
      pricing: "$$$",
      website: "https://www.exabeam.com",
      rating: 4.3,
      reviews: 210,
    },
    {
      slug: "securonix",
      name: "Securonix",
      domain: "securonix.com",
      description: "SNYPR next-gen SIEM platform",
      features: ["UEBA", "Threat content", "Cloud"],
      pricing: "$$$",
      website: "https://www.securonix.com",
      rating: 4.2,
      reviews: 180,
    },
    {
      slug: "datadog-security",
      name: "Datadog Security Monitoring",
      domain: "datadoghq.com",
      description: "Security signals dans la plateforme observability",
      features: ["Cloud SIEM", "Threat detection", "APM link"],
      pricing: "$$",
      website: "https://www.datadoghq.com",
      rating: 4.5,
      reviews: 640,
    },
    {
      slug: "panther",
      name: "Panther",
      domain: "panther.com",
      description: "Detection-as-code cloud SIEM",
      features: ["Python detections", "Snowflake", "Fast"],
      pricing: "$$",
      website: "https://panther.com",
      rating: 4.6,
      reviews: 140,
    },
  ],
  "Phishing & Email Security": [
    {
      slug: "abnormal-security",
      name: "Abnormal Security",
      domain: "abnormalsecurity.com",
      description: "Email security API-based avec IA comportementale",
      features: ["API architecture", "BEC detection", "SOC insights"],
      pricing: "$$$",
      website: "https://abnormalsecurity.com",
      rating: 4.7,
      reviews: 380,
      whyBest:
        "Meilleure détection BEC/phishing via behavioral AI sans MX change.",
    },
    {
      slug: "proofpoint",
      name: "Proofpoint",
      domain: "proofpoint.com",
      description: "Email security & threat protection leader",
      features: ["Email gateway", "TAP", "Training"],
      pricing: "$$$",
      website: "https://www.proofpoint.com",
      rating: 4.5,
      reviews: 890,
    },
    {
      slug: "mimecast",
      name: "Mimecast",
      domain: "mimecast.com",
      description: "Cloud email security & continuity",
      features: ["Secure email", "Archiving", "Awareness"],
      pricing: "$$",
      website: "https://www.mimecast.com",
      rating: 4.3,
      reviews: 670,
    },
    {
      slug: "microsoft-defender-office",
      name: "Defender for Office 365",
      domain: "microsoft.com",
      description: "Protection email native Microsoft 365",
      features: ["Safe Links", "Safe Attachments", "Attack simulation"],
      pricing: "$$",
      website: "https://www.microsoft.com/security",
      rating: 4.4,
      reviews: 980,
    },
    {
      slug: "barracuda-email",
      name: "Barracuda Email Protection",
      domain: "barracuda.com",
      description: "Gateway anti-phishing et impersonation",
      features: ["Impersonation", "Incident response", "Backup"],
      pricing: "$$",
      website: "https://www.barracuda.com",
      rating: 4.2,
      reviews: 410,
    },
    {
      slug: "ironscales",
      name: "IRONSCALES",
      domain: "ironscales.com",
      description: "Collaborative phishing remediation AI",
      features: ["Automated remediation", "SOC assist", "Awareness"],
      pricing: "$$",
      website: "https://ironscales.com",
      rating: 4.5,
      reviews: 190,
    },
    {
      slug: "knowbe4",
      name: "KnowBe4",
      domain: "knowbe4.com",
      description: "Security awareness & phishing simulation",
      features: ["Simulations", "Training", "Benchmarks"],
      pricing: "$",
      website: "https://www.knowbe4.com",
      rating: 4.6,
      reviews: 1200,
    },
    {
      slug: "sublime-security",
      name: "Sublime Security",
      domain: "sublime.security",
      description: "Detection-as-code email security",
      features: ["Open detections", "MQL", "Remediation"],
      pricing: "$$",
      website: "https://sublime.security",
      rating: 4.7,
      reviews: 95,
    },
    {
      slug: "material-security",
      name: "Material Security",
      domain: "material.security",
      description: "Posture & remediation for cloud email",
      features: ["Auto-remediation", "Inbox security", "Audit"],
      pricing: "$$$",
      website: "https://material.security",
      rating: 4.5,
      reviews: 110,
    },
    {
      slug: "vade",
      name: "Vade",
      domain: "vadesecure.com",
      description: "Predictive email defense with AI",
      features: ["Predictive engine", "MSP-friendly", "URL defense"],
      pricing: "$$",
      website: "https://www.vadesecure.com",
      rating: 4.3,
      reviews: 160,
    },
  ],
  "Data Protection & Privacy": [
    {
      slug: "varonis",
      name: "Varonis",
      domain: "varonis.com",
      description: "Data security platform pour fichiers & SaaS",
      features: ["DSPM", "Threat detection", "Automation"],
      pricing: "$$$",
      website: "https://www.varonis.com",
      rating: 4.5,
      reviews: 520,
      whyBest: "Visibilité data + détection d'exfiltration la plus complète.",
    },
    {
      slug: "nightfall",
      name: "Nightfall AI",
      domain: "nightfall.ai",
      description: "DLP AI pour SaaS et cloud data",
      features: ["ML classifiers", "SaaS DLP", "Developer API"],
      pricing: "$$",
      website: "https://www.nightfall.ai",
      rating: 4.6,
      reviews: 140,
    },
    {
      slug: "bigid",
      name: "BigID",
      domain: "bigid.com",
      description: "Data discovery, privacy & protection",
      features: ["Discovery", "Privacy", "DSPM"],
      pricing: "$$$",
      website: "https://bigid.com",
      rating: 4.4,
      reviews: 210,
    },
    {
      slug: "onetrust",
      name: "OneTrust",
      domain: "onetrust.com",
      description: "Privacy, GRC et data governance suite",
      features: ["Privacy ops", "Consent", "Assessments"],
      pricing: "$$$",
      website: "https://www.onetrust.com",
      rating: 4.3,
      reviews: 480,
    },
    {
      slug: "cyera",
      name: "Cyera",
      domain: "cyera.io",
      description: "Data security posture management AI",
      features: ["DSPM", "Classification", "Risk"],
      pricing: "$$$",
      website: "https://www.cyera.io",
      rating: 4.6,
      reviews: 120,
    },
    {
      slug: "symantec-dlp",
      name: "Symantec DLP",
      domain: "broadcom.com",
      description: "Enterprise data loss prevention",
      features: ["Endpoint DLP", "Network", "Cloud"],
      pricing: "$$$",
      website: "https://www.broadcom.com",
      rating: 4.1,
      reviews: 300,
    },
    {
      slug: "digital-guardian",
      name: "Digital Guardian",
      domain: "digitalguardian.com",
      description: "Data protection & insider threat",
      features: ["Endpoint DLP", "Analytics", "Forensics"],
      pricing: "$$$",
      website: "https://digitalguardian.com",
      rating: 4.2,
      reviews: 150,
    },
    {
      slug: "transcend",
      name: "Transcend",
      domain: "transcend.io",
      description: "Privacy infrastructure for engineers",
      features: ["DSR automation", "Consent", "Data systems"],
      pricing: "$$",
      website: "https://transcend.io",
      rating: 4.5,
      reviews: 90,
    },
    {
      slug: "collibra",
      name: "Collibra",
      domain: "collibra.com",
      description: "Data catalog & governance platform",
      features: ["Catalog", "Quality", "Stewards"],
      pricing: "$$$",
      website: "https://www.collibra.com",
      rating: 4.3,
      reviews: 260,
    },
    {
      slug: "hashicorp-boundary",
      name: "HashiCorp Boundary",
      domain: "hashicorp.com",
      description: "Secure remote access with least privilege",
      features: ["Session broker", "Least privilege", "Audit"],
      pricing: "$$",
      website: "https://www.hashicorp.com",
      rating: 4.6,
      reviews: 200,
    },
  ],
  "Compliance & Security Audit": [
    {
      slug: "vanta",
      name: "Vanta",
      domain: "vanta.com",
      description: "Automated security compliance for startups & scaleups",
      features: ["SOC 2", "ISO 27001", "Continuous monitoring"],
      pricing: "$$",
      website: "https://www.vanta.com",
      rating: 4.7,
      reviews: 680,
      whyBest: "Automatisation compliance la plus rapide pour SOC 2 / ISO.",
    },
    {
      slug: "drata",
      name: "Drata",
      domain: "drata.com",
      description: "Continuous compliance & trust automation",
      features: ["Evidence collection", "Risk", "Trust center"],
      pricing: "$$",
      website: "https://drata.com",
      rating: 4.6,
      reviews: 520,
    },
    {
      slug: "secureframe",
      name: "Secureframe",
      domain: "secureframe.com",
      description: "Compliance automation platform",
      features: ["Multi-framework", "Personnel", "Vendors"],
      pricing: "$$",
      website: "https://secureframe.com",
      rating: 4.5,
      reviews: 310,
    },
    {
      slug: "sprinto",
      name: "Sprinto",
      domain: "sprinto.com",
      description: "Compliance ops for cloud-native teams",
      features: ["Automation", "Audits", "Integrations"],
      pricing: "$$",
      website: "https://sprinto.com",
      rating: 4.6,
      reviews: 180,
    },
    {
      slug: "auditboard",
      name: "AuditBoard",
      domain: "auditboard.com",
      description: "Audit, risk & compliance platform",
      features: ["SOX", "Risk", "ESG"],
      pricing: "$$$",
      website: "https://www.auditboard.com",
      rating: 4.5,
      reviews: 240,
    },
    {
      slug: "servicenow-grc",
      name: "ServiceNow GRC",
      domain: "servicenow.com",
      description: "Enterprise GRC on ServiceNow",
      features: ["Policy", "Risk", "Audit"],
      pricing: "$$$",
      website: "https://www.servicenow.com",
      rating: 4.3,
      reviews: 390,
    },
    {
      slug: "hyperproof",
      name: "Hyperproof",
      domain: "hyperproof.io",
      description: "Compliance operations software",
      features: ["Controls", "Frameworks", "Collaboration"],
      pricing: "$$",
      website: "https://hyperproof.io",
      rating: 4.5,
      reviews: 130,
    },
    {
      slug: "strike-graph",
      name: "Strike Graph",
      domain: "strikegraph.com",
      description: "AI-assisted compliance evidence",
      features: ["AI evidence", "SOC 2", "Risk"],
      pricing: "$$",
      website: "https://www.strikegraph.com",
      rating: 4.4,
      reviews: 70,
    },
    {
      slug: "laika",
      name: "Laika",
      domain: "heylaika.com",
      description: "Compliance toolkit for growing teams",
      features: ["SOC 2", "Policies", "People ops"],
      pricing: "$$",
      website: "https://www.heylaika.com",
      rating: 4.2,
      reviews: 95,
    },
    {
      slug: "ai-act-compass",
      name: "AI Act Compass",
      domain: "iasecure.fr",
      description: "Checklist & controls mapping pour EU AI Act",
      features: ["Risk classification", "Controls", "Documentation"],
      pricing: "Free + Paid",
      website: "https://iasecure.fr",
      rating: 4.5,
      reviews: 60,
    },
  ],
};

const unsplash = [
  "photo-1517694712202-14dd9538aa97",
  "photo-1558618666-fcd25c85cd64",
  "photo-1551288049-bebda4e38f71",
  "photo-1555949963-aa79dcee981c",
  "photo-1557821552-17105176677c",
  "photo-1620712014215-7b16992e4e41",
  "photo-1552664730-d307ca884978",
  "photo-1558494949-ef010cbdcc31",
  "photo-1633356713697-ba3280f99f8c",
  "photo-1677442136019-21780ecad995",
];

let id = 1;
const tools = [];

for (const cat of categories) {
  catalog[cat].forEach((t, idx) => {
    const rank = idx + 1;
    const tool = {
      id: String(id++),
      slug: t.slug,
      name: t.name,
      category: cat,
      rank,
      logo: logo(t.domain),
      description: t.description,
      features: t.features,
      pricing: t.pricing,
      website: t.website,
      rating: t.rating,
      reviews: t.reviews,
      image: img(unsplash[idx % unsplash.length]),
    };
    if (t.whyBest) tool.whyBest = t.whyBest;
    else if (rank === 1) {
      tool.whyBest = `${t.description} — classé #1 pour sa pertinence marché et son adoption.`;
    }
    tools.push(tool);
  });
}

function serialize(value, indent = 0) {
  const pad = "  ".repeat(indent);
  const padIn = "  ".repeat(indent + 1);
  if (Array.isArray(value)) {
    if (value.length === 0) return "[]";
    if (value.every((v) => typeof v === "string")) {
      return `[${value.map((v) => JSON.stringify(v)).join(", ")}]`;
    }
    return `[\n${value
      .map((v) => `${padIn}${serialize(v, indent + 1)}`)
      .join(",\n")}\n${pad}]`;
  }
  if (value && typeof value === "object") {
    const entries = Object.entries(value);
    return `{\n${entries
      .map(([k, v]) => `${padIn}${k}: ${serialize(v, indent + 1)}`)
      .join(",\n")}\n${pad}}`;
  }
  return JSON.stringify(value);
}

const content = `export interface Tool {
  id: string;
  slug: string;
  name: string;
  category: string;
  rank: number;
  logo: string;
  description: string;
  features: string[];
  pricing: string;
  website: string;
  rating: number;
  reviews: number;
  image: string;
  whyBest?: string;
}

export const tools: Tool[] = ${serialize(tools)};

import {
  categories,
  categoryToSlug,
  getCategoryBySlug,
  categoryMeta,
} from "./categories";

export { categories, categoryToSlug, getCategoryBySlug, categoryMeta };

export const SITE_NAME = "AISecurityPulse";
export const SITE_DESCRIPTION =
  "Top 10 AI & cybersecurity tools classés par catégorie — comparatifs style ProductHunt / G2.";
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://aisecuritypulse.com";

export function getAllTools(): Tool[] {
  return [...tools].sort(
    (a, b) => a.rank - b.rank || a.name.localeCompare(b.name)
  );
}

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find((tool) => tool.slug === slug);
}

export function getToolsByCategory(category: string): Tool[] {
  return tools
    .filter((tool) => tool.category.toLowerCase() === category.toLowerCase())
    .sort((a, b) => a.rank - b.rank);
}

export function searchTools(query: string): Tool[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return tools.filter((tool) => {
    const haystack = [
      tool.name,
      tool.description,
      tool.category,
      tool.pricing,
      ...tool.features,
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  });
}

export function getRelatedTools(tool: Tool, limit = 3): Tool[] {
  return getToolsByCategory(tool.category)
    .filter((t) => t.slug !== tool.slug)
    .slice(0, limit);
}
`;

// Fix: imports must be at top in TS/ESLint — rewrite properly
const fixed = `import {
  categories,
  categoryToSlug,
  getCategoryBySlug,
  categoryMeta,
} from "./categories";

export { categories, categoryToSlug, getCategoryBySlug, categoryMeta };

export interface Tool {
  id: string;
  slug: string;
  name: string;
  category: string;
  rank: number;
  logo: string;
  description: string;
  features: string[];
  pricing: string;
  website: string;
  rating: number;
  reviews: number;
  image: string;
  whyBest?: string;
}

export const tools: Tool[] = ${serialize(tools)};

export const SITE_NAME = "AISecurityPulse";
export const SITE_DESCRIPTION =
  "Top 10 AI & cybersecurity tools classés par catégorie — comparatifs style ProductHunt / G2.";
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://aisecuritypulse.com";

export function getAllTools(): Tool[] {
  return [...tools].sort(
    (a, b) => a.rank - b.rank || a.name.localeCompare(b.name)
  );
}

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find((tool) => tool.slug === slug);
}

export function getToolsByCategory(category: string): Tool[] {
  return tools
    .filter((tool) => tool.category.toLowerCase() === category.toLowerCase())
    .sort((a, b) => a.rank - b.rank);
}

export function searchTools(query: string): Tool[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return tools.filter((tool) => {
    const haystack = [
      tool.name,
      tool.description,
      tool.category,
      tool.pricing,
      ...tool.features,
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  });
}

export function getRelatedTools(tool: Tool, limit = 3): Tool[] {
  return getToolsByCategory(tool.category)
    .filter((t) => t.slug !== tool.slug)
    .slice(0, limit);
}
`;

fs.writeFileSync(path.join("lib", "tools.ts"), fixed);
console.log("Wrote", tools.length, "tools");
console.log(
  "iasecure rank:",
  tools.find((t) => t.slug === "iasecure")?.rank,
  tools.find((t) => t.slug === "iasecure")?.category
);
