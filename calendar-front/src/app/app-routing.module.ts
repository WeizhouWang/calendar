import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes = [
    { path: '', loadChildren: () => import('./pages/calendar/calendar.module').then(mod => mod.CalendarModule) },
    { path: '**', redirectTo: '' }

];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes, {
            useHash: false,
            enableTracing: false, // <-- debugging purposes only
            onSameUrlNavigation: 'reload',
        })
    ],
    providers: [],
    exports: [RouterModule]
})
export class AppRoutingModule { }
