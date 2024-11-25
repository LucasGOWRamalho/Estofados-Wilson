"use client";
import React, { useState } from 'react';
import Head from 'next/head';
import '../css/style.css';
import Link from 'next/link';

interface Cliente {
  nome: string;
  email: string;
  telefone: string;
  cpf: string;
  profissao: string;
  genero: string;
  endereco: string;
  dataNascimento: string;
  numeroPedidos: number;
  numeroPedidoAtual: number;
  observacoes: string;
}

export default function Home() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [filtro, setFiltro] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const cliente: Cliente = {
      nome: (form.elements.namedItem('nome') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      telefone: (form.elements.namedItem('telefone') as HTMLInputElement).value,
      cpf: (form.elements.namedItem('cpf') as HTMLInputElement).value,
      profissao: (form.elements.namedItem('profissao') as HTMLInputElement).value,
      genero: (form.elements.namedItem('genero') as HTMLInputElement).value,
      endereco: (form.elements.namedItem('endereco') as HTMLInputElement).value,
      dataNascimento: (form.elements.namedItem('dataNascimento') as HTMLInputElement).value,
      numeroPedidos: parseInt((form.elements.namedItem('numeroPedidos') as HTMLInputElement).value),
      numeroPedidoAtual: parseInt((form.elements.namedItem('numeroPedidoAtual') as HTMLInputElement).value),
      observacoes: (form.elements.namedItem('observacoes') as HTMLTextAreaElement).value,
    };
    setClientes([...clientes, cliente]);
    form.reset();
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFiltro(event.target.value.toLowerCase());
  };

  const clientesFiltrados = clientes.filter((cliente) =>
    Object.values(cliente).some((valor) =>
      valor.toString().toLowerCase().includes(filtro)
    )
  );

  return (
    <>
      <Head>
        <title>Cadastro de Clientes</title>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lato:300,400,700&display=swap" />
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" />
      </Head>

      <nav className="menu-lateral">
         <ul>
          <li className="item-menu">
           <Link href="/calendario">
              <span className="icon"><i className="bi bi-calendar3"></i></span>
              <span className="txtlink">Agenda</span>
            </Link>
          </li>
          <li className="item-menu">
            <Link href="/app">
              <span className="icon"><i className="bi bi-house-door"></i></span>
              <span className="txtlink">Clientes</span>
            </Link>
          </li>
          <li className="item-menu">
            <a href="#envios">
              <span className="icon"><i className="bi bi-send"></i></span>
              <span className="txtlink">Envios</span>
            </a>
          </li>
        </ul>
      </nav>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <div style={{ width: '75%', maxWidth: '800px' }}>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="nome" className="form-label">Nome</label>
              <input type="text" className="form-control" id="nome" name="nome" required />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" className="form-control" id="email" name="email" required />
            </div>
            <div className="mb-3">
              <label htmlFor="telefone" className="form-label">Telefone</label>
              <input type="text" className="form-control" id="telefone" name="telefone" required />
            </div>
            <div className="mb-3">
              <label htmlFor="cpf" className="form-label">CPF</label>
              <input type="text" className="form-control" id="cpf" name="cpf" required />
            </div>
            <div className="mb-3">
              <label htmlFor="profissao" className="form-label">Profissão</label>
              <input type="text" className="form-control" id="profissao" name="profissao" required />
            </div>
            <div className="mb-3">
              <label htmlFor="genero" className="form-label">Gênero</label>
              <input type="text" className="form-control" id="genero" name="genero" required />
            </div>
            <div className="mb-3">
              <label htmlFor="endereco" className="form-label">Endereço</label>
              <input type="text" className="form-control" id="endereco" name="endereco" required />
            </div>
            <div className="mb-3">
              <label htmlFor="dataNascimento" className="form-label">Data de Nascimento</label>
              <input type="date" className="form-control" id="dataNascimento" name="dataNascimento" required />
            </div>
            <div className="mb-3">
              <label htmlFor="numeroPedidos" className="form-label">Número de Pedidos Realizados</label>
              <input type="number" className="form-control" id="numeroPedidos" name="numeroPedidos" required />
            </div>
            <div className="mb-3">
              <label htmlFor="codigodopedido" className="form-label">Código do Pedido Atual</label>
              <input type="number" className="form-control" id="codigodopedido" name="codigodopedido" required />
            </div>
            <div className="mb-3">
              <label htmlFor="observacoes" className="form-label">Observações</label>
              <textarea className="form-control" id="observacoes" name="observacoes"></textarea>
            </div>
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
    </>
  );
}
