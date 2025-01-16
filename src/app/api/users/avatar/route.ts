import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { getAuthHeaders } from "@/services/get-auth-headers";
import { API_URL } from "../../lib";

export async function PUT(request: NextRequest) {
  try {
    // Pobierz nagłówki z requesta
    const headers = getAuthHeaders(request);

    // Wykonaj zapytanie `PUT` do zewnętrznego API z nagłówkami
    const response = await axios.put(`${API_URL}/users/avatar`, {}, headers);

    if (!response) {
      return NextResponse.json(
        { success: false, message: "Avatar update failed" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Avatar updated successfully",
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        { success: false, message: error.response?.data.message || "Error" },
        { status: 500 }
      );
    } else {
      console.log("Error in get avatar route:", error);
    }
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
