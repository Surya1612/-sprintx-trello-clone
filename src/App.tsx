import "./App.css";
import { BoardView } from "./components/board/BoardView";
import { Header } from "./components/header/Header";
import { Sidebar } from "./components/sidebar/Sidebar";

function App() {
  return (
    <div>
      <Header />
      <div className="flex">
        <Sidebar />
        <BoardView />
      </div>
    </div>
  );
}

export default App;
