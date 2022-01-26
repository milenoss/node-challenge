import { query } from "@nc/utils/db";

export function readExpenses(userId, limit, offset) {
  return query("SELECT * FROM expenses WHERE user_id = $1 limit $2 offset $3", [
    userId,
    limit,
    offset,
  ]).then((response) => response.rows);
}
