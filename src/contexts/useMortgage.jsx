/* eslint-disable react/prop-types */
import { useContext, createContext, useReducer } from "react";

// initial state for the object

const initialState = {
  amount: "",
  interest: "",
  term: "",
  selected: null,
  type: null,
  result: null,
  total: null,
};

// dispatch function
function reducer(state, action) {
  switch (action.type) {
    case "mortgageAmount":
      return { ...state, amount: action.payLoad };
    case "mortgageTerm":
      return { ...state, term: action.payLoad };
    case "mortgageInterest":
      return { ...state, interest: action.payLoad };
    case "mortgageType":
      return { ...state, type: action.payLoad, selected: action.chosen };
    case "calculate":
      return {
        ...state,
        result:
          state.type === "Repayment"
            ? (parseInt(state.amount) *
                (parseFloat(state.interest) / 100 / 12)) /
              (1 -
                (1 + parseFloat(state.interest / 100) / 12) **
                  -(12 * parseFloat(state.term)))
            : parseInt(state.amount) * (parseFloat(state.interest) / 100 / 12),
        total:
          state.type === "Repayment"
            ? parseFloat(state.result) * (12 * parseInt(state.term))
            : parseFloat(state.result) * (12 * parseInt(state.term)) +
              parseInt(state.amount),
      };

    case "clear":
      return {
        amount: "",
        interest: "",
        term: "",
        type: null,
        result: null,
        total: null,
      };
    default:
      throw new Error("action not recognized!");
  }
}

// 1. Create the context
const mortgage = createContext();

const MortgageProvider = ({ children }) => {
  const [{ type, term, amount, interest, selected, result, total }, dispatch] =
    useReducer(reducer, initialState);

  return (
    <div>
      <mortgage.Provider
        value={{
          type,
          dispatch,
          amount,
          term,
          interest,
          selected,
          result,
          total,
        }}
      >
        {children}
      </mortgage.Provider>
    </div>
  );
};

// 2. Consume the context
const useMort = () => {
  const context = useContext(mortgage);
  if (context === undefined)
    throw new Error("It was used outside of the context provider!");
  return context;
};

// 3. Export the contextApi so it can be used everywhere

export { MortgageProvider, useMort };
