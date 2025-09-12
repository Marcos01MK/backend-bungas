const express = require('express');
const tarefas = [
  { id: 1, nome: "Estudar middleware", concluida: false },
  { id: 2, nome: "Praticar Express", concluida: true }
];

const app = express();


app.use(express.json());

app.use((req, res, next) => {
  const now = new Date();
  console.log(`${now.toISOString()} - ${req.method} ${req.url}`);
  next();
});

const router = express.Router();

// Rotas
router.get('/tarefas', (req, res) => {
  res.json(tarefas);
});

router.post('/tarefas', (req, res) => {
  const novaTarefa = req.body;
  novaTarefa.id = tarefas.length + 1;
  tarefas.push(novaTarefa);
  res.status(201).json(novaTarefa);
});

router.get('/tarefas/:tarefaId', (req, res, next) => {
  const tarefaId = parseInt(req.params.tarefaId);
  const tarefa = tarefas.find(t => t.id === tarefaId);
  if (!tarefa) {
    return next(new Error('Tarefa não localizada'));
  }
  res.json(tarefa);
});

router.put('/tarefas/:tarefaId', (req, res, next) => {
  const tarefaId = parseInt(req.params.tarefaId);
  const tarefaIndex = tarefas.findIndex(t => t.id === tarefaId);
  if (tarefaIndex === -1) {
    return next(new Error('Tarefa não localizada'));
  }
  const atualizada = { ...tarefas[tarefaIndex], ...req.body, id: tarefaId };
  tarefas[tarefaIndex] = atualizada;
  res.json(atualizada);
});

router.delete('/tarefas/:tarefaId', (req, res, next) => {
  const tarefaId = parseInt(req.params.tarefaId);
  const tarefaIndex = tarefas.findIndex(t => t.id === tarefaId);
  if (tarefaIndex === -1) {
    return next(new Error('Tarefa não localizada'));
  }
  tarefas.splice(tarefaIndex, 1);
  res.status(204).send();
});

app.use('/api', router);

// Middleware de erro
app.use((err, req, res, next) => {
  res.status(400).json({ error: err.message });
});

// Porta
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});

module.exports = app;