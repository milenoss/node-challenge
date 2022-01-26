import { ApiError } from "@nc/utils/errors";
import { getUserExpense } from "../model";
import { Router } from "express";
import { secureTrim } from "../formatter";
import { to } from "@nc/utils/async";

export const router = Router();

router.get("/expenses", async (req, res, next) => {
  const [userError, userExpense] = await to(getUserExpense(req.query?.userId));

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

  return res.json(secureTrim(userExpense));
});
