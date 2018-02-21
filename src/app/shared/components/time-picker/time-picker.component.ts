import {
  Component,
  OnInit,
  Output,
  EventEmitter
} from '@angular/core';

import * as moment from 'moment';

@Component({
  selector: 'time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.sass']
})
export class TimePickerComponent implements OnInit {

  hours = [];
  minutes = [];

  @Output() onTimePicked = new EventEmitter();

  select_hour;
  select_minute;

  constructor() { }

  ngOnInit() {
    this.initTime();
  }

  initTime() {
    const h_start = 8;
    const h_end = 20;

    const m_start = 0;
    const m_end = 60;
    const m_step = 10;

    for (let i = h_start; i <= 23; i++) {
      this.hours.push(i);
    }

    for (let i = m_start; i < m_end; i += m_step) {
      this.minutes.push(i);
    }
  }

  selectTime(e, type) {
    const num = +e.target.innerText
    if (type === 'H') {
      this.select_hour = num;
    }
    if (type === 'M') {
      this.select_minute = num;
    }
  }

  exit(e) {
    e.stopPropagation();
  }

}
