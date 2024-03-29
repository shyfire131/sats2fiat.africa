import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import { useState } from "react";
import Link from "next/link";

import { ExchangeData, FiatShitcoin } from "../types/types";

TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo("en-US");
const bootedAt = Date.now();

export default function PriceData(props: ExchangeData) {
  const [showPriceData, setShowPriceData] = useState<boolean>(false);

  const revealPriceData = () => {
    setShowPriceData(true);
  };

  const formatPrice = (price: ExchangeData) => {
    let newArr = price.supportedFiatShitcoins.map((shitCoin: FiatShitcoin) => {
      return (
        "BTC/" +
        shitCoin.code.toUpperCase() +
        ": " +
        price.priceData[shitCoin.code].toLocaleString() +
        " ·"
      );
    });

    return newArr.join(" ");
  };

  return (
    <div>
      <div>
        Prices courtesy of the brilliant{" "}
        <Link href="https://bitnob.com/" target={"_blank"} rel="noreferrer">
          Bitnob
        </Link>
      </div>
      <div>(last fetched {timeAgo.format(bootedAt)})</div>
      <div>
        {!showPriceData && (
          <button onClick={revealPriceData}>Show Raw Price Data</button>
        )}
        {showPriceData && <div>{formatPrice(props)}</div>}
      </div>
    </div>
  );
}
