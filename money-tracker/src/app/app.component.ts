import { Component, ChangeDetectorRef } from '@angular/core';
import {onAuthUIStateChange, CognitoUserInterface, AuthState, FormFieldTypes } from '@aws-amplify/ui-components';
import Amplify, { API, graphqlOperation, Auth } from 'aws-amplify';
import * as mutations from '../graphql/mutations';
import awsconfig from '../aws-exports';
import { Pipe, PipeTransform } from "@angular/core";

Amplify.configure(awsconfig);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'money-tracker';
  user: CognitoUserInterface | undefined;
  authState: AuthState;
  formFields: FormFieldTypes;

  constructor(private ref: ChangeDetectorRef) {
    this.formFields = [
      { type: "username" },
      { type: "password" },
      { type: "email" }
    ]
  }

  ngOnInit() {
    onAuthUIStateChange((authState, authData) => {
      this.authState = authState;
      this.user = authData as CognitoUserInterface;
      this.ref.detectChanges();
    })
  }

  ngOnDestroy() {
    return onAuthUIStateChange;
  }

  public signOut() {
    try {
      Auth.signOut();
    }
    catch (error) {
      console.log('error signing out: ', error);
    }
  }

  public async addExpense() {
    const expenseDetails = {
      user: this.user.username,
      amount: (<HTMLInputElement> document.getElementById("expenseAmt")).value,
      type: (<HTMLInputElement> document.getElementById("type")).value
    };
    const newExpense = await API.graphql({query: mutations.createExpense, variables: {input: expenseDetails}})
    alert("Expense Added");
  }
}
