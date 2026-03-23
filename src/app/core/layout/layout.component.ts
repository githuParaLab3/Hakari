import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
  constructor(
    private authService: AuthService,
    public themeService: ThemeService,
    private router: Router
  ) {}

  async logout() {
    await this.authService.signOut();
    this.router.navigate(['/']);
  }
}