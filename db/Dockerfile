FROM mysql

ENV MYSQL_ROOT_PASSWORD 123456
ENV MYSQL_USER demo
ENV MYSQL_PASSWORD demo
ENV MYSQL_DATABASE tgc_billing

COPY src/* /docker-entrypoint-initdb.d/
