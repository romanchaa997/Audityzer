
#!/bin/bash

set -e

# Configuration
AWS_REGION=${AWS_REGION:-us-east-1}
ECS_CLUSTER=${ECS_CLUSTER:-audityzer-cluster}
ECS_SERVICE=${ECS_SERVICE:-audityzer-service}

echo "🔄 Starting rollback process..."

# Get current task definition
CURRENT_TASK_DEF=$(aws ecs describe-services \
  --cluster ${ECS_CLUSTER} \
  --services ${ECS_SERVICE} \
  --region ${AWS_REGION} \
  --query 'services[0].taskDefinition' \
  --output text)

echo "Current task definition: ${CURRENT_TASK_DEF}"

# Get task definition family
FAMILY=$(echo ${CURRENT_TASK_DEF} | cut -d':' -f6 | cut -d'/' -f2)
CURRENT_REVISION=$(echo ${CURRENT_TASK_DEF} | cut -d':' -f7)

echo "Family: ${FAMILY}, Current revision: ${CURRENT_REVISION}"

# Calculate previous revision
PREVIOUS_REVISION=$((CURRENT_REVISION - 1))

if [ ${PREVIOUS_REVISION} -lt 1 ]; then
  echo "❌ No previous revision available for rollback"
  exit 1
fi

PREVIOUS_TASK_DEF="${FAMILY}:${PREVIOUS_REVISION}"

echo "🔙 Rolling back to: ${PREVIOUS_TASK_DEF}"

# Update service with previous task definition
aws ecs update-service \
  --cluster ${ECS_CLUSTER} \
  --service ${ECS_SERVICE} \
  --task-definition ${PREVIOUS_TASK_DEF} \
  --region ${AWS_REGION}

echo "⏳ Waiting for rollback to complete..."
aws ecs wait services-stable \
  --cluster ${ECS_CLUSTER} \
  --services ${ECS_SERVICE} \
  --region ${AWS_REGION}

echo "✅ Rollback completed successfully!"

# Get service status
echo "📊 Service status:"
aws ecs describe-services \
  --cluster ${ECS_CLUSTER} \
  --services ${ECS_SERVICE} \
  --region ${AWS_REGION} \
  --query 'services[0].{Status:status,Running:runningCount,Desired:desiredCount,TaskDefinition:taskDefinition}'
