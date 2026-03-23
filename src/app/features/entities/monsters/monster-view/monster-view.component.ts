import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MonsterService } from '../monster.service';

@Component({
  selector: 'app-monster-view',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './monster-view.component.html',
  styleUrls: ['./monster-view.component.css']
})
export class MonsterViewComponent implements OnInit {
  monster: any = null;

  constructor(
    private route: ActivatedRoute,
    private monsterService: MonsterService
  ) {}

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('monsterId');
    if (id) {
      const { data } = await this.monsterService.getMonster(id);
      this.monster = data;
    }
  }
}