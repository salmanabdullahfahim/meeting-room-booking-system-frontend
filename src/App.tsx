import { ScrollRestoration } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";

function App() {
  return (
    <>
      <MainLayout />
      <ScrollRestoration />
    </>
  );
}

export default App;
