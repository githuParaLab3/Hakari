import { Injectable } from '@angular/core';
import { SupabaseService } from '../../../core/supabase.service';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  constructor(private supabaseService: SupabaseService) {}

  async getLocations(campaignId: string) {
    return this.supabaseService.client
      .from('locations')
      .select('*')
      .eq('campaign_id', campaignId)
      .order('name', { ascending: true });
  }

  async getLocation(id: string) {
    return this.supabaseService.client
      .from('locations')
      .select('*')
      .eq('id', id)
      .single();
  }

  async createLocation(campaignId: string, name: string, type: string) {
    return this.supabaseService.client
      .from('locations')
      .insert([{ campaign_id: campaignId, name, type }])
      .select();
  }
}