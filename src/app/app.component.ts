import { Component } from '@angular/core';
import {MatToolbar} from '@angular/material/toolbar';
import {BalanceDisplayComponent} from './components/balance-display/balance-display.component';
import {AddTransactionComponent} from './components/add-transaction/add-transaction.component';
import {TransactionListComponent} from './components/transaction-list/transaction-list.component';

@Component({
  selector: 'app-root',
  imports: [
    MatToolbar,
    BalanceDisplayComponent,
    AddTransactionComponent,
    TransactionListComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'trackApp';
}
