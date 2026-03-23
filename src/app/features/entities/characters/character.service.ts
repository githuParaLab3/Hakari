import { Injectable } from '@angular/core';
import { SupabaseService } from '../../../core/supabase.service';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  constructor(private supabaseService: SupabaseService) {}

  async getCharacters(campaignId: string) {
    return this.supabaseService.client
      .from('characters')
      .select('*')
      .eq('campaign_id', campaignId)
      .order('name', { ascending: true });
  }

  async getCharacter(id: string) {
    return this.supabaseService.client
      .from('characters')
      .select('*')
      .eq('id', id)
      .single();
  }

  async createCharacter(campaignId: string, name: string, charClass: string) {
    return this.supabaseService.client
      .from('characters')
      .insert([{ campaign_id: campaignId, name, class: charClass }])
      .select();
  }
}