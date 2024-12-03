import {Component, DoCheck, OnInit} from '@angular/core';
import {FinanceService, Transaction} from '../../services/finance.service';
import {MatCard} from '@angular/material/card';
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from '@angular/material/table';
import {CurrencyPipe, NgForOf} from '@angular/common';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatOption, MatSelect} from '@angular/material/select';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-transaction-list',
  imports: [
    MatCard,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderRow,
    MatRow,
    CurrencyPipe,
    MatFormField,
    MatSelect,
    MatOption,
    MatButton,
    MatLabel,
    NgForOf,
    MatHeaderCellDef,
    MatCellDef,
    MatHeaderRowDef,
    MatRowDef
  ],
  templateUrl: './transaction-list.component.html',
  styleUrl: './transaction-list.component.scss'
})
export class TransactionListComponent implements OnInit, DoCheck {
  transactions$!: Transaction[];
  categories: string[] = ['Groceries', 'Salary', 'Entertainment', 'Misc'];

  constructor(private financeService: FinanceService) {}

  ngOnInit(): void {
    this.getTransactions()
    this.updateCategories()
  }

  ngDoCheck(): void {
    this.updateCategories()
  }

  updateCategories() {
    this.financeService.getCategories$().subscribe(categories => {
      this.categories = categories;
    });
  }

  getTransactions() {
    this.financeService.transactions$.subscribe(res => this.transactions$ = res);
  }

  getFilteredTransactions() {
    this.financeService.filteredTransactions$.subscribe(res => this.transactions$ = res)
  }

  filterByType(type: string) {
    this.financeService.filterTransactions(type);
    this.getFilteredTransactions()
  }

  filterByCategory(category: string) {
    this.financeService.filterTransactions(undefined, category);
    this.getFilteredTransactions()
  }

  sortTransactions(criteria: 'date' | 'amount', order: 'asc' | 'desc') {
    this.financeService.sortTransactions(criteria, order);
    this.getFilteredTransactions()
  }
}
