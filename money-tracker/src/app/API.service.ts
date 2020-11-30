/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateExpenseInput = {
  id?: string | null,
  user: string,
  type: string,
  amount: number,
};

export type ModelExpenseConditionInput = {
  user?: ModelStringInput | null,
  type?: ModelStringInput | null,
  amount?: ModelIntInput | null,
  and?: Array< ModelExpenseConditionInput | null > | null,
  or?: Array< ModelExpenseConditionInput | null > | null,
  not?: ModelExpenseConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type UpdateExpenseInput = {
  id: string,
  user?: string | null,
  type?: string | null,
  amount?: number | null,
};

export type DeleteExpenseInput = {
  id?: string | null,
};

export type ModelExpenseFilterInput = {
  id?: ModelIDInput | null,
  user?: ModelStringInput | null,
  type?: ModelStringInput | null,
  amount?: ModelIntInput | null,
  and?: Array< ModelExpenseFilterInput | null > | null,
  or?: Array< ModelExpenseFilterInput | null > | null,
  not?: ModelExpenseFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type CreateExpenseMutationVariables = {
  input: CreateExpenseInput,
  condition?: ModelExpenseConditionInput | null,
};

export type CreateExpenseMutation = {
  createExpense:  {
    __typename: "Expense",
    id: string,
    user: string,
    type: string,
    amount: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateExpenseMutationVariables = {
  input: UpdateExpenseInput,
  condition?: ModelExpenseConditionInput | null,
};

export type UpdateExpenseMutation = {
  updateExpense:  {
    __typename: "Expense",
    id: string,
    user: string,
    type: string,
    amount: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteExpenseMutationVariables = {
  input: DeleteExpenseInput,
  condition?: ModelExpenseConditionInput | null,
};

export type DeleteExpenseMutation = {
  deleteExpense:  {
    __typename: "Expense",
    id: string,
    user: string,
    type: string,
    amount: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetExpenseQueryVariables = {
  id: string,
};

export type GetExpenseQuery = {
  getExpense:  {
    __typename: "Expense",
    id: string,
    user: string,
    type: string,
    amount: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListExpensesQueryVariables = {
  filter?: ModelExpenseFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListExpensesQuery = {
  listExpenses:  {
    __typename: "ModelExpenseConnection",
    items:  Array< {
      __typename: "Expense",
      id: string,
      user: string,
      type: string,
      amount: number,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type OnCreateExpenseSubscription = {
  onCreateExpense:  {
    __typename: "Expense",
    id: string,
    user: string,
    type: string,
    amount: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateExpenseSubscription = {
  onUpdateExpense:  {
    __typename: "Expense",
    id: string,
    user: string,
    type: string,
    amount: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteExpenseSubscription = {
  onDeleteExpense:  {
    __typename: "Expense",
    id: string,
    user: string,
    type: string,
    amount: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};
