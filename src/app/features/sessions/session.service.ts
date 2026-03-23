import { Injectable } from '@angular/core';
import { SupabaseService } from '../../core/supabase.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  constructor(private supabaseService: SupabaseService) {}

  async getSessions(campaignId: string) {
    return this.supabaseService.client
      .from('sessions')
      .select('*')
      .eq('campaign_id', campaignId)
      .order('number', { ascending: true });
  }

  async getSession(id: string) {
    return this.supabaseService.client
      .from('sessions')
      .select('*')
      .eq('id', id)
      .single();
  }

  async createSession(campaignId: string, number: number, title: string, summary: string) {
    return this.supabaseService.client
      .from('sessions')
      .insert([{ campaign_id: campaignId, number, title, summary }])
      .select();
  }
}