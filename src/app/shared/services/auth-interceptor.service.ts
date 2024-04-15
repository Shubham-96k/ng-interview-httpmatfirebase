import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable, NgModule } from "@angular/core";
import { Observable, delay, finalize } from "rxjs";
import { LoaderService } from "./loader.service";



@Injectable({
    providedIn : 'root'
})
export class AuthInterceptorService implements HttpInterceptor{


    constructor(
        private _loader : LoaderService
    ){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this._loader.loadingspiner$.next(true); // api call starts here
        const authclone = req.clone({
            setHeaders: {
                "Auth-Token" : 'Bearer Token',
                'content-type' : 'application/json'
            }
        })

        return next.handle(authclone)
            .pipe(
                delay(2000),
                finalize(() => {
                    //finalize >> api call complete and get response

                    return this._loader.loadingspiner$.next(false)
                })
            )




    }
    
}