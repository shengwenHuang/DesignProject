import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs'
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService) { }


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // console.log(this.authService.getToken())
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer xx.yy.zz`
      }
    });

    return next.handle(request);

  }
}
