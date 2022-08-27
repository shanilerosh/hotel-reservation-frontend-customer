import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import AppRouter from "./routing/AppRouter";

function App() {
    return (
        <div className="App">
            <AppRouter/>
        </div>
    );
}

export default App;
