"use client";

import React, { useEffect, useState, FormEvent } from "react";
import Head from "next/head";
import "../css/style.css";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ref, push, onValue, remove, update } from "firebase/database";
import { database } from "@/service/firebase";
import Link from "next/link";

type Cliente = {
  id?: string;
  nome: string;
  email: string;
  telefone: string;
  cpf: string;
  profissao: string;
  genero: string;
  endereco: string;
  dataNascimento: string;
  numeroPedidos: number;
  codigoCompra: string;
  observacoes: string;
};

export default function Home() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cpf, setCpf] = useState("");
  const [profissao, setProfissao] = useState("");
  const [genero, setGenero] = useState("");
  const [endereco, setEndereco] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [numeroPedidos, setNumeroPedidos] = useState<number | "">("");
  const [codigoCompra, setCodigoCompra] = useState("");
  const [observacoes, setObservacoes] = useState("");
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [busca, setBusca] = useState("");
  const [clientesFiltrados, setClientesFiltrados] = useState<Cliente[]>([]);
  const [clienteEmEdicao, setClienteEmEdicao] = useState<string | null>(null);
  const [clienteExpandido, setClienteExpandido] = useState<string | null>(null);


  useEffect(() => {
    if (busca.trim() === "") {
      setClientesFiltrados(clientes);
    } else {
      const termo = busca.toLowerCase();
      const filtrados = clientes.filter((cliente) =>
        cliente.nome.toLowerCase().includes(termo)
      );
      setClientesFiltrados(filtrados);
    }
  }, [busca, clientes]);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("Usuário autenticado:", user);
      } else {
        console.log("Usuário não autenticado");
      }
    });
  }, []);

  const gravar = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const clienteRef = ref(database, "cliente");
    const dados: Cliente = {
      nome,
      email,
      telefone,
      cpf,
      profissao,
      genero,
      endereco,
      dataNascimento,
      numeroPedidos: Number(numeroPedidos),
      codigoCompra,
      observacoes,
    };

    push(clienteRef, dados)
      .then(() => {
        alert("Cliente cadastrado com sucesso!");
        limparFormulario();
      })
      .catch((error) => {
        console.error("Erro ao cadastrar cliente:", error);
      });
  };

  useEffect(() => {
    const clienteRef = ref(database, "cliente");
    onValue(clienteRef, (snapshot) => {
      const data = snapshot.val() ?? {};
      const clientesCarregados = Object.entries(data).map(([key, valor]) => ({
        ...(valor as Cliente),
        id: key,
      }));
      setClientes(clientesCarregados);
      setClientesFiltrados(clientesCarregados);
    });
  }, []);

  const limparFormulario = () => {
    setNome("");
    setEmail("");
    setTelefone("");
    setCpf("");
    setProfissao("");
    setGenero("");
    setEndereco("");
    setDataNascimento("");
    setNumeroPedidos("");
    setCodigoCompra("");
    setObservacoes("");
  };

  const deletar = (refId: string) => {
    const referencia = ref(database, `cliente/${refId}`);
    remove(referencia)
      .then(() => {
        alert("Cliente deletado com sucesso!");
      })
      .catch((error) => {
        console.error("Erro ao deletar cliente:", error);
        alert("Erro ao deletar cliente.");
      });
  };

  const salvarEdicao = (cliente: Cliente) => {
    if (!cliente.id) return;

    const clienteRef = ref(database, `cliente/${cliente.id}`);
    update(clienteRef, cliente)
      .then(() => {
        alert("Cliente atualizado com sucesso!");
        setClienteEmEdicao(null);
      })
      .catch((error) => {
        console.error("Erro ao atualizar cliente:", error);
        alert("Erro ao atualizar cliente.");
      });

      const handleExpandir = (id: string | null) => {
        setClienteExpandido(id === clienteExpandido ? null : id);
      };
  };

  return (
    <>
      <Head>
        <title>Cadastro de Clientes</title>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Lato:300,400,700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
        />
      </Head>
<nav className="menu-lateral">
          <div className="btn-expandir">
            <i className="bi bi-list"></i>
          </div>
          <ul>
            <li className="item-menu">
              <Link href="agenda">
                <span className="icon">
                  <i className="bi bi-calendar3"></i>
                </span>
                <span className="txtlink">Agenda</span>
              </Link>
            </li>
            <li className="item-menu">
              <Link href="/">
                <span className="icon">
                  <i className="bi bi-house-door"></i>
                </span>
                <span className="txtlink">Clientes</span>
              </Link>
            </li>
            <li className="item-menu">
              <Link href="Campanha">
                <span className="icon">
                  <i className="bi bi-send"></i>
                </span>
                <span className="txtlink">Envios</span>
              </Link>
            </li>
          </ul>
        </nav>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "20px" }}>
        <div style={{ width: "75%", maxWidth: "800px", textAlign: "center" }}>
          <form onSubmit={gravar}>
            <div className="mb-3">
              <label htmlFor="nome" className="form-label">Nome</label>
              <input
                type="text"
                className="form-control"
                id="nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="telefone" className="form-label">Telefone</label>
              <input
                type="text"
                className="form-control"
                id="telefone"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="cpf" className="form-label">CPF</label>
              <input
                type="text"
                className="form-control"
                id="cpf"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="profissao" className="form-label">Profissão</label>
              <input
                type="text"
                className="form-control"
                id="profissao"
                value={profissao}
                onChange={(e) => setProfissao(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="genero" className="form-label">Gênero</label>
              <input
                type="text"
                className="form-control"
                id="genero"
                value={genero}
                onChange={(e) => setGenero(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="endereco" className="form-label">Endereço</label>
              <input
                type="text"
                className="form-control"
                id="endereco"
                value={endereco}
                onChange={(e) => setEndereco(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="dataNascimento" className="form-label">Data de Nascimento</label>
              <input
                type="date"
                className="form-control"
                id="dataNascimento"
                value={dataNascimento}
                onChange={(e) => setDataNascimento(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="numeroPedidos" className="form-label">Número de Pedidos Realizados</label>
              <input
                type="number"
                className="form-control"
                id="numeroPedidos"
                value={numeroPedidos}
                onChange={(e) => setNumeroPedidos(Number(e.target.value))}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="codigoCompra" className="form-label">Código do Pedido Atual</label>
              <input
                type="text"
                className="form-control"
                id="codigoCompra"
                value={codigoCompra}
                onChange={(e) => setCodigoCompra(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="observacoes" className="form-label">Observações</label>
              <textarea
                className="form-control"
                id="observacoes"
                value={observacoes}
                onChange={(e) => setObservacoes(e.target.value)}
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">
              Cadastrar Cliente
            </button>
          </form>
        </div>

        <div style={{ width: "100%", maxWidth: "800px", textAlign: "center", marginTop: "20px" }}>
          <input
            type="text"
            placeholder="Pesquisar clientes..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            style={{
              marginBottom: "20px",
              padding: "10px",
              width: "100%",
              maxWidth: "600px",
              textAlign: "center",
            }}
          />
               <h2>Lista de Clientes</h2>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {clientes
              .filter((cliente) =>
                cliente.nome.toLowerCase().includes(busca.toLowerCase())
              )
              .map((cliente) => (
                <li
                  key={cliente.id}
                  style={{
                    border: "1px solid #ddd",
                    padding: "10px",
                    marginBottom: "10px",
                    borderRadius: "5px",
                  }}
                >
                  <strong>Nome:</strong> {cliente.nome}
                  <br />
                  {clienteExpandido === cliente.id ? (
                    <div style={{ marginTop: "10px" }}>
                      <label>
                        Nome:
                        <input
                          type="text"
                          value={cliente.nome}
                          onChange={(e) =>
                            setClientes((prev) =>
                              prev.map((c) =>
                                c.id === cliente.id ? { ...c, nome: e.target.value } : c
                              )
                            )
                          }
                        />
                      </label>
                      <label>
                        Email:
                        <input
                          type="email"
                          value={cliente.email}
                          onChange={(e) =>
                            setClientes((prev) =>
                              prev.map((c) =>
                                c.id === cliente.id ? { ...c, email: e.target.value } : c
                              )
                            )
                          }
                        />
                      </label>
                      <label>
                        Telefone:
                        <input
                          type="text"
                          value={cliente.telefone}
                          onChange={(e) =>
                            setClientes((prev) =>
                              prev.map((c) =>
                                c.id === cliente.id ? { ...c, telefone: e.target.value } : c
                              )
                            )
                          }
                        />
                      </label>
                      <label>
                        CPF:
                        <input
                          type="text"
                          value={cliente.cpf}
                          onChange={(e) =>
                            setClientes((prev) =>
                              prev.map((c) =>
                                c.id === cliente.id ? { ...c, cpf: e.target.value } : c
                              )
                            )
                          }
                        />
                      </label>
                      <label>
                        Profissão:
                        <input
                          type="text"
                          value={cliente.profissao}
                          onChange={(e) =>
                            setClientes((prev) =>
                              prev.map((c) =>
                                c.id === cliente.id ? { ...c, profissao: e.target.value } : c
                              )
                            )
                          }
                        />
                      </label>
                      <label>
                        Gênero:
                        <input
                          type="text"
                          value={cliente.genero}
                          onChange={(e) =>
                            setClientes((prev) =>
                              prev.map((c) =>
                                c.id === cliente.id ? { ...c, genero: e.target.value } : c
                              )
                            )
                          }
                        />
                      </label>
                      <label>
                        Endereço:
                        <input
                          type="text"
                          value={cliente.endereco}
                          onChange={(e) =>
                            setClientes((prev) =>
                              prev.map((c) =>
                                c.id === cliente.id ? { ...c, endereco: e.target.value } : c
                              )
                            )
                          }
                        />
                      </label>
                      <label>
                        Data de Nascimento:
                        <input
                          type="date"
                          value={cliente.dataNascimento}
                          onChange={(e) =>
                            setClientes((prev) =>
                              prev.map((c) =>
                                c.id === cliente.id
                                  ? { ...c, dataNascimento: e.target.value }
                                  : c
                              )
                            )
                          }
                        />
                      </label>
                      <label>
                        Observações:
                        <textarea
                          value={cliente.observacoes}
                          onChange={(e) =>
                            setClientes((prev) =>
                              prev.map((c) =>
                                c.id === cliente.id
                                  ? { ...c, observacoes: e.target.value }
                                  : c
                              )
                            )
                          }
                        ></textarea>
                      </label>
                      <button onClick={() => salvarEdicao(cliente)}>Salvar</button>
                      <button onClick={() => setClienteExpandido(null)}>Cancelar</button>
                    </div>
                  ) : (
                    <>
                      <button onClick={() => setClienteExpandido(cliente.id!)}>
                        Expandir
                      </button>
                      <button onClick={() => deletar(cliente.id!)}>Excluir</button>
                    </>
                  )}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </>
  );
}