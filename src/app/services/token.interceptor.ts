import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs'
import { ApiService } from './api.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(private apiService: ApiService) {}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let tokenizeReq = req.clone({
            setHeaders: {
                Autorization: `Bearer ${this.apiService.getToken()}`
            }
        })
        return next.handle(tokenizeReq);
    }


}