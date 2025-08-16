# 🔗 URL Shortner

A simple and efficient full-stack web application to shorten long URLs, with analytics and optional custom short links.  

🚀 **Live Demo**: [https://url-shortner-5mo4.onrender.com](https://url-shortner-5mo4.onrender.com)

---

## ✨ Features

- 🔗 **Shorten any long URL** – Instantly generate short links for easy sharing.  
- 🎯 **Custom short links** – Logged-in users can create personalized short codes.  
- 📊 **Analytics dashboard** – Track total clicks, last visited time, and more.  
- 👤 **User accounts** – Register/login to manage your own URLs.  
- 📋 **One-click copy** – Copy your short URL instantly.  
- ⚡ **Full-stack app** – React frontend + Node.js/Express backend + MongoDB database.  

---

## 🛠️ Getting Started

Follow these steps to set up the project locally:

### 1. Clone the Repository

```bash
git clone https://github.com/Kuntal616/URL-shortner.git
cd URL-shortner
```

### 2. Backend Setup

```bash
cd backend
npm install
```

- Configure your environment variables (see `.env.example`).  
- Start the backend server:

```bash
npm run start
```

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will run on [http://localhost:3000](http://localhost:3000) by default.  

---

## 🚀 Usage

1. Paste a **long URL** into the input box.  
2. *(Optional)* Enter a custom short slug (e.g., `/my-link`).  
3. Click **Shorten URL**.  
4. Copy the generated short URL and share it.  
5. Visit your dashboard to manage links and view **analytics**.  

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| **POST** | `/api/shorturl` | Create a short URL (with optional custom slug) |
| **GET** | `/api/shorturl/analytics/:shortId` | Get analytics for a specific short URL |
| **GET** | `/:shortId` | Redirect to the original URL |

---

## ⚙️ Tech Stack

- **Frontend:** React, Redux, Tailwind CSS , Tanstack Query and Router 
- **Backend:** Node.js, Express.js, MongoDB, Mongoose  
- **Utilities:** JWT (Auth), nanoid (ID generation)  

---

## 📜 License

This project is licensed for **educational/demo purposes**.  

---

👨‍💻 Made with ❤️ by [Kuntal616](https://github.com/Kuntal616)
