import {
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {retry, catchError, finalize} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material';
import {ToastComponent} from '../components/toast/toast.component';
import {Injectable} from '@angular/core';
import {LoaderService} from './loader.service';

@Injectable()
export class HttpCustomInterceptor implements HttpCustomInterceptor {

  constructor(private sb: MatSnackBar, private ls: LoaderService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.ls.showHide();
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
        }),
        finalize(() =>  this.ls.showHide())
      );
  }
}
