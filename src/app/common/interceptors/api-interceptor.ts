import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment.prod";

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  private baseUrl?: string = environment.baseUrl;
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    const cloneReq = req.clone({
      url: `${this.baseUrl}/${req.url}`,
      setHeaders: {
        'Content-Type':  'application/json'
      }
    });

    return next.handle(cloneReq);
  }
}
