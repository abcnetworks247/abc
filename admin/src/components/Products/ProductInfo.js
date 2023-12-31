"use client"
import React from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';


const ProductInfo = ({ title, category, id, price, handleRefresh }) => {


    const handleDelete = async (productId) => {
        try {
            const adminToken = Cookies.get("adminToken")
            console.log("Admin Token:", adminToken);
        const response = await axios.delete(
          `${process.env.NEXT_PUBLIC_SERVER_URL}admin/commerce/products`,

          {
            headers: {
              Authorization: `Bearer ${String(adminToken)}`,
              "Content-Type": "application/json",
            },

            data: { id: productId },
          }
        );

        if (response.status === 204) {
          // Product deleted successfully
          // You may want to update the UI or take any other necessary actions
            console.log("Product deleted successfully");
            handleRefresh()
        } else {
          console.error("Failed to delete product");
          // Handle error, e.g., show an error message to the user
        }
      } catch (error) {
        console.error("Damn it", error);
        // Handle error, e.g., show an error message to the user
      }
    };
  return (
    <>
      <tr className="hover:bg-gray-100">
        <td className="p-4 w-4">
          <div className="flex items-center">
            <input
              id="checkbox-{{ .id }}"
              aria-describedby="checkbox-1"
              type="checkbox"
              className="bg-gray-50 border-gray-300 focus:ring-3 focus:ring-cyan-200 h-4 w-4 rounded"
            />
            <label htmlFor="checkbox-{{ .id }}" className="sr-only">
              checkbox
            </label>
          </div>
        </td>
        <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
          <div className="text-base font-semibold text-gray-900">{title}</div>
          <div className="text-sm font-normal text-gray-500">{category}</div>
        </td>
        <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">
          {"{"}
          {"{"} .technology {"}"}
          {"}"}
        </td>
        <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">
          {id}
        </td>
        <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">
          {price}
        </td>
        <td className="p-4 whitespace-nowrap space-x-2">
          <button
            type="button"
            data-modal-toggle="product-modal"
            className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center"
          >
            <svg
              className="mr-2 h-5 w-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
              <path
                fillRule="evenodd"
                d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                clipRule="evenodd"
              />
            </svg>
            Edit item
          </button>
          <button
            onClick={() => handleDelete(id)}
            type="button"
            data-modal-toggle="delete-product-modal"
            className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center"
          >
            <svg
              className="mr-2 h-5 w-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            Delete item
          </button>
        </td>
      </tr>
    </>
  );
}

export default ProductInfo