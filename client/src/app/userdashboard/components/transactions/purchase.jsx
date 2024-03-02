"use client";
import { useState, useRef, useMemo } from "react";
import { UseUserContext } from "../../../../../contexts/UserContext";
import Empty from "./empty";
const products = [
  {
    id: 1,
    Category: "Electronics",
    Company: "Apple",
    Product: "iPhone 13",
    Description: "The latest iPhone with advanced features",
    Price: 999,
    CustomDetails: [
      {
        Date: "2023-09-05",
        Customer: "John Doe",
        Quantity: 2,
        TotalAmount: 1998,
      },
      {
        Date: "2023-09-04",
        Customer: "Jane Smith",
        Quantity: 1,
        TotalAmount: 999,
      },
    ],
  },
  {
    id: 2,
    Category: "Clothing",
    Company: "Nike",
    Product: "Running Shoes",
    Description: "High-quality running shoes for athletes",
    Price: 89,
    CustomDetails: [
      {
        Date: "2023-09-05",
        Customer: "Alice Johnson",
        Quantity: 3,
        TotalAmount: 267,
      },
      {
        Date: "2023-09-03",
        Customer: "Bob Brown",
        Quantity: 2,
        TotalAmount: 178,
      },
    ],
  },
  {
    id: 3,
    Category: "Books",
    Company: "Penguin Books",
    Product: "The Great Gatsby",
    Description: "Classic novel by F. Scott Fitzgerald",
    Price: 12,
    CustomDetails: [
      {
        Date: "2023-09-02",
        Customer: "Ella Williams",
        Quantity: 5,
        TotalAmount: 60,
      },
    ],
  },
  {
    id: 4,
    Category: "Home Appliances",
    Company: "Samsung",
    Product: "Smart Refrigerator",
    Description: "Refrigerator with smart features and spacious design",
    Price: 14,
    CustomDetails: [
      {
        Date: "2023-09-05",
        Customer: "David Wilson",
        Quantity: 1,
        TotalAmount: 14,
      },
    ],
  },
  {
    id: 5,
    Category: "Electronics",
    Company: "Sony",
    Product: "PlayStation 5",
    Description: "Next-gen gaming console",
    Price: 499,
    CustomDetails: [
      {
        Date: "2023-09-06",
        Customer: "Sarah Davis",
        Quantity: 1,
        TotalAmount: 499,
      },
    ],
  },
  {
    id: 6,
    Category: "Clothing",
    Company: "Adidas",
    Product: "Sneakers",
    Description: "Stylish sneakers for everyday wear",
    Price: 75,
    CustomDetails: [
      {
        Date: "2023-09-07",
        Customer: "Michael Lee",
        Quantity: 2,
        TotalAmount: 150,
      },
    ],
  },
  {
    id: 7,
    Category: "Electronics",
    Company: "Samsung",
    Product: "4K Smart TV",
    Description: "High-quality 4K television with smart features",
    Price: 799,
    CustomDetails: [
      {
        Date: "2023-09-08",
        Customer: "Sophia Anderson",
        Quantity: 1,
        TotalAmount: 799,
      },
    ],
  },
  {
    id: 8,
    Category: "Home Appliances",
    Company: "LG",
    Product: "Front-Load Washer",
    Description: "Efficient front-load washing machine",
    Price: 599,
    CustomDetails: [
      {
        Date: "2023-09-09",
        Customer: "William Taylor",
        Quantity: 1,
        TotalAmount: 599,
      },
    ],
  },
  {
    id: 9,
    Category: "Books",
    Company: "HarperCollins",
    Product: "To Kill a Mockingbird",
    Description: "Classic novel by Harper Lee",
    Price: 15,
    CustomDetails: [
      {
        Date: "2023-09-10",
        Customer: "Olivia Martinez",
        Quantity: 3,
        TotalAmount: 45,
      },
    ],
  },
  {
    id: 10,
    Category: "Clothing",
    Company: "H&M",
    Product: "Denim Jeans",
    Description: "Stylish denim jeans for men and women",
    Price: 49,
    CustomDetails: [
      {
        Date: "2023-09-11",
        Customer: "James Johnson",
        Quantity: 2,
        TotalAmount: 98,
      },
    ],
  },
  {
    id: 11,
    Category: "Electronics",
    Company: "Sony",
    Product: "Wireless Headphones",
    Description: "High-quality wireless headphones with noise cancellation",
    Price: 249,
    CustomDetails: [
      {
        Date: "2023-09-12",
        Customer: "Liam Jackson",
        Quantity: 1,
        TotalAmount: 249,
      },
    ],
  },
  {
    id: 12,
    Category: "Home Appliances",
    Company: "KitchenAid",
    Product: "Stand Mixer",
    Description: "Powerful stand mixer for baking and cooking",
    Price: 299,
    CustomDetails: [
      {
        Date: "2023-09-13",
        Customer: "Ava Harris",
        Quantity: 1,
        TotalAmount: 299,
      },
    ],
  },
  {
    id: 13,
    Category: "Books",
    Company: "Random House",
    Product: "The Catcher in the Rye",
    Description: "Classic novel by J.D. Salinger",
    Price: 10,
    CustomDetails: [
      {
        Date: "2023-09-14",
        Customer: "Noah Martinez",
        Quantity: 4,
        TotalAmount: 40,
      },
    ],
  },
  {
    id: 14,
    Category: "Clothing",
    Company: "Zara",
    Product: "Leather Jacket",
    Description: "Stylish leather jacket for men and women",
    Price: 129,
    CustomDetails: [
      {
        Date: "2023-09-15",
        Customer: "Sophia Wilson",
        Quantity: 2,
        TotalAmount: 258,
      },
    ],
  },
  {
    id: 15,
    Category: "Electronics",
    Company: "Bose",
    Product: "Bluetooth Speaker",
    Description: "Portable Bluetooth speaker with excellent sound quality",
    Price: 129,
    CustomDetails: [
      {
        Date: "2023-09-16",
        Customer: "Mason Davis",
        Quantity: 3,
        TotalAmount: 387,
      },
    ],
  },
  {
    id: 16,
    Category: "Books",
    Company: "Simon & Schuster",
    Product: "1984",
    Description: "Dystopian novel by George Orwell",
    Price: 14,
    CustomDetails: [
      {
        Date: "2023-09-18",
        Customer: "Lucas Taylor",
        Quantity: 5,
        TotalAmount: 70,
      },
    ],
  },
  {
    id: 17,
    Category: "Clothing",
    Company: "Forever 21",
    Product: "Summer Dress",
    Description: "Casual summer dress for women",
    Price: 29,
    CustomDetails: [
      {
        Date: "2023-09-19",
        Customer: "Aiden Brown",
        Quantity: 4,
        TotalAmount: 116,
      },
    ],
  },
  {
    id: 18,
    Category: "Electronics",
    Company: "Microsoft",
    Product: "Xbox Series X",
    Description: "Next-gen gaming console by Microsoft",
    Price: 499,
    CustomDetails: [
      {
        Date: "2023-09-20",
        Customer: "Luna Garcia",
        Quantity: 1,
        TotalAmount: 499,
      },
    ],
  },
  {
    id: 19,
    Category: "Home Appliances",
    Company: "Cuisinart",
    Product: "Coffee Maker",
    Description: "Programmable coffee maker for coffee lovers",
    Price: 69,
    CustomDetails: [
      {
        Date: "2023-09-21",
        Customer: "Eli Johnson",
        Quantity: 2,
        TotalAmount: 138,
      },
    ],
  },
];
const PurchaseHistory = () => {
  const [productList, setProductList] = useState(products);
  const [rowsLimit, setRowsLimit] = useState(6);
  const [rowsToShow, setRowsToShow] = useState(productList.slice(0, rowsLimit));
  const [customPagination, setCustomPagination] = useState([]);
  const { UserData } = UseUserContext();
  const purchaseData = UserData?.productpurchasehistory;
  const [totalPage, setTotalPage] = useState(
    Math.ceil(productList?.length / rowsLimit)
  );
  const [currentPage, setCurrentPage] = useState(0);
  // const dropdownRef = useRef(null);
  const nextPage = () => {
    const startIndex = rowsLimit * (currentPage + 1);
    const endIndex = startIndex + rowsLimit;
    const newArray = products.slice(startIndex, endIndex);
    setRowsToShow(newArray);
    setCurrentPage(currentPage + 1);
  };
  const changePage = (value) => {
    const startIndex = value * rowsLimit;
    const endIndex = startIndex + rowsLimit;
    const newArray = products.slice(startIndex, endIndex);
    setRowsToShow(newArray);
    setCurrentPage(value);
  };
  const previousPage = () => {
    const startIndex = (currentPage - 1) * rowsLimit;
    const endIndex = startIndex + rowsLimit;
    const newArray = products.slice(startIndex, endIndex);
    setRowsToShow(newArray);
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else {
      setCurrentPage(0);
    }
  };
  useMemo(() => {
    setCustomPagination(
      Array(Math.ceil(productList?.length / rowsLimit)).fill(null)
    );
  }, []);
  return (
    <div className=" h-full bg-white flex  items-center justify-center pb-10">
      {purchaseData.length === 1 ? (
        <Empty name="purchase" />
      ) : (
        <div className="w-full max-w-4xl ">
          <div className="w-full overflow-x-scroll md:overflow-auto  max-w-7xl 2xl:max-w-none mt-2">
            <table className="table-auto overflow-scroll md:overflow-auto w-full text-left font-inter border ">
              <thead className="rounded-lg text-base text-white font-semibold w-full">
                <tr className="bg-[#222E3A]/[6%]">
                  <th className="py-3 px-3 text-[#212B36] sm:text-base font-bold whitespace-nowrap">
                    ID
                  </th>
                  <th className="py-3 px-3 text-[#212B36] sm:text-base font-bold whitespace-nowrap">
                    Category
                  </th>
                  <th className="py-3 px-3  justify-center gap-1 text-[#212B36] sm:text-base font-bold whitespace-nowrap">
                    Company
                  </th>
                  <th className="py-3 px-3 text-[#212B36] sm:text-base font-bold whitespace-nowrap">
                    Product
                  </th>
                  <th className="py-3 px-3 text-[#212B36] sm:text-base font-bold whitespace-nowrap">
                    Description
                  </th>
                  <th className="flex items-center py-3 px-3 text-[#212B36] sm:text-base font-bold whitespace-nowrap gap-1">
                    Price
                  </th>
                </tr>
              </thead>
              <tbody>
                {rowsToShow?.map((data, index) => (
                  <tr
                    className={`${
                      index % 2 == 0 ? "bg-white" : "bg-[#222E3A]/[6%]"
                    }`}
                    key={index}
                  >
                    <td
                      className={`py-2 px-3 font-normal text-base ${
                        index == 0
                          ? "border-t-2 border-black"
                          : index == rowsToShow?.length
                          ? "border-y"
                          : "border-t"
                      } whitespace-nowrap`}
                    >
                      {data?.id}
                    </td>
                    <td
                      className={`py-2 px-3 font-normal text-base ${
                        index == 0
                          ? "border-t-2 border-black"
                          : index == rowsToShow?.length
                          ? "border-y"
                          : "border-t"
                      } whitespace-nowrap`}
                    >
                      {data?.Category}
                    </td>
                    <td
                      className={`py-2 px-3 font-normal text-base ${
                        index == 0
                          ? "border-t-2 border-black"
                          : index == rowsToShow?.length
                          ? "border-y"
                          : "border-t"
                      } whitespace-nowrap`}
                    >
                      {data?.Company}
                    </td>
                    <td
                      className={`py-2 px-3 text-base  font-normal ${
                        index == 0
                          ? "border-t-2 border-black"
                          : index == rowsToShow?.length
                          ? "border-y"
                          : "border-t"
                      } whitespace-nowrap`}
                    >
                      {data?.Product}
                    </td>
                    <td
                      className={`py-2 px-3 text-base  font-normal ${
                        index == 0
                          ? "border-t-2 border-black"
                          : index == rowsToShow?.length
                          ? "border-y"
                          : "border-t"
                      } min-w-[250px]`}
                    >
                      {data?.Description}
                    </td>
                    <td
                      className={`py-5 px-4 text-base  font-normal ${
                        index == 0
                          ? "border-t-2 border-black"
                          : index == rowsToShow?.length
                          ? "border-y"
                          : "border-t"
                      }`}
                    >
                      {"$" + data?.Price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="w-full  flex justify-center sm:justify-between flex-col sm:flex-row gap-5 mt-1.5 px-1 items-center">
            <div className="text-lg">
              Showing {currentPage == 0 ? 1 : currentPage * rowsLimit + 1} to{" "}
              {currentPage == totalPage - 1
                ? productList?.length
                : (currentPage + 1) * rowsLimit}{" "}
              of {productList?.length} entries
            </div>
            <div className="flex">
              <ul
                class="flex justify-center items-center gap-x-[10px] z-30"
                role="navigation"
                aria-label="Pagination"
              >
                <li
                  class={` prev-btn flex items-center justify-center w-[36px] rounded-[6px] h-[36px] border-[1px] border-solid border-[#E4E4EB] disabled] ${
                    currentPage == 0
                      ? "bg-[#cccccc] pointer-events-none"
                      : " cursor-pointer"
                  }
  `}
                  onClick={previousPage}
                >
                  <img src="https://www.tailwindtap.com/assets/travelagency-admin/leftarrow.svg" />
                </li>
                {customPagination?.map((data, index) => (
                  <li
                    className={`flex items-center justify-center w-[36px] rounded-[6px] h-[34px] border-[1px] border-solid border-[2px] bg-[#FFFFFF] cursor-pointer ${
                      currentPage == index
                        ? "text-blue-600  border-sky-500"
                        : "border-[#E4E4EB] "
                    }`}
                    onClick={() => changePage(index)}
                    key={index}
                  >
                    {index + 1}
                  </li>
                ))}
                <li
                  class={`flex items-center justify-center w-[36px] rounded-[6px] h-[36px] border-[1px] border-solid border-[#E4E4EB] ${
                    currentPage == totalPage - 1
                      ? "bg-[#cccccc] pointer-events-none"
                      : " cursor-pointer"
                  }`}
                  onClick={nextPage}
                >
                  <img src="https://www.tailwindtap.com/assets/travelagency-admin/rightarrow.svg" />
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default PurchaseHistory;
