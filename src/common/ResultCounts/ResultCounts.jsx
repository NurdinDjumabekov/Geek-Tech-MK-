import React from "react";

////// helpers
import { formatCount, unitResultFN } from "../../helpers/amounts";

////// style
import "./style.scss";

const ResultCounts = ({ list }) => {
  const totals = unitResultFN(list);

  const twoResult = !!+totals?.totalKg && !!+totals?.totalSht;

  return (
    <>
      {(!!+totals?.totalKg || !!+totals?.totalSht) && (
        <p className="totalItemCount">
          Итого: {!!+totals?.totalKg && `${formatCount(totals?.totalKg)} кг`}
          {twoResult && " и "}
          {!!+totals?.totalSht && `${formatCount(totals?.totalSht)} штук`}
        </p>
      )}
    </>
  );
};

export default ResultCounts;
