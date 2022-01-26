import { Expense } from "./types";
import Any = jasmine.Any;

const publicFields = [
  "id",
  "merchant_name",
  "amount_in_cents",
  "currency",
  "user_id",
  "date_created",
];

export function secureTrim(expense: Expense[]): string {
  return JSON.stringify(expense, publicFields);
}

export function format(rawExpense): Expense {
  return {
    id: rawExpense.id,
    merchant_name: rawExpense.merchant_name,
    amount_in_cents: rawExpense.amount_in_cents,
    currency: rawExpense.currency,
    user_id: rawExpense.user_id,
    date_created: rawExpense.date_created,
    status: rawExpense.status,
  };
}

export function formatExpenses(rawExpense): Expense[] {
  const data = [];
  rawExpense.forEach(function (raw) {
    data.push(format(raw));
  });
  return data;
}
