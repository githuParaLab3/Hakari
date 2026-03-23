import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private theme: 'dark' | 'light' = 'dark';

  constructor() {
    const saved = localStorage.getItem('theme') as 'dark' | 'light';
    if (saved) this.setTheme(saved);
    else this.setTheme('dark');
  }

  setTheme(t: 'dark' | 'light') {
    this.theme = t;
    document.documentElement.setAttribute('data-theme', t);
    localStorage.setItem('theme', t);
  }

  toggle() {
    this.setTheme(this.theme === 'dark' ? 'light' : 'dark');
  }

  get current() { return this.theme; }
}