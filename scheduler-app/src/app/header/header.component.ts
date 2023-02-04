import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { merge, Observable, of, Subject, switchMap, takeUntil } from 'rxjs';
import { LoginService } from '../core/user-services/login.service';
import { LogoutService } from '../core/user-services/logout.service';
import { UserStatusService } from '../core/user-services/user-status.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnDestroy, OnInit {
  user$: Observable<{ email: string } | null>;

  private destroy$ = new Subject<void>();

  constructor(
    private userStatus: UserStatusService,
    private login: LoginService,
    private logout: LogoutService
  ) {}

  ngOnInit(): void {
    const refreshLogin$ = merge(
      of(0),
      this.login.refreshNeeded$,
      this.logout.refreshNeeded$
    );

    this.user$ = refreshLogin$.pipe(
      switchMap(() => {
        return this.userStatus.getUser$();
      })
    );
  }

  logoutUser() {
    const logout$ = this.logout.logout$();
    logout$.pipe(takeUntil(this.destroy$)).subscribe(() => {});
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
