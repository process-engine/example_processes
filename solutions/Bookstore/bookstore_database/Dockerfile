FROM library/postgres
ENV POSTGRES_USER admin
ENV POSTGRES_PASSWORD admin
ENV POSTGRES_DB bookstore
COPY init.sql /docker-entrypoint-initdb.d/
EXPOSE 5433:5432