import { Routes } from '@angular/router'
import { DriversComponent } from './components/drivers/drivers.component'
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component'

export const routes: Routes = [
    { path: 'drivers', component: DriversComponent },
    { path: '', redirectTo: '/drivers', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent }
]
