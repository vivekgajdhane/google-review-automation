"use client";

import * as React from "react";
import DynamicQrStandPage from "../[slug]/page";

export default function PhoenixTechQrPage() {
  const paramsPromise = React.useMemo(
    () => Promise.resolve({ slug: "phoenix-tech" }),
    []
  );

  return <DynamicQrStandPage params={paramsPromise} />;
}
