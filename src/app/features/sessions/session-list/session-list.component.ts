import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SessionService } from '../session.service';
import { ModalComponent } from '../../../shared/components/modal/modal.component';

@Component({
  selector: 'app-session-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalComponent],
  templateUrl: './session-list.component.html',
  styleUrls: ['./session-list.component.css']
})
export class SessionListComponent implements OnInit {
  sessions: any[] = [];
  campaignId: string | null = null;

  isModalOpen = false;
  formData = { title: '', summary: '' };

  constructor(
    private sessionService: SessionService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  async ngOnInit() {
    this.campaignId = this.route.parent?.snapshot.paramMap.get('id') || null;
    if (this.campaignId) await this.loadSessions();
  }

  async loadSessions() {
    if (!this.campaignId) return;
    const { data } = await this.sessionService.getSessions(this.campaignId);
    if (data) this.sessions = data;
  }

  openModal() {
    this.formData = { title: '', summary: '' };
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  async confirmModal() {
    if (!this.campaignId || !this.formData.title.trim()) return;
    const number = this.sessions.length + 1;
    await this.sessionService.createSession(this.campaignId, number, this.formData.title, this.formData.summary);
    this.closeModal();
    await this.loadSessions();
  }

  openSession(sessionId: string) {
    this.router.navigate(['../session', sessionId], { relativeTo: this.route });
  }
}