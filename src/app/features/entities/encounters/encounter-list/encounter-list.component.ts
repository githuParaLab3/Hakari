import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { EncounterService } from '../encounter.service';

@Component({
  selector: 'app-encounter-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './encounter-list.component.html',
  styleUrls: ['./encounter-list.component.css']
})
export class EncounterListComponent implements OnInit {
  encounters: any[] = [];
  campaignId: string | null = null;

  constructor(
    private encounterService: EncounterService,
    private route: ActivatedRoute,
    private router: Router
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
    }
  }

  async createNewEncounter() {
    if (!this.campaignId) return;
    const name = prompt('Nome do Encontro:');
    if (!name) return;
    const difficulty = prompt('Dificuldade:') || 'Medium';
    await this.encounterService.createEncounter(this.campaignId, name, difficulty);
    await this.loadEncounters();
  }

  openEncounter(encounterId: string) {
    this.router.navigate(['../encounter', encounterId], { relativeTo: this.route });
  }
}