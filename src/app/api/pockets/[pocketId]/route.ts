import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { getAuthHeaders } from "@/services/get-auth-headers";
import { API_URL } from "../../lib";

export async function PUT(request: NextRequest) {
  try {
    const { pathname } = new URL(request.url);
    const pocketId = pathname.split("/").pop();
    if (!pocketId) {
      return NextResponse.json(
        { success: false, message: "Pocket ID is required" },
        { status: 400 }
      );
    }

    const data = await request.json();

    const headers = getAuthHeaders(request);

    const response = await axios.put(
      `${API_URL}/pockets/${pocketId}`,
      data,
      headers
    );

    if (!response) {
      return NextResponse.json(
        { success: false, message: "Pocket update failed" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Pocket updated successfully",
    });
  } catch (error) {
    console.log("Error in update pocket route:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { pathname } = new URL(request.url);
    const pocketId = pathname.split("/").pop();
    if (!pocketId) {
      return NextResponse.json(
        { success: false, message: "Pocket ID is required" },
        { status: 400 }
      );
    }

    if (!pocketId) {
      return NextResponse.json(
        { success: false, message: "ID is required" },
        { status: 400 }
      );
    }
    const headers = getAuthHeaders(request);
    const response = await axios.delete(
      `${API_URL}/pockets/${pocketId}`,
      headers
    );
    if (!response) {
      return NextResponse.json(
        { success: false, message: "Pocket deletion failed" },
        { status: 500 }
      );
    }
    return NextResponse.json({
      success: true,
      message: "Pocket deleted successfully",
    });
  } catch (error) {
    console.log("Error in delete pocket route:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
