import React from "react";
import { database } from "../firebase";
import { ref, push } from "firebase/database";
import AddItemForm from "./AddItemForm";

const AdminTools = () => {
  const addItem = (item) => {
    // Add item to Firebase
    const itemsRef = ref(database, "products");
    push(itemsRef, item);

    // Add item to LocalStorage
    const savedProducts = JSON.parse(localStorage.getItem("products")) || [];
    savedProducts.push(item);
    localStorage.setItem("products", JSON.stringify(savedProducts));

    alert("Item added successfully!");
  };

  return (
    <div>
      <h2>Admin Tools</h2>
      <AddItemForm addItem={addItem} />
    </div>
  );
};

export default AdminTools;
