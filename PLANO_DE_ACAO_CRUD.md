# Plano de Ação - Replicação do CRUD de Usuário

## 📋 Estrutura Atual do CRUD de Usuário

### Frontend
- **Listagem**: `user-management.component.ts/html/scss`
  - Paginação com busca
  - Ações: Editar, Visualizar, Remover
  - Modal de confirmação para exclusão
  - Header centralizado com botão "Voltar" e "Novo Usuário"

- **Criação**: `user-create.component.ts/html/scss`
  - Formulário reativo com validações
  - Header centralizado com botão "Voltar"
  - Toast notifications

- **Edição**: `user-edit.component.ts/html/scss`
  - Carrega dados via GET por ID
  - Formulário preenchido com dados existentes
  - Header centralizado com botão "Voltar"
  - Senha opcional (não atualiza se vazia)

- **Visualização**: `user-view.component.ts/html/scss`
  - Campos somente leitura
  - Header centralizado com botão "Voltar"
  - Não exibe senha

- **Rotas**: `routes.ts`
  - `/users` - Listagem
  - `/users/create` - Criação
  - `/users/edit/:id` - Edição
  - `/users/view/:id` - Visualização

### Backend
- **Controller**: `AuthenticationController.cs`
  - `POST /Authentication` - Criar
  - `POST /Authentication/Pagination` - Listagem paginada
  - `GET /Authentication/{id}` - Buscar por ID
  - `PUT /Authentication/{id}` - Atualizar
  - `DELETE /Authentication/{id}` - Deletar

- **Service**: `IAuthenticationService` / `AuthenticationService`
- **Repository**: `IAuthenticationRepository` / `AuthenticationRepository`
  - Método `GetPaged` implementado com busca

---

## 🎯 Entidades a Implementar

1. **Patient** (Paciente)
2. **Doctor** (Médico)
3. **Appointment** (Agendamento)
4. **Specialty** (Especialidade)

---

## 📝 Plano de Implementação

### FASE 1: Backend - Paginação e Endpoints

#### 1.1 Patient (Paciente)
**Status Atual:**
- ✅ GET, GET/{id}, POST, PUT/{id}, DELETE/{id} existem
- ❌ Paginação não implementada
- ❌ GetById retorna sem verificação de null

**Ações:**
- [ ] Adicionar `GetPaged` em `IPatientRepository`
- [ ] Implementar `GetPaged` em `PatientRepository`
- [ ] Adicionar `GetPaged` em `IPatientService`
- [ ] Implementar `GetPaged` em `PatientService`
- [ ] Adicionar endpoint `POST /Patient/Pagination` em `PatientController`
- [ ] Ajustar `GetById` para retornar NotFound quando não encontrado

#### 1.2 Doctor (Médico)
**Status Atual:**
- ✅ GET, GET/{id}, POST, PUT/{id}, DELETE/{id} existem
- ❌ Paginação não implementada
- ❌ GetById não verifica null

**Ações:**
- [ ] Adicionar `GetPaged` em `IDoctorRepository`
- [ ] Implementar `GetPaged` em `DoctorRepository`
- [ ] Adicionar `GetPaged` em `IDoctorService`
- [ ] Implementar `GetPaged` em `DoctorService`
- [ ] Adicionar endpoint `POST /Doctor/Pagination` em `DoctorController`
- [ ] Ajustar `GetById` para retornar NotFound quando não encontrado

#### 1.3 Appointment (Agendamento)
**Status Atual:**
- ✅ GET, GET/{id}, POST, PUT/{id}, DELETE/{id} existem
- ✅ GetById já verifica null
- ❌ Paginação não implementada

**Ações:**
- [ ] Adicionar `GetPaged` em `IAppointmentRepository`
- [ ] Implementar `GetPaged` em `AppointmentRepository`
- [ ] Adicionar `GetPaged` em `IAppointmentService`
- [ ] Implementar `GetPaged` em `AppointmentService`
- [ ] Adicionar endpoint `POST /Appointment/Pagination` em `AppointmentController`

#### 1.4 Specialty (Especialidade)
**Status Atual:**
- ✅ GET, POST, DELETE/{id} existem
- ❌ GetById não existe
- ❌ Update não existe
- ❌ Paginação não implementada

**Ações:**
- [ ] Adicionar `GetById` em `ISpecialtyRepository`
- [ ] Implementar `GetById` em `SpecialtyRepository`
- [ ] Adicionar `Update` em `ISpecialtyRepository`
- [ ] Implementar `Update` em `SpecialtyRepository`
- [ ] Adicionar `GetPaged` em `ISpecialtyRepository`
- [ ] Implementar `GetPaged` em `SpecialtyRepository`
- [ ] Adicionar métodos em `ISpecialtyService`
- [ ] Implementar métodos em `SpecialtyService`
- [ ] Adicionar endpoints em `SpecialtyController`:
  - `GET /Specialty/{id}`
  - `PUT /Specialty/{id}`
  - `POST /Specialty/Pagination`

