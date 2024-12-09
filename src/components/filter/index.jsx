import Input from "./../../pages/create/Input";
import Select from "./../../pages/create/Select";
import { setJobs } from "../../redux/slices/jobSlice";
import {
  typeOptions,
  statusOptions,
  shortOptions,
} from "../../utils/constants";
import { useEffect, useState } from "react";
import api from "./../../utils/api";
import { useDispatch } from "react-redux";

const Filter = () => {
  const [text, setText] = useState();
  const [debouncedText, setDebouncedText] = useState();
  const [status, setStatus] = useState();
  const [type, setType] = useState();
  const [short, setShort] = useState();

  const dispatch = useDispatch();

  //*Debounce
  //*Bir fonk. çok sık gerçekleşmesini önelemkte kullanılır. Her tuş basımında arama yapmak yerine, belirli bir süre bekler ve kulanıcının yazmasını bitirmesini bekler.
  //* Bu işlem gereksiz ağ isteklerini ve renderları önler.

  useEffect(() => {
    //* Text undefined ise kodu kır
    if (text === undefined) return;
    //* Tuşlara her basıldığında bir sayaç başlar, sayacın bitiminde elde edilen input değeri yansıtılır
    const id = setTimeout(() => setDebouncedText(text), 500);

    //* Süre bitmeden useEffect tekrar çalışırsa (Yeni tuşa basıldıkça süre yeniden başlar) önceki sayacı iptal et

    return () => clearTimeout(id);
  }, [text]);

  //* Filtrelere göre API'dan verileri al ardından Reducar'ı güncelle
  useEffect(() => {
    const params = {
      q: debouncedText,
      status,
      type,
      _sort: short === "a-z" || short === "z-a" ? "company" : "date",
      _order: short === "a-z" || short === "En Eski" ? "asc" : "desc",
    };

    api
      .get("/jobs", { params })
      .then((res) => dispatch(setJobs(res.data)))
      .catch((err) => console.log(err));
  }, [debouncedText, status, type, short]);

  return (
    <div className="filter-sec">
      <h2>Filtreleme Formu</h2>

      <form>
        <Input label="Ara" handleChange={(e) => setText(e.target.value)} />
        <Select
          label="Durum"
          options={statusOptions}
          handleChange={(e) => setStatus(e.target.value)}
        />
        <Select
          label="Tür"
          options={typeOptions}
          handleChange={(e) => setType(e.target.value)}
        />
        <Select
          label="Sırala"
          options={shortOptions}
          handleChange={(e) => setShort(e.target.value)}
        />

        <div className="btn-wrapper">
          <button className="button">Filtreleri sıfırla</button>
        </div>
      </form>
    </div>
  );
};

export default Filter;
