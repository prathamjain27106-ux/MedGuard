<img width="4320" height="1440" alt="hh26 main poster 2 with sponsors 3x1 (4320 x 1440 px) (2)" src="https://github.com/user-attachments/assets/c698b2cd-da84-4cb0-9276-125c6a7244aa" />
🛡️ MedGuard: The Anti-Counterfeit Pharmaceutical Grid

Securing the pharmaceutical supply chain using Graph-based digital threads and
multilingual Voice AI.

📌 Problem & Domain

According to the WHO, roughly 20% to 30% of medicines in India are counterfeit
or sub-standard. The current pharmaceutical supply chain is a "black box." Once
a drug leaves the factory, it is nearly impossible to guarantee its authenticity
by the time it reaches a rural pharmacy.

Furthermore, when on-ground pharmacists receive damaged or suspicious stock,
traditional English-only inventory systems create a massive accessibility
barrier, leading to unreported safety hazards.

Themes Selected:

  - 🏙️ Infrastructure, Mobility & Smart Systems
  - 🏥 HealthTech & Bio Platforms
  - 🔐 Trust, Identity & Security

🎯 Objective

MedGuard transforms disconnected supply chains into an interconnected, real-time
"Smart System" to eradicate fake medicines.

  - The Target Users: On-ground Pharmacists, Government Drug Inspectors, and
    Pharmaceutical Logistics Companies.
  - The Pain Point: SQL databases struggle with deep supply chain tracing,
    making it easy to inject fake batches. Additionally, rural workers face
    friction when typing complex anomaly reports in English.
  - The Value Provided: A unified ecosystem where native hardware scanners
    verify graph-based authenticity, and multilingual voice AI empowers
    pharmacists to report hazards instantly without typing.

🧠 Team & Approach

Team Name: namespace FatalError{}

