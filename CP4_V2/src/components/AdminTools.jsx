import React from "react";
import { database } from "../firebase";
import { ref, push } from "firebase/database";
import AddItemForm from "./AddItemForm";

const AdminTools = () => {
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

  return (
    <div className="admin-tools-container">
      <div className="page-header">Admin Tools</div>
      <AddItemForm addItem={addItem} />
    </div>
  );
};

export default AdminTools;
