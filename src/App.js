import Home from "./pages/Home";
import { Provider } from "react-redux";
import generateStore from "./redux/store";


export default function App() {
  const store = generateStore();

  return (
    <>
      <div className="Main">
        <Provider store={store}>
          <Home />
        </Provider>
      </div>
    </>
  );
}