---

### FASE 2: Frontend - Serviços

#### 2.1 Patient Service
**Ações:**
- [ ] Adicionar método `pagination(pagedList: PagedList<any>): Promise<any>`
- [ ] Adicionar método `getPatientById(id: number): Promise<any>`
- [ ] Adicionar método `updatePatient(id: number, patientData: any): Observable<boolean>`
- [ ] Adicionar método `deletePatient(id: number): Promise<boolean>`
- [ ] Ajustar métodos existentes para seguir padrão Promise/Observable

#### 2.2 Doctor Service
**Ações:**
- [ ] Adicionar método `pagination(pagedList: PagedList<any>): Promise<any>`
- [ ] Adicionar método `getDoctorById(id: number): Promise<any>`
- [ ] Adicionar método `updateDoctor(id: number, doctorData: any): Observable<boolean>`
- [ ] Adicionar método `deleteDoctor(id: number): Promise<boolean>`
- [ ] Ajustar métodos existentes para seguir padrão Promise/Observable

#### 2.3 Appointment Service
**Ações:**
- [ ] Adicionar método `pagination(pagedList: PagedList<any>): Promise<any>`
- [ ] Adicionar método `getAppointmentById(id: number): Promise<any>`
- [ ] Adicionar método `updateAppointment(id: number, appointmentData: any): Observable<boolean>`
- [ ] Adicionar método `deleteAppointment(id: number): Promise<boolean>`
- [ ] Ajustar métodos existentes para seguir padrão Promise/Observable

#### 2.4 Specialty Service
**Ações:**
- [ ] Adicionar método `pagination(pagedList: PagedList<any>): Promise<any>`
- [ ] Adicionar método `getSpecialtyById(id: number): Promise<any>`
- [ ] Adicionar método `updateSpecialty(id: number, specialtyData: any): Observable<boolean>`
- [ ] Adicionar método `deleteSpecialty(id: number): Promise<boolean>`
- [ ] Ajustar métodos existentes para seguir padrão Promise/Observable

---

### FASE 3: Frontend - Componentes de Listagem

#### 3.1 Patient Management
**Arquivos a criar:**
- `patient-management.component.ts`
- `patient-management.component.html`
- `patient-management.component.scss`

**Funcionalidades:**
- Listagem paginada com busca
- Colunas: ID, Nome, CPF, Email, Telefone, Data Nascimento
- Ações: Editar, Visualizar, Remover
- Modal de confirmação para exclusão
- Header centralizado: "Gerenciamento de Pacientes"
- Botão "Novo Paciente"

#### 3.2 Doctor Management
**Arquivos a criar:**
- `doctor-management.component.ts`
- `doctor-management.component.html`
- `doctor-management.component.scss`

**Funcionalidades:**
- Listagem paginada com busca
- Colunas: ID, Nome, CRM, Especialidade, Email, Telefone
- Ações: Editar, Visualizar, Remover
- Modal de confirmação para exclusão
- Header centralizado: "Gerenciamento de Médicos"
- Botão "Novo Médico"

#### 3.3 Appointment Management
**Arquivos a criar:**
- `appointment-management.component.ts`
- `appointment-management.component.html`
- `appointment-management.component.scss`

**Funcionalidades:**
- Listagem paginada com busca
- Colunas: ID, Paciente, Médico, Especialidade, Data, Horário, Status
- Ações: Editar, Visualizar, Remover
- Modal de confirmação para exclusão
- Header centralizado: "Gerenciamento de Agendamentos"
- Botão "Novo Agendamento"

#### 3.4 Specialty Management
**Arquivos a criar:**
- `specialty-management.component.ts`
- `specialty-management.component.html`
- `specialty-management.component.scss`

**Funcionalidades:**
- Listagem paginada com busca
- Colunas: ID, Nome, Descrição, Quantidade de Médicos
- Ações: Editar, Visualizar, Remover
- Modal de confirmação para exclusão
- Header centralizado: "Gerenciamento de Especialidades"
- Botão "Nova Especialidade"

---

### FASE 4: Frontend - Componentes de Criação

#### 4.1 Patient Create
**Arquivos a criar:**
- `patient-create/patient-create.component.ts`
- `patient-create/patient-create.component.html`
- `patient-create/patient-create.component.scss`

