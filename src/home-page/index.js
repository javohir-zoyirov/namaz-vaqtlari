import "./style.css";
import axios from "axios";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
dayjs.extend(duration);

export const HomePage = () => {
  const [data, setData] = useState({});
  const [hafta, setHafta] = useState([]);
  const [time, setTime] = useState({});
  const [oy, setOy] = useState([]);
  const [filterData, setFilterData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://islomapi.uz/api/present/day?region=Toshkent"
        );
        setData(response.data);
        setFilterData(response.data);
      } catch (error) {
        console.error("Errorrr", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchWeekData = async () => {
      try {
        const response = await axios.get(
          "https://islomapi.uz/api/present/week?region=Toshkent"
        );
        setHafta(response.data);
      } catch (error) {
        console.error("Errorrr", error);
      }
    };
    fetchWeekData();
  }, []);

  useEffect(() => {
    const fetchMonthData = async () => {
      try {
        const response = await axios.get(
          "https://islomapi.uz/api/monthly?region=Toshkent&month=4"
        );
        setOy(response.data);
      } catch (error) {
        console.error("Errorrr", error);
      }
    };
    fetchMonthData();
  }, []);

  useEffect(() => {
    const presentTime = async () => {
      try {
        const response = await axios.get(
          "http://worldtimeapi.org/api/timezone/Asia/Tashkent"
        );
        setTime(response.data);
      } catch (error) {
        console.error("Xato:", error);
      }
    };
    presentTime();
  }, []);

  const formattedTime = time.datetime
    ? dayjs(time.datetime).format("h:mm:ss A")
    : "Yuklanmoqda...";

  const currentTime = dayjs(time.datetime);
  const Bomdod = dayjs(`2024-09-11T${filterData?.times?.tong_saharlik}`);
  const Quyosh = dayjs(`2024-09-11T${filterData?.times?.quyosh}`);
  const Peshin = dayjs(`2024-09-11T${filterData?.times?.peshin}`);
  const Asr = dayjs(`2024-09-11T${filterData?.times?.asr}`);
  const ShomIftor = dayjs(`2024-09-11T${filterData?.times?.shom_iftor}`);

  const getTimeDifference = (start, end) => {
    const diff = dayjs.duration(end.diff(start));
    return `${diff.hours()} soat ${diff.minutes()} minut ${diff.seconds()} sekund`;
  };

  return (
    <div className="container" style={{ height: "" }}>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <a className="navbar-brand text-white fw-bold" href="#">
            Namoz vaqtlari
          </a>
        </div>
      </nav>
      <div>
        <p className="fs-3 fw-bold text-white my-4">
          {filterData?.region} viloyati
        </p>
      </div>
      <div className="mb-4">
        <p>
          <span className="fw-bold fs-4 text-white">{filterData?.date} </span>{" "}
          <span className="fs-2 fw-bold text-white mx-2">/</span>{" "}
          <span className="fw-bold fs-4 text-white">
            {filterData?.hijri_date?.day} kun {filterData?.hijri_date?.month} oyi
          </span>
        </p>
      </div>
      <div className="d-flex justify-content-center gap-3 mb-4">
        <button
          onClick={() => setFilterData(data)}
          type="button"
          className="btn btn-info text-white"
        >
          Bugungi
        </button>
        <div className="dropdown">
          <button
            className="btn btn-info text-white dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Haftalik
          </button>
          <ul className="dropdown-menu bg-info">
            {hafta.map((item, index) => (
              <li
                key={index}
                onClick={() => setFilterData(item)}
                className="lii"
              >
                <button className="dropdown-item" type="button">
                  {item?.weekday}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mb-4">
        <p className="fs-3 fw-bold mt-3 text-white">
          Hozirgi vaqt: {formattedTime}
        </p>
      </div>
      <div className="mb-5">
        <p className="fs-3 fw-bold mt-3 text-white">
          {Bomdod.isBefore(currentTime) && Quyosh.isAfter(currentTime) ? (
            <>Quyoshgacha: {getTimeDifference(currentTime, Quyosh)}</>
          ) : Quyosh.isBefore(currentTime) && Peshin.isAfter(currentTime) ? (
            <>Peshingacha: {getTimeDifference(currentTime, Peshin)}</>
          ) : Peshin.isBefore(currentTime) && Asr.isAfter(currentTime) ? (
            <>Asrgacha: {getTimeDifference(currentTime, Asr)}</>
          ) : Asr.isBefore(currentTime) && ShomIftor.isAfter(currentTime) ? (
            <>Shomgacha: {getTimeDifference(currentTime, ShomIftor)}</>
          ) : (
            <>Vaqt o'zgarishi kerak</>
          )}
        </p>
      </div>
      <div className="row my-5" style={{height:""}}>
        <div className="col-lg-2 col-md-3 col-sm-4 col-12">
          <div
            style={{ height: "120px" }}
            className="card mb-4 card-time text-white d-flex justify-content-center"
          >
            <div className="ps-5">
              <p className="fw-bold fs-4">{filterData?.times?.tong_saharlik}</p>
              <p className="fw-bold fs-4">Bomdod</p>
            </div>
          </div>
        </div>
        <div className="col-lg-2 col-md-3 col-sm-4 col-12">
          <div
            style={{ height: "120px" }}
            className="card mb-4 card-time text-white d-flex justify-content-center"
          >
            <div className="ps-5">
              <p className="fw-bold fs-4">{filterData?.times?.quyosh}</p>
              <p className="fw-bold fs-4">Quyosh</p>
            </div>
          </div>
        </div>
        <div className="col-lg-2 col-md-3 col-sm-4 col-12">
          <div
            style={{ height: "120px" }}
            className="card mb-4 card-time text-white d-flex justify-content-center"
          >
            <div className="ps-5">
              <p className="fw-bold fs-4">{filterData?.times?.peshin}</p>
              <p className="fw-bold fs-4">Peshin</p>
            </div>
          </div>
        </div>
        <div className="col-lg-2 col-md-3 col-sm-4 col-12">
          <div
            style={{ height: "120px" }}
            className="card mb-4 card-time text-white d-flex justify-content-center"
          >
            <div className="ps-5">
              <p className="fw-bold fs-4">{filterData?.times?.asr}</p>
              <p className="fw-bold fs-4">Asr</p>
            </div>
          </div>
        </div>
        <div className="col-lg-2 col-md-3 col-sm-4 col-12">
          <div
            style={{ height: "120px" }}
            className="card mb-4 card-time text-white d-flex justify-content-center"
          >
            <div className="ps-5">
              <p className="fw-bold fs-4">{filterData?.times?.shom_iftor}</p>
              <p className="fw-bold fs-4">Shom</p>
            </div>
          </div>
        </div>
        <div className="col-lg-2 col-md-3 col-sm-4 col-12">
          <div
            style={{ height: "120px" }}
            className="card mb-4 card-time text-white d-flex justify-content-center"
          >
            <div className="ps-5">
              <p className="fw-bold fs-4">{filterData?.times?.hufton}</p>
              <p className="fw-bold fs-4">Xufton</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5 pb-3">
        <p className="text-white fw-bold fs-4">
          Bu saytdagi malumotlar xato bo'lishi ham mumkin!
        </p>
      </div>
    </div>
  );
};
