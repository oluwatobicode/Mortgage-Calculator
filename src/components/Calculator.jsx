import { useMort } from "../contexts/useMortgage";

const Calculator = () => {
  const mortgage_type = ["Repayment", "Interest Only"];
  // getting all data from contextApi
  const { amount, term, interest, type, dispatch, selected, error } = useMort();

  return (
    <div className="calculator-section">
      <div className="section-one">
        <h3>Mortgage Calculator</h3>
        <button
          className="clear"
          onClick={(e) => {
            e.preventDefault();
            dispatch({ type: "clear" });
          }}
        >
          <p>Clear All</p>
        </button>
      </div>

      <div className="section-two">
        <form>
          {/* first input  */}
          <div className="section-two-input-one">
            <h3>Mortgage Amount</h3>
            <div className="mortgage-amount-input">
              <div className={`${error ? "error-icon-pounds" : "pounds-icon"}`}>
                £
              </div>
              <input
                value={amount}
                onChange={(e) =>
                  dispatch({ type: "mortgageAmount", payLoad: e.target.value })
                }
                className={`amount-input ${error ? "error-input" : ""}`}
                type="text"
                name=""
                id=""
              />
            </div>
            {error && <p className="error">{error}</p>}
          </div>

          {/* second input */}
          <div className="section-two-input-two">
            <div className="mortgage_term">
              <h3>Mortgage Term</h3>
              <div className="mortgage-term-input">
                <input
                  value={term}
                  onChange={(e) =>
                    dispatch({ type: "mortgageTerm", payLoad: e.target.value })
                  }
                  className={`mortgage_input ${error ? "error-input" : ""}`}
                  type="text"
                  name=""
                  id=""
                />
                <div className={`${error ? "error-icon" : "mortgage-icon"}`}>
                  years
                </div>
              </div>
              {error && <p className="error">{error}</p>}
            </div>
            <div className="interest_rate">
              <h3>Interest Rate</h3>
              <div className="interest_rate-input">
                <input
                  value={interest}
                  onChange={(e) => {
                    dispatch({
                      type: "mortgageInterest",
                      payLoad: e.target.value,
                    });
                  }}
                  className={`interest_input ${error ? "error-input" : ""}`}
                  type="text"
                  name=""
                  id=""
                />
                <div className={`${error ? "error-icon" : "interest-icon"}`}>
                  %
                </div>
              </div>
              {error && <p className="error">{error}</p>}
            </div>
          </div>

          {/* third input */}
          <div className="mortgage_type">
            <h3> Mortgage Type</h3>
            <div className="mortgage_type_select">
              {mortgage_type.map((el, index) => (
                <button
                  key={index}
                  className="mortgage_select"
                  onClick={(e) => {
                    e.preventDefault();

                    dispatch({
                      type: "mortgageType",
                      payLoad: el,
                      chosen: index,
                    });
                  }}
                >
                  <span className="circle">
                    <span
                      className={`${index === selected ? `active` : ""}`}
                    ></span>
                  </span>

                  <p>{el}</p>
                </button>
              ))}
            </div>
            {error && <p className="error">{error}</p>}
          </div>

          <button
            className="calculate"
            onClick={(e) => {
              e.preventDefault();
              !interest || !amount || !term || !type
                ? dispatch({
                    type: "noInput",
                    payLoad: "This field is required!",
                  })
                : dispatch({ type: "calculate", payLoad: "" });
            }}
          >
            <img
              src="./assets/images/icon-calculator.svg"
              alt="icon-calculator"
            />
            <p>Calculate Repayments</p>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Calculator;
