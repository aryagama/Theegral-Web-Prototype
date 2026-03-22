import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const getSupabase = () => {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) return null;
  return createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
};

const toNumber = (value, fallback = 0) => {
  const num = Number(value);
  return Number.isFinite(num) ? num : fallback;
};

const sanitizeNote = (note, index) => {
  const fallbackId = `${Date.now()}-${index}`;
  return {
    id: String(note?.id || fallbackId).slice(0, 80),
    x: toNumber(note?.x, 0),
    y: toNumber(note?.y, 0),
    color: typeof note?.color === "string" ? note.color.slice(0, 20) : "#e4c965",
    text: typeof note?.text === "string" ? note.text.slice(0, 4000) : "",
    alignX: ["left", "center", "right"].includes(note?.alignX) ? note.alignX : "left",
    alignY: ["top", "middle", "bottom"].includes(note?.alignY) ? note.alignY : "top",
    saved: Boolean(note?.saved)
  };
};

const sanitizeNotes = (notes) => {
  if (!Array.isArray(notes)) return [];
  return notes.slice(0, 300).map(sanitizeNote);
};

const normalizePageKey = (value) => {
  if (typeof value !== "string") return "work-1";
  const key = value.trim().toLowerCase();
  if (key === "work-1" || key === "work-2") return key;
  return "work-1";
};

const getPageKeyFromRequest = (request) => {
  try {
    const url = new URL(request.url);
    return normalizePageKey(url.searchParams.get("pageKey"));
  } catch (_error) {
    return "work-1";
  }
};

export async function GET(request) {
  const supabase = getSupabase();
  if (!supabase) {
    return NextResponse.json(
      { notes: [], ok: false, message: "Supabase env not configured" },
      { status: 500 }
    );
  }

  const pageKey = getPageKeyFromRequest(request);
  const { data, error } = await supabase
    .from("sticky_notes")
    .select("notes")
    .eq("page_key", pageKey)
    .maybeSingle();

  if (error) {
    return NextResponse.json({ notes: [], ok: false, message: error.message }, { status: 500 });
  }

  const notes = sanitizeNotes(data?.notes ?? []);
  return NextResponse.json(
    { notes },
    {
      headers: {
        "Cache-Control": "no-store"
      }
    }
  );
}

export async function POST(request) {
  const supabase = getSupabase();
  if (!supabase) {
    return NextResponse.json(
      { ok: false, message: "Supabase env not configured" },
      { status: 500 }
    );
  }

  try {
    const payload = await request.json();
    const pageKey = normalizePageKey(payload?.pageKey ?? getPageKeyFromRequest(request));
    const notes = sanitizeNotes(payload?.notes ?? payload);
    const { error } = await supabase
      .from("sticky_notes")
      .upsert(
        {
          page_key: pageKey,
          notes,
          updated_at: new Date().toISOString()
        },
        { onConflict: "page_key" }
      );

    if (error) {
      return NextResponse.json({ ok: false, message: error.message }, { status: 500 });
    }

    return NextResponse.json(
      { ok: true, notes },
      {
        headers: {
          "Cache-Control": "no-store"
        }
      }
    );
  } catch (_error) {
    return NextResponse.json({ ok: false, message: "Invalid payload" }, { status: 400 });
  }
}
