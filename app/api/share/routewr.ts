// import { NextResponse } from "next/server";

// export async function GET(request: Request) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const url = searchParams.get("url");
//     fetch(
//       "https://firebasestorage.googleapis.com/v0/b/gcp-playground-c1787.appspot.com/o/files%2F1684372606329-CoIV-mJviEnow5tjydPn9?alt=media&token=0146fd48-fa2b-467a-9818-6c37c33e2674"
//     )
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Image fetch failed");
//         }
//         return response.arrayBuffer();
//       })
//       .then((imageBuffer) => {
//         // Set the appropriate response headers

//         // Adjust caching headers as needed

//         // Convert the ArrayBuffer to a Buffer (Node.js)
//         const buffer = Buffer.from(imageBuffer);

//         // Send the image buffer as the response
//         return new Response(buffer, {
//           status: 200,
//           headers: {
//             "Content-Type": "image/*",
//             "Cache-Control": "public, max-age=31536000",
//           },
//         });
//       })
//       .catch((error) => {
//         console.error(error);
//         return NextResponse.json({ error }, { status: 500 });
//       });
//   } catch (error) {
//     console.log(error);
//     return NextResponse.json({ error }, { status: 500 });
//   }
// }
