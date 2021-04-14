import logo from "./logo.svg";
import "./App.css";
import Amplify from "aws-amplify";
import awsconfig from "./aws-exports";
import AuthPage from "./AuthPage";

Amplify.configure(awsconfig);

function App() {
  return (
    <div className="App">
      <h1>Amplify Auth</h1>
      <AuthPage />
    </div>
  );
}

export default App;
