import { generateText } from 'ai';
import { google } from '@ai-sdk/google';
import driver from '@/lib/neo4j';

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    // 1. Fetch live Neo4j Data
    const session = driver.session();
    let dbContext = "No medicines found in database.";
    try {
      const result = await session.run(`MATCH (b:Batch) RETURN b.id AS id, b.status AS status`);
      const batches = result.records.map(r => `Batch ID: ${r.get('id')} | Status: ${r.get('status')}`);
      if (batches.length > 0) dbContext = batches.join('\n');
    } catch (e) {
      console.log("DB Error", e);
    } finally {
      await session.close();
    }

    const systemPrompt = `
      You are MedGuard AI, an assistant for Drug Inspectors.
      Here is the LIVE data from the Neo4j Graph Database:
      ${dbContext}
      Keep your answers professional and short.
    `;

    // 2. Get AI Response
    const { text } = await generateText({
      model: google('gemini-3.5-flash'),
      system: systemPrompt,
      prompt: message, // The user's question
    });

    return Response.json({ reply: text });

  } catch (error) {
    console.error("AI Error:", error);
    return Response.json({ reply: "Error connecting to Google Gemini AI." }, { status: 500 });
  }
}