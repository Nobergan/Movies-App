import { inject, Injectable } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

import { ToastType } from './models/toast-type.enum';

@Injectable({
  providedIn: 'root',
})
export class ToasterService {
  private toasterLibService = inject(ToastrService);

  showToast(message: string, type?: ToastType) {
    switch (type) {
      case ToastType.Error:
        this.toasterLibService.error(message);
        break;
      case ToastType.Info:
        this.toasterLibService.info(message);
        break;
      case ToastType.Warning:
        this.toasterLibService.warning(message);
        break;
      default:
        this.toasterLibService.success(message);
    }
  }

  showExtendedToast(message: string) {
    switch (message) {
      case 'INVALID_EMAIL':
        this.toasterLibService.error('Не коректний E-mail');
        break;
      case 'EMAIL_NOT_FOUND':
        this.toasterLibService.error('Такий E-mail не знайдено');
        break;
      case 'INVALID_PASSWORD':
        this.toasterLibService.error('Не коректний пароль');
        break;
      case 'INVALID_LOGIN_CREDENTIALS':
        this.toasterLibService.error('Не вірний E-mail або пароль');
        break;
      case 'MISSING_PASSWORD':
        this.toasterLibService.error('Введіть пароль');
        break;
      case 'WEAK_PASSWORD : Password should be at least 6 characters':
        this.toasterLibService.warning('Пароль недостатньо міцний');
        break;
      case 'EMAIL_EXISTS':
        this.toasterLibService.warning('Електронна пошта вже використовується');
        break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        this.toasterLibService.warning('Спробуйте пізніше');
        break;
      case 'auth/popup-closed-by-user':
        this.toasterLibService.error('Вікно було закрито перед</br>завершенням процесу входу.', null, { enableHtml: true });
        break;
      case 'auth/cancelled-popup-request':
        this.toasterLibService.error('Відкрито декілька вікон авторизації');
        break;
      case 'auth/network-request-failed':
        this.toasterLibService.error('Помилка мережі.</br>Перевірте підключення до Інтернету.', null, { enableHtml: true });
        break;
      case 'auth/account-exists-with-different-credential':
        this.toasterLibService.error('Обліковий запис вже існує</br>з іншими обліковими даними.', null, { enableHtml: true });
        break;
      default:
        this.toasterLibService.error(message);
    }
  }
}
