import "./index.css";
import Calculator from "./components/Calculator";
import Results from "./components/Result";
import CodingNinja from "./components/CodingNinja";
import { MortgageProvider } from "./contexts/useMortgage";

function App() {
  return (
    <MortgageProvider>
      <div className="layout">
        <div className="app">
          <Calculator />
          <Results />
        </div>
        <CodingNinja />
      </div>
    </MortgageProvider>
  );
}

export default App;
