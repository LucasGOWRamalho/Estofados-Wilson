import Head from "next/head";
import "../css/bootstrap/_media.css";

export default function Calendar() {
  return (
    <>
      <Head>
        <title>Calendar 02</title>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
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
        {/* Caminho atualizado para o estilo local */}
        <link
          rel="stylesheet"
          href="Estofados-Wilson/wilson_next/calendario/css/style.css"
        />
      </Head>
      <div>
        <nav className="menu-lateral">
          <div className="btn-expandir">
            <i className="bi bi-list"></i>
          </div>
          <ul>
            <li className="item-menu">
              <a href="Estofados-Wilson/wilson_next/src/app/agenda/page.tsx">
                <span className="icon">
                  <i className="bi bi-calendar3"></i>
                </span>
                <span className="txtlink">Agenda</span>
              </a>
            </li>
            <li className="item-menu">
              <a href="Estofados-Wilson/wilson_next/src/app/page.tsx">
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

        <section className="ftco-section">
          <div className="container">
            <div className="row justify-content-center">
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
                        <div className="head-day"></div>
                        <div className="head-month"></div>
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
                          <th>Dom</th>
                          <th>Seg</th>
                          <th>Ter</th>
                          <th>Qua</th>
                          <th>Qui</th>
                          <th>Sex</th>
                          <th>Sab</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Array(6)
                          .fill(0)
                          .map((_, rowIndex) => (
                            <tr key={rowIndex}>
                              {Array(7)
                                .fill(0)
                                .map((_, colIndex) => (
                                  <td key={colIndex}></td>
                                ))}
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
