export const getPeriodPrice = (car, period) => {
  const currentPeriod = [30, 7, 1].find((item) => item <= period);

  return (
    Math.round(
      (car?.price_special?.find((item) => item?.period === currentPeriod)
        ?.price ??
        car?.price?.find((item) => item?.period === currentPeriod)?.price) *
        (period / currentPeriod) *
        100
    ) / 100
  );
};
