import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { AboutStoryComponent } from './components/about-story/about-story.component';
import { ActivitiesComponent } from './components/activities/activities.component';
import { CustomersComponent } from './components/customers/customers.component';
import { HistoryComponent } from './components/history/history.component';
import { OpsIdentityComponent } from './components/ops-identity/ops-identity.component';
import { MainHeaderComponent } from '../../shared/components/main-header/main-header.component';

@Component({
  selector: 'app-about',
  imports: [
    TranslatePipe,
    AboutStoryComponent,
    OpsIdentityComponent,
    HistoryComponent,
    CustomersComponent,
    ActivitiesComponent,
    MainHeaderComponent,
  ],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent {}
