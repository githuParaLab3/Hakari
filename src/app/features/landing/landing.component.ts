import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ThemeService } from '../../core/theme.service';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  isLoggedIn = false;

  constructor(
    public themeService: ThemeService,
    private authService: AuthService
  ) {}

  async ngOnInit() {
    const { data } = await this.authService.session;
    this.isLoggedIn = !!data?.session;
  }
}