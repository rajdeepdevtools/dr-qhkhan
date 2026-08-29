const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export async function adminApiClient<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<{ success: boolean; message?: string; data?: T; errors?: any[] }> {
  const url = `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

  const defaultHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  const config: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
    credentials: 'include',
  };

  try {
    const res = await fetch(url, config);
    const data = await res.json();
    return data;
  } catch (error: any) {
    console.error(`Admin API Error [${endpoint}]:`, error);
    return {
      success: false,
      message: error.message || 'Network error. Please check server status.',
    };
  }
}
