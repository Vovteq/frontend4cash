FROM nginx:alpine
COPY ../letsencrypt /etc/letsencrypt
COPY config/bits.conf /etc/nginx/conf.d/default.conf
COPY /dist/frontend4cash /usr/share/nginx/html
