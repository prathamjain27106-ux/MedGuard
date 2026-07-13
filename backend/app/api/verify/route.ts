import { NextResponse } from 'next/server';
import driver from '@/lib/neo4j';

export async function POST(req: Request) {
  try {
    // 1. Get the scanned QR code data from the mobile app
    const { batchId } = await req.json();

    // 2. Open a connection to Neo4j
    const session = driver.session();

    try {
      // 3. Ask Neo4j: "Does this batch exist in our legal supply chain?"
      const result = await session.run(
        `MATCH (b:Batch {id: $batchId}) RETURN b`,
        { batchId }
      );

      // 4. Send the result back to the phone
      if (result.records.length > 0) {
        return NextResponse.json({ 
          status: 'AUTHENTIC', 
          message: '✅ Verified: This medicine is part of the legal supply chain.' 
        });
      } else {
        return NextResponse.json({ 
          status: 'FAKE', 
          message: '❌ ALERT: Fake medicine detected! No supply chain history found.' 
        });
      }
    } finally {
      // Close the connection
      await session.close();
    }
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json({ status: 'ERROR', message: 'Failed to connect to system' }, { status: 500 });
  }
}