Team Members:

  - Pratham Jain (GitHub Profile Link: https://github.com/prathamjain27106-ux )
  - Parth Rajpal (GitHub Profile Link: https://github.com/Parth-coder657 )
  - Pradumn Mishra (GitHub Profile Link: https://github.com/Pradumn-Mishra360)

Our Approach:

  - Why we chose this problem: Counterfeit medicine is a silent crisis that
    costs lives. We realized that tracking a splitting supply chain (Factory ->
    Distributor -> 100 Pharmacies) is inherently a Graph Problem, not a
    relational table problem.
  - Key challenges addressed: We overcame complex dependency resolution issues
    between cutting-edge Next.js caching (Turbopack) and legacy Expo SDK
    constraints by building custom, unbreakable React state submit functions and
    bypassing bloated third-party hooks.
  - Architectural Pivot: We initially planned to use Base44 but pivoted to
    Next.js with Vercel AI SDK to achieve a more cost-effective, custom-streamed
    Generative UI for our Command Center.

🛠️ Tech Stack

Core Technologies Used:

  - Frontend (Mobile): Expo (React Native) utilizing native hardware
    abstractions (expo-camera, expo-av).
  - Frontend (Web) & Backend API: Next.js (App Router), Tailwind CSS.
  - Primary Database: Neo4j AuraDB (Cloud Graph Database).
  - Voice AI Engine: Sarvam AI (Indic Language Speech-to-Text & Translation).
  - Generative AI: Google Gemini 1.5/2.5 Flash (via Vercel AI SDK).

🏆 Sponsored Track Integrations

📱 Expo Track – Built using Expo

MedGuard leverages Expo to deliver a high-performance, cross-platform mobile
scanner for pharmacists. We explicitly bypassed web-views and utilized native
device hardware abstraction layers (expo-camera for low-latency QR parsing and
expo-av for high-fidelity microphone recording). This ensures the app operates
smoothly even on low-end smartphones used in Tier-2/Tier-3 cities.

📊 Neo4j Track – Primary Graph Database

Traditional SQL databases require heavy, slow JOIN operations to trace a
product's history. By using Neo4j, MedGuard models the supply chain as an
Indexless Property Graph.

  - Nodes: (:Factory), (:Distributor), (:Pharmacy), (:Batch)
  - Edges: [:SHIPPED_TO], [:DELIVERED_TO] When a QR is scanned, Neo4j runs a
    Cypher traversal. If a valid edge path does not exist connecting the Factory
    to that specific Pharmacy for that Batch ID, the system instantly flags it
    as a counterfeit injection.

🎙️ Sarvam AI Track – Multilingual Translation Engine

We bridge the digital divide using Sarvam AI. If a pharmacist receives a damaged
box, they do not need to navigate an English UI. They simply hold the native
Expo microphone button and speak in their regional dialect (e.g., Hindi: "Yeh
dawai kharab hai"). The Next.js backend streams this audio to Sarvam AI, which
translates the intent into English telemetry, dynamically updating the Neo4j
Graph node status to DAMAGED via voice command alone.

✨ Key Features

  - ✅ Graph-Verified QR Scanning: Real-time path traversal to verify if a
    medicine belongs to a legal supply chain.
  - ✅ Vernacular Voice Reporting: Walkie-talkie style reporting for rural
    pharmacists using Sarvam AI.
  - ✅ MedGuard Command Center: A dark-mode, web-based dashboard for Drug
    Inspectors.
  - ✅ Generative AI Analytics: Inspectors can chat in natural language with
    Google Gemini, which reads the live Neo4j database context to answer queries
    about supply chain anomalies.

📽️ Demo & Deliverables

  - Demo Video Link (Mandatory):
    https://drive.google.com/file/d/1crh6aDv7iN9aGA91IPfceFGbRYi0zeQv/view?usp=sharing
  - Deployment Link: https://med-guard.vercel.app/
  - GitHub Repository: https://github.com/prathamjain27106-ux/MedGuard.git
  - Pitch Deck / PPT (Optional): https://1drv.ms/p/c/9b16995cd4ac4565/IQC1OF8OpWTeRJbbuOpUTxmDAcjU8aR4CHlPwB2fU6szjOg?e=WBXT6L

✅ Tasks & Bonus Checklist

- [x] All team members completed the mandatory social task
- [x] Bonus Task 1 – Badge sharing: • Pratham Jain
  [https://www.linkedin.com/posts/pratham-jain5153ab37b_hackhazards-hydrosync-civictech-share-7475100226089926656-dMG6/]
  • Parth Rajpal
  [https://www.linkedin.com/posts/parth-rajpal-_hackhazards2026-namespace-fatalerror-share-7475100639081984000-2us5/]
  • Pradumn Mishra
  [https://www.linkedin.com/posts/pradumn-mishra-84683437b_hackhazards-hackhazards-hydrosync-share-7477415841869950976-2otY/]
- [x] Bonus Task 2 – Blog/article:
  https://dev.to/pratham_jain_8856a94b47dd/how-we-built-a-graph-powered-voice-ai-pharmaceutical-tracker-for-hackhazards-26-oha
  🧪 How to Run the Project Locally

1.  Requirements

  - Node.js v18+ & npm
  - Expo Go app installed on an Android/iOS test device
  - Active Neo4j AuraDB Instance
  - Sarvam AI & Google Gemini API Keys

2.  Environment Setup

Create a .env.local file inside the backend directory:

NEO4J_URI=neo4j+s://<YOUR_DB_ID>.databases.neo4j.io NEO4J_USER=neo4j
NEO4J_PASSWORD=<YOUR_PASSWORD> SARVAM_API_KEY=<YOUR_SARVAM_KEY>
GOOGLE_GENERATIVE_AI_API_KEY=<YOUR_GEMINI_KEY>

3.  Running the System (Requires Split Terminal)

Terminal 1: Start the Backend & Dashboard

cd backend npm install npm run dev

Dashboard runs on http://localhost:3000

Terminal 2: Start the Expo Mobile Scanner Note: Ensure you update BACKEND_URL in
App.tsx to your machine's local IPv4 address before starting.

cd mobile npm install npx expo start -c

Scan the generated QR code using Expo Go on your smartphone.

🧬 Future Scope

  - 📈 Blockchain Integration: Hashing the Neo4j graph states onto a public
    ledger for immutable regulatory compliance.
  - 🌐 Consumer App: Allowing everyday citizens to scan their medicines using a
    lightweight version of the Expo app.
  - 🛡️ Multi-modal AI: Using Sarvam AI to process images of damaged medicine
    boxes alongside voice reports.

📎 Resources / Credits

  - Neo4j Aura Cloud Platform for graph hosting.
  - Vercel AI SDK for seamless Generative UI streaming.
  - Sarvam AI for Indic language support.

🏁 Final Words

Building MedGuard for HACKHAZARDS '26 was an incredible journey through
dependency hell and architectural breakthroughs! We learned the true power of
Graph Databases for physical systems and the necessity of inclusive design using
Voice AI. A huge shout-out to NAMESPACE for hosting such a rigorous and
rewarding buildathon!
