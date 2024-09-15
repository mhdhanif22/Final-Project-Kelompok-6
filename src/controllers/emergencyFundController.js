function calculateEmergencyFund(
  monthlyExpenses,
  emergencyFundMonths,
  currentSavings,
  monthlySavings,
  returnOnInvestment,
  targetMonthsToSave
) {
  
  const totalEmergencyFund = monthlyExpenses * emergencyFundMonths * 1.5;

 
  let remainingEmergencyFund = totalEmergencyFund - currentSavings;
  if (remainingEmergencyFund < 0) {
    remainingEmergencyFund = 0;
  }

  // Inisialisasi nilai
  let periodsNeeded = 0;
  let totalSavings = currentSavings;
  const monthlyRate = returnOnInvestment / 100 / 12;
  const initialMonthlySavings = monthlySavings;

  // Hitung periode yang dibutuhkan untuk mencapai target
  while (
    totalSavings < totalEmergencyFund &&
    periodsNeeded < targetMonthsToSave
  ) {
    totalSavings += initialMonthlySavings;
    totalSavings *= 1 + monthlyRate; // Terapkan bunga bulanan
    periodsNeeded++;
  }

  // Tentukan apakah target dana darurat tercapai
  const achievedTarget = totalSavings >= totalEmergencyFund;

  // Hitung hasil investasi berdasarkan periode yang dibutuhkan
  const investmentResult = calculateInvestmentResult(
    currentSavings,
    initialMonthlySavings,
    returnOnInvestment,
    periodsNeeded
  );

  // Hitung total investasi yang terkumpul
  const totalInvestment = investmentResult;

  // Dynamic investment options based on emergency fund amount
  let investmentOptions;
  if (totalEmergencyFund < 50000000) {
    investmentOptions = ["Deposito", "Emas", "Reksadana Pasar Uang"];
  } else if (totalEmergencyFund < 100000000) {
    investmentOptions = [
      "Deposito",
      "Emas",
      "Reksadana Pasar Uang",
      "Reksadana Pendapatan Tetap Tertentu",
    ];
  } else {
    investmentOptions = [
      "Deposito",
      "Emas",
      "Reksadana Pasar Uang",
      "Reksadana Pendapatan Tetap Tertentu",
      "Saham",
      "Obligasi",
    ];
  }

  // Dynamic allocation percentages based on emergency fund amount
  let allocation;
  if (totalEmergencyFund < 50000000) {
    allocation = {
      savings: 60,
      investment: 40,
    };
  } else if (totalEmergencyFund < 100000000) {
    allocation = {
      savings: 55,
      investment: 45,
    };
  } else {
    allocation = {
      savings: 50,
      investment: 50,
    };
  }

  // Pesan jika target tercapai atau tidak
  let message;
  if (achievedTarget) {
    message = `Selamat! Anda telah mencapai target dana darurat sebesar Rp ${totalEmergencyFund.toLocaleString(
      "id-ID"
    )}. Anda dapat mempertimbangkan investasi pada opsi berikut: ${investmentOptions.join(
      ", "
    )}. Total investasi yang berhasil terkumpul adalah Rp ${totalInvestment.toLocaleString(
      "id-ID"
    )}.`;
  } else {
    message = `Maaf, Anda belum bisa mencapai target dana darurat sebesar Rp ${totalEmergencyFund.toLocaleString(
      "id-ID"
    )} dalam waktu ${targetMonthsToSave} bulan. Dibutuhkan sekitar ${periodsNeeded} bulan untuk mencapai target. Total investasi yang berhasil terkumpul adalah Rp ${totalInvestment.toLocaleString(
      "id-ID"
    )}.`;
  }

  // Return results
  return {
    totalEmergencyFund,
    remainingEmergencyFund: achievedTarget ? undefined : remainingEmergencyFund,
    periodsNeeded: achievedTarget ? undefined : periodsNeeded,
    achievedTarget,
    investmentResult,
    totalInvestment,
    investmentRecommendation: {
      allocation,
      investmentOptions,
    },
    message,
  };
}

function calculateInvestmentResult(
  currentSavings,
  monthlySavings,
  returnOnInvestment,
  periodsNeeded
) {
  let totalInvestment = currentSavings;
  const monthlyRate = returnOnInvestment / 100 / 12;

  for (let i = 0; i < periodsNeeded; i++) {
    totalInvestment += monthlySavings;
    totalInvestment *= 1 + monthlyRate; // Terapkan bunga bulanan
  }

  return totalInvestment;
}

module.exports = { calculateEmergencyFund };
