#!/bin/bash
set -e

HOST="matthew@heimvon.zubron-tuna.ts.net"
CONTAINER="exceldm"
REMOTE_DIR="/opt/exceldm/exceldm"

DEPLOY_BACKEND=true
DEPLOY_FRONTEND=true

for arg in "$@"; do
    case $arg in
        --backend-only) DEPLOY_FRONTEND=false ;;
        --frontend-only) DEPLOY_BACKEND=false ;;
    esac
done

if $DEPLOY_BACKEND; then
    echo "==> Building Linux binary..."
    cd backend
    GOOS=linux GOARCH=amd64 go build -o exceldm-linux-amd64 .
    cd ..

    echo "==> Copying binary to host..."
    scp backend/exceldm-linux-amd64 "$HOST:/tmp/exceldm"

    echo "==> Pushing binary into container..."
    ssh "$HOST" "sudo incus file push /tmp/exceldm $CONTAINER$REMOTE_DIR/backend/exceldm && sudo incus exec $CONTAINER -- chmod +x $REMOTE_DIR/backend/exceldm"
fi

if $DEPLOY_FRONTEND; then
    echo "==> Copying frontend files to host..."
    ssh "$HOST" "mkdir -p /tmp/exceldm-frontend"
    scp -r index.html src css assets data "$HOST:/tmp/exceldm-frontend/"
    # Remove Hommlet.json from the temp staging area — it lives in the DB now
    ssh "$HOST" "rm -f /tmp/exceldm-frontend/data/Hommlet.json"

    echo "==> Pushing frontend files into container..."
    ssh "$HOST" "tar -C /tmp/exceldm-frontend -cf - . | sudo incus exec $CONTAINER -- tar -C $REMOTE_DIR -xf - && rm -rf /tmp/exceldm-frontend"
fi

echo "==> Restarting service..."
ssh "$HOST" "sudo incus exec $CONTAINER -- rc-service exceldm restart"

echo "==> Done! App running at https://excel-dm.com"
