import { NextRequest, NextResponse } from "next/server";

import withAuth from "./middleware/withAuth";

export function mainMiddleware(request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: [],
};

export default withAuth(mainMiddleware, config.matcher);
