# Sistema de Estilos - Guia de Uso (Bootstrap + Paleta Verde)

## Visão Geral
Este sistema combina Bootstrap com uma paleta de cores personalizada baseada em tons de verde. Utiliza CSS Custom Properties (variáveis CSS) para manter consistência e facilidade de manutenção.

## Paleta de Cores

### Cores Primárias
- `--color-primary`: #00796b (Verde principal)
- `--color-primary-dark`: #004d40 (Verde escuro)
- `--color-primary-light`: #26a69a (Verde claro)
- `--color-primary-lighter`: #4db6ac (Verde mais claro)

### Cores Secundárias
- `--color-secondary`: #00695c (Verde secundário)
- `--color-secondary-dark`: #003d33 (Verde secundário escuro)
- `--color-secondary-light`: #1b5e20 (Verde secundário claro)

### Cores Neutras
- `--color-white`: #ffffff
- `--color-light-gray`: #f5f5f5
- `--color-gray`: #e0e0e0
- `--color-medium-gray`: #9e9e9e
- `--color-dark-gray`: #424242
- `--color-black`: #212121

## Como Usar

### 1. Classes Bootstrap Padrão
```html
<!-- Botões -->
<button class="btn btn-primary">Botão Primário</button>
<button class="btn btn-secondary">Botão Secundário</button>
<button class="btn btn-outline-primary">Botão Outline</button>

<!-- Cards -->
<div class="card">
  <div class="card-header">Cabeçalho</div>
  <div class="card-body">
    <h5 class="card-title">Título</h5>
    <p class="card-text">Conteúdo</p>
  </div>
</div>

<!-- Formulários -->
<div class="mb-3">
  <label class="form-label">Nome</label>
  <input type="text" class="form-control" placeholder="Digite seu nome">
</div>

<!-- Navegação -->
<nav class="navbar navbar-expand-lg">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Logo</a>
    <div class="navbar-nav">
      <a class="nav-link" href="#">Home</a>
      <a class="nav-link" href="#">Sobre</a>
    </div>
  </div>
</nav>

<!-- Alertas -->
<div class="alert alert-primary">Alerta primário</div>
<div class="alert alert-success">Alerta de sucesso</div>
<div class="alert alert-warning">Alerta de aviso</div>
<div class="alert alert-danger">Alerta de erro</div>
```

### 2. Grid System Bootstrap
```html
<div class="container">
  <div class="row">
    <div class="col-md-6 col-lg-4">
      <div class="card">Coluna 1</div>
    </div>
    <div class="col-md-6 col-lg-4">
      <div class="card">Coluna 2</div>
    </div>
    <div class="col-md-12 col-lg-4">
      <div class="card">Coluna 3</div>
    </div>
  </div>
</div>
```

### 3. Usando Variáveis CSS Customizadas
```scss
.meu-componente {
  background-color: var(--color-primary);
  color: var(--color-white);
  padding: var(--spacing-md);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-md);
}
```

### 4. Classes Utilitárias Customizadas

#### Cores de Texto
```html
<p class="text-primary-custom">Texto principal</p>
<p class="text-secondary-custom">Texto secundário</p>
<p class="text-accent">Texto de destaque</p>
```

#### Cores de Fundo
```html
<div class="bg-primary-custom">Fundo branco</div>
<div class="bg-dark-custom">Fundo verde escuro</div>
<div class="bg-light-custom">Fundo verde claro</div>
```

#### Espaçamentos Customizados
```html
<div class="m-xs">Margem extra pequena</div>
<div class="m-sm">Margem pequena</div>
<div class="m-md">Margem média</div>
<div class="m-lg">Margem grande</div>
<div class="m-xl">Margem extra grande</div>

<div class="p-xs">Padding extra pequeno</div>
<div class="p-sm">Padding pequeno</div>
<div class="p-md">Padding médio</div>
<div class="p-lg">Padding grande</div>
<div class="p-xl">Padding extra grande</div>
```

