# StudyTask

**Seu gestor de tarefas acadêmicas** 📚

StudyTask é uma aplicação web simples, responsiva e acessível para gerenciar tarefas acadêmicas. Construída com HTML5 puro, CSS3 e JavaScript, sem dependências externas.

## ✨ Características

- ✅ **Criar Tarefas** - Adicione tarefas com título, disciplina, data de vencimento e prioridade
- 📋 **Listar Tarefas** - Visualize todas as suas tarefas organizadas
- ✏️ **Editar Tarefas** - Modifique qualquer tarefa existente
- ✔️ **Marcar Concluídas** - Marque tarefas como pendentes ou concluídas
- 🗑️ **Deletar Tarefas** - Remova tarefas com confirmação de segurança
- 🔍 **Filtrar Tarefas** - Veja todas, apenas pendentes ou apenas concluídas
- 💾 **Persistência** - Todas as tarefas são salvas automaticamente no localStorage
- 📱 **Responsivo** - Funciona perfeitamente em dispositivos móveis, tablets e desktops
- ♿ **Acessível** - Compatível com WCAG 2.1 AA, suporta navegação por teclado
- ⚡ **Rápido** - Sem servidor, sem dependências, carregamento instantâneo

## 🚀 Começando

### Usando Localmente

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/seu-usuario/StudyTask.git
   cd StudyTask
   ```

2. **Abra no navegador:**
   ```bash
   # Opção 1: Simplesmente abra o arquivo index.html
   open index.html
   
   # Opção 2: Use um servidor local (Node.js)
   npx http-server -p 8000
   
   # Opção 3: Use Python
   python -m http.server 8000
   ```

3. **Acesse a aplicação:**
   - Abra `http://localhost:8000` no seu navegador

### Usando no GitHub Pages

A aplicação está implantada automaticamente em GitHub Pages. Acesse:
```
https://seu-usuario.github.io/StudyTask
```

## 📖 Como Usar

### Criar uma Tarefa

1. Preencha o formulário com:
   - **Título** (obrigatório): Nome da tarefa
   - **Disciplina** (obrigatória): Disciplina relacionada
   - **Data de Vencimento** (obrigatória): Quando a tarefa deve ser concluída
   - **Prioridade** (opcional): Baixa, Média ou Alta (padrão: Média)

2. Clique em "Criar Tarefa"

3. Sua tarefa aparecerá na lista

### Editar uma Tarefa

1. Clique no botão "✏️ Editar" em qualquer tarefa
2. Modifique os campos desejados
3. Clique em "Salvar Alterações"

### Marcar como Concluída

- Clique na caixa de seleção à esquerda da tarefa
- A tarefa será marcada como concluída (com risca)

### Deletar uma Tarefa

1. Clique no botão "🗑️ Deletar"
2. Confirme a exclusão na janela de diálogo
3. A tarefa será removida

### Filtrar Tarefas

Use os botões de filtro no topo:
- **Todas** - Mostra todas as tarefas
- **Pendentes** - Mostra apenas tarefas não concluídas
- **Concluídas** - Mostra apenas tarefas concluídas

## 🏗️ Arquitetura

StudyTask utiliza uma arquitetura modular com 7 módulos independentes:

```
js/
├── main.js           - Inicialização da aplicação
├── task-manager.js   - Lógica CRUD de tarefas
├── storage.js        - Abstração localStorage
├── validation.js     - Validação de dados
├── ui.js            - Renderização e eventos DOM
├── filters.js       - Lógica de filtros
└── utils.js         - Funções auxiliares

styles/
├── main.css         - Layout e estilos base
├── components.css   - Estilos de componentes
└── accessibility.css - Conformidade WCAG 2.1 AA
```

### Fluxo de Dados

```
UI (user input) 
  ↓
Validation (check rules) 
  ↓
TaskManager (CRUD operations) 
  ↓
Storage (persist to localStorage) 
  ↓
Filters (apply view filter) 
  ↓
UI (render results)
```

## 🎯 Requisitos Técnicos

- **Navegadores Suportados**: Chrome, Edge, Firefox, Safari (versões recentes)
- **Tamanho**:
  - HTML: ~15 KB
  - CSS: ~35 KB
  - JavaScript: ~45 KB
  - **Total: ~95 KB**
- **Capacidade**: ~100 tarefas (baseado na quota localStorage)
- **Offline**: Totalmente funcional após carregamento inicial
- **Performance**: <2s de carregamento em 3G

## 💾 Armazenamento de Dados

Todas as tarefas são armazenadas no `localStorage` do seu navegador:
- **Chave**: `studytask_tasks`
- **Formato**: JSON
- **Limite**: ~5-10 MB por domínio
- **Persistência**: Dados persistem enquanto você não limpar o cache do navegador

