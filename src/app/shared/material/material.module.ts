import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import {MatSnackBarModule} from '@angular/material/snack-bar'
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDialogModule} from '@angular/material/dialog';

const modulesarr = [
    MatSnackBarModule,
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
    MatProgressBarModule,
    MatDialogModule
]

@NgModule({
    imports : [
        ...modulesarr
    ],
    exports : [
        ...modulesarr
    ]
})
export class MaterialModule{

}