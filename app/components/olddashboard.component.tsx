import { getServerSession } from "next-auth";
import { LogoutButton } from "./buttons.component";
import { authOptions } from "@/lib/auth";
import api from "@/utils/api";
import { Product } from "@/types/product";
import Form from "./form.component";

const getProduct = async (token: string | undefined): Promise<Product[]> => {
  try {
    const { data } = await api.get("/product", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data.data as Product[];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};


export default async function OldDashboard() {
  const session = await getServerSession(authOptions);
  console.log(`🚀 ~ SERVER SESSION::`, session)

  const token = session?.user.data.token;
  const data = await getProduct(token);

  return (
    <div className="flex flex-col gap-4 p-8 mt-10 justify-center items-center">
      <div className="flex flex-row p-2 w-full outline-double justify-between items-center">
        <div className="w-1/2 px-4">
          <h1 className="text-3xl font-bold">OldDashboard</h1>
        </div>
        <div className="w-1/2 text-right">
          <LogoutButton />
        </div>
      </div>
      <div className="p-2 w-full outline-double">
        <Form/>
      </div>
      <div className="p-2 w-full outline-double outline-blue-300">
        {/* {data.length && <DataTable 
        columns={columns}
        data={data}
        />} */}
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full text-left text-sm font-light">
                  <thead className="border-b font-medium dark:border-blue-300">
                    <tr>
                      <th scope="col" className="px-6 py-4">
                        ID
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Product Name
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Price
                      </th>
                      <th scope="col" className="px-6 py-4 text-center">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.length &&
                      data.map((item: Product) => (
                        <tr
                          key={item.id}
                          className="border-b transition duration-300 ease-in-out hover:bg-blue-300 dark:border-blue-300 dark:hover:bg-blue-300"
                        >
                          <td className="whitespace-nowrap px-6 py-4 font-medium">
                            {item.id}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {item.name}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {item.price}
                          </td>
                          <td className="px-6 py-4 flex flex-row justify-center items-center">
                            <div className="flex flex-row gap-4">
                              <button className="p-4 bg-blue-500 text-white rounded-lg px-8">
                                Edit
                              </button>
                              <button className="p-4 bg-red-500 text-white rounded-lg px-8">
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
