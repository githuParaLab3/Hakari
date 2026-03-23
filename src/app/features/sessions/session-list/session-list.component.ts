import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from '../session.service';

@Component({
  selector: 'app-session-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './session-list.component.html',
  styleUrls: ['./session-list.component.css']
})
export class SessionListComponent implements OnInit {
  sessions: any[] = [];
  campaignId: string | null = null;

  constructor(
    private sessionService: SessionService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  async ngOnInit() {
    this.campaignId = this.route.parent?.snapshot.paramMap.get('id') || null;
    if (this.campaignId) {
      await this.loadSessions();
    }
  }

  async loadSessions() {
    if (!this.campaignId) return;
    const { data } = await this.sessionService.getSessions(this.campaignId);
    if (data) {
      this.sessions = data;
    }
  }

  async createNewSession() {
    if (!this.campaignId) return;
    const number = this.sessions.length + 1;
    const title = prompt('Título da Sessão:');
    if (!title) return;
    
    const summary = prompt('Resumo curto:');
    await this.sessionService.createSession(this.campaignId, number, title, summary || '');
    await this.loadSessions();
  }

  openSession(sessionId: string) {
    this.router.navigate(['../session', sessionId], { relativeTo: this.route });
  }
}