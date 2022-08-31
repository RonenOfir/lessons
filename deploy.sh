
timestamp="$(date +'%Y-%m-%d_%H-%M-%S')"
docker build -t lessons .
docker run -d -p 7000:3000 --name "lessons_${timestamp}" -t lessons
