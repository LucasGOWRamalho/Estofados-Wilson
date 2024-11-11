// Temporariamente usando um array em memória para armazenar os clientes
let clientes = [];

export default function handler(req, res) {
  if (req.method === 'POST') {
    const novoCliente = req.body;
    novoCliente.id = Date.now(); // Gera um ID único
    clientes.push(novoCliente);
    res.status(201).json(novoCliente);
  } else if (req.method === 'GET') {
    const { search } = req.query;
    const resultado = search
      ? clientes.filter(cliente =>
          cliente.nome.toLowerCase().includes(search.toLowerCase())
        )
      : clientes;
    res.status(200).json(resultado);
  } else {
    res.status(405).json({ message: 'Método não permitido' });
  }
}
