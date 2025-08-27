import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";

// ✅ FIXED CONFIG (appspot.com bucket)
const firebaseConfig = {
  apiKey: "AIzaSyAXkWIJ-PtOUvhZhvVVuoKPJZD0A",
  authDomain: "mystic-b8e9d.firebaseapp.com",
  projectId: "mystic-b8e9d",
  storageBucket: "mystic-b8e9d.appspot.com",
  messagingSenderId: "1085330785722",
  appId: "1:1085330785722:web:ba1fa8896b710153a0c983",
  measurementId: "G-MJ5XD3HK3F",
};

let app, db;
try {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  console.log("✅ Firebase initialized:", app.name);
} catch (e) {
  console.error("❌ Firebase init failed:", e);
  alert("Firebase init failed: " + (e?.message || e));
}

// 🔎 One-time DIAGNOSTIC write on load (remove after it works)
(async () => {
  try {
    const ref = await addDoc(collection(db, "_diagnostics"), {
      at: new Date().toISOString(),
      href: location.href,
      ua: navigator.userAgent,
    });
    console.log("🩺 Diagnostics write OK, id:", ref.id);
  } catch (e) {
    console.error("🩺 Diagnostics write FAILED:", e);
    alert("Diagnostics write failed: " + (e?.message || e));
  }
})();

// --- Checkout handler (Option 2: button type="button") ---
const orderForm = document.querySelector(".order-form");
const checkoutBtn = document.querySelector(".checkout-btn");

// make sure the button does NOT submit the form
checkoutBtn.type = "button";

checkoutBtn.addEventListener("click", submitOrder);

async function submitOrder() {
  console.log("🚀 Checkout click");

  try {
    const name = orderForm.querySelector(".name").value.trim();
    const phone = orderForm.querySelector(".phone").value.trim();
    const street = orderForm.querySelector(".street").value.trim();
    const building = orderForm.querySelector(".building").value.trim();
    const apartment = orderForm.querySelector(".apartment").value.trim();

    // cart from localStorage
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    console.log("🛒 Cart:", cart);

    if (!name || !phone || !street || !building || !apartment) {
      alert("Please fill in all fields.");
      return;
    }
    if (!Array.isArray(cart) || cart.length === 0) {
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

    console.log("📦 Writing order:", formData);

    const docRef = await addDoc(collection(db, "orders"), formData);
    console.log("✅ Order saved with ID:", docRef.id);

    alert("✅ Order placed successfully!");
    orderForm.reset();
    localStorage.removeItem("cart"); // optional
  } catch (error) {
    console.error("❌ Error adding order:", error);
    alert("Firestore error: " + (error?.message || error));
  }
}
