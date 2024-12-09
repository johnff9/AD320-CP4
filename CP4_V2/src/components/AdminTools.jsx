import React from "react";
import { database } from "../firebase";
import { ref, push } from "firebase/database";
import AddItemForm from "./AddItemForm";

/**
 * A functional React component that provides administrative tools for managing products.
 * It includes an interface for adding new products to a Firebase database using the `AddItemForm` component.
 * 
 * @component
 */
const AdminTools = () => {
  /**
   * Adds a new item to the Firebase database under the "products" collection.
   * 
   * @async
   * @function addItem
   * @param {Object} item - The item to be added, containing properties such as `name`, `price`, `description`, and `image`.
   * @throws Will alert the user in case of an error during the operation.
   */
  const addItem = async (item) => {
    try {
      const itemsRef = ref(database, "products");
      await push(itemsRef, item);

      alert("Item added successfully!");
    } catch (error) {
      console.error("Error adding item:", error);
      alert("Failed to add item. Please try again.");
    }
  };

  /**
   * Renders the admin tools interface, including the `AddItemForm` component.
   * 
   * @returns {JSX.Element} The JSX representation of the admin tools interface.
   */
  return (
    <div className="admin-tools-container">
      <div className="page-header">Admin Tools</div>
      <AddItemForm addItem={addItem} />
    </div>
  );
};

export default AdminTools;
