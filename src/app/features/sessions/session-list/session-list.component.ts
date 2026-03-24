import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SessionService } from '../session.service';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { RealtimeSyncService } from '../../../core/realtime-sync.service';

@Component({
  selector: 'app-session-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalComponent],
  templateUrl: './session-list.component.html',
  styleUrls: ['./session-list.component.css']
})
export class SessionListComponent implements OnInit, OnDestroy {
  sessions: any[] = [];
  filteredSessions: any[] = [];
  campaignId: string | null = null;
  searchTerm: string = '';
  isModalOpen = false;
  formData = { number: 1, title: '', summary: '' };
  private syncSub!: Subscription;

  constructor(
    private sessionService: SessionService,
    private route: ActivatedRoute,
    private router: Router,
    private realtimeSync: RealtimeSyncService
  ) {}

  async ngOnInit() {
    this.campaignId = this.route.parent?.snapshot.paramMap.get('id') || null;
    if (this.campaignId) {
      await this.loadSessions();
    }
    this.syncSub = this.realtimeSync.sync$.subscribe(async (event) => {
      if (event.table === 'sessions') {
        await this.loadSessions();
      }
    });
  }

  ngOnDestroy() {
    if (this.syncSub) {
      this.syncSub.unsubscribe();
    }
  }

  async loadSessions() {
    if (!this.campaignId) return;
    const { data } = await this.sessionService.getSessions(this.campaignId);
    if (data) {
      this.sessions = data;
      this.filteredSessions = data;
      this.formData.number = this.sessions.length > 0 ? this.sessions[this.sessions.length - 1].number + 1 : 1;
    }
  }

  filterData() {
    const term = this.searchTerm.toLowerCase().trim();
    if (!term) {
      this.filteredSessions = this.sessions;
      return;
    }
    this.filteredSessions = this.sessions.filter(session =>
      session.title.toLowerCase().includes(term) ||
      (session.summary && session.summary.toLowerCase().includes(term))
    );
  }

  openModal() {
    this.formData.title = '';
    this.formData.summary = '';
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  async confirmModal() {
    if (!this.campaignId || !this.formData.title.trim()) return;
    await this.sessionService.createSession(
      this.campaignId,
      this.formData.number,
      this.formData.title,
      this.formData.summary
    );
    this.closeModal();
    await this.loadSessions();
  }

  openSession(sessionId: string) {
    this.router.navigate(['../session', sessionId], { relativeTo: this.route });
  }
}