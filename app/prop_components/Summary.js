import React from "react";
import { useState, useEffect } from "react";

let USDollar = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
});

const Summary = ({
  price,
  propertyData,
  downPayment,
  closingCosts,
  mortgage,
  rentEstimate,
  expenseRatio,
  renovations,
  customPrice,
}) => {
  //State declarations
  const [cashFlow, setCashFlow] = useState(0);
  const [roi, setRoi] = useState(0);

  useEffect(() => {
    const calculateCashFlow = () => {
      let rent = parseInt(rentEstimate);
      let mortgageAmount = parseFloat(mortgage);

      let m_expenses, m_proptax;
      if (price) {
        m_expenses = price * 0.0015;
        m_proptax = (price * 0.01) / 12;
      } else {
        m_expenses = propertyData.m / 12;
        m_proptax = propertyData.pt / 12;
      }

      m_expenses = (rentEstimate * expenseRatio) / 100;

      const cashflowCalc = rent - mortgageAmount - m_expenses - m_proptax;

      return cashflowCalc;
    };

    const cashflow = calculateCashFlow();
    setCashFlow(cashflow);
  }, [mortgage, rentEstimate, downPayment, customPrice, expenseRatio]);

  useEffect(() => {
    setRoi(
      ((cashFlow * 12) / (downPayment + closingCosts + parseInt(renovations))) *
        100
    );
  }, [cashFlow, downPayment, renovations, price, expenseRatio]);

  return (
    <div
      className={`p-2 mt-5 mb-0 border border-black rounded-md ${
        cashFlow >= 0 ? "bg-green-400" : "bg-red-400"
      }`}
    >
      <div className="flex justify-between">
        <div>Cash Flow:</div>
        <div>{Number.isNaN(cashFlow) ? `$0` : USDollar.format(cashFlow)}</div>
      </div>
      <div className="flex justify-between">
        <div>ROI:</div>
        <div>{Number.isNaN(roi) ? `0%` : roi.toFixed(2) + "%"}</div>
      </div>
    </div>
  );
};

export default Summary;
