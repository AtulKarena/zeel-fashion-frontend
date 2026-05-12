import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL!; // e.g. https://zeel-fashion-backend.vercel.app/api

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // 1. Validate credentials via Express backend
    const backendRes = await fetch(`${BACKEND_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await backendRes.json();

    if (!backendRes.ok || !data.success) {
      return NextResponse.json(
        { success: false, message: data.message },
        { status: backendRes.status }
      );
    }

    // 2. Sign JWT in Next.js (same domain as frontend)
    const token = jwt.sign(
      {
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        role: data.user.role,
      },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 3. Set httpOnly cookie on frontend domain
    const response = NextResponse.json({
      success: true,
      message: "Login successful!",
      role: data.user.role,
    });

    response.cookies.set("token", token, {
      httpOnly: true,       // JS cannot access it — XSS safe
      secure: true,         // HTTPS only
      sameSite: "lax",      // same domain, lax is fine
      maxAge: 7 * 24 * 60 * 60,   // 7 days in seconds
      path: "/",
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
}