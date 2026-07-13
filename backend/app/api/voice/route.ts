import { NextResponse } from 'next/server';
import driver from '@/lib/neo4j';

export async function POST(req: Request) {
  try {
    const { transcript, batchId } = await req.json();

    // 1. THIS IS WHERE SARVAM AI FITS IN!
    // In a full production app, you send the raw audio to Sarvam's API here.
    // For this hackathon step, we will assume Sarvam translated the Hindi voice to English:
    console.log("Sarvam AI processed text:", transcript);

    // 2. Update Neo4j to mark the medicine as damaged based on the voice report
    const session = driver.session();
    try {
      await session.run(
        `MATCH (b:Batch {id: $batchId}) 
         SET b.status = "DAMAGED - Voice Reported" 
         RETURN b`,
        { batchId: batchId || "B123" } 
      );
      
      return NextResponse.json({ 
        success: true, 
        message: `🗣️ Voice Processed via Sarvam AI.\n\nTranslated: "${transcript}"\n\nDatabase Updated!` 
      });
    } finally {
      await session.close();
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to process voice' }, { status: 500 });
  }
}