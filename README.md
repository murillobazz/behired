# Behired

> Organize e acompanhe seus processos seletivos de forma visual e eficiente.

**Behired** é uma aplicação web pessoal que ajuda profissionais de tecnologia a gerenciarem seus processos seletivos. Com interface limpa e intuitiva, você consegue visualizar rapidamente o status de cada vaga, acompanhar as etapas percorridas e manter um histórico organizado de toda sua jornada de busca por emprego.

## 📋 Sobre o Projeto

Este é um projeto orientado a portfolio que demonstra boas práticas de desenvolvimento front-end, com foco em:

- Arquitetura limpa e componentização
- TypeScript para type safety
- Design system consistente baseado em Figma
- UX focada em clareza e facilidade de uso

### Status Atual: MVP (v1 - Front-end)

A versão atual utiliza dados mockados em memória para validação da interface e experiência do usuário antes da implementação do backend.

## 🛠️ Stack Tecnológica

- **Framework**: [Next.js 16](https://nextjs.org) (App Router)
- **Linguagem**: [TypeScript](https://www.typescriptlang.org/)
- **Estilização**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Componentes**: [shadcn/ui](https://ui.shadcn.com/) (New York style)
- **Fontes**: Azeret Mono, Averia Serif Libre
- **Ícones**: [Lucide React](https://lucide.dev/)

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
├── lib/                   # Utilitários e helpers
│   ├── constants.ts      # Status, labels, template padrão
│   ├── date-utils.ts     # Formatação de datas
│   ├── mock-data.ts      # Dados mockados para desenvolvimento
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

## ✨ Funcionalidades (Planejadas)

### ✅ Implementado (v1 - MVP Front-end)
- [x] Visualização de processos em card layout
- [x] Design system baseado em Figma
- [x] Dados mockados para validação de UI

### 🚧 Em Desenvolvimento
- [ ] Context API para gerenciamento de estado
- [ ] Página de detalhes com timeline das etapas
- [ ] Formulários de criação/edição de processos
- [ ] Filtros e busca textual
- [ ] Dialogs para ações (adicionar etapa, encerrar, deletar)

### 📅 Próximas Funcionalidades (v2)
- [ ] Autenticação (GitHub OAuth via BetterAuth)
- [ ] Persistência com Supabase
- [ ] Dashboard com métricas
- [ ] Exportação de dados


## 📄 Licença

Este projeto é de código aberto e está disponível sob a licença MIT.

