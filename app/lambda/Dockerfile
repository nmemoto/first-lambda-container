FROM node:12 AS builder
WORKDIR /workspace/
COPY app.ts package*.json tsconfig.json ./
RUN npm install && npm run build

FROM amazon/aws-lambda-nodejs:12
COPY --from=builder /workspace/dist/app.js .
COPY --from=builder /workspace/package.json .
COPY --from=builder /workspace/package-lock.json .
RUN npm install --production
CMD [ "app.handler" ]
