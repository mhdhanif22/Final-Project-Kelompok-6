function calculateInvestment(
  targetAmount,
  years,
  currentAmount,
  savingsFrequency,
  savingsTiming,
  savingsAmount,
  annualReturn
) {
  const annualReturnRate = annualReturn / 100;
  const monthlyReturnRate = Math.pow(1 + annualReturnRate, 1 / 12) - 1;
  let totalAmount = currentAmount;
  let periodsToTarget = 0;
  const totalPeriods = savingsFrequency === 'SetiapBulan' ? years * 12 : years;

  const calculateReturn = (amount, isMonthly) =>
    isMonthly
      ? amount * (1 + monthlyReturnRate)
      : amount * (1 + annualReturnRate);

  const addSavings = (amount, timing) => {
    if (timing.startsWith('Awal')) {
      totalAmount += savingsAmount;
    }
    totalAmount = calculateReturn(
      totalAmount,
      savingsFrequency === 'SetiapBulan'
    );
    if (timing.startsWith('Akhir')) {
      totalAmount += savingsAmount;
    }
  };

  while (periodsToTarget < totalPeriods) {
    addSavings(totalAmount, savingsTiming);
    periodsToTarget++;

    if (totalAmount >= targetAmount) {
      break;
    }
  }

  const achievedTarget = totalAmount >= targetAmount;
  const finalAmount = Math.round(totalAmount);

  return {
    achievedTarget,
    finalAmount,
    periodsNeeded: periodsToTarget,
    periodType: savingsFrequency === 'SetiapBulan' ? 'bulan' : 'tahun',
  };
}

module.exports = { calculateInvestment };

// Contoh penggunaan:
