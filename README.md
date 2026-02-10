# 🐳 Msg-app

Prosta aplikacja do wymiany wiadomości zbudowana w oparciu o architekturę mikroserwisów z wykorzystaniem Dockera.

Projekt demonstruje komunikację między kontenerami (Frontend ↔ Backend ↔ Baza Danych) oraz trwałość danych (Volumes).

## 🛠 Technologie

* **Frontend:** React + Vite (z odświeżaniem przez Polling)
* **Backend:** Node.js + Express
* **Baza Danych:** MongoDB
* **Konteneryzacja:** Docker + Docker Compose

## 🚀 Jak uruchomić?

Wymagane jest posiadanie zainstalowanego środowiska **Docker Desktop**.

1.  **Sklonuj repozytorium:**
    ```bash
    git clone [https://github.com/Kaszok2137/Msg-app.git](https://github.com/Kaszok2137/Msg-app.git)
    cd Msg-app
    ```

2.  **Uruchom aplikację:**
    W głównym folderze projektu wpisz:
    ```bash
    docker compose up --build
    ```

3.  **Otwórz w przeglądarce:**
    Wejdź na adres: [http://localhost:3000](http://localhost:3000)

## 📂 Struktura Projektu

```text
.
├── backend/            # Serwer API (Node.js)
│   ├── server.js       # Logika backendu i połączenie z DB
│   └── Dockerfile      # Konfiguracja obrazu serwera
├── frontend/           # Aplikacja kliencka (React)
│   ├── src/            # Komponenty Reacta
│   ├── vite.config.js  # Konfiguracja Vite pod Dockera
│   └── Dockerfile      # Konfiguracja obrazu klienta
├── docker-compose.yml  # Orkiestracja kontenerów i sieci
└── README.md           # Dokumentacja
