import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StudentList from "./components/StudentList";
import StudentDetails from "./components/StudentDetails"; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StudentList />} />
        <Route path="/notes/:studentId" element={<StudentDetails />} />
      </Routes>
    </Router>
  );
}

export default App;




