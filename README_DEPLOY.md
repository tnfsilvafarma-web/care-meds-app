# Guia de Deployment Online (Vercel + PostgreSQL)

Para colocar o **Care Meds Manager** online e acessível de qualquer lugar, siga estes passos:

## 1. Criar Base de Dados (PostgreSQL)
Recomendo o **Supabase** (gratuito e fácil):
1. Crie uma conta em [supabase.com](https://supabase.com).
2. Crie um novo projeto.
3. Nas definições do projeto, em **Database**, copie o **Connection String** (URI).
4. Guarde este URL para o passo das variáveis de ambiente.

## 2. Preparar o Repositório
Para enviar o código para o GitHub/Cloud, siga estes comandos no terminal:

1. **Inicializar Git**:
   ```bash
   git init
   ```
2. **Adicionar ficheiros**:
   ```bash
   git add .
   ```
3. **Commit inicial**:
   ```bash
   git commit -m "feat: initial commit with medical records structure"
   ```
4. **Criar Repo no GitHub**:
   - Vá ao seu [GitHub](https://github.com/new).
   - Dê um nome ao projeto (ex: `care-meds-app`) e clique em **Create repository**.
   - Copie o comando que começa com `git remote add origin...`

5. **Ligar ao GitHub e Enviar**:
   - Cole o comando copiado no terminal (será algo como `git remote add origin https://github.com/seu-utilizador/care-meds-app.git`).
   - Defina a branch principal: `git branch -M main`
   - Envie o código: `git push -u origin main`

## 3. Deploy na Vercel
1. Crie uma conta em [vercel.com](https://vercel.com) e ligue ao seu GitHub.
2. Importe o projeto `care-meds-app`.
3. Nas **Environment Variables**, adicione:
   - `DATABASE_URL`: O URL que copiou do Supabase.
   - `AUTH_SECRET`: Uma chave aleatória (pode usar a mesma do seu `.env` local).
   - `NEXTAUTH_URL`: O URL que a Vercel lhe der após o primeiro deploy.
4. Clique em **Deploy**.

## 4. Executar Migrações
A Vercel não executa migrações automaticamente por defeito. Pode adicionar um script no `package.json`:
- `"postinstall": "prisma generate"`
E executar as migrações manualmente uma vez a partir da sua máquina ligando-se ao URL da Cloud:
- `DATABASE_URL="seu_url_da_cloud" npx prisma db push`

> [!WARNING]
> Certifique-se de que o URL da base de dados termina com `?sslmode=require` para segurança.
