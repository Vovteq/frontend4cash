FROM nginx:alpine
COPY config/nginx.conf /etc/nginx/nginx.conf
COPY /dist/frontend4cash /usr/share/nginx/html
