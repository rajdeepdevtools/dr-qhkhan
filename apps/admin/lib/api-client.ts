const getApiBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }
  if (typeof window !== 'undefined' && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
    return 'https://dr-qhkhan.onrender.com/api';
  }
  return 'http://localhost:5000/api';
};

const API_BASE_URL = getApiBaseUrl();

async function refreshAccessToken(): Promise<string | null> {
  try {
    const refreshToken = typeof window !== 'undefined' ? localStorage.getItem('adminRefreshToken') : null;
    const res = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ refreshToken }),
    });
    const data = await res.json();
    if (data.success && data.data?.token) {
      if (typeof window !== 'undefined') {
        localStorage.setItem('adminToken', data.data.token);
        if (data.data.refreshToken) {
          localStorage.setItem('adminRefreshToken', data.data.refreshToken);
        }
      }
      return data.data.token;
    }
  } catch (err) {
    console.error('Failed to auto-refresh access token:', err);
  }

  if (typeof window !== 'undefined') {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminRefreshToken');
  }
  return null;
}

export async function adminApiClient<T = any>(
  endpoint: string,
  options: RequestInit = {},
  isRetry = false
): Promise<{ success: boolean; message?: string; data?: T; errors?: any[]; code?: string }> {
  const url = `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

  const defaultHeaders: Record<string, string> = {};

  if (!(options.body instanceof FormData)) {
    defaultHeaders['Content-Type'] = 'application/json';
  }

  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('adminToken');
    if (token) {
      defaultHeaders['Authorization'] = `Bearer ${token}`;
    }
  }

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

    const isUnauthorized =
      res.status === 401 ||
      data.code === 'UNAUTHORIZED' ||
      data.code === 'INVALID_TOKEN' ||
      data.message?.toLowerCase().includes('token') ||
      data.message?.toLowerCase().includes('authenticated');

    if (isUnauthorized && !isRetry && endpoint !== '/auth/login' && endpoint !== '/auth/refresh') {
      const newToken = await refreshAccessToken();
      if (newToken) {
        return adminApiClient<T>(endpoint, options, true);
      } else {
        if (typeof window !== 'undefined' && !window.location.pathname.startsWith('/login')) {
          localStorage.removeItem('adminToken');
          localStorage.removeItem('adminRefreshToken');
          window.location.href = '/login';
        }
      }
    }

    return data;
  } catch (error: any) {
    console.error(`Admin API Error [${endpoint}]:`, error);
    return {
      success: false,
      message: error.message || 'Network error. Please check server status.',
    };
  }
}


