"use client";

import { useState } from "react";

type Recipient = {
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

export default function CampanhaPage() {
  const [recipients, setRecipients] = useState<Recipient[]>([
    {
      id: "1",
      nome: "João da Silva",
      email: "joao.silva@example.com",
      telefone: "123456789",
      cpf: "111.222.333-44",
      profissao: "Programador",
      genero: "Masculino",
      endereco: "Rua A, 123",
      dataNascimento: "2000-01-01",
      numeroPedidos: 5,
      codigoCompra: "ABC123",
      observacoes: "Cliente VIP",
    },
    {
      id: "2",
      nome: "Maria Oliveira",
      email: "maria.oliveira@example.com",
      telefone: "987654321",
      cpf: "555.666.777-88",
      profissao: "Designer",
      genero: "Feminino",
      endereco: "Rua B, 456",
      dataNascimento: "1995-05-15",
      numeroPedidos: 3,
      codigoCompra: "XYZ456",
      observacoes: "Cliente nova",
    },
  ]);

  return (
    <div>
      <h1>Campanha</h1>
      <p>Bem-vindo à página de campanha!</p>
      <div>
        {recipients.map((recipient, index) => (
          <div key={index}>
            <strong>{recipient.nome}</strong> - {recipient.telefone}
          </div>
        ))}
      </div>
    </div>
  );
}
