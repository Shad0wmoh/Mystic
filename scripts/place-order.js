import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";

// 🔑 Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAXkWIJ-PtOUvhZhvVVuoKPJZD0W-wdZ0A",
  authDomain: "mystic-b8e9d.firebaseapp.com",
  projectId: "mystic-b8e9d",
  storageBucket: "mystic-b8e9d.appspot.com", // ✅ fixed bucket
  messagingSenderId: "1085330785722",
  appId: "1:1085330785722:web:ba1fa8896b710153a0c983",
  measurementId: "G-MJ5XD3HK3F",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ✅ Handle form
const orderForm = document.querySelector(".order-form");

orderForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = orderForm.querySelector(".name").value.trim();
  const phone = orderForm.querySelector(".phone").value.trim();
  const street = orderForm.querySelector(".street").value.trim();
  const building = orderForm.querySelector(".building").value.trim();
  const apartment = orderForm.querySelector(".apartment").value.trim();

  // 🔥 Get cart from localStorage
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  console.log("📝 Form submitted with:", {
    name,
    phone,
    street,
    building,
    apartment,
    cart,
  });

  // 🚨 Empty input check
  if (!name || !phone || !street || !building || !apartment) {
    alert("Please fill in all fields.");
    return;
  }

  // 🚨 Empty cart check
  if (!cart || cart.length === 0) {
    alert("Your cart is empty.");
    return;
  }

  const formData = {
    name,
    phone,
    street,
    building,
    apartment,
    cart,
    createdAt: serverTimestamp(),
  };

  try {
    const docRef = await addDoc(collection(db, "orders"), formData);
    console.log("✅ Order saved with ID:", docRef.id);
    alert("Order placed successfully!");
    orderForm.reset();
    localStorage.removeItem("cart"); // 🧹 clear cart after placing order
  } catch (error) {
    console.error("❌ Error adding order:", error);
    alert("Something went wrong, please try again.");
  }
});
