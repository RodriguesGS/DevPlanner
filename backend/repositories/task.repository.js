let tasks = [
  {
    id: 't1',
    projectId: 'p1',
    title: 'Criar wireframes da tela de login',
    description: 'Desenhar protótipo no Figma',
    status: 'BACKLOG',
    priority: 'MEDIA',
    dueDate: '2025-09-13',
    createdAt: '2025-09-01',
  },
  {
    id: 't2',
    projectId: 'p1',
    title: 'Configurar ambiente Angular',
    status: 'FINALIZADO',
    priority: 'ALTA',
    dueDate: '2025-09-12',
    createdAt: '2025-09-03',
  },
  {
    id: 't3',
    projectId: 'p1',
    title: 'Implementar autenticação básica',
    status: 'VALIDACAO',
    priority: 'ALTA',
    dueDate: '2025-09-10',
    createdAt: '2025-09-04',
  },
  {
    id: 't4',
    projectId: 'p1',
    title: 'Configurar CI/CD no GitHub Actions',
    status: 'FINALIZADO',
    priority: 'MEDIA',
    createdAt: '2025-08-28',
    completedAt: '2025-09-05',
  },
  {
    id: 't5',
    projectId: 'p1',
    title: 'Escrever documentação inicial do projeto',
    status: 'BACKLOG',
    priority: 'BAIXA',
    createdAt: '2025-09-07',
  },
  {
    id: 't6',
    projectId: 'p1',
    title: 'Criar serviço de API mock',
    status: 'DEV',
    priority: 'MEDIA',
    dueDate: '2025-09-14',
    createdAt: '2025-09-05',
  },
  {
    id: 't7',
    projectId: 'p1',
    title: 'Montar layout do Dashboard',
    status: 'VALIDACAO',
    priority: 'ALTA',
    dueDate: '2025-09-09',
    createdAt: '2025-09-02',
  },
  {
    id: 't8',
    projectId: 'p1',
    title: 'Integrar biblioteca de gráficos',
    status: 'FINALIZADO',
    priority: 'ALTA',
    createdAt: '2025-09-01',
    completedAt: '2025-09-08',
  },
  {
    id: 't9',
    projectId: 'p1',
    title: 'Criar componente de card de tarefa',
    status: 'DEV',
    priority: 'MEDIA',
    createdAt: '2025-09-06',
  },
  {
    id: 't10',
    projectId: 'p1',
    title: 'Refatorar estilos globais',
    status: 'BACKLOG',
    priority: 'BAIXA',
    createdAt: '2025-09-05',
  },
];

export const findAll = () => {
  return [...tasks];
};

export const findById = (id) => {
  return tasks.find(task => task.id === id);
};

export const findByProject = (projectId) => {
  return tasks.filter(task => task.projectId === projectId);
};

export const create = (taskData) => {
  tasks.push(taskData);
  return taskData;
};

export const update = (id, updates) => {
  const index = tasks.findIndex(task => task.id === id);

  if (index === -1) {
    return null;
  }

  tasks[index] = { ...tasks[index], ...updates };
  return tasks[index];
};

export const remove = (id) => {
  const index = tasks.findIndex(task => task.id === id);

  if (index === -1) {
    return false;
  }

  tasks.splice(index, 1);
  return true;
};
