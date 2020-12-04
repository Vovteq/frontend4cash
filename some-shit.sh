source .dev.env
docker build -t $IMAGE_NAME .

docker stop $(docker ps -f "name=frontend4cash" -q)
docker container rm $(docker ps -af "name=frontend4cash" -q)

docker container run -d --name $APP_NAME --net=$NETWORK_NAME --net-alias=$APP_NAME -v ~/logs4front:/var/log/nginx -p 80:80 $IMAGE_NAME
