
#!/bin/bash

set -e

# Configuration
AWS_REGION=${AWS_REGION:-us-east-1}
ECR_REPOSITORY=${ECR_REPOSITORY:-audityzer}
ECS_CLUSTER=${ECS_CLUSTER:-audityzer-cluster}
ECS_SERVICE=${ECS_SERVICE:-audityzer-service}
IMAGE_TAG=${IMAGE_TAG:-latest}

echo "🚀 Starting Audityzer deployment..."

# Get AWS account ID
AWS_ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
ECR_URI="${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_REPOSITORY}"

echo "📦 Building Docker image..."
docker build -f infrastructure/docker/Dockerfile.production -t ${ECR_REPOSITORY}:${IMAGE_TAG} .

echo "🔐 Logging into ECR..."
aws ecr get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin ${ECR_URI}

echo "🏷️ Tagging image..."
docker tag ${ECR_REPOSITORY}:${IMAGE_TAG} ${ECR_URI}:${IMAGE_TAG}

echo "⬆️ Pushing image to ECR..."
docker push ${ECR_URI}:${IMAGE_TAG}

echo "🔄 Updating ECS service..."
aws ecs update-service \
  --cluster ${ECS_CLUSTER} \
  --service ${ECS_SERVICE} \
  --force-new-deployment \
  --region ${AWS_REGION}

echo "⏳ Waiting for deployment to complete..."
aws ecs wait services-stable \
  --cluster ${ECS_CLUSTER} \
  --services ${ECS_SERVICE} \
  --region ${AWS_REGION}

echo "✅ Deployment completed successfully!"

# Get service status
echo "📊 Service status:"
aws ecs describe-services \
  --cluster ${ECS_CLUSTER} \
  --services ${ECS_SERVICE} \
  --region ${AWS_REGION} \
  --query 'services[0].{Status:status,Running:runningCount,Desired:desiredCount}'
