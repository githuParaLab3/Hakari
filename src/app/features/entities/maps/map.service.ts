import { Injectable } from '@angular/core';
import { SupabaseService } from '../../../core/supabase.service';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  constructor(private supabaseService: SupabaseService) {}

  async getMaps(campaignId: string) {
    return this.supabaseService.client
      .from('maps')
      .select('*')
      .eq('campaign_id', campaignId)
      .order('name', { ascending: true });
  }

  async getMap(id: string) {
    return this.supabaseService.client
      .from('maps')
      .select('*')
      .eq('id', id)
      .single();
  }

  async createMap(campaignId: string, name: string, type: string) {
    return this.supabaseService.client
      .from('maps')
      .insert([{ campaign_id: campaignId, name, type }])
      .select();
  }
}