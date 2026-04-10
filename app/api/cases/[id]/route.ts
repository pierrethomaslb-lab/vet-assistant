import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import type { CaseUpdate } from "@/types/database";

// PATCH /api/cases/[id] — update a case (validation, feedback)
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = getSupabase();
    const body: CaseUpdate = await req.json();

    const { data, error } = await supabase
      .from("cases")
      .update(body)
      .eq("id", id)
      .select()
      .single();

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

// GET /api/cases/[id] — get a single case
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = getSupabase();

    const { data, error } = await supabase
      .from("cases")
      .select("*")
      .eq("id", id)
      .single();

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
