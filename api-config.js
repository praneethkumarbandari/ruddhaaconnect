// API Configuration for Frontend
const API_BASE_URL = process.env.VITE_API_URL || 'http://localhost:3001';

// API endpoints
const API = {
  // Health checks
  HEALTH: `${API_BASE_URL}/health`,
  DB_HEALTH: `${API_BASE_URL}/api/health/db`,
  
  // Journal Entry / Posting Engine
  JOURNAL: {
    POST: `${API_BASE_URL}/api/journal/post`,
    ENTRIES: `${API_BASE_URL}/api/journal/entries`,
    GL: `${API_BASE_URL}/api/journal/general-ledger`,
    TB: `${API_BASE_URL}/api/journal/trial-balance`
  },
  
  // GST
  GST: {
    CALCULATE: `${API_BASE_URL}/api/gst/calculate`,
    CONFIG: `${API_BASE_URL}/api/gst/config`,
    RATES: `${API_BASE_URL}/api/gst/rates`,
    FILING: `${API_BASE_URL}/api/gst/filing`
  },
  
  // TDS
  TDS: {
    CALCULATE: `${API_BASE_URL}/api/tds/calculate`,
    CONFIG: `${API_BASE_URL}/api/tds/config`,
    SECTIONS: `${API_BASE_URL}/api/tds/sections`,
    FILING: `${API_BASE_URL}/api/tds/filing`
  }
};

// Helper function to call API
async function apiCall(endpoint, options = {}) {
  try {
    const response = await fetch(endpoint, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API Call Error:', error);
    throw error;
  }
}
