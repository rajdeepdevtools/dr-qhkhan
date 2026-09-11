export function getApiBaseUrl(): string {
  // 1. Explicit NEXT_PUBLIC_API_URL environment variable (Highest Priority)
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL.replace(/\/+$/, '');
  }

  // 2. Client-side browser execution (CSR)
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    if (hostname !== 'localhost' && hostname !== '127.0.0.1') {
      // Fallback for deployed frontend without env var
      return 'https://dr-qhkhan.onrender.com/api';
    }
  } else {
    // 3. Server-side environment check (Vercel Serverless / SSR / Edge)
    if (process.env.VERCEL || process.env.VERCEL_URL || process.env.NODE_ENV === 'production') {
      return 'https://dr-qhkhan.onrender.com/api';
    }
  }

  return 'http://localhost:5000/api';
}

export async function apiClient<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<{ success: boolean; message?: string; data?: T; errors?: any[] }> {
  const baseUrl = getApiBaseUrl();
  const url = `${baseUrl}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

  const defaultHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  const config: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
    credentials: 'include', // Include httpOnly auth cookies
  };

  try {
    const res = await fetch(url, config);
    const data = await res.json();
    return data;
  } catch (error: any) {
    console.error(`API Client Error [${endpoint}]:`, error);
    return {
      success: false,
      message: error.message || 'Network error. Please check your connection.',
    };
  }
}
