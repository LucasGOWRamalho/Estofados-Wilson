"use agenda";

import { useEffect } from "react";
import styles from "../styles/Calendar.module.css";

export default function Calendar() {
  useEffect(() => {
    const monthNames = [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ];

    let today = new Date();
    let selectedDay: Date | null = null;

    interface CalendarType {
      current: { year: number; month: number; day: number };
      draw: () => void;
      updateHeader: (day?: number) => void;
      populateDays: () => void;
      addEventListeners: () => void;
      changeMonth: (offset: number) => void;
      selectDay: (target: HTMLElement) => void;
      reset: () => void;
    }

    const calendar: CalendarType = {
      current: {
        year: today.getFullYear(),
        month: today.getMonth(),
        day: today.getDate(),
      },

      draw() {
        this.updateHeader();
        this.populateDays();
        this.addEventListeners();
      },



      populateDays() {
        const calendarTable = document.querySelector("#calendar tbody");
        const startDay = new Date(this.current.year, this.current.month, 1).getDay();
        const totalDays = new Date(this.current.year, this.current.month + 1, 0).getDate();

        if (calendarTable) {
          calendarTable.innerHTML = "";
        }

        let dayIndex = 0;
        for (let row = 0; row < 6; row++) {
          const tr = document.createElement("tr");

          for (let col = 0; col < 7; col++) {
            const td = document.createElement("td");
            const day = dayIndex - startDay + 1;

            if (day > 0 && day <= totalDays) {
              td.textContent = day.toString();
              td.className = "day";

              if (day === this.current.day &&
                this.current.month === today.getMonth() &&
                this.current.year === today.getFullYear()) {
                td.id = "today";
              }

              if (selectedDay &&
                selectedDay.getDate() === day &&
                selectedDay.getMonth() === this.current.month &&
                selectedDay.getFullYear() === this.current.year) {
                td.classList.add("selected");
              }
            } else {
              td.id = "disabled";
            }

            tr.appendChild(td);
            dayIndex++;
          }

          if (calendarTable) {
            calendarTable.appendChild(tr);
          }
        }
      },

      addEventListeners() {
        const prevButton = document.querySelector(".pre-button");
        const nextButton = document.querySelector(".next-button");
        const resetButton = document.querySelector("#reset");
        const days = document.querySelectorAll(".day");

        if (prevButton) {
          prevButton.addEventListener("click", () => this.changeMonth(-1));
        }

        if (nextButton) {
          nextButton.addEventListener("click", () => this.changeMonth(1));
        }

        if (resetButton) {
          resetButton.addEventListener("click", () => this.reset());
        }

        days.forEach((day) => {
          day.addEventListener("click", (event) => {
            if (event.target instanceof HTMLElement) {
              this.selectDay(event.target);
            }
          });
        });
      },

      changeMonth(offset: number) {
        this.current.month += offset;

        if (this.current.month < 0) {
          this.current.month = 11;
          this.current.year -= 1;
        } else if (this.current.month > 11) {
          this.current.month = 0;
          this.current.year += 1;
        }

        this.draw();
      },

      selectDay(target: HTMLElement) {
        if (target.className.includes("day")) {
          const selected = document.querySelector(".selected");
          if (selected) selected.classList.remove("selected");

          target.classList.add("selected");

          selectedDay = new Date(this.current.year, this.current.month, parseInt(target.textContent || "1"));
          this.updateHeader(selectedDay.getDate());
        }
      },

      reset() {
        this.current = {
          year: today.getFullYear(),
          month: today.getMonth(),
          day: today.getDate(),
        };
        selectedDay = null;
        this.draw();
      },
      updateHeader: function (day?: number): void {
        throw new Error("Function not implemented.");
      }
    };

    calendar.draw();
  }, []);

  return (
    <div className={styles.container}>
      <div id="calendar-container">
        <div className="elegant-calendar">
          <div id="header">
            <button className="pre-button">←</button>
            <div className="head-info">
              <div className="head-day">Day</div>
              <div className="head-month">Month</div>
            </div>
            <button className="next-button">→</button>
          </div>
          <table id="calendar">
            <thead>
              <tr>
                <th>Dom</th>
                <th>Seg</th>
                <th>Ter</th>
                <th>Qua</th>
                <th>Qui</th>
                <th>Sex</th>
                <th>Sab</th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
          <button id="reset">Reset</button>
        </div>
      </div>
    </div>
  );
}
