import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { NpcService } from '../npc.service';
import { ContextService } from '../../../../core/context.service';
import { ModalComponent } from '../../../../shared/components/modal/modal.component';
import { RealtimeSyncService } from '../../../../core/realtime-sync.service';

@Component({
  selector: 'app-npc-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalComponent],
  templateUrl: './npc-list.component.html',
  styleUrls: ['./npc-list.component.css']
})
export class NpcListComponent implements OnInit, OnDestroy {
  npcs: any[] = [];
  filteredNpcs: any[] = [];
  campaignId: string | null = null;
  searchTerm: string = '';
  isModalOpen = false;
  formData = { name: '', role: '' };
  private syncSub!: Subscription;

  constructor(
    private npcService: NpcService,
    private route: ActivatedRoute,
    private router: Router,
    private contextService: ContextService,
    private realtimeSync: RealtimeSyncService
  ) {}

  async ngOnInit() {
    this.campaignId = this.route.parent?.snapshot.paramMap.get('id') || null;
    if (this.campaignId) {
      await this.loadNpcs();
    }
    this.syncSub = this.realtimeSync.sync$.subscribe(async (event) => {
      if (event.table === 'npcs') {
        await this.loadNpcs();
      }
    });
  }

  ngOnDestroy() {
    if (this.syncSub) {
      this.syncSub.unsubscribe();
    }
  }

  async loadNpcs() {
    if (!this.campaignId) return;
    const { data } = await this.npcService.getNpcs(this.campaignId);
    if (data) {
      this.npcs = data;
      this.filteredNpcs = data;
    }
  }

  filterData() {
    const term = this.searchTerm.toLowerCase().trim();
    if (!term) {
      this.filteredNpcs = this.npcs;
      return;
    }
    this.filteredNpcs = this.npcs.filter(npc =>
      npc.name.toLowerCase().includes(term) ||
      (npc.role && npc.role.toLowerCase().includes(term))
    );
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