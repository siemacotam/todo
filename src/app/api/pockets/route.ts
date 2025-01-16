import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { getAuthHeaders } from "@/services/get-auth-headers";
import { API_URL } from "../lib";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const headers = getAuthHeaders(request);

    const response = await axios.post(`${API_URL}/pockets`, data, headers);

    if (!response) {
      return NextResponse.json(
        { success: false, message: "Pocket creation failed" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Pocket created successfully",
      data: response.data,
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        { success: false, message: error.response?.data.message || "Error" },
        { status: 500 }
      );
    } else {
      console.log("Error in create pocket route:", error);
    }
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const headers = getAuthHeaders(request);
    const response = await axios.get(`${API_URL}/pockets`, headers);
    if (!response) {
      return NextResponse.json(
        { success: false, message: "Failed to fetch pockets" },
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
      console.log("Error in get pockets route:", error);
    }
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
