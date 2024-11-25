"use client";
import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react"; // Biblioteca principal
import dayGridPlugin from "@fullcalendar/daygrid"; // Exibição do calendário mensal
import timeGridPlugin from "@fullcalendar/timegrid"; // Exibição de horário
import interactionPlugin from "@fullcalendar/interaction"; // Permite interatividade (como clique)
import Head from "next/head";
import "../css/style.css";

export default function Agenda() {
  const [eventos, setEventos] = useState([
    { id: "1", title: "Reunião de equipe", start: "2024-11-20T10:00:00" },
    { id: "2", title: "Entrega de projeto", start: "2024-11-25T15:00:00" },
  ]);

  const handleDateClick = (info: any) => {
    const titulo = prompt("Digite o título do evento:");
    if (titulo) {
      const novoEvento = { id: `${eventos.length + 1}`, title: titulo, start: info.event.startStr };
      setEventos([...eventos, novoEvento]);
    }
  };

  return (
    <>
      <Head>
        <title>Agenda</title>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lato:300,400,700&display=swap" />
        <link
          href="https://cdn.jsdelivr.net/npm/@fullcalendar/core/main.min.css"
          rel="stylesheet"
        />
        <link
          href="https://cdn.jsdelivr.net/npm/@fullcalendar/daygrid/main.min.css"
          rel="stylesheet"
        />
      </Head>

      <nav className="menu-lateral">
        <ul>
          <li className="item-menu">
            <a href="/">
              <span className="icon"><i className="bi bi-house-door"></i></span>
              <span className="txtlink">Clientes</span>
            </a>
          </li>
        </ul>
      </nav>

      <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
        <div style={{ width: "90%", maxWidth: "1200px" }}>
          <h1>Agenda</h1>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            events={eventos}
            eventClick={handleDateClick}
            eventColor="#378006"
          />
        </div>
      </div>
    </>
  );
}