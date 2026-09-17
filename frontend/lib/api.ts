const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export interface RequirementItem {
  _id: string;
  eventName: string;
  eventType: string;
  startDate: string;
  endDate?: string;
  location: string;
  venue?: string;
  category: "planner" | "performer" | "crew";
  details: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export async function createRequirement(payload: object): Promise<RequirementItem> {
  const res = await fetch(`${API_URL}/api/requirements`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const json = await res.json();

  if (!res.ok || !json.success) {
    const msg = json.error?.message || json.message || "Submission failed";
    throw new Error(msg);
  }

  return json.data;
}

export async function getRequirements(category?: string): Promise<RequirementItem[]> {
  const url = new URL(`${API_URL}/api/requirements`);
  if (category && category !== "all") {
    url.searchParams.set("category", category);
  }

  const res = await fetch(url.toString(), {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
  });

  const json = await res.json();

  if (!res.ok || !json.success) {
    const msg = json.error?.message || json.message || "Failed to fetch requirements";
    throw new Error(msg);
  }

  return json.data || [];
}

export async function getRequirementById(id: string): Promise<RequirementItem> {
  const res = await fetch(`${API_URL}/api/requirements/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
  });

  const json = await res.json();

  if (!res.ok || !json.success) {
    const msg = json.error?.message || json.message || "Failed to fetch requirement details";
    throw new Error(msg);
  }

  return json.data;
}

export async function deleteRequirement(id: string): Promise<boolean> {
  const res = await fetch(`${API_URL}/api/requirements/${id}`, {
    method: "DELETE",
  });

  if (!res.ok && res.status !== 204) {
    let msg = "Failed to delete requirement";
    try {
      const json = await res.json();
      msg = json.error?.message || json.message || msg;
    } catch (_) {}
    throw new Error(msg);
  }

  return true;
}
