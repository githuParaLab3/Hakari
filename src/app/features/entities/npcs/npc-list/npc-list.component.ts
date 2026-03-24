import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NpcService } from '../npc.service';
import { ContextService } from '../../../../core/context.service';
import { ModalComponent } from '../../../../shared/components/modal/modal.component';

@Component({
  selector: 'app-npc-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalComponent],
  templateUrl: './npc-list.component.html',
  styleUrls: ['./npc-list.component.css']
})
export class NpcListComponent implements OnInit {
  npcs: any[] = [];
  campaignId: string | null = null;

  isModalOpen = false;
  formData = { name: '', role: '' };

  constructor(
    private npcService: NpcService,
    private route: ActivatedRoute,
    private router: Router,
    private contextService: ContextService
  ) {}

  async ngOnInit() {
    this.campaignId = this.route.parent?.snapshot.paramMap.get('id') || null;
    if (this.campaignId) await this.loadNpcs();
  }

  async loadNpcs() {
    if (!this.campaignId) return;
    const { data } = await this.npcService.getNpcs(this.campaignId);
    if (data) this.npcs = data;
  }

  openModal() {
    this.formData = { name: '', role: '' };
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  async confirmModal() {
    if (!this.campaignId || !this.formData.name.trim()) return;
    await this.npcService.createNpc(this.campaignId, this.formData.name, this.formData.role);
    this.closeModal();
    await this.loadNpcs();
  }

  openNpc(npcId: string) {
    this.router.navigate(['../npc', npcId], { relativeTo: this.route });
  }

  openInContext(event: Event, npc: any) {
    event.stopPropagation();
    this.contextService.setContext({ type: 'npc', data: npc });
  }
}