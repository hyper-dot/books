"use server";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { r } from "@/config/request";
import { handleUnauthorized } from "@/lib/auth.lib";

const secretKey = process.env.JWT_SECRET;
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30h")
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

export async function logout() {
  // Destroy the session
  cookies().set("session", "", { expires: new Date(0) });
  redirect("/");
}

export async function getSession() {
  noStore();
  const session = cookies().get("session")?.value;
  if (!session) return;
  try {
    return await decrypt(session);
  } catch (err) {
    return;
  }
}

export async function updateSession({
  session,
  request,
}: {
  session: any;
  request: NextRequest;
}) {
  try {
    const {
      user: { refreshToken },
    } = session;

    // GET new session from the backend
    const newSession = await r.post({
      endpoint: "/auth/refresh",
      payload: { refreshToken },
    });

    // PREPARE CONSTANTS
    const expires = new Date(Date.now() + 30 * 60 * 60 * 1000);
    const res = NextResponse.next();

    // SET COOKIES
    res.cookies.set({
      name: "session",
      value: await encrypt(newSession),
      httpOnly: true,
      expires: expires,
    });

    // RETURN
    return res;
  } catch (err) {
    console.log(err);
    return handleUnauthorized(request);
  }
}

type Response = {
  message?: string;
  error?: string;
  code: number;
};

export const login = async (payload: any): Promise<Response> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
      {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" },
      },
    );

    if (!res.ok) {
      if (res.status === 403) {
        return {
          error: "Please verify OTP first !!",
          code: res.status,
        };
      } else {
        return {
          error: "Please check your credientials and try again !!",
          code: res.status,
        };
      }
    } else {
      const data = await res.json();
      console.log(data);
      const session = await encrypt(data);
      cookies().set("session", session, {
        httpOnly: true,
        expires: new Date(Date.now() + 24 * 60 * 1000),
      });
      revalidatePath("/", "layout");
      return {
        code: res.status,
        message: "You have been loggedin successfully !!",
      };
    }
  } catch (err: any) {
    return {
      code: err.code || 500,
      error: err.message || "couldn't connect to server",
    };
  }
};
