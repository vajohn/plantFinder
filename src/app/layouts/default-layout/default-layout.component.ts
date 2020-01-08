import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Navigations} from '../../models/navigation';

@Component({
  selector: 'app-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss']
})
export class DefaultLayoutComponent implements OnInit {
  urls: Navigations[] = [
    {
      name: 'Home',
      path: '/home/list'
    },
    {
      name: 'Filter',
      path: '/home/filter'
    },
    {
      name: 'Add new',
      path: '/form/add-plant'
    }
  ];

  constructor(public router: Router) {
  }

  ngOnInit() {
  }

}


