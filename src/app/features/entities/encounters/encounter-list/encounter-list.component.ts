import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { EncounterService } from '../encounter.service';
import { ContextService } from '../../../../core/context.service';
import { ModalComponent } from '../../../../shared/components/modal/modal.component';

@Component({
  selector: 'app-encounter-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalComponent],
  templateUrl: './encounter-list.component.html',
  styleUrls: ['./encounter-list.component.css']
})
export class EncounterListComponent implements OnInit {
  encounters: any[] = [];
  filteredEncounters: any[] = [];
  campaignId: string | null = null;
  searchTerm: string = '';

  isModalOpen = false;
  formData = { name: '', difficulty: 'Medium' };

  constructor(
    private encounterService: EncounterService,
    private route: ActivatedRoute,
    private router: Router,
    private contextService: ContextService
  ) {}

  async ngOnInit() {
    this.campaignId = this.route.parent?.snapshot.paramMap.get('id') || null;
    if (this.campaignId) {
      await this.loadEncounters();
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
    this.filteredEncounters = this.encounters.filter(encounter =>
      encounter.name.toLowerCase().includes(term) ||
      (encounter.difficulty && encounter.difficulty.toLowerCase().includes(term))
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

  openEncounter(encounterId: string) {
    this.router.navigate(['../encounter', encounterId], { relativeTo: this.route });
  }

  openInContext(event: Event, encounter: any) {
    event.stopPropagation();
    this.contextService.setContext({ type: 'encounter', data: encounter });
  }
}