import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { FinanceService, Transaction } from '../../services/finance.service';
import {MatCard} from '@angular/material/card';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatOption, MatSelect} from '@angular/material/select';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';


@Component({
  selector: 'app-add-transaction',
  imports: [
    ReactiveFormsModule,
    MatCard,
    MatFormField,
    MatSelect,
    MatOption,
    MatInput,
    MatButton,
    MatLabel
  ],
  templateUrl: './add-transaction.component.html',
  styleUrl: './add-transaction.component.scss'
})
export class AddTransactionComponent {
  transactionForm: FormGroup;

  constructor(private fb: FormBuilder, private financeService: FinanceService) {
    this.transactionForm = this.fb.group({
      name: ['', Validators.required],
      amount: [0, [Validators.required, Validators.min(0.01)]],
      type: ['', Validators.required],
      category: ['', Validators.required],
      date: [new Date().toISOString().split('T')[0], Validators.required],
    });
  }

  onSubmit() {
    if (this.transactionForm.valid) {
      const transaction: Transaction = {
        id: crypto.randomUUID(),
        ...this.transactionForm.value,
      };
      this.financeService.addTransaction(transaction);
      this.transactionForm.reset({
        date: new Date().toISOString().slice(0, 10),
      });
      this.clear(this.transactionForm);
    }
  }

  clear(form: FormGroup): void {
    Object.keys(form.controls).forEach(key =>{
      form.controls[key].setErrors(null)
    });
  }

}
