import { Component, OnInit, OnDestroy } from '@angular/core';
import { Account } from '../account/account.model';
import { AccountService } from '../account.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit, OnDestroy {
  accounts: Account[] = [];
  newAccount: Account = new Account();
  isEditing: boolean = false;
  editedAccountId: number = 0;
  accountSubscription!: Subscription;

  constructor(private accountService: AccountService) {
    console.log("ijyuy");
  }


  ngOnInit() {
    this.getAccounts();
  }

  ngOnDestroy() {
    this.accountSubscription.unsubscribe();
  }

  getAccounts() {
    this.accountSubscription = this.accountService.getAccounts().subscribe((data: Account[]) => {
      this.accounts = data;
      console.log(data);         
    });
  }

  addAccount() {
    if (this.newAccount.accountNumber && this.newAccount.accountHolderName && this.newAccount.balance) {
      this.accountService.addAccount(this.newAccount);
      this.getAccounts();
      this.newAccount = new Account();
      this.isEditing = false; // Reset the editing state
    }
  }
  editAccount(account: Account) {
    this.isEditing = true;
    this.editedAccountId = account.id;
    this.newAccount = { ...account };
  }

  updateAccount() {
    if (this.newAccount.accountNumber && this.newAccount.accountHolderName && this.newAccount.balance) {
      this.accountService.updateAccount(this.editedAccountId, this.newAccount);
      this.getAccounts();
      this.cancelEdit();
    }
  }

  deleteAccount(accountId: number) {
    this.accountService.deleteAccount(accountId);
    this.getAccounts();
  }

  cancelEdit() {
    this.isEditing = false;
    this.editedAccountId = 0;
   
  }
}