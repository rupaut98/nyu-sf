import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');

  if (code) {
    const supabase = createRouteHandlerClient({ cookies });
    await supabase.auth.exchangeCodeForSession(code);

    // Get user type from the database or session
    const { data: { user } } = await supabase.auth.getUser();
    const { data: profile } = await supabase.from('profiles').select('type').eq('id', user?.id).single();

    // Redirect based on user type
    if (profile?.type === 'recruiter') {
      return NextResponse.redirect(new URL('/recruiter/feed', requestUrl.origin));
    } else {
      return NextResponse.redirect(new URL('/jobseeker/feed', requestUrl.origin));
    }
  }

  return NextResponse.redirect(new URL('/auth/login', requestUrl.origin));
} 