## ♿ Acessibilidade

StudyTask está em conformidade com **WCAG 2.1 Level AA**:
- ✅ Navegação completa por teclado
- ✅ Indicadores de foco visíveis (2px outline)
- ✅ Contraste de cores ≥ 4.5:1 (WCAG AA)
- ✅ Rótulos de formulário bem associados
- ✅ Suporte a leitores de tela
- ✅ Tamanho de botões ≥ 44px (toque)
- ✅ Suporte para `prefers-reduced-motion`
- ✅ Modo escuro automático
- ✅ Suporte multilingue (português)

## 📱 Responsividade

Design mobile-first com suporte completo para:
- 📱 **Mobile**: 320px - 480px
- 📱 **Larger Phone**: 480px - 768px
- 📖 **Tablet**: 768px - 1200px
- 🖥️ **Desktop**: 1200px - 1920px
- 🖥️ **Large Desktop**: 1920px+

## 🔒 Segurança

- ✅ Sem servidor backend (seguro por padrão)
- ✅ Sem banco de dados remoto
- ✅ Proteção contra XSS (sanitização de HTML)
- ✅ Validação de entrada no cliente
- ✅ Dados locais apenas (localStorage)

## 📋 Requisitos Funcionais Implementados

- [x] RF-001: Criar tarefa com validação
- [x] RF-002: Validar campos de entrada
- [x] RF-003: Listar todas as tarefas
- [x] RF-004: Marcar tarefa como completa/pendente
- [x] RF-005: Editar tarefa existente
- [x] RF-006: Deletar tarefa com confirmação
- [x] RF-007: Filtrar tarefas por status
- [x] RF-008: Persistir dados no localStorage

## 📋 Requisitos de Negócio Implementados

- [x] RN-001: Campos obrigatórios (título, disciplina, data)
- [x] RN-002: Prioridade padrão é Média
- [x] RN-003: Novas tarefas começam como Pendente
- [x] RN-004: Exclusão requer confirmação
- [x] RN-005: Tarefas concluídas permanecem visíveis
- [x] RN-006: IDs únicos para cada tarefa
- [x] RN-007: Espaços em branco removidos automaticamente

## 🧪 Testando Localmente

### Teste Rápido

```bash
# Abra em qualquer navegador
open index.html
```

### Teste com Servidor Local

```bash
# Node.js
npx http-server -p 8000

# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

Então acesse: `http://localhost:8000`

### Cenários de Teste Manuais

1. **Criar Tarefa**
   - Preencha todos os campos
   - Clique "Criar Tarefa"
   - Tarefa deve aparecer na lista como Pendente

2. **Editar Tarefa**
   - Clique "✏️ Editar" em uma tarefa
   - Modifique título e prioridade
   - Clique "Salvar Alterações"
   - Mudanças devem aparecer imediatamente

3. **Marcar Concluída**
   - Clique na caixa de seleção
   - Tarefa deve ficar com risca

4. **Deletar Tarefa**
   - Clique "🗑️ Deletar"
   - Confirme no modal
   - Tarefa deve desaparecer

5. **Filtrar**
   - Crie 3 tarefas: 2 pendentes, 1 concluída
   - Clique "Pendentes" - deve mostrar 2
   - Clique "Concluídas" - deve mostrar 1
   - Clique "Todas" - deve mostrar 3

6. **Persistência**
   - Crie uma tarefa
   - Feche o navegador completamente
   - Reabra o site
   - Tarefa deve ainda estar lá

7. **Acessibilidade**
   - Navegue usando apenas Tab e Enter
   - Teste com zoom 200% (Ctrl + / Ctrl -)
   - Teste com modo alto contraste
   - Teste com modo escuro

## 🐛 Troubleshooting

**Q: As tarefas não estão sendo salvas**
- R: Verifique se localStorage está ativado no navegador
- R: Tente em modo normal (não modo privado/incognito)

**Q: O site não carrega no telefone**
- R: Verifique se tem conexão com internet
- R: Limpe o cache do navegador
- R: Tente em navegador diferente

**Q: Estou tendo erros de validação**
- R: Verifique se todos os campos obrigatórios estão preenchidos
- R: Título deve ter no mínimo 1 caractere
- R: Data deve estar no formato correto

## 📜 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para detalhes.

## 👤 Autor

**StudyTask** foi criado como um projeto educacional.

## 🙏 Contribuições

Contribuições são bem-vindas! Por favor:
1. Faça um Fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📞 Suporte

Para reportar bugs ou sugerir melhorias, abra uma Issue no GitHub.

---

**Desenvolvido com ❤️ usando HTML5, CSS3 e JavaScript Puro**
