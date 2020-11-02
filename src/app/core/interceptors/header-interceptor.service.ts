import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable()
export class HeaderInterceptorService implements HttpInterceptor {

  constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headers = req.headers.append('Accept', 'application/json');

    const cloneReq = req.clone({headers});
    return next.handle(cloneReq).pipe(
      catchError((err) => {
        switch (err.status) {
          case 500:
            console.log('internal server error');
            break;
          case 403:
            console.log('forbidden action');
            break;
          case 401:
            console.log('unauthenticated user');
            break;
          case 0:
            console.log('server offline');
            break;
        }
        return throwError(err);
      })
    );
  }
}
