import React from "react";
import PropCard from "./prop_components/PropCard";
import listingsData from "./data.js";

export const PropList = () => {
  const fakeData = listingsData;

  return (
    <div className="flex flex-wrap items-center justify-center">
      {fakeData.map((entry, index) => (
        <PropCard
          key={index}
          u_id={index}
          price={entry.price}
          address={entry.address}
          beds={entry.beds}
          bath={entry.baths}
          sqft={entry.sqfoot}
          rentestimate={entry.rent_estimate}
          maintest={entry.maintenance_estimate}
          proptax={entry.property_tax}
          photos_url={entry.photos_url}
        ></PropCard>
      ))}
    </div>
  );
};
