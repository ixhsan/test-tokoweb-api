import { Primitive } from "react-data-table-component/dist/src/DataTable/types";

export interface Product {
  id: number;
  name: string;
  price: string;
  image?: Primitive;
  created_at: string;
  updated_at: string;
  image_url?: Primitive;
}
