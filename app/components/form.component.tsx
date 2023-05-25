"use client";

import React, {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from "react";

interface FormProps {
  title: string;
  id?: string;
  name?: string;
  price?: string;
  isEdit?: boolean;
  setEdit?: (
    enable: boolean,
    { name, price, id }: { name: string; price: string; id: string }
  ) => void;
  passValue: (name: string, price: string, id?: string) => Promise<void>;
}

const Form: React.FC<FormProps> = ({
  title,
  id = "",
  name = "",
  price = "",
  passValue,
  isEdit,
  setEdit,
}) => {
  const [form, setForm] = useState({
    id: "",
    name: "",
    price: "",
  });

  useEffect(() => {
    setForm({
      id,
      name,
      price,
    });
  }, [id, name, price]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleCancel = () => {
    if (setEdit) {
      setEdit(false, { name: "", price: "", id: "" })
    }
  }

  const handleSubmit = useCallback(
    (event: FormEvent) => {
      event.preventDefault();
      if (title.includes("Add")) {
        passValue(form.name, form.price);
      } else {
        passValue(form.name, form.price, id);
      }

      setForm({
        id: "",
        name: "",
        price: "",
      });
    },
    [title, form]
  );

  return (
    <div className="flex flex-col md:flex-row p-2 gap-2 justify-center items-center">
      <h4 className="self-center sm:self-start md:self-center justify-self-start text-xl font-bold text-center sm:text-left md:w-1/4">
        {title}
      </h4>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row w-full gap-3 justify-center items-center"
      >
        <div className="flex flex-col sm:flex-row justify-center items-center gap-2 max-w-3/4">
          <input type="text" className="hidden" value={form.id} name="id" />
          <input
            type="text"
            name="name"
            placeholder="Product name"
            className="px-4 py-2 border border-gray-400 rounded-lg w-full"
            value={form.name}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="price"
            placeholder="Price"
            className="px-4 py-2 border border-gray-400 rounded-lg w-full"
            value={form.price}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex flex-row gap-2 justify-center items-center">
          <button className="px-4 py-2 border-none rounded-lg bg-blue-400 text-white">
            Submit
          </button>
          {isEdit && (
            <button
              className="px-4 py-2 border-none rounded-lg bg-yellow-400 text-black"
              onClick={handleCancel}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Form;
