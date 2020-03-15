import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from "rxjs/operators";
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    // all the requests of the application will be passed through this intercept function

    constructor(private router:Router) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>     // copied from definition
    {
        if(localStorage.getItem('token')!=null)
        {   // it has to clone the req bcz it is readonly
            const clonedReq = req.clone({
                headers : req.headers.set('Authorization', 'Bearer '+localStorage.getItem('token'))
            });
            return next.handle(clonedReq).pipe(
                tap(
                    succ => {},
                    err => {
                        if(err.status == 401){
                            localStorage.removeItem('token');
                            this.router.navigateByUrl('/user/login');
                        }else if(err.status == 403){
                            this.router.navigateByUrl('/forbidden');
                        }
                    }
                )
            )
        }
        else
            return next.handle(req.clone());
    }    
}