import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private supabaseService: SupabaseService) {}

  async signInWithGoogle() {
    return this.supabaseService.client.auth.signInWithOAuth({
      provider: 'google'
    });
  }

  async signOut() {
    return this.supabaseService.client.auth.signOut();
  }

  get user() {
    return this.supabaseService.client.auth.getUser();
  }

  get session() {
    return this.supabaseService.client.auth.getSession();
  }

  authChanges() {
    return this.supabaseService.client.auth.onAuthStateChange;
  }
}