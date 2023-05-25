"use client";

import React, { ChangeEvent, FormEvent, useState } from "react";

interface FormProps {
  title: string;
  id?: string;
  name?: string;
  price?: string;
  passValue: (name: string, price: string) => Promise<void>;
}

const Form: React.FC<FormProps> = ({ title, id, name, price, passValue }) => {
  const [form, setForm] = useState({
    id: id || "",
    name: name || "",
    price: price || "",
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    passValue(form.name, form.price, form.id);
    setForm({
      id: "",
      name: "",
      price: "",
    });
  };

  return (
    <div className="flex flex-col md:flex-row p-2 gap-2 justify-center items-center">
      <h4 className="w-1/4 self-center justify-self-start text-xl font-bold text-center">
        {title}
      </h4>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row w-full gap-3 justify-center items-center"
      >
        <div className="flex flex-col sm:flex-row justify-center items-center gap-2">
          <input type="text" className="hidden" value={form.id} name="id" />
          <input
            type="text"
            name="name"
            placeholder="Product name"
            className="px-4 py-2 border border-gray-400 rounded-lg"
            value={form.name}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="price"
            placeholder="Price"
            className="px-4 py-2 border border-gray-400 rounded-lg"
            value={form.price}
            onChange={handleInputChange}
          />
        </div>
        <button className="px-4 py-2 border border-gray-400 rounded-lg bg-blue-400 text-white">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
