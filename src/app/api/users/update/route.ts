import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { getAuthHeaders } from "@/services/get-auth-headers";
import { API_URL } from "../../lib";

export async function PUT(request: NextRequest) {
  try {
    const data = await request.json();
    const headers = getAuthHeaders(request);

    const response = await axios.put(`${API_URL}/users/update`, data, headers);

    if (!response) {
      return NextResponse.json(
        { success: false, message: "User update failed" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "User updated successfully",
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        { success: false, message: error.response?.data.message || "Error" },
        { status: 500 }
      );
    } else {
      console.log("Error in update user data route:", error);
    }
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
