# Garden Story

Garden Story on pieni React + Node.js + MongoDB -projekti, joka toimii sekä selaimessa että mobiilissa.  
Se toimii puutarhapäiväkirjana: käyttäjä voi lisätä merkintöjä, nähdä ne kalenterissa, muokata ja poistaa niitä.

---

## 📂 Projektin rakenne

gardenstory/
├─ frontend/ # React/Vite frontend
│ └─ gardenstory/
├─ backend/ # Node.js + Express + MongoDB
│ ├─ models/
│ │ └─ Entry.js # MongoDB merkintämalli
│ ├─ server.js
│ └─ .env # MongoDB URI ja portti
└─ README.md

## Teknologiat

Frontend: React, Vite, CSS

Backend: Node.js, Express, Mongoose

Tietokanta: MongoDB Atlas