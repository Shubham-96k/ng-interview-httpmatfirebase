import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PostdashboardComponent } from "./shared/components/postdashboard/postdashboard.component";




const appRoutes : Routes = [
    {
        path : 'posts',
        component : PostdashboardComponent
    },
    {
        path : '',
        redirectTo : 'posts',
        pathMatch : 'full'
    }
]
@NgModule({
    imports : [RouterModule.forRoot(appRoutes)],
    exports : [RouterModule]
})
export class AppRoutingModule{

}