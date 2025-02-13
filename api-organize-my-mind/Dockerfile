FROM node

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN corepack enable
RUN pnpm install

COPY . .

RUN pnpm build

EXPOSE 3000

CMD ["pnpm", "start:dev"]


# FROM node:18

# WORKDIR /app

# # RUN curl -fsSL https://bun.sh/install | bash && \
# #   mv /root/.bun/bin/bun /usr/local/bin/bun && \
# #   echo 'export PATH="/root/.bun/bin:$PATH"' >> /root/.bashrc

# COPY ./api-organize-my-mind/package.json ./api-organize-my-mind/bun.lockb ./
# RUN bun install --frozen-lockfile

# COPY ./api-organize-my-mind .

# COPY entrypoint.sh /app/entrypoint.sh
# RUN chmod +x /app/entrypoint.sh

# ENTRYPOINT ["/app/entrypoint.sh"]





# FROM node:18


# WORKDIR /app


# COPY package.json package-lock.json ./
# RUN npm install

# COPY . .

# EXPOSE 3000

# CMD ["npm", "run", "start"]
