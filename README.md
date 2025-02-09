
# Password Register Application

## Tecnologias Utilizadas

- **Frontend**:
  - AngularJS
  - HTML5
  - CSS3
  - Font Awesome (para ícones)
  - Google Fonts

- **Backend**:
  - Spring Boot
  - MySQL
  - JPA (Java Persistence API)
  - Spring Security (para encriptação de senhas)

---

## Como Rodar a Aplicação

### Pré-requisitos

1. **Java 17** ou versão superior.
2. **MySQL** instalado localmente (ou utilizar o docker).
3. **LiveServer** extensão do VSCode utilizado para rodar a aplicação no localhost

### Passos para Configuração

#### 1. Configuração do Backend (Spring Boot)

1. **Clone o repositório** para o seu ambiente local:
   ```bash
   git clone <url-do-repositorio>
   cd password-register
   ```

2. **Crie o banco de dados no MySQL**. Use o comando SQL abaixo para criar o banco de dados:
   ```sql
   CREATE DATABASE password-register;
   ```

3. **Configuração do banco de dados no `application.properties`**:
   No arquivo `src/main/resources/application.properties`, insira suas credenciais de banco de dados (ou use as configurações padrões abaixo):
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/password-register
   spring.datasource.username=root
   spring.datasource.password=root
   spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
   spring.jpa.hibernate.ddl-auto=none
   spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect
   ```

4. **Rodar o servidor backend**:
   Abra o terminal, navegue até o diretório onde o backend está localizado e execute o comando:
   ```bash
   ./mvnw spring-boot:run
   ```
   O backend estará rodando no endereço `http://localhost:8080` (porta default).

## Estrutura do Projeto

### Backend (Spring Boot)

- **`src/main/java/com/project/passwordRegister`**:
  - **PasswordRegisterApplication.java**: Classe principal do Spring Boot que inicializa a aplicação.
  - **`controllers`**: Controladores responsáveis por gerenciar as requisições HTTP.
  - **`services`**: Serviços que contêm a lógica de negócio, como a manipulação de dados dos funcionários e senhas.
  - **`repositories`**: Interfaces que interagem diretamente com o banco de dados.

- **`src/main/resources/application.properties`**: Configurações do banco de dados e outras propriedades do Spring Boot.

### Frontend (AngularJS)

- **`index.html`**: Arquivo HTML principal que referencia todos os arquivos necessários (CSS, JavaScript, etc.).
- **`app.js`**: Arquivo de configuração do AngularJS que define as rotas e módulos.
- **`controllers/`**: Controladores responsáveis pela lógica das páginas.
- **`services/`**: Services responsáveis pela lógica de requisção e compartilhamento de estado.
- **`components/`**: Componentes reutilizáveis, como botões, listas, e a barra de navegação.
- **`views/`**: Arquivos html das páginas (home.HTML, login.HTML e etc.).

### Exemplo de Comando para Criação da Tabela no MySQL:

```sql
CREATE TABLE IF NOT EXISTS employee (
    id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    password VARCHAR(255),
    password_status VARCHAR(255),
    password_strength INT NOT NULL,
    parent_id BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,

    FOREIGN KEY (parent_id) REFERENCES employee(id) ON DELETE SET NULL
);
```

