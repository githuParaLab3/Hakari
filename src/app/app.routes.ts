import { Routes } from '@angular/router';
import { authGuard } from './core/auth.guard';
import { LayoutComponent } from './core/layout/layout.component';
import { CampaignLayoutComponent } from './core/layout/campaign-layout/campaign-layout.component';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/landing/landing.component').then(m => m.LandingComponent),
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent)
      }
    ]
  },
  {
    path: 'campaign/:id',
    component: CampaignLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () => import('./features/campaigns/campaign-home/campaign-home.component').then(m => m.CampaignHomeComponent)
      },
      {
        path: 'sessions',
        loadComponent: () => import('./features/sessions/session-list/session-list.component').then(m => m.SessionListComponent)
      },
      {
        path: 'session/:sessionId',
        loadComponent: () => import('./features/sessions/session-view/session-view.component').then(m => m.SessionViewComponent)
      },
      {
        path: 'notes',
        loadComponent: () => import('./features/notes/note-list/note-list.component').then(m => m.NoteListComponent)
      },
      {
        path: 'note/:noteId',
        loadComponent: () => import('./features/notes/note-view/note-view.component').then(m => m.NoteViewComponent)
      },
      {
        path: 'npcs',
        loadComponent: () => import('./features/entities/npcs/npc-list/npc-list.component').then(m => m.NpcListComponent)
      },
      {
        path: 'npc/:npcId',
        loadComponent: () => import('./features/entities/npcs/npc-view/npc-view.component').then(m => m.NpcViewComponent)
      },
      {
        path: 'locations',
        loadComponent: () => import('./features/entities/locations/location-list/location-list.component').then(m => m.LocationListComponent)
      },
      {
        path: 'location/:locationId',
        loadComponent: () => import('./features/entities/locations/location-view/location-view.component').then(m => m.LocationViewComponent)
      },
      {
        path: 'items',
        loadComponent: () => import('./features/entities/items/item-list/item-list.component').then(m => m.ItemListComponent)
      },
      {
        path: 'item/:itemId',
        loadComponent: () => import('./features/entities/items/item-view/item-view.component').then(m => m.ItemViewComponent)
      },
      {
        path: 'characters',
        loadComponent: () => import('./features/entities/characters/character-list/character-list.component').then(m => m.CharacterListComponent)
      },
      {
        path: 'character/:characterId',
        loadComponent: () => import('./features/entities/characters/character-view/character-view.component').then(m => m.CharacterViewComponent)
      },
      {
        path: 'encounters',
        loadComponent: () => import('./features/entities/encounters/encounter-list/encounter-list.component').then(m => m.EncounterListComponent)
      },
      {
        path: 'encounter/:encounterId',
        loadComponent: () => import('./features/entities/encounters/encounter-view/encounter-view.component').then(m => m.EncounterViewComponent)
      },
      {
        path: 'monsters',
        loadComponent: () => import('./features/entities/monsters/monster-list/monster-list.component').then(m => m.MonsterListComponent)
      },
      {
        path: 'monster/:monsterId',
        loadComponent: () => import('./features/entities/monsters/monster-view/monster-view.component').then(m => m.MonsterViewComponent)
      },
      {
        path: 'maps',
        loadComponent: () => import('./features/entities/maps/map-list/map-list.component').then(m => m.MapListComponent)
      },
      {
        path: 'map/:mapId',
        loadComponent: () => import('./features/entities/maps/map-view/map-view.component').then(m => m.MapViewComponent)
      },
      {
        path: 'resources',
        loadComponent: () => import('./features/resources/resource-list/resource-list.component').then(m => m.ResourceListComponent)
      },
      {
        path: 'resource/:resourceId',
        loadComponent: () => import('./features/resources/resource-view/resource-view.component').then(m => m.ResourceViewComponent)
      }
    ]
  }
];