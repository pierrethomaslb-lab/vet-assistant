import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import type { CaseInsert } from "@/types/database";

// GET /api/cases — list recent cases
export async function GET() {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("cases")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(50);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Supabase non configure" },
      { status: 500 }
    );
  }
}

// POST /api/cases — save a new case
export async function POST(req: Request) {
  try {
    const supabase = getSupabase();
    const body: CaseInsert = await req.json();

    const { data, error } = await supabase
      .from("cases")
      .insert(body)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(data, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Supabase non configure" },
      { status: 500 }
    );
  }
}
