import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router'; // Import Router

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private messageService: MessageService, private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem('access_token');
        let request = req;
        if (token) {
            const authReq = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
            request = authReq;
        }
        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                // Show toast notification for errors
                this.messageService.add({ severity: 'error', summary: 'Error', detail: error?.statusText });

                // Check for 403 error and redirect to signin page
                // if (error.status === 403 || error.status === 0) {
                //     this.router.navigate(['/signin']);
                // }

                // Continue handling the error
                return throwError(error);
            })
        );
    }
}
