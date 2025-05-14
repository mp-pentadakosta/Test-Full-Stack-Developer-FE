class CurrencyUtils {
  exChangeCurrency(data: { value: number; currentCurrency: number }): number {
    const result = data.value * data.currentCurrency;

    return parseFloat(result.toFixed(2));
  }
}

export default new CurrencyUtils();
