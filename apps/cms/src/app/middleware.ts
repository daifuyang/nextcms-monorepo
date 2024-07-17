import { NextResponse, type NextRequest } from "next/server";

// 排除路径

export async function middleware(request: NextRequest) {
    const response = NextResponse.next()
    return response
}
