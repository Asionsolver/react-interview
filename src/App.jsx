import Accordion from "./components/accordion";
import AutoSearchBar from "./components/autocomplete-searchbar/auto-searchbar";
import ProblemOne from "./components/bento-grid/problem-one";
import ProblemThree from "./components/bento-grid/problem-three";
import ProblemTwo from "./components/bento-grid/problem-two";
import ChipsInput from "./components/chips-input/chips-input";
import FileExplorer from "./components/file-explorer/file-explorer";
import Otp from "./components/otp/otp";
import Pagination from "./components/pagination/pagination";
import ProgressBar from "./components/progress-bar/progress-bar";
import TabForm from "./components/tab-form/tab-form";
import Theme from "./components/theme/theme";
import { ThemeProvider } from "./components/theme/ThemeProvider";
import Todo from "./components/todo-list/todo";

function App() {
  return (
    <>
      {/* <Accordion /> */}
      {/* <TabForm /> */}
      {/* <ProblemOne /> */}
      {/* <ProblemTwo /> */}
      <ProblemThree />
      {/* <Pagination /> */}
      {/* <AutoSearchBar /> */}
      {/* <ProgressBar /> */}
      {/* <FileExplorer /> */}
      {/* <Theme /> */}
      {/* <Otp /> */}
      {/* <ChipsInput /> */}
      {/* <Todo /> */}
    </>
  );
}

export default App;
