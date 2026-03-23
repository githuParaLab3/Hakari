import { Injectable } from '@angular/core';
import { SupabaseService } from '../../../core/supabase.service';

@Injectable({
  providedIn: 'root'
})
export class MonsterService {
  constructor(private supabaseService: SupabaseService) {}

  async getMonsters() {
    return this.supabaseService.client
      .from('monsters')
      .select('*')
      .order('name', { ascending: true });
  }

  async getMonster(id: string) {
    return this.supabaseService.client
      .from('monsters')
      .select('*')
      .eq('id', id)
      .single();
  }

  async createMonster(name: string) {
    return this.supabaseService.client
      .from('monsters')
      .insert([{ name }])
      .select();
  }
}