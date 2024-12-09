import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Header from "./components/header/index";
import Create from "./pages/create";
import { useEffect } from "react";
import api from "./utils/api";
import { useDispatch } from "react-redux";
import { setLoading, setError, setJobs } from "./redux/slices/jobSlice";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    //* Reducar'a yüklemenin başladığını haber ver.
    dispatch(setLoading());

    //* APi isteği at
    api
      .get("/jobs")
      //* Başarılı olursa reducar'a verilerin geldiği haberi ver
      .then((res) => dispatch(setJobs(res.data)))
      //* Başarısız olursa Reducar'a hata fırlat
      .catch((err) => dispatch(setError(err)));
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
