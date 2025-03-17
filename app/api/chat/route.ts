import { NextRequest, NextResponse } from "next/server";
import { processChat } from "@/lib/chat";
import { getUserByEmail } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const { message, email } = await request.json();

    // For demo purposes, we'll use a mock user
    const user = getUserByEmail(email || 'parent@example.com');

    if (!user) {
      return NextResponse.json(
        { error: "Utilisateur non authentifié" },
        { status: 401 }
      );
    }

    const response = await processChat({ user, message });

    return NextResponse.json({ response });
  } catch (error) {
    console.error("Chat error:", error);
    return NextResponse.json(
      {
        error: "Une erreur est survenue lors du traitement de votre demande.",
      },
      { status: 500 }
    );
  }
}