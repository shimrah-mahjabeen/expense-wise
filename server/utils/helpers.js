import axios from "axios";

import Expense from "../models/Expense";

const calculateAmount = (data, status, amountType) =>
  data
    .filter((item) => item.status === status && item.amountType === amountType)
    .reduce((sum, expense) => sum + expense.amount, 0);

const getAmountStats = async (sheetId) => {
  const expenses = await Expense.find({ sheet: sheetId });
  const receivedAmount = calculateAmount(expenses, "paid", "incoming");
  const pendingAmount = calculateAmount(expenses, "unpaid", "incoming");
  const spentAmount = calculateAmount(expenses, "paid", "outgoing");
  const debtAmount = calculateAmount(expenses, "unpaid", "outgoing");
  const currentAmount = receivedAmount + pendingAmount;

  return {
    receivedAmount,
    pendingAmount,
    spentAmount,
    debtAmount,
    currentAmount,
    totalAmount: currentAmount + spentAmount,
  };
};

const isMongoId = (id) => {
  const checkForHexRegExp = /^[0-9a-fA-F]{24}$/;
  return checkForHexRegExp.test(id);
};

const getGoogleUserData = async (googleAccessToken) => {
  const response = await axios.get(
    "https://www.googleapis.com/oauth2/v3/userinfo",
    {
      headers: {
        Authorization: `Bearer ${googleAccessToken}`,
      },
    },
  );
  return response.data;
};

export { isMongoId, getAmountStats, getGoogleUserData };
