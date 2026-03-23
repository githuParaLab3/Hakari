import { Injectable } from '@angular/core';
import { SupabaseService } from '../../../core/supabase.service';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  constructor(private supabaseService: SupabaseService) {}

  async getItems(campaignId: string) {
    return this.supabaseService.client
      .from('items')
      .select('*')
      .eq('campaign_id', campaignId)
      .order('name', { ascending: true });
  }

  async getItem(id: string) {
    return this.supabaseService.client
      .from('items')
      .select('*')
      .eq('id', id)
      .single();
  }

  async createItem(campaignId: string, name: string, value: number) {
    return this.supabaseService.client
      .from('items')
      .insert([{ campaign_id: campaignId, name, value }])
      .select();
  }
}