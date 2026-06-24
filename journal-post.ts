import { supabase } from './lib/supabase';
import { corsHeaders, jsonResponse, errorResponse, handleCORS } from './lib/utils';

export default async (request: Request) => {
  const corsResponse = handleCORS(request);
  if (corsResponse) return corsResponse;

  if (request.method !== 'POST') {
    return errorResponse('Method not allowed', 405);
  }

  try {
    const body = await request.json();
    const { entries, description } = body;

    if (!entries || entries.length === 0) {
      return errorResponse('No journal entries provided', 400);
    }

    let totalDebit = 0;
    let totalCredit = 0;

    for (const entry of entries) {
      if (entry.debit) totalDebit += entry.debit;
      if (entry.credit) totalCredit += entry.credit;
    }

    if (Math.abs(totalDebit - totalCredit) > 0.01) {
      return errorResponse('Journal entries do not balance', 400);
    }

    const { data, error } = await supabase
      .from('journal_entries')
      .insert([{
        description,
        total_amount: totalDebit,
        posted_at: new Date(),
        status: 'posted'
      }])
      .select();

    if (error) {
      return errorResponse(error.message, 500);
    }

    return jsonResponse({
      message: 'Journal entries posted successfully',
      data,
      totalDebit,
      totalCredit
    });
  } catch (err) {
    return errorResponse(String(err), 500);
  }
};
