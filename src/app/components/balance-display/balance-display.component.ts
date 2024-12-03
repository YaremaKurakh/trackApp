import {Component, OnInit} from '@angular/core';
import {FinanceService} from '../../services/finance.service';
import {CurrencyPipe} from '@angular/common';
import {MatCard} from '@angular/material/card';

@Component({
  selector: 'app-balance-display',
  imports: [
    CurrencyPipe,
    MatCard
  ],
  templateUrl: './balance-display.component.html',
  styleUrl: './balance-display.component.scss'
})
export class BalanceDisplayComponent implements OnInit {
  totalBalance: number = 0;

  constructor(private financeService: FinanceService) {}

  ngOnInit() {
    this.financeService.totalBalance$.subscribe(balance => {
      this.totalBalance = balance;
    });
  }
}
