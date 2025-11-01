# Free shipping Discount bar-shopify

# 🛒 Project Document: **Shopify App – Free Shipping Bar**

## 📘 Overview

The **Free Shipping Bar** is a Shopify app that allows store owners (admins) to configure and display a dynamic bar on their storefront, informing customers how much more they need to spend to qualify for free shipping. The bar updates in real time as customers add items to their cart.

The bar will:

* Display on **every page** of the online store.
* Dynamically adjust its **fill percentage** and **text message** based on the customer’s cart total.
* Be **fully configurable** (amount threshold + visual styles) from the **admin dashboard**.

---

## 🎯 Project Goals

* Allow the **store admin** to configure:

  * Free shipping amount (e.g., $100)
  * Bar styles (background color, font, text colors, etc.)
* Store all configurations in a **MongoDB database** (store-level).
* Display the free shipping bar dynamically for customers on all store pages.
* Show **real-time preview** of bar design and text while the admin customizes it.

---

## ⚙️ Core Functionalities

### 1. **Admin Panel**

The admin interface (available inside the Shopify App dashboard) will include the following:

#### a. Amount Configuration

* Input field to set the **Free Shipping Threshold** (e.g., $100).
* This value determines when customers qualify for free shipping.
* Example logic:

  * Cart total = $50 → “Add $50 more to get free shipping!”
  * Cart total ≥ $100 → “🎉 You’ve unlocked free shipping!”

#### b. Style Configuration

Admin can customize the look and feel of the free shipping bar:

| Attribute              | Description                                   |
| ---------------------- | --------------------------------------------- |
| **background_color**   | Color of the bar background                   |
| **text_color**         | Regular text color                            |
| **special_text_color** | Color for important text like “Free Shipping” |
| **font_family**        | Choose preferred font style                   |
| **padding / margin**   | Adjust bar spacing                            |
| **font_size**          | Set text size                                 |

All these configurations should be editable via input fields or color pickers in the admin panel.

#### c. Live Preview

* A **preview block** should appear below the style configuration form.
* The preview dynamically updates as admin changes styles.
* It should display the **exact same message and layout** that customers will see on the storefront.
* Example preview states:

  * **Initial (empty cart):** “Get your shopping on! Add $100 more for free shipping.”
  * **Partial (cart < threshold):** “Add $50 more to get free shipping!”
  * **Completed (cart ≥ threshold):** “🎉 You’ve unlocked free shipping!”

#### d. Save Button

* Once satisfied with the configuration, the admin clicks **Save**.
* The settings are stored in **MongoDB** and applied **store-wide**.
* Customers will see the updated bar immediately.

#### e. Customization Button

* A **“Customize Free Shipping Bar”** button should appear on the **admin homepage**.
* Clicking it opens the configuration page.

---

### 2. **Storefront (Customer Side)**

The Free Shipping Bar will:

* Be displayed on **all pages** (home, product, cart, checkout, etc.).
* Reflect the **cart’s current value**:

  * Fill partially (e.g., 50%) when the cart is halfway to the threshold.
  * Show **progress bar** or **fill animation** visually indicating how close they are to free shipping.
* Update dynamically when:

  * Items are added or removed from the cart.
  * Cart total changes.

#### Example Behavior

| Cart Total | Display Text                          | Bar Fill |
| ---------- | ------------------------------------- | -------- |
| $0         | “Add $100 more to get free shipping!” | 0%       |
| $50        | “Add $50 more to get free shipping!”  | 50%      |
| $100       | “🎉 You’ve unlocked free shipping!”   | 100%     |

---

### 3. **Database (MongoDB)**

#### Database: `shopify_free_shipping`

#### Collections:

1. **`stores`**

   * Stores basic store-level data (Shopify store ID, tokens, etc.)

2. **`free_shipping_settings`**

   * Stores configuration for each store.

##### Example Schema:

```json
{
  "store_id": "shopify_store_123",
  "free_shipping_amount": 100,
  "style": {
    "background_color": "#FFD700",
    "font_family": "Roboto",
    "text_color": "#000000",
    "special_text_color": "#FF0000",
    "padding": "10px",
    "margin": "5px"
  },
  "messages": {
    "empty": "Get your shopping on! Add $100 more for free shipping.",
    "partial": "Add $X more to get free shipping!",
    "complete": "🎉 You’ve unlocked free shipping!"
  },
  "updatedAt": "2025-10-29T10:00:00Z"
}
```

---

## 🧩 Technical Stack

| Layer                | Technology                                             |
| -------------------- | ------------------------------------------------------ |
| **Frontend (Admin)** | React.js + Shopify Polaris + TailwindCSS               |
| **Backend**          | Node.js + Express                                      |
| **Database**         | MongoDB (Mongoose ORM)                                 |
| **Shopify APIs**     | Admin API, App Bridge, ScriptTag or App Embed API      |
| **Auth**             | Shopify OAuth 2.0                                      |
| **Hosting**          | Render / Railway (backend), Shopify App URL (frontend) |

---

## 🧱 Architecture & Flow

1. **Admin installs app** → App requests store access via OAuth.
2. **Admin sets amount + styles** in the app dashboard.
3. Configurations are **saved to MongoDB**.
4. **ScriptTag/App Embed** injects bar script into the store pages.
5. **Frontend bar** fetches config via public API (`GET /api/bar/:storeId`).
6. As user updates the cart, bar updates dynamically.

---

## 🧠 Implementation Steps

### **Step 1: Shopify Setup**

* Create a **Shopify Partner Account** → [https://partners.shopify.com/](https://partners.shopify.com/)
* Create a **Development Store**.
* Create a **New App** under your Partner Dashboard.
* Set up app URLs and authentication callback.

### **Step 2: Backend Setup**

* Initialize Node.js + Express project.
* Connect MongoDB using Mongoose.
* Create APIs:

  * `POST /api/settings` → Save/update configuration.
  * `GET /api/settings/:storeId` → Fetch admin settings.
  * `GET /api/bar/:storeId` → Fetch bar data for storefront.
* Implement Shopify OAuth.

### **Step 3: Admin UI (React)**

* Build pages using Shopify Polaris components.
* Implement:

  * Free Shipping Threshold input.
  * Style configuration inputs.
  * Live Preview block.
  * Save button (POST request to backend).
* Display “Customize Free Shipping Bar” button on admin home.

### **Step 4: Storefront Integration**

* Inject bar using Shopify ScriptTag or App Embed block.
* Fetch store configuration and cart total.
* Dynamically render:

  * Message (based on cart value).
  * Bar fill percentage.
  * Styles from DB.

### **Step 5: Testing & Validation**

* Test across different stores and carts.
* Validate dynamic updates and style rendering.
* Ensure bar is visible on all store pages.
---

## ✅ Key Takeaways

* **Admin-only customization:** Customers cannot modify the bar.
* **Stored in DB:** All settings are saved in MongoDB (not local storage).
* **Real-time Preview:** Changes visible instantly.
* **Displayed Everywhere:** Bar should appear on every page.
* **Dynamic Fill:** Bar visually indicates progress toward free shipping.
