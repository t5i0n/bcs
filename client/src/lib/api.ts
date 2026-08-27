const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3001";

async function request<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const token = localStorage.getItem("admin_token");

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Request failed: ${res.status}`);
  }

  if (res.status === 204) return undefined as T;
  return res.json();
}

// ─── Auth ──────────────────────────────────────────────────────

export const authApi = {
  login: (email: string, password: string) =>
    request<{ token: string; admin: AdminUser }>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),

  me: () => request<{ admin: AdminUser }>("/api/auth/me"),
};

// ─── Commodities ───────────────────────────────────────────────

export const commoditiesApi = {
  list: () => request<{ commodities: Commodity[] }>("/api/admin/commodities"),

  get: (id: string) =>
    request<{ commodity: Commodity }>(`/api/admin/commodities/${id}`),

  create: (data: CreateCommodityInput) =>
    request<{ commodity: Commodity }>("/api/admin/commodities", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  update: (id: string, data: Partial<CreateCommodityInput>) =>
    request<{ commodity: Commodity }>(`/api/admin/commodities/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  delete: (id: string) =>
    request<void>(`/api/admin/commodities/${id}`, { method: "DELETE" }),

  stats: () =>
    request<{
      total: number;
      available: number;
      totalStock: number;
      totalSold: number;
    }>("/api/admin/commodities/stats/overview"),
};

// ─── Contacts ──────────────────────────────────────────────────

export const contactsApi = {
  list: (params?: { status?: string; page?: number }) => {
    const qs = new URLSearchParams();
    if (params?.status) qs.set("status", params.status);
    if (params?.page) qs.set("page", String(params.page));
    return request<{
      submissions: ContactSubmission[];
      pagination: { page: number; limit: number; total: number; pages: number };
    }>(`/api/admin/contacts?${qs}`);
  },

  get: (id: string) =>
    request<{ submission: ContactSubmission }>(`/api/admin/contacts/${id}`),

  update: (id: string, data: { status?: string; notes?: string }) =>
    request<{ submission: ContactSubmission }>(`/api/admin/contacts/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),

  delete: (id: string) =>
    request<void>(`/api/admin/contacts/${id}`, { method: "DELETE" }),

  stats: () =>
    request<{
      total: number;
      new: number;
      read: number;
      replied: number;
    }>("/api/admin/contacts/stats/overview"),
};

// ─── Public Contact Form ───────────────────────────────────────

export const publicContactApi = {
  submit: (data: {
    name: string;
    company?: string;
    country?: string;
    email: string;
    interest?: string;
    message: string;
  }) =>
    request<{ success: boolean; message: string; id: string }>("/api/contact", {
      method: "POST",
      body: JSON.stringify(data),
    }),
};

// ─── Public Content API ────────────────────────────────────────

export const publicContentApi = {
  get: () => request<{ content: Record<string, Record<string, string>> }>("/api/content"),
};

// ─── Types ─────────────────────────────────────────────────────

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

export interface Commodity {
  id: string;
  name: string;
  organicCertified: boolean;
  sourceOfCoffee: string;
  coffeeGrade: string;
  coffeeType: string;
  coffeeStatus: string;
  processingType: string;
  packagingContent: string;
  packageUnit: string;
  weightUnitCode: string;
  pricePerUnit: number | null;
  stockQuantity: number;
  availableQty: number;
  quantitySold: number;
  minOrderQty: number | null;
  description: string | null;
  createdAt: string;
  updatedAt: string;
}

export type CreateCommodityInput = Omit<Commodity, "id" | "createdAt" | "updatedAt">;

export interface ContactSubmission {
  id: string;
  name: string;
  company: string | null;
  country: string | null;
  email: string;
  coffeeInterest: string | null;
  message: string;
  status: string;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}
