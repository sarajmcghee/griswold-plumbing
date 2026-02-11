const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      ...(options.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
      ...(options.headers || {})
    }
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Request failed with status ${response.status}`);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

export function fetchAvailability({ date, serviceType }) {
  const query = new URLSearchParams({ date, serviceType }).toString();
  return request(`/availability?${query}`);
}

export function createBooking(payload) {
  return request('/bookings', {
    method: 'POST',
    body: JSON.stringify(payload)
  });
}

export function createQuote(formData) {
  return request('/quotes', {
    method: 'POST',
    body: formData
  });
}

export function createContact(payload) {
  return request('/contact', {
    method: 'POST',
    body: JSON.stringify(payload)
  });
}
