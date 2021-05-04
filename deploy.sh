DOCKER_HOST=ssh://
CONTAINER_NAME=Mobile-App-Api
SOURCE_PORT=5005
TARGET_PORT=5005
IMAGE_NAME=$CONTAINER_NAME

docker -H $DOCKER_HOST stop $CONTAINER_NAME
docker -H $DOCKER_HOST rm $CONTAINER_NAME
docker -H $DOCKER_HOST build -t $IMAGE_NAME -f docker/Dockerfile .
docker -H $DOCKER_HOST run --env-file=.env.prod -d --name=$CONTAINER_NAME --restart=always -p $SOURCE_PORT:$TARGET_PORT -t $IMAGE_NAME
