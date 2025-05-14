import {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse,
} from "next/server";

export default function withAuth(
  middleware: NextMiddleware,
  requireAuth: string[] = [],
) {
  return async (req: NextRequest, next: NextFetchEvent) => {
    const pathName = req.nextUrl.pathname;

    if (pathName === "/") {
      const homeUrl = new URL("/home", req.url);

      return NextResponse.redirect(homeUrl);
    }

    if (pathName === "/top-up") {
      const topupUrl = new URL("/home", req.url);

      return NextResponse.redirect(topupUrl);
    }

    // Check if the pathName starts with any of the protected routes
    // const isProtectedRoute = requireAuth.some((route) =>
    //   pathName.startsWith(route),
    // );

    // if (isProtectedRoute) {
    //   // Extract token from cookies
    //   const cookieStore = await cookies();
    //   const token = cookieStore.get("token");
    //
    //   // If no token found or token is explicitly null
    //   if (!token || !token.value) {
    //     const loginUrl = new URL("/home", req.url);
    //
    //     loginUrl.searchParams.set("callbackUrl", encodeURI(req.url));
    //
    //     return NextResponse.redirect(loginUrl);
    //   }
    // }

    return middleware(req, next);
  };
}
