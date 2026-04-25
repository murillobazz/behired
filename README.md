# Behired

> Organize e acompanhe seus processos seletivos de forma visual, rápida e privada.

**Behired** é uma aplicação web 100% local-first que ajuda profissionais de tecnologia a gerenciarem seus processos seletivos. Com interface limpa e intuitiva, você consegue visualizar rapidamente o status de cada vaga, acompanhar as etapas percorridas e manter um histórico organizado de toda sua jornada de busca por emprego — **tudo privadamente no seu dispositivo**, sem necessidade de criar conta ou compartilhar dados.

## 📋 Sobre o Projeto

**Local-First. Private. No Auth.** Behired demonstra boas práticas de desenvolvimento front-end moderno com foco em:

- **Privacidade em primeiro lugar**: Seus dados ficam apenas no seu navegador
- **Sem autenticação necessária**: Use imediatamente, nenhum login
- **Funciona offline**: Toda a aplicação roda localmente
- **Arquitetura limpa e componentização**: Código bem estruturado e reutilizável
- **TypeScript para type safety**: Desenvolvimento seguro e previsível
- **Design system consistente**: Interface criada em Figma e fielmente implementada
- **Performance**: Sem latência de servidor, tudo instantâneo

### Status Atual: MVP (v1 - Local-First)

A versão atual é totalmente funcional com persistência em browser storage, permitindo que seus dados de processos seletivos sejam salvos e recuperados sempre que você acessar a aplicação.

## 🛠️ Stack Tecnológica

- **Framework**: [Next.js 16](https://nextjs.org) (App Router)
- **Linguagem**: [TypeScript](https://www.typescriptlang.org/)
- **Estilização**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Componentes**: [shadcn/ui](https://ui.shadcn.com/) (New York style)
- **Fontes**: Azeret Mono, Averia Serif Libre
- **Ícones**: [Lucide React](https://lucide.dev/)
- **Persistência**: Browser Storage (localStorage)

## 💾 Como Funciona: Local-First

Behired é uma aplicação **100% client-side** sem backend:

1. **Dados Locais**: Todos os seus processos seletivos são armazenados no `localStorage` do seu navegador
2. **Sem Servidor**: A aplicação roda completamente no navegador — nenhuma requisição para backend
3. **Privacidade Total**: Seus dados nunca deixam seu dispositivo
4. **Funciona Offline**: Uma vez carregada, a aplicação funciona sem conexão à internet
5. **Síncrono e Rápido**: Todas as operações são instantâneas, sem latência de rede

**Não há necessidade de criar conta, fazer login ou compartilhar qualquer dado.**

## 📁 Estrutura do Projeto

```
src/
├── app/                    # Páginas e rotas (App Router)
│   ├── layout.tsx         # Layout raiz com fontes
│   ├── page.tsx           # Página inicial (grid de processos)
│   └── globals.css        # Estilos globais e tema
├── components/            # Componentes React reutilizáveis
│   ├── ui/               # Componentes shadcn/ui
│   ├── PageHeader.tsx    # Cabeçalho com logo e menu
│   └── ProcessCard.tsx   # Card de processo seletivo
├── contexts/              # Context API para estado global
│   └── ProcessContext.tsx # Estado dos processos
├── hooks/                 # Hooks customizados
│   └── use-processes.ts  # Hook para manipular processos
├── lib/                   # Utilitários e helpers
│   ├── constants.ts      # Status, labels, template padrão
│   ├── date-utils.ts     # Formatação de datas
│   ├── storage-utils.ts  # Leitura/escrita em localStorage
│   ├── process-utils.ts  # Lógica de negócio dos processos
│   └── utils.ts          # Utility functions (cn, etc)
└── types/                 # Definições TypeScript
    └── index.ts          # Process, Stage, ProcessStatus
```

## 🎨 Design

O design da interface foi criado no Figma e implementado com fidelidade visual, utilizando:

- Paleta de cores personalizada
- Tipografia hierárquica (Averia Serif Libre para branding, Azeret Mono para conteúdo)
- Cards com sombras sutis e estados de hover
- Layout responsivo e acessível

## ✨ Funcionalidades

### ✅ Implementado (v1 - MVP Local-First)
- [x] Visualização de processos em card layout
- [x] Persistência de dados em browser storage
- [x] Design system baseado em Figma
- [x] Context API para gerenciamento de estado

### 🚧 Em Desenvolvimento
- [ ] Página de detalhes com timeline das etapas
- [ ] Formulários de criação/edição de processos
- [ ] Filtros e busca textual
- [ ] Dialogs para ações (adicionar etapa, encerrar, deletar)
- [ ] Drag & drop para organizar processos
- [ ] Temas claro/escuro

### 📅 Futuras Melhorias
- [ ] Exportação de dados (JSON, CSV)
- [ ] Sincronização opcional com nuvem (opt-in)
- [ ] Backup automático em arquivo
- [ ] Estatísticas e análises de processos


## 📄 Licença

Este projeto é de código aberto e está disponível sob a licença MIT.

