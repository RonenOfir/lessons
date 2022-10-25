timestamp="$(date +'%Y-%m-%d_%H-%M-%S')"
running_inst="$(docker ps | head -2 | tail -1 | grep -v 'CONTAINER ID' | sed 's/\(^[a-z0-9]\+\) .\+/\1/g')"
echo creating/updating Docker image
if [[ -n ${running_inst} ]]; then
  echo "Stopping currently running instance"
  docker stop ${runnning_inst}
  echo "Removing stopped instance"
  docker rm ${runnning_inst}
fi
docker build -t lessons .
echo Starting container instance
docker run -d -p 7000:3000 --name "lessons_${timestamp}" -t lessons
