import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";



@Injectable({
    providedIn : 'root'
})
export class SnackbarService {
    constructor(
        private _snackbar : MatSnackBar
    ){

    }

    opensnackbar(msg : string){
        this._snackbar.open(msg, 'Close', {
            duration : 2000,
            horizontalPosition : "center",
            verticalPosition : "top",
        })
    }
}