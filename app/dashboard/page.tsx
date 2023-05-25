"use client";

import React, { useEffect, useState } from "react";
import { LogoutButton } from "../components/buttons.component";
import Form from "../components/form.component";
import { useSession } from "next-auth/react";
import DataTable, { TableColumn } from "react-data-table-component";
import { Product } from "@/types/product";
import Loading from "./loading";
import Unauthenticated from "./unauthenticated";

const Dashboard = () => {
  const { data: session, status } = useSession();
  const [products, setProducts] = useState([]);
  const [editValues, setEditValues] = useState({
    id: "",
    name: "",
    price: "",
  });
  const [isEdit, setEdit] = useState(false);
  const columns: TableColumn<Product>[] = [
    {
      name: "ID",
      selector: (row) => row.id,
    },
    {
      name: "Product",
      selector: (row) => row.name,
    },
    {
      name: "Price",
      selector: (row) => row.price,
    },
    {
      name: "Action",
      cell: (row, index, column, id) => (
        <div className="flex flex-row gap-1">
          <button
            className="p-2 bg-blue-500 text-white rounded-lg w-1/2"
            // onClick={() =>
            //   setEditMode(
            //     row.id,
            //     row.name,
            //     row.price,
            //   )
            // }
          >
            Edit
          </button>
          <button
            className="p-2 bg-red-500 text-white rounded-lg w-1/2"
            onClick={() => deleteProduct(row.id)}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    const getProduct = async () => {
      try {
        const request = await fetch("/api/product");
        const response = await request.json();
        setProducts(response);
      } catch (error) {
        console.log("error saat fetching data product", error);
      }
    };
    getProduct();
  });

  const addProduct = async (name: string, price: string, id?: string) => {
    console.log(`🚀 ~ file: page.tsx:59 ~ addProduct ~ name::`, name, price);

    try {
      const request = await fetch("/api/product", {
        method: "POST",
        body: JSON.stringify({
          name,
          price,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = await request.json();
      console.log(`🚀 ~ file: page.tsx:73 ~ addProduct ~ response::`, response);

      if (!response.status) throw response;
      setProducts((prevProducts) => [...prevProducts, response.data]);
    } catch (error) {
      console.log("error saat add product", error);
    }
  };

  // const setEditMode = (name: string, price: string, id: number) => {
  //   setEditValues({
  //     name,
  //     price,
  //     id,
  //   });
  //   setEditMode(true);
  // };

  const updateProduct = async (name: string, price: string, id?: string) => {
    const request = await fetch(`/api/product/item/${id}`, {
      method: "POST",
      body: JSON.stringify({
        name,
        price,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const response = await request.json();
  };

  const deleteProduct = async (id: number) => {
    try {
      const request = await fetch(`/api/product/item/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = await request.json();

      if (!response.status) throw response;

      setProducts((prevProducts) =>
        prevProducts.filter((item) => item.id !== id)
      );
    } catch (error) {
      console.log("error saat delete", error);
    }
  };

  if (!session?.user.data.token && status === "unauthenticated") {
    return (
      <>
        <Unauthenticated />
      </>
    );
  }

  if (status === "loading") {
    return (
      <>
        <Loading />;
      </>
    );
  }

  return (
    <div className="flex flex-col gap-4 p-8 mt-10 justify-center items-center">
      <div className="flex flex-row p-2 w-full outline-double justify-between items-center">
        <div className="w-1/2 px-4">
          <h1 className="text-3xl font-bold">Dashboard</h1>
        </div>
        <div className="w-1/2 text-right">
          <LogoutButton />
        </div>
      </div>
      <div className="p-2 w-full outline-double">
        {/* <Form title="Add form" passValue={addProduct} /> */}
        {isEdit ? (
          <>
            <Form
              title="Edit Mode"
              passValue={updateProduct}
              id={editValues.id}
              name={editValues.name}
              price={editValues.price}
            />
          </>
        ) : (
          <>
            <Form title="Add Mode" passValue={addProduct} />
          </>
        )}
      </div>
      <div className="p-2 w-full outline-double outline-blue-300">
        {products.length && (
          <>
            <DataTable columns={columns} data={products} />
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
