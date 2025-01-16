import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { API_URL } from "../../lib";
import { LoginPayload } from "@/services/auth/types";

export async function POST(request: NextRequest) {
  try {
    const data: LoginPayload = await request.json();

    const response = await axios.post(`${API_URL}/auth/login`, data);

    if (!response) {
      return NextResponse.json(
        { success: false, message: "Login failed" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data: response.data });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        { success: false, message: error.response?.data.message || "Error" },
        { status: 500 }
      );
    } else {
      console.log("Error in login route:", error);
    }
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
