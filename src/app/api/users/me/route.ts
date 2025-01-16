import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { getAuthHeaders } from "@/services/get-auth-headers";
import { API_URL } from "../../lib";

export async function GET(request: NextRequest) {
  try {
    const headers = getAuthHeaders(request);

    console.log("headers in GET", headers);
    const response = await axios.get(`${API_URL}/users/me`, headers);

    if (!response) {
      return NextResponse.json(
        { success: false, message: "Failed to fetch user data" },
        { status: 500 }
      );
    }

    return NextResponse.json(response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        { success: false, message: error.response?.data.message || "Error" },
        { status: 500 }
      );
    } else {
      console.log("Error in get user data route:", error);
    }
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
