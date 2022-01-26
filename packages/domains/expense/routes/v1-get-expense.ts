import { ApiError } from "@nc/utils/errors";
import { getUserExpense } from "../model";
import { Router } from "express";
import { secureTrim } from "../formatter";
import { to } from "@nc/utils/async";

export const router = Router();
const DEFAULT_LIMIT = 10;
const DEFAULT_OFFSET = 0;

router.get("/expenses", async (req, res, next) => {
const userID = req.query?.userId;
let limitRefac = parseInt(req.query?.limit) || DEFAULT_LIMIT;
const offsetRefac = parseInt(req.query?.offset) || DEFAULT_OFFSET;
if (limitRefac > 100) {
  limitRefac = 100; // max limit to 100
}
const [userError, userExpense] = await to(
  getUserExpense(userID, limitRefac, offsetRefac)
);
  if (userError) {
    return next(
      new ApiError(
        userError,
        userError.status,
        `Could not get user expense details: ${userError}`,
        userError.title,
        req
      )
    );
  }

  if (!userExpense) {
    return res.json({});
  }

return res.json({
  meta: {
    offset: offsetRefac,
    limit: limitRefac,
  },
  results: secureTrim(userExpense),
    });
});
