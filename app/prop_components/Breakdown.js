import React from "react";

let USDollar = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
});

const Breakdown = ({
  price,
  propertyData,
  downPayment,
  closingCosts,
  mortgage,
  customPrice,
  expenseRatio,
  rentEstimate,
}) => {
  let m_expenses, m_proptax;

  if (price) {
    m_proptax = (price * 0.01) / 12;
  } else {
    m_proptax = parseInt(propertyData.pt) / 12;
  }

  m_expenses = (rentEstimate * expenseRatio) / 100;

  return (
    <div className="pt-4">
      <div>
        <div className="flex justify-between">
          <div>Upfront Cost</div>
          <div>
            {USDollar.format(
              (Number.isNaN(downPayment) ? 0 : downPayment) +
                (Number.isNaN(closingCosts) ? 0 : closingCosts)
            )}
          </div>
        </div>
        <div className="text-sm text-gray-500	">
          <div className="flex justify-between">
            <div>&nbsp;&nbsp; Down Payment: &nbsp;</div>
            <div>
              {Number.isNaN(downPayment)
                ? USDollar.format(0)
                : USDollar.format(downPayment)}
            </div>
          </div>
          <div className="flex justify-between">
            <div>&nbsp;&nbsp; Closing Costs:</div>
            <div>
              {Number.isNaN(closingCosts)
                ? USDollar.format(0)
                : USDollar.format(closingCosts)}
            </div>
          </div>
        </div>
      </div>
      <br />
      <div>
        <div className="flex justify-between">
          <div>Monthly Cost</div>
          <div>
            {USDollar.format(
              (Number.isNaN(mortgage) ? 0 : mortgage) +
                (Number.isNaN(m_expenses) ? 0 : m_expenses) +
                (Number.isNaN(m_proptax) ? 0 : m_proptax)
            )}
          </div>
        </div>
        <div className="text-sm text-gray-500">
          <div className="flex justify-between">
            <div>&nbsp;&nbsp; Mortgage:</div>
            <div>
              {Number.isNaN(mortgage) ? `$0` : USDollar.format(mortgage)}
            </div>
          </div>
          <div className="flex justify-between">
            <div>&nbsp;&nbsp; Expenses:</div>
            <div>
              {Number.isNaN(m_expenses) ? `$0` : USDollar.format(m_expenses)}
            </div>
          </div>
          <div className="flex justify-between">
            <div>&nbsp;&nbsp; Property Tax:</div>
            <div>
              {Number.isNaN(m_proptax) ? `$0` : USDollar.format(m_proptax)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Breakdown;
