import { Injectable } from '@angular/core';
import { Account } from './account/account.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private localStorageKey = 'accounts';

  constructor() {}

  getAccounts(): Observable<Account[]> {
    const accounts = this.getStoredAccounts();
    return of(accounts);
  }

  addAccount(account: Account): Observable<void> {
    const accounts = this.getStoredAccounts();
    account.id = accounts.length + 1;
    accounts.push(account);
    this.storeAccounts(accounts);
    return of();
  }

  updateAccount(accountId: number, account: Account): Observable<void> {
    const accounts = this.getStoredAccounts();
    console.log(accountId)
    const index = accounts.findIndex(a => a.id === accountId);
    if (index == 0) {
      accounts[index] = account;
      this.storeAccounts(accounts);
    }
    else{
      this.storeAccounts(accounts);

    }
    return of();
  }

  deleteAccount(accountId: number): Observable<void> {
    const accounts = this.getStoredAccounts();
    const index = accounts.findIndex(a => a.id === accountId);
    if (index !== -1) {
      accounts.splice(index, 1);
      this.storeAccounts(accounts);
    }
    return of();
  }

  private getStoredAccounts(): Account[] {
    const accountsString = localStorage.getItem(this.localStorageKey);
    return accountsString ? JSON.parse(accountsString) : [];
  }

  private storeAccounts(accounts: Account[]): void {
    const accountsString = JSON.stringify(accounts);
    localStorage.setItem(this.localStorageKey, accountsString);
  }
}
