import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { EncounterService } from '../encounter.service';
import { ContextService } from '../../../../core/context.service';
import { ModalComponent } from '../../../../shared/components/modal/modal.component';
import { RealtimeSyncService } from '../../../../core/realtime-sync.service';

@Component({
  selector: 'app-encounter-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalComponent],
  templateUrl: './encounter-list.component.html',
  styleUrls: ['./encounter-list.component.css']
})
export class EncounterListComponent implements OnInit, OnDestroy {
  encounters: any[] = [];
  filteredEncounters: any[] = [];
  campaignId: string | null = null;
  searchTerm: string = '';
  isModalOpen = false;
  formData = { name: '', difficulty: 'Medium' };
  private syncSub!: Subscription;

  constructor(
    private encounterService: EncounterService,
    private route: ActivatedRoute,
    private router: Router,
    private contextService: ContextService,
    private realtimeSync: RealtimeSyncService
  ) {}

  async ngOnInit() {
    this.campaignId = this.route.parent?.snapshot.paramMap.get('id') || null;
    if (this.campaignId) {
      await this.loadEncounters();
    }
    this.syncSub = this.realtimeSync.sync$.subscribe(async (event) => {
      if (event.table === 'encounters') {
        await this.loadEncounters();
      }
    });
  }

  ngOnDestroy() {
    if (this.syncSub) {
      this.syncSub.unsubscribe();
    }
  }

  async loadEncounters() {
    if (!this.campaignId) return;
    const { data } = await this.encounterService.getEncounters(this.campaignId);
    if (data) {
      this.encounters = data;
      this.filteredEncounters = data;
    }
  }

  filterData() {
    const term = this.searchTerm.toLowerCase().trim();
    if (!term) {
      this.filteredEncounters = this.encounters;
      return;
    }
    this.filteredEncounters = this.encounters.filter(enc =>
      enc.name.toLowerCase().includes(term) ||
      (enc.difficulty && enc.difficulty.toLowerCase().includes(term))
    );
  }

  openModal() {
    this.formData = { name: '', difficulty: 'Medium' };
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  async confirmModal() {
    if (!this.campaignId || !this.formData.name.trim()) return;
    await this.encounterService.createEncounter(this.campaignId, this.formData.name, this.formData.difficulty);
    this.closeModal();
    await this.loadEncounters();
  }

  openEncounter(encId: string) {
    this.router.navigate(['../encounter', encId], { relativeTo: this.route });
  }

  openInContext(event: Event, enc: any) {
    event.stopPropagation();
    this.contextService.setContext({ type: 'encounter', data: enc });
  }
}