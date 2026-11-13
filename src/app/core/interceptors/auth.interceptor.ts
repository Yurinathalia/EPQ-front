import { HttpInterceptorFn } from '@angular/common/http';

const TOKEN_KEY = 'epq_access_token';

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  if (typeof localStorage === 'undefined') {
    return next(request);
  }

  const token = localStorage.getItem(TOKEN_KEY);
  if (!token || request.url.endsWith('/api/v1/auth/login')) {
    return next(request);
  }

  return next(request.clone({
    setHeaders: { Authorization: `Bearer ${token}` }
  }));
};
