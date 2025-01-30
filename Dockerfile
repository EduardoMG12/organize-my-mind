FROM node:18

WORKDIR /app

# Instala o Bun
RUN curl -fsSL https://bun.sh/install | bash && \
    mv /root/.bun/bin/bun /usr/local/bin/bun


COPY ./api-organize-my-mind/package.json ./api-organize-my-mind/bun.lockb ./
RUN bun install

COPY ./api-organize-my-mind ./

CMD ["bun", "run", "start:dev"]
