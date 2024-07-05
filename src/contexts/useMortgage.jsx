/* eslint-disable react/prop-types */
import { useContext, createContext, useReducer } from "react";

// initial state for the object
const initialState = {
  result: null,
  amount: "",
  interest: "",
  term: "",
  selected: null,
  type: null,
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
      return { ...state, result: 23 };
    case "clear":
      return {
        result: null,
        amount: "",
        interest: "",
        term: "",
        type: null,
      };
    default:
      throw new Error("action not recognized!");
  }
}

// 1. Create the context
const mortgage = createContext();

const MortgageProvider = ({ children }) => {
  const [{ result, type, term, amount, interest, selected }, dispatch] =
    useReducer(reducer, initialState);

  return (
    <div>
      <mortgage.Provider
        value={{
          result,
          type,
          dispatch,
          amount,
          term,
          interest,
          selected,
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
