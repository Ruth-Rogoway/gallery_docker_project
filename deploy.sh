#!/bin/bash

# סקריפט deployment ל-EC2
# שימוש: ./deploy.sh

set -e  # עצור אם יש שגיאה

echo "🚀 Starting deployment..."

# בדיקה ש-Docker מותקן
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

# בדיקה ש-Docker Compose מותקן
if ! command -v docker-compose &> /dev/null && ! docker compose version &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# התחברות ל-Docker Hub (אם לא מחוברים)
echo "🔐 Checking Docker Hub login..."
if ! docker info | grep -q "Username"; then
    echo "Please login to Docker Hub:"
    docker login -u ruthrogoway
fi

# Pull התמונות האחרונות
echo "📥 Pulling latest images from Docker Hub..."
docker-compose -f docker-compose.prod.yml pull || docker compose -f docker-compose.prod.yml pull

# עצירת קונטיינרים קיימים (אם יש)
echo "🛑 Stopping existing containers..."
docker-compose -f docker-compose.prod.yml down || docker compose -f docker-compose.prod.yml down

# הרצת הקונטיינרים
echo "🚀 Starting containers..."
docker-compose -f docker-compose.prod.yml up -d || docker compose -f docker-compose.prod.yml up -d

# בדיקה שהכל רץ
echo "⏳ Waiting for services to start..."
sleep 10

echo "📊 Container status:"
docker-compose -f docker-compose.prod.yml ps || docker compose -f docker-compose.prod.yml ps

echo ""
echo "✅ Deployment completed!"
echo ""
echo "🌐 Your services are available at:"
echo "   - Frontend: http://$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4):3000"
echo "   - API (rust-app-1): http://$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4):3007"
echo "   - Nginx: http://$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4):8080"
echo ""
echo "📝 To view logs: docker-compose -f docker-compose.prod.yml logs -f"
echo "🛑 To stop: docker-compose -f docker-compose.prod.yml down"

