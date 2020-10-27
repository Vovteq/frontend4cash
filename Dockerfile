FROM nginx:alpine
COPY config/bits.conf /etc/nginx/conf.d/bits.conf
COPY /dist/frontend4cash /usr/share/nginx/html