**Campos do formulário:**
- Nome (obrigatório)
- Sobrenome (obrigatório)
- CPF (obrigatório, formatado)
- Email (obrigatório, validação de email)
- Telefone (opcional, formatado)
- Data de Nascimento (obrigatório)
- Endereço (opcional)

#### 4.2 Doctor Create
**Arquivos a criar:**
- `doctor-create/doctor-create.component.ts`
- `doctor-create/doctor-create.component.html`
- `doctor-create/doctor-create.component.scss`

**Campos do formulário:**
- Nome (obrigatório)
- Sobrenome (obrigatório)
- CRM (obrigatório)
- Especialidade (obrigatório, dropdown)
- Email (obrigatório, validação de email)
- Telefone (opcional, formatado)
- Data de Nascimento (opcional)

#### 4.3 Appointment Create
**Arquivos a criar:**
- `appointment-create/appointment-create.component.ts`
- `appointment-create/appointment-create.component.html`
- `appointment-create/appointment-create.component.scss`

**Campos do formulário:**
- Paciente (obrigatório, dropdown)
- Médico (obrigatório, dropdown)
- Especialidade (obrigatório, dropdown)
- Data (obrigatório, datepicker)
- Horário (obrigatório, timepicker)
- Observações (opcional, textarea)
- Status (obrigatório, dropdown: Agendado, Confirmado, Cancelado, Concluído)

#### 4.4 Specialty Create
**Arquivos a criar:**
- `specialty-create/specialty-create.component.ts`
- `specialty-create/specialty-create.component.html`
- `specialty-create/specialty-create.component.scss`

**Campos do formulário:**
- Nome (obrigatório)
- Descrição (obrigatório, textarea)

---

### FASE 5: Frontend - Componentes de Edição

#### 5.1 Patient Edit
**Arquivos a criar:**
- `patient-edit/patient-edit.component.ts`
- `patient-edit/patient-edit.component.html`
- `patient-edit/patient-edit.component.scss`

**Funcionalidades:**
- Carrega dados via GET por ID
- Formulário preenchido com dados existentes
- Mesmos campos do Create
- Header: "Editar Paciente"

#### 5.2 Doctor Edit
**Arquivos a criar:**
- `doctor-edit/doctor-edit.component.ts`
- `doctor-edit/doctor-edit.component.html`
- `doctor-edit/doctor-edit.component.scss`

**Funcionalidades:**
- Carrega dados via GET por ID
- Formulário preenchido com dados existentes
- Mesmos campos do Create
- Header: "Editar Médico"

#### 5.3 Appointment Edit
**Arquivos a criar:**
- `appointment-edit/appointment-edit.component.ts`
- `appointment-edit/appointment-edit.component.html`
- `appointment-edit/appointment-edit.component.scss`

**Funcionalidades:**
- Carrega dados via GET por ID
- Formulário preenchido com dados existentes
- Mesmos campos do Create
- Header: "Editar Agendamento"

#### 5.4 Specialty Edit
**Arquivos a criar:**
- `specialty-edit/specialty-edit.component.ts`
- `specialty-edit/specialty-edit.component.html`
- `specialty-edit/specialty-edit.component.scss`

**Funcionalidades:**
- Carrega dados via GET por ID
- Formulário preenchido com dados existentes
- Mesmos campos do Create
- Header: "Editar Especialidade"

---

### FASE 6: Frontend - Componentes de Visualização

#### 6.1 Patient View
**Arquivos a criar:**
- `patient-view/patient-view.component.ts`
- `patient-view/patient-view.component.html`
- `patient-view/patient-view.component.scss`

**Funcionalidades:**
- Campos somente leitura
- Mesmos campos do Edit
- Header: "Visualizar Paciente"

#### 6.2 Doctor View
**Arquivos a criar:**
- `doctor-view/doctor-view.component.ts`
- `doctor-view/doctor-view.component.html`
- `doctor-view/doctor-view.component.scss`

**Funcionalidades:**
- Campos somente leitura
- Mesmos campos do Edit
- Header: "Visualizar Médico"

#### 6.3 Appointment View
**Arquivos a criar:**
- `appointment-view/appointment-view.component.ts`
- `appointment-view/appointment-view.component.html`
- `appointment-view/appointment-view.component.scss`

**Funcionalidades:**
- Campos somente leitura
- Mesmos campos do Edit
- Header: "Visualizar Agendamento"

#### 6.4 Specialty View
**Arquivos a criar:**
- `specialty-view/specialty-view.component.ts`
- `specialty-view/specialty-view.component.html`
- `specialty-view/specialty-view.component.scss`

**Funcionalidades:**
- Campos somente leitura
- Mesmos campos do Edit
- Header: "Visualizar Especialidade"

