import React, { useReducer } from "react";

const initialState = {
  balance: 0,
  Loan: 0,
  status: false,
};
const reducer = (state, action) => {
  switch (action.type) {
    case "openAccount":
      return {
        ...state,
        status: true,
      };
    case "Deposit":
      return {
        ...state,
        balance: state.balance + action.payload,
      };
    case "withdraw":
      return {
        ...state,
        balance: state.balance - action.payload,
      };
    case "requestLoan":
      return {
        ...state,
        Loan: state.Loan + action.payload,
      };
    case "payloan":
      return {
        ...state,
        Loan: 0,
      };
    case "CloseAccount":
      return {
        ...initialState,
      };
    default:
      throw new Error("action unknown");
  }
};

const BankAccount = () => {
  const [{ balance, Loan, status }, dispatch] = useReducer(
    reducer,
    initialState
  );
  return (
    <div>
      <h1>Balance:{balance}</h1>
      <h1>Loan:{Loan}</h1>

      <Button
        dispatch={() => dispatch({ type: "openAccount" })}
        status={status}
      >
        Open Account
      </Button>
      <Button
        dispatch={() => dispatch({ type: "Deposit", payload: 150 })}
        status={!status}
      >
        Deposit 150
      </Button>
      <Button
        dispatch={() => dispatch({ type: "withdraw", payload: 50 })}
        status={!status}
      >
        Withdraw 50
      </Button>
      <Button
        dispatch={() => dispatch({ type: "requestLoan", payload: 5000 })}
        status={!status}
      >
        Request a Loan of 5000
      </Button>
      <Button dispatch={() => dispatch({ type: "payloan" })} status={!status}>
        PayLoan
      </Button>
      <Button
        dispatch={() => dispatch({ type: "CloseAccount" })}
        status={!status}
      >
        Close Account
      </Button>
    </div>
  );
};
const Button = ({ children, status, dispatch }) => {
  return (
    <button onClick={dispatch} disabled={status}>
      {children}
    </button>
  );
};
export default BankAccount;
