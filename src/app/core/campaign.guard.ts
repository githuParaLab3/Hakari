import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SupabaseService } from './supabase.service';

export const campaignGuard: CanActivateFn = async (route, state) => {
  const supabase = inject(SupabaseService);
  const router = inject(Router);

  const campaignId = route.paramMap.get('id');
  if (!campaignId) {
    return router.parseUrl('/dashboard');
  }

  const { data: { session } } = await supabase.client.auth.getSession();
  if (!session) {
    return router.parseUrl('/login');
  }

  const { data, error } = await supabase.client
    .from('campaigns')
    .select('id')
    .eq('id', campaignId)
    .single();

  if (error || !data) {
    return router.parseUrl('/dashboard');
  }

  return true;
};