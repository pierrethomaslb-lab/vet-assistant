import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { context, doubt, aiRecommendation, moduleName } = await req.json();

  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const fromNumber = process.env.TWILIO_WHATSAPP_NUMBER;
  const toNumber = process.env.SENIOR_VET_PHONE;

  if (!accountSid || !authToken || !fromNumber || !toNumber) {
    return NextResponse.json(
      { error: "Twilio non configure. Variables manquantes dans .env.local" },
      { status: 500 }
    );
  }

  const messageBody = [
    `Demande validation — ${moduleName}`,
    "",
    context,
    "",
    doubt ? `DOUTE:\n"${doubt}"` : "",
    "",
    aiRecommendation
      ? `RECOMMANDATION IA:\n${aiRecommendation.slice(0, 1000)}`
      : "",
  ]
    .filter(Boolean)
    .join("\n");

  try {
    const url = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;

    const body = new URLSearchParams({
      From: `whatsapp:${fromNumber}`,
      To: `whatsapp:${toNumber}`,
      Body: messageBody.slice(0, 1600), // WhatsApp limit
    });

    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(`${accountSid}:${authToken}`).toString("base64"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: body.toString(),
    });

    if (!res.ok) {
      const error = await res.text();
      console.error("Twilio error:", error);
      return NextResponse.json(
        { error: "Erreur envoi WhatsApp" },
        { status: 500 }
      );
    }

    const data = await res.json();
    return NextResponse.json({ sid: data.sid, status: "sent" });
  } catch (err) {
    console.error("WhatsApp send error:", err);
    return NextResponse.json(
      { error: "Erreur envoi WhatsApp" },
      { status: 500 }
    );
  }
}
