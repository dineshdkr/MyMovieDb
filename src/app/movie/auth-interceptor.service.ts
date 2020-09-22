import { HttpInterceptor, HttpRequest, HttpHandler, HttpParams } from '@angular/common/http';

import { environment } from './../../environments/environment';

export class AuthInterceptorService implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        console.log(req.url, 'Request is on its way');
        let reqParams = new HttpParams();
        reqParams = reqParams.append('api_key', environment.API_KEY);
        const modifiedReq = req.clone({
            params: reqParams
        });
        return next.handle(modifiedReq);
    }
}
