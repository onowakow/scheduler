import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { fromEvent, Observable, of, Subject, switchMap, takeUntil } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
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
