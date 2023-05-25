"use client";

import React, { useEffect, useState } from "react";
import { LogoutButton } from "../components/buttons.component";
import Form from "../components/form.component";
import DataTable, { TableColumn } from "react-data-table-component";
import { Product } from "@/types/product";
import Details from "../components/detail.component";

const Authenticated = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [editValues, setEditValues] = useState({
    id: "",
    name: "",
    price: "",
  });
  const [detail, setDetail] = useState<Product>({
    id: "",
    name: "",
    price: "",
    created_at: "",
    updated_at: "",
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
            className="p-2 bg-yellow-500 text-white rounded-lg"
            onClick={() => {
              getAProduct(row.id);
            }}
          >
            Detail
          </button>
          <button
            className="p-2 bg-green-500 text-white rounded-lg"
            onClick={() =>
              setEditMode(true, {
                name: row.name,
                price: row.price,
                id: row.id,
              })
            }
          >
            Edit
          </button>
          <button
            className="p-2 bg-red-500 text-white rounded-lg"
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
  }, []);

  const addProduct = async (name: string, price: string) => {
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

      if (!response.status) throw response;
      setProducts((prevProducts) => [...prevProducts, response.data]);
    } catch (error) {
      console.log("error saat add product", error);
    }
  };

  const setEditMode = (
    enable = false,
    { name, price, id }: { name: string; price: string; id: string }
  ) => {
    setEditValues({ name, price, id });
    setEdit(enable);
  };

  const getAProduct = async (id: string | number) => {
    try {
      const request = await fetch(`/api/product/${id}`);
      const response = await request.json();

      if (!response.status) throw response;
      setDetail(response.data);
    } catch (error) {
      console.log("error saat mengambil detail data", error);
    }
  };

  const updateProduct = async (name: string, price: string, id?: string) => {
    try {
      const request = await fetch(`/api/product/${id}`, {
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
      if (!response.status) throw response;
      setProducts((prevProducts) =>
        prevProducts.map((product) => {
          if (product.id == id) {
            product.name = response.data.name;
            product.price = response.data.price;
            return product;
          }
          return product;
        })
      );
      setEditMode(false, { name: "", price: "", id: "" });
    } catch (error) {
      console.log("error saat update product", error);
      setEditMode(false, { name: "", price: "", id: "" });
    }
  };

  const deleteProduct = async (id: number | string) => {
    try {
      const request = await fetch(`/api/product/${id}`, {
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

  return (
    <div className="flex flex-col gap-4 p-8 justify-center items-center">
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
              isEdit={isEdit}
              setEdit={setEditMode}
            />
          </>
        ) : (
          <>
            <Form title="Add Mode" passValue={addProduct} />
          </>
        )}
      </div>
      {detail.name && (
        <Details
          id={detail.id}
          name={detail.name}
          price={detail.price}
          created_at={detail.created_at}
          updated_at={detail.updated_at}
          onClick={setDetail}
        />
      )}
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

export default Authenticated;
