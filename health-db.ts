import { supabase } from './lib/supabase';
import { corsHeaders, jsonResponse, errorResponse, handleCORS } from './lib/utils';

export default async (request: Request) => {
  const corsResponse = handleCORS(request);
  if (corsResponse) return corsResponse;

  try {
    const { data, error } = await supabase
      .from('portal_config')
      .select('*')
      .limit(1);

    if (error) {
      return errorResponse(`Database error: ${error.message}`, 500);
    }

    return jsonResponse({
      status: 'ok',
      message: 'Database connected',
      records: data?.length || 0
    });
  } catch (err) {
    return errorResponse(String(err), 500);
  }
};
