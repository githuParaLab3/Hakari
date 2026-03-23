import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NoteService } from '../note.service';
import { RelationPanelComponent } from '../../../shared/components/relation-panel/relation-panel.component';

@Component({
  selector: 'app-note-view',
  standalone: true,
  imports: [CommonModule, FormsModule, RelationPanelComponent],
  templateUrl: './note-view.component.html',
  styleUrls: ['./note-view.component.css']
})
export class NoteViewComponent implements OnInit {
  note: any = null;

  constructor(
    private route: ActivatedRoute,
    private noteService: NoteService
  ) {}

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('noteId');
    if (id) {
      const { data } = await this.noteService.getNote(id);
      this.note = data;
    }
  }
}