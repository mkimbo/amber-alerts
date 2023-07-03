// Create Next js 13 route handler for cases
import { NextResponse } from "next/server";
import { serverDB } from "@/utils/firebase";

export async function GET() {
  try {
    const data: any[] = [];
    const docs = await serverDB
      .collection(process.env.FIREBASE_FIRESTORE_MISSING_PERSONS!)
      .get();
    if (docs.empty) {
      return [];
    }
    docs.forEach((doc) => {
      const dataObj = doc.data();
      data.push({
        id: doc.id,
        ...dataObj,
      });
    });
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
// Create Next js 13 route handler for cases by id

// import { NextResponse } from 'next/server';

// export async function GET(request: Request) {
//   const { searchParams } = new URL(request.url);
//   const id = searchParams.get('id');
//   const res = await fetch(`https://data.mongodb-api.com/product/${id}`, {
//     headers: {
//       'Content-Type': 'application/json',
//       'API-Key': process.env.DATA_API_KEY,
//     },
//   });
//   const product = await res.json();

//   return NextResponse.json({ product });
// }
