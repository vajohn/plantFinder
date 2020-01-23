import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {retry, catchError} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material';
import {ToastComponent} from '../components/toast/toast.component';

export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private sb: MatSnackBar) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        retry(1),
        catchError((error: HttpErrorResponse) => {
          let errorMessage: string;
          if (error.error instanceof ErrorEvent) {
            // client-side error
            errorMessage = `Error: ${error.error.message}`;
          } else {
            // server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
          }
          // customer friendly dialog
          this.sb.openFromComponent(ToastComponent, {
            duration: 5000,
            verticalPosition: 'top',
            horizontalPosition: 'start',
            data: {text: error},
            panelClass: 'errorToast'
          });
          return throwError(errorMessage);
        })
      );
  }
}
