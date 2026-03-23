import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-session-board',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './session-board.component.html',
  styleUrls: ['./session-board.component.css']
})
export class SessionBoardComponent implements OnInit {
  nodes: any[] = [];

  ngOnInit() {}

  addNode() {
    this.nodes.push({ id: Date.now(), x: 50, y: 50, title: 'NEW NODE' });
  }
}