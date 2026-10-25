"use client";

import * as React from "react";
import DynamicQrStandPage from "./[slug]/page";

export default function DefaultQrPage() {
  const paramsPromise = React.useMemo(
    () => Promise.resolve({ slug: "bhikshu-tattoo" }),
    []
  );

  return <DynamicQrStandPage params={paramsPromise} />;
}
