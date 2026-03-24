import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';

export interface SearchResult {
  id: string;
  type: 'npc' | 'location' | 'item' | 'note' | 'encounter' | 'map' | 'monster' | 'resource';
  title: string;
  subtitle?: string;
  data: any;
}

@Injectable({
  providedIn: 'root'
})
export class GlobalSearchService {
  constructor(private supabase: SupabaseService) {}

  async searchAll(campaignId: string, term: string): Promise<SearchResult[]> {
    if (!term || term.trim().length < 2) return [];
    
    const formattedTerm = `%${term}%`;
    const results: SearchResult[] = [];

    const { data: npcs } = await this.supabase.client
      .from('npcs')
      .select('*')
      .eq('campaign_id', campaignId)
      .ilike('name', formattedTerm);
    
    if (npcs) {
      results.push(...npcs.map(n => ({ id: n.id, type: 'npc' as const, title: n.name, subtitle: n.role, data: n })));
    }

    const { data: locations } = await this.supabase.client
      .from('locations')
      .select('*')
      .eq('campaign_id', campaignId)
      .ilike('name', formattedTerm);
    
    if (locations) {
      results.push(...locations.map(l => ({ id: l.id, type: 'location' as const, title: l.name, subtitle: l.type, data: l })));
    }

    const { data: notes } = await this.supabase.client
      .from('notes')
      .select('*')
      .eq('campaign_id', campaignId)
      .ilike('title', formattedTerm);
    
    if (notes) {
      results.push(...notes.map(n => ({ id: n.id, type: 'note' as const, title: n.title, subtitle: n.type, data: n })));
    }

    const { data: items } = await this.supabase.client
      .from('items')
      .select('*')
      .eq('campaign_id', campaignId)
      .ilike('name', formattedTerm);
    
    if (items) {
      results.push(...items.map(i => ({ id: i.id, type: 'item' as const, title: i.name, subtitle: `${i.value} GP`, data: i })));
    }

    return results;
  }
}