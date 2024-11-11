import { Routes } from '@angular/router'
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component'
import { TeamRadioComponent } from './components/team-radio/team-radio.component'

const pageRoutes: Routes = [
    { path: 'team-radio', component: TeamRadioComponent },
]

export const routes: Routes = [
    ...pageRoutes,
    { path: '', redirectTo: pageRoutes[0].path, pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent }
]
