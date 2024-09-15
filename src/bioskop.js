// erfia nadia safari
const express = require("express");
const router = express.Router();

const filmList = [
  { id: 1, title: "Exhuma" },
  { id: 2, title: "Kimi no Nawa" },
  { id: 3, title: "Haikyuu!" },
];

const days = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];
const times = [
  { id: 1, time: "11.00 - 13.15" },
  { id: 2, time: "13.30 - 15.45" },
  { id: 3, time: "16.00 - 18.15" },
];

const auditorium = [
  { id: 1, name: "Audi 1" },
  { id: 2, name: "Audi 2" },
  { id: 3, name: "Audi 3" },
];

const seatTypes = [
  { id: 1, type: "Reguler" },
  { id: 2, type: "Sweetbox" },
];

router.get("/films", (req, res) => {
  res.json(filmList);
});

router.get("/auditorium", (req, res) => {
  res.json(auditorium);
});

router.get("/days", (req, res) => {
  res.json(days);
});

router.get("/times", (req, res) => {
  res.json(times);
});

router.get("/seat-type", (req, res) => {
  res.json(seatTypes);
});

router.get("/", (req, res) => {
  res.send("Selamat Datang di CGV Plaza Shibuya");
});

router.post("/book", function (req, res) {
  const filmId = parseInt(req.body.filmId);
  const dayIndex = parseInt(req.body.dayIndex);
  const timeId = parseInt(req.body.timeId);
  const audiId = parseInt(req.body.audiId);
  const seatTypesId = parseInt(req.body.seatTypesId);

  if (
    filmId < 1 ||
    filmId > filmList.length ||
    dayIndex < 0 ||
    dayIndex > days.length ||
    timeId > 1 ||
    timeId > times.length ||
    audiId < 1 ||
    audiId > `auditorium`.length ||
    seatTypesId < 1 ||
    seatTypesId > seatTypes.length
  ) {
    return res.status(400).json({ message: "Input tidak valid! " });
  }

  const film = filmList.find((f) => f.id === filmId);
  const day = days[dayIndex];
  const time = times.find((t) => t.id === timeId);
  const audi = auditorium.find((s) => s.id === audiId);
  const type = seatTypes.find((s) => s.id === seatTypesId);

  if (!film || !day || !time || !audi || !seatTypes) {
    return res.status(400).json({ message: "Data tidak valid!" });
  }
  const tiket = {
    film: film.title,
    hari: day,
    waktu: time.time,
    kursi: type.type,
  };

  res.json({
    message: "Tiket berhasil dipesan!",
    tiket,
  });
});

module.exports = router;
