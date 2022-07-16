import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { EventBusService } from './_services/event-bus.service';
import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from './_services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isLoggedIn = false;
  eventBusSub?: Subscription;
  userId?: number | any;

  title = 'joeneverdie-timer-client';

  constructor (private authService: AuthService, private tokenService: TokenStorageService, private eventBusService: EventBusService) {}

  ngOnInit() {
   this.isLoggedIn = !!this.tokenService.getToken();
    if (this.isLoggedIn) {
      this.userId = this.tokenService.getUserId();
    }

   this.eventBusSub = this.eventBusService.on('logout', () => {
    this.logout();
   });
  }

  ngOnDestroy(): void {
    if (this.eventBusSub) this.eventBusSub.unsubscribe();
  }

  logout() {
    this.authService.logout(this.userId);
    this.isLoggedIn = false;
  }
}
