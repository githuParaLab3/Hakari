import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { ContextService } from '../../context.service';
import { ThemeService } from '../../theme.service';

@Component({
  selector: 'app-campaign-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './campaign-layout.component.html',
  styleUrls: ['./campaign-layout.component.css']
})
export class CampaignLayoutComponent implements OnInit, OnDestroy {
  isSidePanelOpen = false;
  isSidebarCollapsed = false;
  activeContext: any = null;
  private contextSub!: Subscription;

  constructor(
    private contextService: ContextService,
    public themeService: ThemeService
  ) {}

  ngOnInit() {
    this.contextSub = this.contextService.activeContext$.subscribe(context => {
      this.activeContext = context;
      if (context) {
        this.isSidePanelOpen = true;
      }
    });
  }

  ngOnDestroy() {
    if (this.contextSub) {
      this.contextSub.unsubscribe();
    }
  }

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  toggleSidePanel() {
    this.isSidePanelOpen = !this.isSidePanelOpen;
  }

  closePanel() {
    this.isSidePanelOpen = false;
    this.contextService.clearContext();
  }
}