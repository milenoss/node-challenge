import { format } from "../formatter";

describe("[Packages | Expense-domain | Formatter] format", () => {
  test("secureTrim should remove fields that are not defined in the list of public fields", () => {
    return expect(
      format({
        id: "edd35d42-0440-43fe-b9fa-15f3b2118b5a",
        merchant_name: "Cafe",
        amount_in_cents: "1500",
        currency: "USD",
        user_id: "415d00ba-f6f1-4168-a6a3-169ef748b39c",
        date_created: "2022-01-26 21:08:07.000000",
        status: "pending",
      })
    ).toEqual(
      JSON.stringify({
        first_name: "John",
        last_name: "Smith",
        company_name: "Pleo",
      })
    );
  });
});
