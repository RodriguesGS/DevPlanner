import { Component, inject, OnInit } from '@angular/core';
import { DashboardFacade } from '../../facade/dashboard.facade';
import { ApexOptions, NgApexchartsModule } from 'ng-apexcharts';

@Component({
  selector: 'app-dashboard-page',
  imports: [NgApexchartsModule],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss',
})
export class DashboardPageComponent implements OnInit {
  facade = inject(DashboardFacade);

  areaYAxis: ApexYAxis = {
    labels: {
      formatter: (val: number) => (Number.isInteger(val) ? String(val) : ''),
    },
  };

  donutPlotOptions: ApexOptions['plotOptions'] = {
    pie: {
      donut: {
        size: '70%',
        labels: {
          show: true,
          total: {
            show: true,
            label: 'Total',
            fontSize: '12px',
            color: '#9DB0CF',
            formatter: () => String(this.facade.total()),
          },
        },
      },
    },
  };

  ngOnInit(): void {
    this.facade.load();
  }
}
