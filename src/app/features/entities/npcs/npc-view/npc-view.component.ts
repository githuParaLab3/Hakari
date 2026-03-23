import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NpcService } from '../npc.service';
import { RelationPanelComponent } from '../../../../shared/components/relation-panel/relation-panel.component';

@Component({
  selector: 'app-npc-view',
  standalone: true,
  imports: [CommonModule, FormsModule, RelationPanelComponent],
  templateUrl: './npc-view.component.html',
  styleUrls: ['./npc-view.component.css']
})
export class NpcViewComponent implements OnInit {
  npc: any = null;

  constructor(
    private route: ActivatedRoute,
    private npcService: NpcService
  ) {}

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('npcId');
    if (id) {
      const { data } = await this.npcService.getNpc(id);
      this.npc = data;
    }
  }
}