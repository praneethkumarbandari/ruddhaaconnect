import { corsHeaders, jsonResponse, handleCORS } from './lib/utils';

export default async (request: Request) => {
  const corsResponse = handleCORS(request);
  if (corsResponse) return corsResponse;

  return jsonResponse({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.CONTEXT || 'unknown'
  });
};
