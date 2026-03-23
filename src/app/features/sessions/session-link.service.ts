import { Injectable } from '@angular/core';
import { SupabaseService } from '../../core/supabase.service';

@Injectable({
  providedIn: 'root'
})
export class SessionLinkService {
  constructor(private supabaseService: SupabaseService) {}

  async getLinksForSession(sessionId: string) {
    return this.supabaseService.client
      .from('session_links')
      .select('*')
      .eq('session_id', sessionId);
  }

  async createLink(sessionId: string, entityType: string, entityId: string) {
    return this.supabaseService.client
      .from('session_links')
      .insert([{ session_id: sessionId, entity_type: entityType, entity_id: entityId }])
      .select();
  }

  async removeLink(linkId: string) {
    return this.supabaseService.client
      .from('session_links')
      .delete()
      .eq('id', linkId);
  }
}