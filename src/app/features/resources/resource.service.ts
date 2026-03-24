import { Injectable } from '@angular/core';
import { SupabaseService } from '../../core/supabase.service';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {
  constructor(private supabaseService: SupabaseService) {}

  async getResources(campaignId: string) {
    return this.supabaseService.client
      .from('resources')
      .select('*')
      .eq('campaign_id', campaignId)
      .order('title', { ascending: true });
  }

  async getResourceById(id: string) {
    return this.supabaseService.client
      .from('resources')
      .select('*')
      .eq('id', id)
      .single();
  }

  async createResource(campaignId: string, title: string, type: string) {
    return this.supabaseService.client
      .from('resources')
      .insert([{ campaign_id: campaignId, title, type }])
      .select();
  }

  async updateResource(id: string, updates: any) {
    return this.supabaseService.client
      .from('resources')
      .update(updates)
      .eq('id', id)
      .select();
  }

  async deleteResource(id: string) {
    return this.supabaseService.client
      .from('resources')
      .delete()
      .eq('id', id);
  }
}