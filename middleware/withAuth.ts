import {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse,
} from "next/server";
import { cookies } from "next/headers";

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

    // Check if the pathName starts with any of the protected routes
    const isProtectedRoute = requireAuth.some((route) =>
      pathName.startsWith(route),
    );

    if (isProtectedRoute) {
      // Extract token from cookies
      const cookieStore = await cookies();
      const token = cookieStore.get("token");

      // If no token found or token is explicitly null
      if (!token || !token.value) {
        const loginUrl = new URL("/login", req.url);

        loginUrl.searchParams.set("callbackUrl", encodeURI(req.url));

        return NextResponse.redirect(loginUrl);
      }
    }

    return middleware(req, next);
  };
}
