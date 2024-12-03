import { Injectable } from '@angular/core';
import {BehaviorSubject, map} from 'rxjs';

export interface Transaction {
  id: string;
  name: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  date: string;
}

@Injectable({
  providedIn: 'root'
})
export class FinanceService {
  private transactions = new BehaviorSubject<Transaction[]>(this.loadFromStorage());
  transactions$ = this.transactions.asObservable();

  private filteredTransactions = new BehaviorSubject<Transaction[]>(this.transactions.value);
  filteredTransactions$ = this.filteredTransactions.asObservable();

  private totalBalance = new BehaviorSubject<number>(this.calculateTotalBalance());
  totalBalance$ = this.totalBalance.asObservable();

  getCategories$() {
    return this.transactions$.pipe(
      map(transactions => Array.from(new Set(transactions.map(transaction => transaction.category))))
    );
  }

  addTransaction(transaction: Transaction) {
    const currentTransactions = this.transactions.value;
    const updatedTransactions = [...currentTransactions, transaction];
    this.transactions.next(updatedTransactions);
    this.saveToStorage(updatedTransactions);
    this.updateFilteredTransactions(updatedTransactions);
    this.updateTotalBalance();
  }

  filterTransactions(type?: string, category?: string) {
    let transactions = this.transactions.value;

    if (type) {
      transactions = transactions.filter(transaction => transaction.type === type);
    }

    if (category) {
      transactions = transactions.filter(transaction => transaction.category === category);
    }

    this.updateFilteredTransactions(transactions);
  }

  sortTransactions(criteria: 'date' | 'amount', order: 'asc' | 'desc') {
    const transactions = [...this.filteredTransactions.value];
    transactions.sort((a, b) => {
      const valueA = criteria === 'date' ? new Date(a.date).getTime() : a.amount;
      const valueB = criteria === 'date' ? new Date(b.date).getTime() : b.amount;

      return order === 'asc' ? valueA - valueB : valueB - valueA;
    });
    this.updateFilteredTransactions(transactions);
  }

  private updateFilteredTransactions(transactions: Transaction[]) {
    this.filteredTransactions.next(transactions);
  }

  private updateTotalBalance() {
    this.totalBalance.next(this.calculateTotalBalance());
  }

  private calculateTotalBalance(): number {
    return this.transactions.value.reduce((acc, transaction) => {
      return transaction.type === 'income' ? acc + transaction.amount : acc - transaction.amount;
    }, 0);
  }

  private saveToStorage(transactions: Transaction[]) {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }

  private loadFromStorage(): Transaction[] {
    const data = localStorage.getItem('transactions');
    return data ? JSON.parse(data) : [];
  }
}
