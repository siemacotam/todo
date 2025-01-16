import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { getAuthHeaders } from "@/services/get-auth-headers";
import { API_URL } from "@/app/api/lib";

export async function PUT(request: NextRequest) {
  try {
    const { pathname } = new URL(request.url);
    const pathSegments = pathname.split("/");
    const pocketId = pathSegments[pathSegments.length - 3];
    const taskId = pathSegments[pathSegments.length - 1];

    if (!pocketId || !taskId) {
      return NextResponse.json(
        { success: false, message: "Pocket ID and Task ID are required" },
        { status: 400 }
      );
    }

    const data = await request.json();

    const headers = getAuthHeaders(request);

    const response = await axios.put(
      `${API_URL}/pockets/${pocketId}/tasks/${taskId}`,
      data,
      headers
    );

    if (!response) {
      return NextResponse.json(
        { success: false, message: "Task update failed" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Task updated successfully",
    });
  } catch (error) {
    console.log("Error in update task route:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { pathname } = new URL(request.url);
    const pathSegments = pathname.split("/");
    const pocketId = pathSegments[pathSegments.length - 3];
    const taskId = pathSegments[pathSegments.length - 1];
    if (!pocketId || !taskId) {
      return NextResponse.json(
        { success: false, message: "Pocket ID and Task ID are required" },
        { status: 400 }
      );
    }
    const headers = getAuthHeaders(request);
    const response = await axios.delete(
      `${API_URL}/pockets/${pocketId}/tasks/${taskId}`,
      headers
    );
    if (!response) {
      return NextResponse.json(
        { success: false, message: "Task deletion failed" },
        { status: 500 }
      );
    }
    return NextResponse.json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.log("Error in delete task route:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
