import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Observable, Subject, switchMap, takeUntil } from 'rxjs';
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

  logout$ = this.logout.logout$;

  destroy$ = new Subject<void>();

  constructor(
    private userStatus: UserStatusService,
    private logout: LogoutService
  ) {}

  ngOnInit(): void {
    this.user$ = this.logout.refreshNeeded$.pipe(
      switchMap(() => {
        return this.userStatus.getUser$();
      })
    );
  }

  logoutUser() {
    this.logout$.pipe(takeUntil(this.destroy$)).subscribe(() => {});
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
