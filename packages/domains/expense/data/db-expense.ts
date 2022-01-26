import { query } from "@nc/utils/db";

export function readExpenses(userId, limit, offset, status) {
  let sql = "SELECT * FROM expenses WHERE user_id = $1 limit $2 offset $3";
  let params = [userId, limit, offset];
  if (status) {
    sql =
      "SELECT * FROM expenses WHERE user_id = $1 and status = $2 limit $3 offset $4";
    params = [userId, status, limit, offset];
  }
  return query(sql, params).then((response) => response.rows);
}
