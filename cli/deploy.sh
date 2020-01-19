ADDR="100.100.100.100"
SSHUSER="test"
SSHPORT="22"
PASSWORD="passtest"

NAME="test"
DOCKERPORT="8081"
WEBPORT="80"
DOCKERSRV= "some.server.com"


cd ~/$PROJECTS/vue/cst-nh

echo "creating remote dirs..."
ssh -p $SSHPORT $SSHUSER@$ADDR <<- EOF
	[[ ! -d ~/$NAME ]] && mkdir ~/$NAME
	[[ ! -d ~/$NAME/cache ]] && mkdir ~/$NAME/cache
EOF
echo "scp config to remote..."
scp -P $SSHPORT nginx.conf $SSHUSER@$ADDR:~/$NAME

echo "scp image to remote..."
scp -P $SSHPORT $NAME.tar $SSHUSER@$ADDR:~/$NAME

echo "removing existed container and image..."
ssh -p $SSHPORT $SSHUSER@$ADDR <<- EOF
	[[ ! -z \$(docker ps -aq --filter ancestor="$DOCKERSRV/$NAME") ]] && docker rm -f \$(docker ps -aq --filter ancestor="$DOCKERSRV/$NAME")
EOF

echo "loading image..."
ssh -p $SSHPORT $SSHUSER@$ADDR "docker load < ~/$NAME/$NAME.tar"

echo "starting new container..."
ssh -p $SSHPORT $SSHUSER@$ADDR <<- EOF
docker run --restart always -d -p $WEBPORT:$DOCKERPORT \
   -v ~/$NAME/nginx.conf:/etc/nginx/nginx.conf \
   -v ~/$NAME/cache:/$NAME/cache \
	$DOCKERSRV/$NAME
EOF

echo "cleaning cache..."
ssh -p $SSHPORT $SSHUSER@$ADDR "docker image prune -f"
cd - >> /dev/nll

echo "done!"