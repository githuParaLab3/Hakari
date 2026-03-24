import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { NoteService } from '../note.service';
import { ContextService } from '../../../core/context.service';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { RealtimeSyncService } from '../../../core/realtime-sync.service';

@Component({
  selector: 'app-note-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalComponent],
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css']
})
export class NoteListComponent implements OnInit, OnDestroy {
  notes: any[] = [];
  filteredNotes: any[] = [];
  campaignId: string | null = null;
  searchTerm: string = '';

  isModalOpen = false;
  formData = { title: '', type: 'lore' };

  private syncSub!: Subscription;

  constructor(
    private noteService: NoteService,
    private route: ActivatedRoute,
    private router: Router,
    private contextService: ContextService,
    private realtimeSync: RealtimeSyncService
  ) {}

  async ngOnInit() {
    this.campaignId = this.route.parent?.snapshot.paramMap.get('id') || null;
    if (this.campaignId) {
      await this.loadNotes();
    }

    this.syncSub = this.realtimeSync.sync$.subscribe(async (event) => {
      if (event.table === 'notes') {
        await this.loadNotes();
      }
    });
  }

  ngOnDestroy() {
    if (this.syncSub) {
      this.syncSub.unsubscribe();
    }
  }

  async loadNotes() {
    if (!this.campaignId) return;
    const { data } = await this.noteService.getNotes(this.campaignId);
    if (data) {
      this.notes = data;
      this.filteredNotes = data;
    }
  }

  filterData() {
    const term = this.searchTerm.toLowerCase().trim();
    if (!term) {
      this.filteredNotes = this.notes;
      return;
    }
    this.filteredNotes = this.notes.filter(note =>
      note.title.toLowerCase().includes(term) ||
      (note.type && note.type.toLowerCase().includes(term))
    );
  }

  openModal() {
    this.formData = { title: '', type: 'lore' };
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  async confirmModal() {
    if (!this.campaignId || !this.formData.title.trim()) return;
    await this.noteService.createNote(this.campaignId, this.formData.title, this.formData.type);
    this.closeModal();
    await this.loadNotes();
  }

  openNote(noteId: string) {
    this.router.navigate(['../note', noteId], { relativeTo: this.route });
  }

  openInContext(event: Event, note: any) {
    event.stopPropagation();
    this.contextService.setContext({ type: 'note', data: note });
  }
}