"use client";

import { Product } from "@/types/product";
import React from "react";

interface DetailsProps extends Product {
  onClick: (arg: Product) => void;
}

const Details: React.FC<DetailsProps> = ({
  id,
  name,
  price,
  created_at,
  updated_at,
  onClick,
}) => {
  return (
    <div
      className="flex flex-row p-2 w-full outline-double justify-between items-center"
      onClick={() => {
        onClick({
          id: "",
          name: "",
          price: "",
          created_at: "",
          updated_at: "",
        });
      }}
    >
      <div className="flex flex-col p-2 gap-2 justify-center items-start w-1/4">
        <h2>ID</h2>
        <h2>Name</h2>
        <h2>Price</h2>
        <h2>Date created</h2>
        <h2>Date Modified</h2>
      </div>
      <div className="flex flex-col p-2 gap-2 justify-center items-start w-full">
        <p>: {id}</p>
        <p>: {name}</p>
        <p>: {price}</p>
        <p>: {created_at}</p>
        <p>: {updated_at}</p>
      </div>
    </div>
  );
};

export default Details;
