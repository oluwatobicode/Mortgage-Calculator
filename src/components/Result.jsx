import { useMort } from "../contexts/useMortgage";

const Results = () => {
  const { result, total } = useMort();

  {
    console.log(result, total);
  }

  if (result === null || isNaN(result))
    return (
      <div className="empty-section">
        <img
          src="./assets/images/illustration-empty.svg"
          alt="illustration-empty"
        />
        <h1> Results shown here</h1>
        <p>
          Complete the form and click “calculate repayments” to see what your
          monthly repayments would be.
        </p>
      </div>
    );

  return (
    <div className="results">
      <div className="result-intro">
        <h1> Your results</h1>
        <p>
          Your results are shown below based on the information you provided. To
          adjust the results, edit the form and click “calculate repayments”
          again.
        </p>
      </div>
      <div className="results-box">
        <div className="monthly-result">
          <p>Your monthly repayments</p>
          <h1>
            {Intl.NumberFormat("en-GB", {
              style: "currency",
              currency: "GBP",
            }).format(result)}
          </h1>
        </div>
        <div className="term-result">
          <p> Total you&apos;ll repay over the term</p>
          <h2>
            {Intl.NumberFormat("en-GB", {
              style: "currency",
              currency: "GBP",
            }).format(total)}
          </h2>
        </div>
      </div>
    </div>
  );
};
export default Results;
