import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { getAuthHeaders } from "@/services/get-auth-headers";
import { API_URL } from "@/app/api/lib";

export async function POST(request: NextRequest) {
  try {
    const { pathname } = new URL(request.url);

    const parts = pathname.split("/");
    const pocketId = parts[3];

    if (!pocketId) {
      return NextResponse.json(
        { success: false, message: "Pocket ID is required" },
        { status: 400 }
      );
    }

    const data = await request.json();

    const headers = getAuthHeaders(request);

    const response = await axios.post(
      `${API_URL}/pockets/${pocketId}/tasks`,
      data,
      headers
    );

    if (!response) {
      return NextResponse.json(
        { success: false, message: "Task creation failed" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Task created successfully",
      data: response.data,
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(
        "Error in create task route:",
        error.message,
        error.response?.data
      );
      return NextResponse.json(
        { success: false, message: error.response?.data.message || "Error" },
        { status: 500 }
      );
    } else {
      console.log("Error in create task route:", error);
    }
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { pathname } = new URL(request.url);

    const parts = pathname.split("/");
    const pocketId = parts[3];

    if (!pocketId) {
      return NextResponse.json(
        { success: false, message: "Pocket ID is required" },
        { status: 400 }
      );
    }
    const headers = getAuthHeaders(request);
    const response = await axios.get(
      `${API_URL}/pockets/${pocketId}/tasks`,
      headers
    );
    if (!response) {
      return NextResponse.json(
        { success: false, message: "Failed to fetch tasks" },
        { status: 500 }
      );
    }
    return NextResponse.json(response.data);
  } catch (error) {
    console.log("Error in get tasks route:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
