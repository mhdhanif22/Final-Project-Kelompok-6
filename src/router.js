const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const { calculateInvestment } = require("./controllers/investmentController");
const {
  calculateEmergencyFund,
} = require("./controllers/emergencyFundController");
const bioskopRoutes = require("./bioskop");

const service = require("./controllers/profitLossController");

const sendError = (res, statusCode, message) => {
  res.status(statusCode).json({ error: message });
};

// erfia nadia safari
router.use("/bioskop", bioskopRoutes);

router.get("/", (req, res) => {
  fs.readFile(
    path.join(__dirname, "data", "dataKelompok.json"),
    (err, data) => {
      if (err) {
        return sendError(res, 500, "Error reading file");
      } else {
        const jsonData = JSON.parse(data);
        const groupName = jsonData.nama;
        const members = jsonData.anggota;

        res.render("index", { groupName, members });
      }
    }
  );
});

router.get("/calculate", (req, res) => {
  fs.readFile(
    path.join(__dirname, "data", "calculatorlist.json"),
    (err, data) => {
      if (err) {
        return sendError(res, 500, "Error reading file");
      }

      let jsonData;
      try {
        jsonData = JSON.parse(data);
      } catch {
        return sendError(res, 500, "Error parsing JSON data");
      }

      res.json(jsonData);
    }
  );
});

router.post("/calculate/investment", (req, res) => {
  const {
    targetAmount,
    years,
    currentAmount,
    savingsFrequency,
    savingsTiming,
    savingsAmount,
    annualReturn,
  } = req.body;

  // Validasi input
  if (
    targetAmount === undefined ||
    years === undefined ||
    currentAmount === undefined ||
    !savingsFrequency ||
    !savingsTiming ||
    savingsAmount === undefined ||
    annualReturn === undefined
  ) {
    return res.status(400).json({ error: "Semua field harus diisi" });
  }

  // Validasi tipe data
  if (
    typeof targetAmount !== "number" ||
    typeof years !== "number" ||
    typeof currentAmount !== "number" ||
    typeof savingsAmount !== "number" ||
    typeof annualReturn !== "number"
  ) {
    return res.status(400).json({ error: "Input numerik harus berupa angka" });
  }

  // Validasi nilai
  if (
    years <= 0 ||
    annualReturn < 0 ||
    targetAmount <= 0 ||
    savingsAmount < 0
  ) {
    return res.status(400).json({ error: "Nilai input tidak valid" });
  }

  // Validasi savingsFrequency dan savingsTiming
  if (
    savingsFrequency !== "SetiapBulan" &&
    savingsFrequency !== "SetiapTahun"
  ) {
    return res.status(400).json({
      error: 'Frekuensi menabung harus "SetiapBulan" atau "SetiapTahun"',
    });
  }

  if (
    (savingsFrequency === "SetiapBulan" &&
      savingsTiming !== "AwalBulan" &&
      savingsTiming !== "AkhirBulan") ||
    (savingsFrequency === "SetiapTahun" &&
      savingsTiming !== "AwalTahun" &&
      savingsTiming !== "AkhirTahun")
  ) {
    return res.status(400).json({
      error: "Waktu menabung tidak sesuai dengan frekuensi menabung",
    });
  }

  const result = calculateInvestment(
    targetAmount,
    years,
    currentAmount,
    savingsFrequency,
    savingsTiming,
    savingsAmount,
    annualReturn
  );

  let message;
  if (result.achievedTarget) {
    message = `Selamat! Strategi investasi Anda berhasil mencapai target dalam ${result.periodsNeeded} ${result.periodType}.`;
  } else {
    message = `Strateginya belum cocok untuk mencapai mimpi kamu 😞. Anda hanya mencapai Rp${result.finalAmount.toLocaleString()} dalam ${years} tahun.`;
  }

  res.json({
    ...result,
    message,
  });
});
router.post("/calculate/emergencyfund", (req, res) => {
  const {
    monthlyExpenses,
    emergencyFundMonths,
    currentSavings,
    monthlySavings,
    returnOnInvestment,
    targetMonthsToSave,
  } = req.body;

  // Validasi input
  if (
    monthlyExpenses === undefined ||
    emergencyFundMonths === undefined ||
    currentSavings === undefined ||
    monthlySavings === undefined ||
    returnOnInvestment === undefined ||
    targetMonthsToSave === undefined
  ) {
    return res.status(400).json({ error: "Semua field harus diisi" });
  }

  // Validasi tipe data
  if (
    typeof monthlyExpenses !== "number" ||
    typeof emergencyFundMonths !== "number" ||
    typeof currentSavings !== "number" ||
    typeof monthlySavings !== "number" ||
    typeof returnOnInvestment !== "number" ||
    typeof targetMonthsToSave !== "number"
  ) {
    return res.status(400).json({ error: "Input numerik harus berupa angka" });
  }

  // Validasi nilai
  if (
    emergencyFundMonths <= 0 ||
    returnOnInvestment < 0 ||
    monthlyExpenses <= 0 ||
    monthlySavings < 0 ||
    targetMonthsToSave <= 0
  ) {
    return res.status(400).json({ error: "Nilai input tidak valid" });
  }

  const result = calculateEmergencyFund(
    monthlyExpenses,
    emergencyFundMonths,
    currentSavings,
    monthlySavings,
    returnOnInvestment,
    targetMonthsToSave
  );

  res.json(result);
});

/**
 * API to find profit/loss of stock transaction
 * https://localhost:3000/profit-loss
 */

router.post("/profit-loss", (req, res) => {
  const body = req.body;
  const validate = service.validation(body);

  if (!validate.isValid) {
    return res.status(400).json({
      status: "failed",
      message: validate.message,
    });
  }

  const response = service.response(body);
  return res.json({
    status: "success",
    data: response,
  });
});

const katalog = {
  nominal: [20000, 50000, 100000, 200000, 500000, 1000000, 5000000],
  toko: [
    { nama: "gopay", biayaAdmin: 3000 },
    { nama: "grab-merchant", biayaAdmin: 300 },
    { nama: "jakone-mobile", biayaAdmin: 3000 },
    { nama: "ovo", biayaAdmin: 2500 },
    { nama: "shopeepay", biayaAdmin: 2750 },
  ],
};

router.get("/tagihan-listrik-prabayar", (req, res) => {
  const { nominal, toko } = req.query;

  if (!nominal || !toko) {
    return res.json({
      message: "Selamat datang di cek tagihan listrik prabayar ^_^",
      nominal: katalog.nominal,
      toko: katalog.toko.map((item) => ({ nama: item.nama })),
    });
  }

  const nominalInt = parseInt(nominal);
  const nominalUrl = katalog.nominal.find((item) => item === nominalInt);
  const tokoUrl = katalog.toko.find((item) => item.nama === toko);

  if (!nominalUrl) {
    return res.status(400).json({
      message:
        "Nominal tersebut tidak tercantum pada katalog. Silahkan ketikkan lagi.",
    });
  }

  if (!tokoUrl) {
    return res.status(400).json({
      message: "Toko yang diinputkan tidak sesuai. Silahkan ketikkan ulang.",
    });
  }

  const totalTagihan = nominalUrl + tokoUrl.biayaAdmin;

  return res.json({
    nominal: nominalUrl,
    toko: tokoUrl.nama,
    totalTagihan: totalTagihan,
  });
});

module.exports = router;
