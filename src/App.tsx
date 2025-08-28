import "./App.css";
import { BoardView } from "./components/board/BoardView";
import { Header } from "./components/header/Header";
import { Sidebar } from "./components/sidebar/Sidebar";

function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="flex overflow-hidden h-[calc(100vh-83px)]">
        <Sidebar />
        <BoardView />
      </div>
    </div>
  );
}

export default App;
