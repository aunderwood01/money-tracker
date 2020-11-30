import { Component, ChangeDetectorRef } from '@angular/core';
import {onAuthUIStateChange, CognitoUserInterface, AuthState, FormFieldTypes } from '@aws-amplify/ui-components';
import Amplify, { API, graphqlOperation, Auth } from 'aws-amplify';
import * as mutations from '../graphql/mutations';
import * as queries from '../graphql/queries';
import awsconfig from '../aws-exports';
import { Pipe, PipeTransform } from "@angular/core";
import {formatCurrency, formatDate} from "@angular/common";

Amplify.configure(awsconfig);

export type GetExpensesQuery = {
  listExpenses:{
    items:{
      id,
      user,
      type,
      amount,
      createdAt,
      updatedAt
    }
  }
}

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
      { type: "email" },
      { type: "password" },
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

  public async signOut() {
    try {
      await Auth.signOut();
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
    const newExpense = await API.graphql({query: mutations.createExpense, variables: {input: expenseDetails}});
    this.updateData();
    this.updateChart();
    alert("Expense Added");
  }

  public async updateData() {
    google.charts.load('current', {'packages':['corechart']});


    const allExpenses = (await API.graphql({query: queries.listExpenses, variables: {user: this.user.username}})) as { data: GetExpensesQuery};

    google.charts.setOnLoadCallback(function () {
      let data = new google.visualization.DataTable();
      data.addColumn('number', 'Amount');
      data.addColumn('string', 'Type');
      data.addColumn('string', 'Date');

      // Adds data into table
      for(let item in allExpenses.data.listExpenses.items) {
        let type = allExpenses.data.listExpenses.items[item].type;
        let amount = allExpenses.data.listExpenses.items[item].amount;
        let date = formatDate(allExpenses.data.listExpenses.items[item].updatedAt, 'shortDate', 'en');

        data.addRow([amount, type, date]);
      }

      // format the data so it appears as currency
      let formatter = new google.visualization.NumberFormat({
        prefix: '$'
      });
      formatter.format(data, 0);

      let options = {
        showRowNumber: false,
        title: 'Total Expenses',
        allowHtml: true,
        width: '33%',
        height: '33%',
      };

      let table = new google.visualization.Table(document.getElementById('expense-table'));

      table.draw(data, options);
    });

  }

  // Update the pie chart
  public async updateChart() {
    google.charts.load('current', {'packages':['table']});

    const allExpenses = (await API.graphql({query: queries.listExpenses, variables: {user: this.user.username}})) as { data: GetExpensesQuery};
    let billsTotal = 0.00;
    let groceriesTotal = 0.00;
    let fastFoodTotal = 0.00;
    let carTotal = 0.00;
    let otherTotal = 0.00;

    // This will total up the expenses for every type
    for(let item in allExpenses.data.listExpenses.items){
      let type = allExpenses.data.listExpenses.items[item].type;
      let amount = allExpenses.data.listExpenses.items[item].amount;
      if(type == "Bills") {
        billsTotal += amount;
      }
      else if(type == "Groceries") {
        groceriesTotal += amount;
      }
      else if(type == "Fast Food") {
        fastFoodTotal += amount;
      }
      else if(type == "Car") {
        carTotal += amount;
      }
      else if(type == "Other") {
        otherTotal += amount;
      }
    }

    google.charts.setOnLoadCallback(function () {
      let data = new google.visualization.DataTable();
      data.addColumn('string', 'type');
      data.addColumn('number', 'amount');
      data.addRows([
        ['Bills', billsTotal],
        ['Groceries', groceriesTotal],
        ['Fast Food', fastFoodTotal],
        ['Car', carTotal],
        ['Other', otherTotal]
      ]);

      let options = {
        title: 'Total Expenses',
        is3D: true
      };

      let chart = new google.visualization.PieChart(document.getElementById("pieChart"));

      // format the data so it appears as currency
      let formatter = new google.visualization.NumberFormat({
        prefix: '$'
      });
      formatter.format(data, 1);

      chart.draw(data, options);
    });
  }
}
