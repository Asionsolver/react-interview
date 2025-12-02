import Accordion from "./components/accordion";
import AutoSearchBar from "./components/autocomplete-searchbar/auto-searchbar";
import ProblemOne from "./components/bento-grid/problem-one";
import ProblemThree from "./components/bento-grid/problem-three";
import ProblemTwo from "./components/bento-grid/problem-two";
import ChipsInput from "./components/chips-input/chips-input";
import DatePicker from "./components/date-picker/date-picker";
import SideBar from "./components/sidebar/file-explorer";
import GridLight from "./components/grid-light/grid-light";
import UserList from "./components/immutable-state/immutability/user-list";
import { ToastProvider } from "./components/immutable-state/movie-watch/components/ToastContext";
import MovieWatch from "./components/immutable-state/movie-watch/movie-watch";
import Otp from "./components/otp/otp";
import Pagination from "./components/pagination/pagination";
import ProgressBar from "./components/progress-bar/progress-bar";
import Modal from "./components/react-portal/modal";
import PortalModal from "./components/react-portal/portal-modal";
import TraditionalModal from "./components/react-portal/traditional-modal";
import SelectableGrid from "./components/selectable-grid/selectable-grid";
import TabForm from "./components/tab-form/tab-form";
import ProductTable from "./components/table/product-table";
import Theme from "./components/theme/theme";
import { ThemeProvider } from "./components/theme/ThemeProvider";
import Todo from "./components/todo-list/todo";
import FileExplorer from "./components/file-explorer/file-explorer";
import NestedCheckBoxes from "./components/nested-checkboxes/nested-checkboxes";

function App() {
  return (
    <ToastProvider>
      {/* <Accordion /> */}
      {/* <TabForm /> */}
      {/* <ProblemOne /> */}
      {/* <ProblemTwo /> */}
      {/* <ProblemThree /> */}
      {/* <Pagination /> */}
      {/* <AutoSearchBar /> */}
      {/* <ProgressBar /> */}
      {/* <SideBar /> */}
      {/* <Theme /> */}
      {/* <Otp /> */}
      {/* <ChipsInput /> */}
      {/* <Todo /> */}
      {/* <ProductTable /> */}
      {/* <Modal /> */}
      {/* <TraditionalModal /> */}
      {/* <UserList /> */}
      {/* <PortalModal /> */}
      {/* <DatePicker /> */}
      {/* <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <MovieWatch />
      </div> */}
      {/* <SelectableGrid /> */}
      {/* <GridLight /> */}
      {/* <FileExplorer /> */}
      <NestedCheckBoxes />
    </ToastProvider>
  );
}

export default App;
