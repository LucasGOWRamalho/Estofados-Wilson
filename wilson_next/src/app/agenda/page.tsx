"use client";

import { useEffect } from 'react';
import styles from '../styles/Calendar.module.css';

export default function Calendar() {
  useEffect(() => {
    // Código JavaScript do calendário
    (function ($) {
      "use strict";

      document.addEventListener("DOMContentLoaded", function () {
        var today = new Date(),
          year = today.getFullYear(),
          month = today.getMonth(),
          monthTag = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ],
          day = today.getDate(),
          days = document.getElementsByTagName("td"),
          selectedDay: Date | null = null,
          setDate: Date | undefined,
          daysLen = days.length;

        class Calendar {
          private options?: string;

          constructor(selector: string, options?: string) {
            this.options = options;
            this.draw();
          }

          draw(): void {
            this.getCookie("selected_day");
            this.getOptions();
            this.drawDays();
            var that = this,
              reset = document.getElementById("reset"),
              pre = document.getElementsByClassName("pre-button"),
              next = document.getElementsByClassName("next-button");

            if (reset && pre[0] && next[0]) {
              pre[0].addEventListener("click", function () {
                that.preMonth();
              });
              next[0].addEventListener("click", function () {
                that.nextMonth();
              });
              reset.addEventListener("click", function () {
                that.reset();
              });
            }
            while (daysLen--) {
              days[daysLen].addEventListener("click", function () {
                that.clickDay(this);
              });
            }
          }

          drawHeader(e?: number): void {
            var headDay = document.getElementsByClassName("head-day"),
              headMonth = document.getElementsByClassName("head-month");

            if (headDay[0] instanceof HTMLElement && headMonth[0] instanceof HTMLElement) {
              e ? (headDay[0].innerHTML = e.toString()) : (headDay[0].innerHTML = day.toString());
              headMonth[0].innerHTML = monthTag[month] + " - " + year;
            }
          }

          drawDays(): void {
            var startDay = new Date(year, month, 1).getDay(),
              nDays = new Date(year, month + 1, 0).getDate(),
              n = startDay;

            for (var k = 0; k < 42; k++) {
              if (days[k] instanceof HTMLElement) {
                days[k].innerHTML = "";
                days[k].id = "";
                days[k].className = "";
              }
            }

            for (var i = 1; i <= nDays; i++) {
              if (days[n] instanceof HTMLElement) {
                days[n].innerHTML = i.toString();
              }
              n++;
            }

            for (var j = 0; j < 42; j++) {
              if (days[j] instanceof HTMLElement) {
                if (days[j].innerHTML === "") {
                  days[j].id = "disabled";
                } else if (j === day + startDay - 1) {
                  if (
                    (this.options &&
                      setDate &&
                      month === setDate.getMonth() &&
                      year === setDate.getFullYear()) ||
                    (!this.options &&
                      month === today.getMonth() &&
                      year === today.getFullYear())
                  ) {
                    this.drawHeader(day);
                    days[j].id = "today";
                  }
                }
                if (selectedDay) {
                  if (
                    j === selectedDay.getDate() + startDay - 1 &&
                    month === selectedDay.getMonth() &&
                    year === selectedDay.getFullYear()
                  ) {
                    days[j].className = "selected";
                    this.drawHeader(selectedDay.getDate());
                  }
                }
              }
            }
          }

          clickDay(o: HTMLElement): void {
            var selected = document.getElementsByClassName("selected"),
              len = selected.length;
            if (len !== 0) {
              selected[0].className = "";
            }
            o.className = "selected";
            selectedDay = new Date(year, month, parseInt(o.innerHTML));
            this.drawHeader(parseInt(o.innerHTML));
            this.setCookie("selected_day", 1);
          }

          preMonth(): void {
            if (month < 1) {
              month = 11;
              year = year - 1;
            } else {
              month = month - 1;
            }
            this.drawHeader(1);
            this.drawDays();
          }

          nextMonth(): void {
            if (month >= 11) {
              month = 0;
              year = year + 1;
            } else {
              month = month + 1;
            }
            this.drawHeader(1);
            this.drawDays();
          }

          getOptions(): void {
            if (this.options) {
              var sets = this.options.split("-");
              setDate = new Date(parseInt(sets[0]), parseInt(sets[1]) - 1, parseInt(sets[2]));
              day = setDate.getDate();
              year = setDate.getFullYear();
              month = setDate.getMonth();
            }
          }

          reset(): void {
            month = today.getMonth();
            year = today.getFullYear();
            day = today.getDate();
            this.options = undefined;
            this.drawDays();
          }

          setCookie(name: string, expiredays: number): void {
            if (expiredays) {
              var date = new Date();
              date.setTime(date.getTime() + expiredays * 24 * 60 * 60 * 1000);
              var expires = "; expires=" + date.toUTCString();
            } else {
              var expires = "";
            }
            document.cookie = name + "=" + (selectedDay ? selectedDay.toISOString() : "") + expires + "; path=/";
          }

          getCookie(name: string): void {
            if (document.cookie.length) {
              var arrCookie = document.cookie.split(";"),
                nameEQ = name + "=";
              for (var i = 0, cLen = arrCookie.length; i < cLen; i++) {
                var c = arrCookie[i];
                while (c.charAt(0) == " ") {
                  c = c.substring(1, c.length);
                }
                if (c.indexOf(nameEQ) === 0) {
                  selectedDay = new Date(
                    c.substring(nameEQ.length, c.length)
                  );
                }
              }
            }
          }
        }

        var calendar = new Calendar("");
      });
    })();
  }, []);

  return (
    <div className={styles.container}>
      <div id="calendar-container">
        <div className="elegant-calendar">
          <div id="header">
            <div className="pre-button"></div>
            <div className="head-info">
              <div className="head-day">Day</div>
              <div className="head-month">Month</div>
            </div>
            <div className="next-button"></div>
          </div>
          <table id="calendar">
            <thead>
              <tr>
                <th>Sun</th>
                <th>Mon</th>
                <th>Tue</th>
                <th>Wed</th>
                <th>Thu</th>
                <th>Fri</th>
                <th>Sat</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                {/* Os dias do calendário serão preenchidos dinamicamente */}
              </tr>
            </tbody>
          </table>
          <button id="reset">Reset</button>
        </div>
      </div>
    </div>
  );
 }

