import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { EncounterService } from '../encounter.service';

@Component({
  selector: 'app-encounter-view',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './encounter-view.component.html',
  styleUrls: ['./encounter-view.component.css']
})
export class EncounterViewComponent implements OnInit {
  encounter: any = null;

  constructor(
    private route: ActivatedRoute,
    private encounterService: EncounterService
  ) {}

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('encounterId');
    if (id) {
      const { data } = await this.encounterService.getEncounter(id);
      this.encounter = data;
    }
  }
}