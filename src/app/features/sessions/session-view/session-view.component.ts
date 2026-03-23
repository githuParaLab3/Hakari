import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SessionService } from '../session.service';
import { RelationPanelComponent } from '../../../shared/components/relation-panel/relation-panel.component';

@Component({
  selector: 'app-session-view',
  standalone: true,
  imports: [CommonModule, FormsModule, RelationPanelComponent],
  templateUrl: './session-view.component.html',
  styleUrls: ['./session-view.component.css']
})
export class SessionViewComponent implements OnInit {
  session: any = null;

  constructor(
    private route: ActivatedRoute,
    private sessionService: SessionService
  ) {}

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('sessionId');
    if (id) {
      const { data } = await this.sessionService.getSession(id);
      this.session = data;
    }
  }
}