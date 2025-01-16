import { NextRequest, NextResponse } from "next/server";
import { RegisterPayload } from "@/services/auth/types";
import axios from "axios";
import { API_URL } from "../../lib";

export async function POST(request: NextRequest) {
  try {
    const data: RegisterPayload = await request.json();

    const response = await axios.post(`${API_URL}/auth/register`, data);

    if (!response || response.status !== 201) {
      return NextResponse.json(
        { success: false, message: "Registration failed" },
        { status: response?.status || 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: response.data,
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("Błąd zewnętrznego API:", error.response?.data);
      return NextResponse.json(
        {
          success: false,
          message: error.response?.data.message || "External API error",
        },
        { status: error.response?.status || 500 }
      );
    } else {
      console.log("Nieznany błąd:", error);
      return NextResponse.json(
        { success: false, message: "Internal server error" },
        { status: 500 }
      );
    }
  }
}