#### Tipografia Customizada
```html
<h1 class="font-xxxl">Título extra grande</h1>
<h2 class="font-xxl">Título grande</h2>
<p class="font-sm">Texto pequeno</p>

<p class="font-light">Texto leve</p>
<p class="font-medium">Texto médio</p>
<p class="font-bold">Texto negrito</p>
```

### 5. Componentes Bootstrap Customizados

#### Botões com Hover Effects
```html
<button class="btn btn-primary">Botão com hover</button>
<button class="btn btn-secondary">Botão secundário</button>
<button class="btn btn-outline-primary">Botão outline</button>
```

#### Cards com Animações
```html
<div class="card animate-fadeIn">
  <div class="card-header">
    <h5 class="card-title">Card Animado</h5>
  </div>
  <div class="card-body">
    <p class="card-text">Este card aparece com animação fadeIn</p>
  </div>
</div>
```

#### Formulários Estilizados
```html
<form>
  <div class="mb-3">
    <label class="form-label">Email</label>
    <input type="email" class="form-control" placeholder="seu@email.com">
  </div>
  <div class="mb-3">
    <label class="form-label">Senha</label>
    <input type="password" class="form-control" placeholder="••••••••">
  </div>
  <button type="submit" class="btn btn-primary">Entrar</button>
</form>
```

### 6. Animações Disponíveis
```html
<div class="animate-fadeIn">Aparece com fade</div>
<div class="animate-slideIn">Desliza da esquerda</div>
<div class="animate-pulse">Pulsação contínua</div>
```

### 7. Estados de Carregamento
```html
<div class="loading">
  <div class="spinner"></div>
  <p>Carregando...</p>
</div>
```

### 8. Responsividade Bootstrap
```html
<!-- Classes responsivas -->
<div class="col-12 col-md-6 col-lg-4">Responsivo</div>

<!-- Display responsivo -->
<div class="d-none d-md-block">Visível apenas em desktop</div>
<div class="d-block d-md-none">Visível apenas em mobile</div>

<!-- Texto responsivo -->
<h1 class="h1 h-md-2 h-lg-1">Título responsivo</h1>
```

## Exemplo Prático Completo
```html
<div class="container">
  <nav class="navbar navbar-expand-lg mb-4">
    <div class="container-fluid">
      <a class="navbar-brand font-bold" href="#">Sistema</a>
      <div class="navbar-nav">
        <a class="nav-link" href="#">Home</a>
        <a class="nav-link" href="#">Sobre</a>
      </div>
    </div>
  </nav>

  <div class="row">
    <div class="col-md-6">
      <div class="card animate-fadeIn">
        <div class="card-header">
          <h5 class="card-title font-semibold">Título do Card</h5>
        </div>
        <div class="card-body">
          <p class="card-text text-secondary-custom">Descrição do conteúdo</p>
          <div class="d-flex gap-2">
            <button class="btn btn-primary">Ação Principal</button>
            <button class="btn btn-outline-primary">Ação Secundária</button>
          </div>
        </div>
      </div>
    </div>
    
    <div class="col-md-6">
      <form>
        <div class="mb-3">
          <label class="form-label font-medium">Nome</label>
          <input type="text" class="form-control" placeholder="Digite seu nome">
        </div>
        <div class="mb-3">
          <label class="form-label font-medium">Email</label>
          <input type="email" class="form-control" placeholder="seu@email.com">
        </div>
        <button type="submit" class="btn btn-primary w-100">Enviar</button>
      </form>
    </div>
  </div>
</div>
```

## Benefícios da Integração Bootstrap + Customização
- ✅ Sistema de grid responsivo robusto
- ✅ Componentes prontos e testados
- ✅ Paleta de cores personalizada
- ✅ Animações e transições suaves
- ✅ Acessibilidade integrada
- ✅ Performance otimizada
- ✅ Fácil manutenção e atualização
- ✅ Compatibilidade cross-browser