// wilson_next/src/app/page.js ou wilson_next/pages/index.js
import React, { useState } from 'react';
import Head from 'next/head'; // Importação do Next.js
import 'https://fonts.googleapis.com/css?family=Lato:300,400,700&display=swap';
import 'https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css';
import 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css';
import '../css/style.css';
import Link from 'next/link';

<Link href="/cadastrar">
  <a>
    <span className="icon"><i className="bi bi-house-door"></i></span>
    <span className="txtlink">Clientes</span>
  </a>
</Link>

export default function Home() {
  const [clientes, setClientes] = useState([]);
  const [filtro, setFiltro] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const cliente = {
      nome: form.nome.value,
      email: form.email.value,
      telefone: form.telefone.value,
      cpf: form.cpf.value,
      profissao: form.profissao.value,
      genero: form.genero.value,
      endereco: form.endereco.value,
      dataNascimento: form.dataNascimento.value,
      numeroPedidos: form.numeroPedidos.value,
      numeroPedidoAtual: form.numeroPedidoAtual.value,
      observacoes: form.observacoes.value,
    };
    setClientes([...clientes, cliente]);
    form.reset();
  };

  const handleSearch = (event) => {
    setFiltro(event.target.value.toLowerCase());
  };

  const clientesFiltrados = clientes.filter((cliente) =>
    Object.values(cliente).some((valor) =>
      valor.toLowerCase().includes(filtro)
    )
  );

  return (
    <div>
      {/* Adicionando conteúdo ao <head> */}
      <Head>
        <title>Cadastro de Clientes</title>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lato:300,400,700&display=swap" />
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" />
      </Head>

      {/* Barra lateral */}
      <nav class="menu-lateral">
        <div class="btn-expandir">
            <i class="bi bi-list"></i>
        </div>
        <ul>
            <li class="item-menu">
                <a href="file:///C:/Users/Lucas/Desktop/Wilson/calendario/agenda.html">
                    <span class="icon"><i class="bi bi-calendar3"></i></span>
                    <span class="txtlink">Agenda</span>
                </a>
            </li>
            <li class="item-menu">
                <a href="file:///C:/Users/Lucas/Desktop/Wilson/cadastrar/index.html">
                    <span class="icon"><i class="bi bi-house-door"></i></span>
                    <span class="txtlink">Clientes</span>
                </a>
            </li>
            <li class="item-menu">
                <a href="#envios">
                    <span class="icon"><i class="bi bi-send"></i></span>
                    <span class="txtlink">Envios</span>
                </a>
            </li>
        </ul>
    </nav>


      {/* Formulário de cadastro */}
      <div className="container mt-5">
        <h1>Cadastro de Clientes</h1>
        <form id="cadastro-form" className="mt-4" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="nome" className="form-label">Nome</label>
            <input type="text" className="form-control" id="nome" name="nome" required />
          </div>
          {/* Adicione o restante dos campos do formulário da mesma maneira */}
          <button type="submit" className="btn btn-primary">Cadastrar Cliente</button>
        </form>

        <h2 className="mt-5">Clientes Cadastrados</h2>
        <input
          type="text"
          id="pesquisar"
          placeholder="Pesquisar em qualquer campo"
          className="form-control mb-3"
          onChange={handleSearch}
        />
        <ul id="clientes-list" className="list-group">
          {clientesFiltrados.map((cliente, index) => (
            <li key={index} className="list-group-item">
              <strong>Nome:</strong> {cliente.nome} <br />
              <strong>Email:</strong> {cliente.email} <br />
              <strong>Telefone:</strong> {cliente.telefone} <br />
              <strong>CPF:</strong> {cliente.cpf} <br />
              <strong>Profissão:</strong> {cliente.profissao} <br />
              <strong>Gênero:</strong> {cliente.genero} <br />
              <strong>Endereço:</strong> {cliente.endereco} <br />
              <strong>Data de Nascimento:</strong> {cliente.dataNascimento} <br />
              <strong>Número de Pedidos Realizados:</strong> {cliente.numeroPedidos} <br />
              <strong>Número do Pedido Atual:</strong> {cliente.numeroPedidoAtual} <br />
              <strong>Observações:</strong> {cliente.observacoes}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
