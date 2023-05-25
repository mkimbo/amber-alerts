import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
  authentication,
  //refreshAuthCookies,
} from "next-firebase-auth-edge/lib/next/middleware";
import { serverConfig } from "./config/server-config";
//import { cookies } from "next/headers";
function redirectToLogin(request: NextRequest) {
  if (request.nextUrl.pathname === "/login") {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = "/login";
  url.search = `redirect=${request.nextUrl.pathname}${url.search}`;
  return NextResponse.redirect(url);
}

function redirectToHome(request: NextRequest) {
  if (request.nextUrl.pathname === "/") {
    return NextResponse.next();
  }
  const url = request.nextUrl.clone();
  url.pathname = "/";
  return NextResponse.redirect(url);
}

function redirectToVerify(request: NextRequest) {
  if (request.nextUrl.pathname === "/register") {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = "/register";
  url.search = `redirect=${request.nextUrl.pathname}${url.search}`;
  return NextResponse.redirect(url);
}

const commonOptions = {
  apiKey: serverConfig.firebaseApiKey,
  cookieName: "AuthToken",
  cookieSignatureKeys: [
    process.env.COOKIE_SECRET_CURRENT!,
    process.env.COOKIE_SECRET_PREVIOUS!,
  ],
  cookieSerializeOptions: {
    path: "/",
    httpOnly: true,
    secure: false, // Set this to true on HTTPS environments
    sameSite: "strict" as const,
    maxAge: 12 * 60 * 60 * 24 * 1000, // twelve days
  },
  serviceAccount: serverConfig.serviceAccount,
};

// const {  getUser } = getFirebaseAuth(
//   commonOptions.serviceAccount,
//   commonOptions.apiKey
// );

export async function middleware(request: NextRequest) {
  return authentication(request, {
    loginPath: "/api/login",
    logoutPath: "/api/logout",
    ...commonOptions,
    handleValidToken: async ({ token, decodedToken }) => {
      //console.log("decodedToken", decodedToken, request.nextUrl.pathname);
      //const cookieStore = cookies();
      const userVerified = request.cookies.get("userVerified");
      if (
        request.nextUrl.pathname.includes("/new/alert") ||
        request.nextUrl.pathname.includes("/new/sighting")
      ) {
        if (!userVerified) {
          return redirectToVerify(request);
        }
      }

      if (
        request.nextUrl.pathname === "/register" ||
        request.nextUrl.pathname === "/verify" ||
        request.nextUrl.pathname === "/login"
      ) {
        if (userVerified?.value === "true" && request.nextUrl.search === "") {
          return redirectToHome(request);
        }
      }

      return NextResponse.next();
    },
    isTokenValid: (token) => token.email_verified ?? false,
    handleInvalidToken: async () => {
      return redirectToLogin(request);
    },
    handleError: async (error) => {
      console.error("Unhandled authentication error", { error });
      return redirectToLogin(request);
    },
  });
}

export const config = {
  matcher: ["/", "/((?!_next/static|favicon.ico|logo.svg).*)"],
};
