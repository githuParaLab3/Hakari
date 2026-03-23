import { Injectable } from '@angular/core';
import { SupabaseService } from '../../core/supabase.service';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {
  constructor(private supabaseService: SupabaseService) {}

  async getCampaigns() {
    return this.supabaseService.client
      .from('campaigns')
      .select('*')
      .order('created_at', { ascending: false });
  }

  async createCampaign(name: string, description: string, userId: string) {
    return this.supabaseService.client
      .from('campaigns')
      .insert([{ name, description, user_id: userId }])
      .select();
  }
}