import "./App.css";
import FormStepperGenerator from "./components/FormGenerator";

function App() {
  return (
    <div
      className="App"
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <FormStepperGenerator />
    </div>
  );
}

export default App;
