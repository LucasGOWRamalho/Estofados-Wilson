import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    // Criar um cliente
    const {
      nome,
      email,
      telefone,
      cpf,
      profissao,
      genero,
      endereco,
      dataNascimento,
      numeroPedidos,
      numeroPedidoAtual,
      observacoes,
    } = req.body;

    try {
      const novoCliente = await prisma.cliente.create({
        data: {
          nome,
          email,
          telefone,
          cpf,
          profissao,
          genero,
          endereco,
          dataNascimento: new Date(dataNascimento),
          numeroPedidos,
          numeroPedidoAtual,
          observacoes,
        },
      });

      res.status(201).json({ message: "Cliente cadastrado com sucesso!", cliente: novoCliente });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: "Erro ao cadastrar cliente: " + error.message });
      } else {
        res.status(500).json({ error: "Erro ao cadastrar cliente" });
      }
    }
  } else if (req.method === "GET") {
    // Listar clientes
    try {
      const clientes = await prisma.cliente.findMany();
      res.status(200).json(clientes);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: "Erro ao buscar clientes: " + error.message });
      } else {
        res.status(500).json({ error: "Erro ao buscar clientes" });
      }
    }
  } else {
    res.setHeader("Allow", ["POST", "GET"]);
    res.status(405).end(`Método ${req.method} não permitido`);
  }
}