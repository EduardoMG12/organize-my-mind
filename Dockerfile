FROM node:18

WORKDIR /app

RUN curl -fsSL https://bun.sh/install | bash && \
    mv /root/.bun/bin/bun /usr/local/bin/bun && \
    echo 'export PATH="/root/.bun/bin:$PATH"' >> /root/.bashrc

COPY ./api-organize-my-mind/package.json ./api-organize-my-mind/bun.lockb ./
RUN bun install --frozen-lockfile

COPY ./api-organize-my-mind .

CMD ["bun", "run", "start:dev"]
