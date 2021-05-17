import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent {

  //CARD DISPO
  dispo= this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: '', cols: 1, rows: 1 },
        ];
      }
      return [
        { title: '', cols: 2, rows: 2 }
      ];
    })
  );

  //CARD CALENDARIO
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: '', cols: 1, rows: 1 },
        ];
      }
      return [
        { title: '', cols: 2, rows: 2 }
      ];
    })
  );

  //CARD PERSONAL
  personal = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: '', cols: 1, rows: 1 },
        ];
      }
      return [
        { title: '', cols: 1, rows: 1 }
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver) {}
}
