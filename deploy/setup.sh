#!/bin/sh
# setup.sh — run inside an Alpine Linux Incus container to install exceldm.
# Usage: sh setup.sh
# Run from the directory where this script was extracted (alongside backend/, src/, etc.)

set -e

INSTALL_DIR="/opt/exceldm"
SERVICE_USER="exceldm"
LOG_DIR="/var/log/exceldm"

echo "==> Installing exceldm..."

# Create service user
if ! id "$SERVICE_USER" >/dev/null 2>&1; then
    adduser -S -D -H -h "$INSTALL_DIR" "$SERVICE_USER"
fi

# Copy app files
mkdir -p "$INSTALL_DIR/backend"
cp -r backend/exceldm "$INSTALL_DIR/backend/exceldm"
chmod +x "$INSTALL_DIR/backend/exceldm"
cp index.html "$INSTALL_DIR/"
cp -r src css data "$INSTALL_DIR/"
chown -R "$SERVICE_USER:$SERVICE_USER" "$INSTALL_DIR"

# Log directory
mkdir -p "$LOG_DIR"
chown "$SERVICE_USER:$SERVICE_USER" "$LOG_DIR"

# OpenRC service
cp exceldm.openrc /etc/init.d/exceldm
chmod +x /etc/init.d/exceldm

# conf.d env file (only write if not already present, to preserve secrets)
if [ ! -f /etc/conf.d/exceldm ]; then
    cp exceldm.confd /etc/conf.d/exceldm
    echo ""
    echo "  IMPORTANT: edit /etc/conf.d/exceldm and set JWT_SECRET before starting."
    echo ""
fi

rc-update add exceldm default
rc-service exceldm start

echo "==> Done. exceldm is running on port 8080."
echo "    Logs: tail -f $LOG_DIR/app.log"
