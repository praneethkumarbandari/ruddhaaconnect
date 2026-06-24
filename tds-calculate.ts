import { corsHeaders, jsonResponse, errorResponse, handleCORS } from './lib/utils';

export default async (request: Request) => {
  const corsResponse = handleCORS(request);
  if (corsResponse) return corsResponse;

  if (request.method !== 'POST') {
    return errorResponse('Method not allowed', 405);
  }

  try {
    const body = await request.json();
    const { amount, section } = body;

    if (!amount || !section) {
      return errorResponse('Amount and section required', 400);
    }

    const rates: { [key: string]: number } = {
      '194A': 5,
      '194C': 1,
      '194D': 10,
      '194E': 10,
      '194F': 2,
      '194G': 6,
      '194H': 5,
      '194I': 5,
      '194J': 10,
      '194LA': 2
    };

    const rate = rates[section] || 10;
    const tdsAmount = (amount * rate) / 100;

    return jsonResponse({
      amount,
      section,
      rate,
      tdsAmount: parseFloat(tdsAmount.toFixed(2))
    });
  } catch (err) {
    return errorResponse(String(err), 500);
  }
};
