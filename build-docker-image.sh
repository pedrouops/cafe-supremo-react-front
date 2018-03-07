yarn run build
docker build . -t cafesupremo:1.0.0
echo 'to run the image a in docker container issue: docker run --name cafesupremo-front --rm -d -p 9000:80 cafesupremo:1.0.0'
echo 'to stop the container issue: docker kill cafesupremo-front'

