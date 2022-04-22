FROM node:14-alpine

RUN npm install -g @mockoon/cli@1.1.0

# Do not run as root.
RUN adduser --shell /bin/sh --disabled-password --gecos "" mockoon
USER mockoon

EXPOSE 3000
EXPOSE 3001
