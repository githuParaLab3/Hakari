import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../core/auth.service';
import { ThemeService } from '../../../core/theme.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loading = false;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    public themeService: ThemeService
  ) {}

  async login() {
    try {
      this.loading = true;
      this.errorMessage = '';
      await this.authService.signInWithGoogle();
    } catch (error: any) {
      this.errorMessage = error.message || 'Authentication failed.';
    } finally {
      this.loading = false;
    }
  }
}