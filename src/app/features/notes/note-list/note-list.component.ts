import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { NoteService } from '../note.service';

@Component({
  selector: 'app-note-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css']
})
export class NoteListComponent implements OnInit {
  notes: any[] = [];
  campaignId: string | null = null;

  constructor(
    private noteService: NoteService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  async ngOnInit() {
    this.campaignId = this.route.parent?.snapshot.paramMap.get('id') || null;
    if (this.campaignId) {
      await this.loadNotes();
    }
  }

  async loadNotes() {
    if (!this.campaignId) return;
    const { data } = await this.noteService.getNotes(this.campaignId);
    if (data) {
      this.notes = data;
    }
  }

  async createNewNote() {
    if (!this.campaignId) return;
    const title = prompt('Título da Nota:');
    if (!title) return;
    
    const type = prompt('Tipo (lore, event, consequence, idea):') || 'lore';
    await this.noteService.createNote(this.campaignId, title, type);
    await this.loadNotes();
  }

  openNote(noteId: string) {
    this.router.navigate(['../note', noteId], { relativeTo: this.route });
  }
}