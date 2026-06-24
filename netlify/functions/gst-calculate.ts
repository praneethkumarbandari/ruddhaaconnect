import { corsHeaders, jsonResponse, errorResponse, handleCORS } from './lib/utils';

export default async (request: Request) => {
  const corsResponse = handleCORS(request);
  if (corsResponse) return corsResponse;

  if (request.method !== 'POST') {
    return errorResponse('Method not allowed', 405);
  }

  try {
    const body = await request.json();
    const { amount, gstRate } = body;

    if (!amount || !gstRate) {
      return errorResponse('Amount and GST rate required', 400);
    }

    const gstAmount = (amount * gstRate) / 100;
    const total = amount + gstAmount;

    return jsonResponse({
      amount,
      gstRate,
      gstAmount: parseFloat(gstAmount.toFixed(2)),
      total: parseFloat(total.toFixed(2))
    });
  } catch (err) {
    return errorResponse(String(err), 500);
  }
};
