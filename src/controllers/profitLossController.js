const response = (body) => {
  const result = countTransaction(body);
  let status = result.realized > 0 ? "Gain" : "Loss";
  const netBuyAmount = {
    buyAmount: result.buyAmount,
    totalFee: result.buyFee,
    netAmount: result.netBuyAmount,
  };

  const netSellAmount = {
    sellAmount: result.sellAmount,
    totalFee: result.sellFee,
    netAmount: result.netSellAmount,
  };

  return {
    stock: body.codeStock,
    lot: body.lot,
    buyPrice: body.buyPrice,
    netBuyAmount: netBuyAmount,
    sellPrice: body.sellPrice,
    netSellAmount: netSellAmount,
    status: status,
    realized: result.realized,
    percentRealized: `${result.percentRealized}%`,
  };
};

const countTransaction = (body) => {
  let { buyPrice, sellPrice, lot } = body;
  let buyAmount = buyPrice * lot * 100;
  let buyFee = countFee(buyAmount, 0.15 / 100);
  let sellAmount = sellPrice * lot * 100;
  let sellFee = countFee(sellAmount, 0.25 / 100);
  let netBuyAmount = buyAmount + buyFee;
  let netSellAmount = sellAmount - sellFee;
  let realized = netSellAmount - netBuyAmount;
  let percentRealized = ((realized / netBuyAmount) * 100).toFixed(2);

  return {
    buyAmount: buyAmount,
    buyFee: buyFee,
    sellAmount: sellAmount,
    sellFee: sellFee,
    netBuyAmount: netBuyAmount,
    netSellAmount: netSellAmount,
    realized: realized,
    percentRealized: percentRealized,
  };
};

const countFee = (amount, feePercent) => {
  return amount * feePercent;
};

const validation = (body) => {
  let { codeStock, buyPrice, sellPrice, lot } = body;
  if (!codeStock || !buyPrice || !sellPrice || !lot) {
    return {
      isValid: false,
      message: "code stock, buy price, sell price, and lot are required",
    };
  }

  buyPrice = parseInt(buyPrice);
  sellPrice = parseInt(sellPrice);

  if (isNaN(buyPrice) || isNaN(sellPrice) || isNaN(lot)) {
    return {
      isValid: false,
      message: "buy price, sell price, and lot must be number",
    };
  }

  if (buyPrice <= 0 || sellPrice <= 0 || lot <= 0) {
    return {
      isValid: false,
      message: "buy price, sell price, and lot must be greater than 0",
    };
  }

  return {
    isValid: true,
    message: "is valid",
  };
};

const service = {
  validation,
  countTransaction,
  response,
};

module.exports = service;
