import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { NpcService } from '../npc.service';

@Component({
  selector: 'app-npc-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './npc-list.component.html',
  styleUrls: ['./npc-list.component.css']
})
export class NpcListComponent implements OnInit {
  npcs: any[] = [];
  campaignId: string | null = null;

  constructor(
    private npcService: NpcService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  async ngOnInit() {
    this.campaignId = this.route.parent?.snapshot.paramMap.get('id') || null;
    if (this.campaignId) {
      await this.loadNpcs();
    }
  }

  async loadNpcs() {
    if (!this.campaignId) return;
    const { data } = await this.npcService.getNpcs(this.campaignId);
    if (data) {
      this.npcs = data;
    }
  }

  async createNewNpc() {
    if (!this.campaignId) return;
    const name = prompt('Nome do NPC:');
    if (!name) return;
    const role = prompt('Papel (ex: Mercador, Vilão):') || '';
    await this.npcService.createNpc(this.campaignId, name, role);
    await this.loadNpcs();
  }

  openNpc(npcId: string) {
    this.router.navigate(['../npc', npcId], { relativeTo: this.route });
  }
}