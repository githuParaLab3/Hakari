import { Injectable } from '@angular/core';
import { SupabaseService } from '../../../core/supabase.service';

@Injectable({
  providedIn: 'root'
})
export class NpcService {
  constructor(private supabaseService: SupabaseService) {}

  async getNpcs(campaignId: string) {
    return this.supabaseService.client
      .from('npcs')
      .select('*')
      .eq('campaign_id', campaignId)
      .order('name', { ascending: true });
  }

  async getNpc(id: string) {
    return this.supabaseService.client
      .from('npcs')
      .select('*')
      .eq('id', id)
      .single();
  }

  async createNpc(campaignId: string, name: string, role: string) {
    return this.supabaseService.client
      .from('npcs')
      .insert([{ campaign_id: campaignId, name, role }])
      .select();
  }
}