---

### FASE 7: Frontend - Rotas

#### 7.1 Patient Routes
**Arquivo:** `patients/routes.ts`
```typescript
- path: '' → PatientManagementComponent
- path: 'create' → PatientCreateComponent
- path: 'edit/:id' → PatientEditComponent
- path: 'view/:id' → PatientViewComponent
```

#### 7.2 Doctor Routes
**Arquivo:** `doctors/routes.ts`
```typescript
- path: '' → DoctorManagementComponent
- path: 'create' → DoctorCreateComponent
- path: 'edit/:id' → DoctorEditComponent
- path: 'view/:id' → DoctorViewComponent
```

#### 7.3 Appointment Routes
**Arquivo:** `appointments/routes.ts`
```typescript
- path: '' → AppointmentManagementComponent
- path: 'create' → AppointmentCreateComponent
- path: 'edit/:id' → AppointmentEditComponent
- path: 'view/:id' → AppointmentViewComponent
```

#### 7.4 Specialty Routes
**Arquivo:** `specialties/routes.ts`
```typescript
- path: '' → SpecialtyManagementComponent
- path: 'create' → SpecialtyCreateComponent
- path: 'edit/:id' → SpecialtyEditComponent
- path: 'view/:id' → SpecialtyViewComponent
```

---

### FASE 8: Atualização de Componentes Existentes

#### 8.1 Atualizar Componentes de Listagem Atuais
- [ ] `patients.component.ts` → Renomear para `patient-management.component.ts` ou manter e adicionar rota
- [ ] `doctors.component.ts` → Renomear para `doctor-management.component.ts` ou manter e adicionar rota
- [ ] `appointments.component.ts` → Renomear para `appointment-management.component.ts` ou manter e adicionar rota
- [ ] `specialties.component.ts` → Renomear para `specialty-management.component.ts` ou manter e adicionar rota

**Decisão:** Manter componentes existentes e atualizar para usar paginação e ações corretas.

---

## 📊 Resumo de Arquivos

### Backend
- **4 Repositories** (Patient, Doctor, Appointment, Specialty) - Adicionar GetPaged
- **4 Services** (Patient, Doctor, Appointment, Specialty) - Adicionar GetPaged
- **4 Controllers** (Patient, Doctor, Appointment, Specialty) - Adicionar Pagination endpoint
- **1 Repository** (Specialty) - Adicionar GetById e Update

### Frontend
- **4 Management Components** (Listagem)
- **4 Create Components** (Criação)
- **4 Edit Components** (Edição)
- **4 View Components** (Visualização)
- **4 Routes Files** (Configuração de rotas)
- **4 Services** (Atualizar métodos)

**Total:** ~32 arquivos novos/modificados

---

## ⚠️ Observações Importantes

1. **Padrão de Nomenclatura:**
   - Management = Listagem
   - Create = Criação
   - Edit = Edição
   - View = Visualização

2. **Reutilização:**
   - Usar `TableComponent` para todas as listagens
   - Usar `ConfirmModalComponent` para todas as exclusões
   - Usar `ToastService` para todas as notificações

3. **Consistência:**
   - Todos os headers devem seguir o mesmo padrão (centralizado com botão Voltar)
   - Todos os formulários devem usar Reactive Forms
   - Todas as validações devem ser consistentes

4. **Backend:**
   - Paginação deve seguir o mesmo padrão do User (GetPaged)
   - Busca deve ser case-insensitive
   - Todos os endpoints devem retornar NotFound quando apropriado

---

## 🚀 Ordem de Implementação Recomendada

1. **Backend primeiro** (Fase 1) - Garantir que APIs estão prontas
2. **Serviços Frontend** (Fase 2) - Conectar com backend
3. **Componentes de Listagem** (Fase 3) - Visualizar dados
4. **Componentes de Criação** (Fase 4) - Adicionar dados
5. **Componentes de Edição** (Fase 5) - Modificar dados
6. **Componentes de Visualização** (Fase 6) - Ver dados
7. **Rotas** (Fase 7) - Navegação
8. **Atualização** (Fase 8) - Ajustes finais

---

## ✅ Critérios de Sucesso

- [ ] Todas as entidades têm CRUD completo
- [ ] Todas as listagens têm paginação funcionando
- [ ] Todas as ações (criar, editar, visualizar, deletar) funcionam
- [ ] Todos os headers seguem o mesmo padrão
- [ ] Todas as notificações usam ToastService
- [ ] Todas as exclusões usam modal de confirmação
- [ ] Código segue boas práticas e está limpo (sem console.log, alerts, comentários desnecessários)

