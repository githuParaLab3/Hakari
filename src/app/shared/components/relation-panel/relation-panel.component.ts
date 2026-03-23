import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-relation-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './relation-panel.component.html',
  styleUrls: ['./relation-panel.component.css']
})
export class RelationPanelComponent implements OnInit {
  @Input() entityType!: string;
  @Input() entityId!: string;
  
  relations: any[] = [];

  ngOnInit() {
  }
}