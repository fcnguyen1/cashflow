"use client";
import React from "react";
import Breakdown from "./Breakdown";
import Summary from "./Summary";

import { useState, useEffect } from "react";

let USDollar = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
});

const calculateMortgage = (price, downPayment, interestRate) => {
  let princpal = price * (1 - downPayment / 100);
  let monthlyInterest = interestRate / 1200;
  let numberOfPayments = 360;
  let denominator = Math.pow(1 + monthlyInterest, numberOfPayments) - 1;
  let monthlyPayment =
    princpal * (monthlyInterest + monthlyInterest / denominator);

  return monthlyPayment;
};

const Calculator = ({ propertyData, customPrice, customLoaded }) => {
  // Variable Initializations
  let initialPrice = propertyData ? propertyData.p : customPrice;
  let initialMortgage = calculateMortgage(initialPrice, 20, 5);
  let currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;

  propertyData = propertyData ? propertyData : {};

  // State Declarations
  const [price, setPrice] = useState(initialPrice);
  const [interestRate, setInterestRate] = useState(0);
  const [downPayment, setDownPayment] = useState(20);
  const [downPaymentAmt, setDownPaymentAmt] = useState(
    price * (downPayment / 100)
  );
  const [closingCosts, setClosingCosts] = useState(price * 0.015);
  const [rentEstimate, setRentEstimate] = useState(propertyData?.re || 0);
  const [expenseRatio, setExpenseRatio] = useState(50);
  const [mortgage, setMortgage] = useState(initialMortgage);
  const [renovations, setRenovations] = useState(0);
  const [loaded, setLoaded] = useState(false);

  // Use Effects
  useEffect(() => {
    const mortgagePayment = calculateMortgage(price, downPayment, interestRate);
    setMortgage(mortgagePayment);
  }, [price, interestRate, downPayment]);

  useEffect(() => {
    setDownPaymentAmt((price * downPayment) / 100);
    setClosingCosts(price * 0.015);
    return () => {};
  }, [price, downPayment]);

  useEffect(() => {
    // make api call to proxy file in api folder
    // src/pages/api/ <--- next.js format for in-app API Calls
    fetch(`/api/proxy`)
      // api proxy body here
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setInterestRate(parseFloat(data.observations[0].value));
      })
      .then(() => {
        setTimeout(() => {
          setLoaded(true);
          if (customLoaded) {
            customLoaded(true);
          }
        }, 1000);
      })
      .catch((error) => {
        console.log(error);
        setInterestRate(5.0);
        setLoaded(true);
        if (customLoaded) {
          customLoaded(true);
        }
      });
  }, []);

  // On Change
  const onInterestChange = (e) => {
    let newValue = parseFloat(e.target.value);

    if (isNaN(newValue)) {
      newValue = 0; // Default to 0 if the input is not a number
    } else if (newValue < 0) {
      newValue = 0; // Set to minimum value if less than 0
    } else if (newValue > 100) {
      newValue = 100; // Set to maximum value if greater than 100
    }

    setInterestRate(newValue);
  };

  const onDownPaymentChange = (e) => {
    let newValue = parseInt(e.target.value);

    if (isNaN(newValue)) {
      newValue = 0; // Default to 0 if the input is not a number
    } else if (newValue < 0) {
      newValue = 0; // Set to minimum value if less than 0
    } else if (newValue > 100) {
      newValue = 100; // Set to maximum value if greater than 100
    }

    setDownPayment(newValue);
  };

  const onExpenseChange = (e) => {
    let newValue = parseInt(e.target.value);

    if (isNaN(newValue)) {
      newValue = 0; // Default to 0 if the input is not a number
    } else if (newValue < 0) {
      newValue = 0; // Set to minimum value if less than 0
    } else if (newValue > 100) {
      newValue = 100; // Set to maximum value if greater than 100
    }

    setExpenseRatio(newValue);
  };

  const onRentEstimateChange = (e) => {
    setRentEstimate(parseInt(e.target.value || "0"));
  };

  const onRenovationChange = (e) => {
    setRenovations(e.target.value || "0");
  };

  const onPriceChange = (e) => {
    let newValue = parseFloat(e.target.value);

    if (isNaN(newValue)) {
      newValue = 0;
    } else if (newValue < 0) {
      newValue = 0;
    }

    setPrice(newValue);
  };

  return (
    <div>
      {loaded ? (
        <div>
          <div className="flex justify-between py-1">
            <label htmlFor="purchase-price" className="w-3/5">
              Purchase Price:
            </label>
            <div className="relative" style={{ width: "40%" }}>
              <div className="absolute inset-y-0 left-0 flex items-center pr-3% pointer-events-none">
                <span className="text-gray-500 px-2">$ </span>
              </div>
              <input
                type="number"
                id="purchase-price"
                name="purchase-price"
                step="10000"
                min="0"
                max="10000000"
                // placeholder={USDollar.format( || 0nt_estimate)}
                value={price.toString()}
                onChange={onPriceChange}
                className="py-2 px-5 border border-gray-300 rounded-md pr-5 w-full custom-input"
              />
            </div>
          </div>
          <div className="flex justify-between py-1">
            <label htmlFor="down-payment" className="w-3/5">
              Down Payment:
            </label>
            <div className="relative" style={{ width: "40%" }}>
              <input
                type="number"
                id="down-payment"
                name="down-payment"
                step="1"
                min="0"
                max="100"
                value={downPayment > 100 ? 100 : downPayment.toString()}
                onChange={onDownPaymentChange}
                className="py-2 px-4 border border-gray-300 rounded-md pr-5 w-full custom-input"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3% pointer-events-none">
                <span className="text-gray-500 px-2">%</span>
              </div>
            </div>
          </div>
          <div className="flex justify-between py-1">
            <label htmlFor="interest-rate" className="w-3/5">
              Interest Rate:
            </label>
            <div className="relative" style={{ width: "40%" }}>
              <input
                type="number"
                id="interest-rate"
                name="interest-rate"
                step="0.25"
                min="0"
                max="100"
                value={interestRate > 100 ? 100 : interestRate.toString()}
                onChange={onInterestChange}
                className="py-2 px-4 border border-gray-300 rounded-md pr-5 w-full custom-input"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3% pointer-events-none">
                <span className="text-gray-500 px-2">%</span>
              </div>
            </div>
          </div>
          <div className="flex justify-between py-1">
            <label htmlFor="expected-rent" className="w-3/5">
              Expected Rent:
            </label>
            <div className="relative" style={{ width: "40%" }}>
              <div className="absolute inset-y-0 left-0 flex items-center pr-3% pointer-events-none">
                <span className="text-gray-500 px-2">$ </span>
              </div>
              <input
                type="number"
                id="expected-rent"
                name="expected-rent"
                step="25"
                min="0"
                max="100000"
                value={rentEstimate.toString()}
                onChange={onRentEstimateChange}
                className="py-2 px-5 border border-gray-300 rounded-md pr-5 w-full custom-input"
              />
            </div>
          </div>
          <div className="flex justify-between py-1">
            <label htmlFor="expense-ratio" className="w-3/5">
              Expense Ratio:
            </label>
            <div className="relative" style={{ width: "40%" }}>
              <input
                type="number"
                id="expense-ratio"
                name="expense-ratio"
                step="1"
                min="0"
                max="100"
                value={expenseRatio > 100 ? 100 : expenseRatio.toString()}
                onChange={onExpenseChange}
                className="py-2 px-4 border border-gray-300 rounded-md pr-5 w-full custom-input"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3% pointer-events-none">
                <span className="text-gray-500 px-2">%</span>
              </div>
            </div>
          </div>
          <div className="flex justify-between py-1">
            <label htmlFor="renovations" className="w-3/5">
              Renovations:
            </label>
            <div className="relative" style={{ width: "40%" }}>
              <div className="absolute inset-y-0 left-0 flex items-center pr-3% pointer-events-none">
                <span className="text-gray-500 px-2">$ </span>
              </div>
              <input
                type="number"
                id="renovations"
                name="renovations"
                step="100"
                min="0"
                // defaultValue="0"
                value={renovations > 0 ? renovations.toString() : ""}
                onChange={onRenovationChange}
                className="py-2 px-5 border border-gray-300 rounded-md pr-5 w-full custom-input"
              />
            </div>
          </div>
          <Breakdown
            price={price}
            downPayment={downPaymentAmt}
            propertyData={propertyData}
            closingCosts={closingCosts}
            mortgage={mortgage}
            rentEstimate={rentEstimate}
            expenseRatio={expenseRatio}
            customPrice={customPrice}
          ></Breakdown>
          <Summary
            price={price}
            downPayment={downPaymentAmt}
            propertyData={propertyData}
            mortgage={mortgage}
            rentEstimate={rentEstimate}
            expenseRatio={expenseRatio}
            renovations={renovations}
            closingCosts={closingCosts}
            customPrice={customPrice}
          />{" "}
        </div>
      ) : (
        // <></>
        <div className="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
          <div className="animate-pulse flex space-x-4">
            {/* <div className="rounded-full bg-slate-700 h-10 w-10"></div> */}
            <div className="flex-1 space-y-6 py-1">
              <div className="h-2 bg-slate-700 rounded"></div>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                  <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                </div>
                <div className="h-2 bg-slate-700 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calculator;
