"use client";

import { useState, useEffect } from "react";
import Head from "next/head";

export default function CalendarPage() {
  const [currentDay, setCurrentDay] = useState<number>(0);
  const [currentMonth, setCurrentMonth] = useState<string>("");

  useEffect(() => {
    // Obtém a data atual
    const today = new Date();

    // Define o dia atual
    setCurrentDay(today.getDate());

    // Formata o mês atual (Ex: "December - 2024")
    const monthNames = [
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
    ];
    const formattedMonth = `${monthNames[today.getMonth()]} - ${today.getFullYear()}`;
    setCurrentMonth(formattedMonth);
  }, []);

  return (
    <>
      <Head>
        <title>Calendar 02</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <link
          href="https://fonts.googleapis.com/css?family=Lato:300,400,700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
        />
        <link rel="stylesheet" href="/css/style.css" />
      </Head>

      <div>
        <nav className="menu-lateral">
          <div className="btn-expandir">
            <i className="bi bi-list"></i>
          </div>
          <ul>
            <li className="item-menu">
              <a href="/agenda">
                <span className="icon">
                  <i className="bi bi-calendar3"></i>
                </span>
                <span className="txtlink">Agenda</span>
              </a>
            </li>
            <li className="item-menu">
              <a href="/">
                <span className="icon">
                  <i className="bi bi-house-door"></i>
                </span>
                <span className="txtlink">Clientes</span>
              </a>
            </li>
            <li className="item-menu">
              <a href="#envios">
                <span className="icon">
                  <i className="bi bi-send"></i>
                </span>
                <span className="txtlink">Envios</span>
              </a>
            </li>
          </ul>
        </nav>

        <main>
          <section className="ftco-section">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-md-6 text-center mb-5">
                  <h2 className="heading-section">Calendar #02</h2>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="elegant-calencar d-md-flex">
                    <div className="wrap-header d-flex align-items-center">
                      <p id="reset">reset</p>
                      <div id="header" className="p-0">
                        <div className="pre-button d-flex align-items-center justify-content-center">
                          <i className="fa fa-chevron-left"></i>
                        </div>
                        <div className="head-info">
                          <div className="head-day">{currentDay}</div>
                          <div className="head-month">{currentMonth}</div>
                        </div>
                        <div className="next-button d-flex align-items-center justify-content-center">
                          <i className="fa fa-chevron-right"></i>
                        </div>
                      </div>
                    </div>
                    <div className="calendar-wrap">
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
                            <td>1</td>
                            <td>2</td>
                            <td>3</td>
                            <td>4</td>
                            <td>5</td>
                            <td>6</td>
                            <td>7</td>
                          </tr>
                          <tr>
                            <td>8</td>
                            <td>9</td>
                            <td>10</td>
                            <td id="today">11</td>
                            <td>12</td>
                            <td>13</td>
                            <td>14</td>
                          </tr>
                          <tr>
                            <td>15</td>
                            <td>16</td>
                            <td>17</td>
                            <td>18</td>
                            <td>19</td>
                            <td>20</td>
                            <td>21</td>
                          </tr>
                          <tr>
                            <td>22</td>
                            <td>23</td>
                            <td>24</td>
                            <td>25</td>
                            <td>26</td>
                            <td>27</td>
                            <td>28</td>
                          </tr>
                          <tr>
                            <td>29</td>
                            <td>30</td>
                            <td>31</td>
                            <td id="disabled"></td>
                            <td id="disabled"></td>
                            <td id="disabled"></td>
                            <td id="disabled"></td>
                          </tr>
                          <tr>
                            <td id="disabled"></td>
                            <td id="disabled"></td>
                            <td id="disabled"></td>
                            <td id="disabled"></td>
                            <td id="disabled"></td>
                            <td id="disabled"></td>
                            <td id="disabled"></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
