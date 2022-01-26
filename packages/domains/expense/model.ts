import { Expense } from "./types";
import { formatExpenses } from "./formatter";
import { readExpenses } from "./data/db-expense";
import { to } from "@nc/utils/async";
import { BadRequest, InternalError, NotFound } from "@nc/utils/errors";

export async function getUserExpense(
  userId,
  limit,
  offset
): Promise<Expense[]> {
  if (!userId) {
    throw BadRequest("userId property is missing.");
  }

  const [dbError, rawExpense] = await to(readExpenses(userId, limit, offset));
  if (dbError) {
    throw InternalError(`Error fetching data from the DB: ${dbError.message}`);
  }

  if (!rawExpense) {
    throw NotFound(`Could not find expense for user with id ${userId}`);
  }

  return formatExpenses(rawExpense);
}
