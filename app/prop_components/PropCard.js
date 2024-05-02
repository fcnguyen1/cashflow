"use client";
import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Carousel from "./Carousel";
import Dropdown from "./Dropdown";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import Typography from "@mui/material/Typography";
import { useState } from "react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

let USDollar = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
});

export default function PropCard({
  u_id,
  price,
  bath,
  beds,
  sqft,
  address,
  rentestimate,
  maintest,
  proptax,
  photos_url,
}) {
  let calculatorData = {
    p: price,
    re: rentestimate,
    m: maintest,
    pt: proptax,
  };

  Fancybox.bind(`[data-fancybox='gallery']`, {});

  const [dropped, setDropped] = useState(false);

  return (
    <div
      className="flex w-1/4 min-w-80 min-h-[525px] p-4 justify-center self-start"
      style={{ margin: "15px" }}
    >
      <Card
        className="flex flex-col flex-start justify-between relative mb-15"
        style={{ height: dropped ? "" : "515px" }}
      >
        <CardMedia>
          <Carousel photos_url={photos_url} u_id={u_id} />
        </CardMedia>
        <CardContent className="flex flex-col ">
          <div>
            <Typography gutterBottom variant="h5" component="div">
              {USDollar.format(price)}
            </Typography>
          </div>
          <div>
            <Typography variant="body2" color="text.secondary">
              {beds} Bed | {bath} Bath | {sqft} sqft
            </Typography>
          </div>
          <div>
            <Typography variant="body2" color="text.secondary">
              {address}
            </Typography>
          </div>
          <div>
            <Typography variant="body2" color="text.secondary">
              Rent Estimate: {USDollar.format(rentestimate)} per month
            </Typography>
          </div>
        </CardContent>
        <Dropdown propertyData={calculatorData} dropped={setDropped}></Dropdown>
      </Card>
    </div>
  );
}
