
output "vpc_id" {
  description = "VPC ID"
  value       = aws_vpc.audityzer_vpc.id
}

output "public_subnet_ids" {
  description = "Public subnet IDs"
  value       = aws_subnet.public_subnets[*].id
}

output "private_subnet_ids" {
  description = "Private subnet IDs"
  value       = aws_subnet.private_subnets[*].id
}

output "alb_dns_name" {
  description = "ALB DNS name"
  value       = aws_lb.audityzer_alb.dns_name
}

output "alb_zone_id" {
  description = "ALB Zone ID"
  value       = aws_lb.audityzer_alb.zone_id
}

output "ecs_cluster_name" {
  description = "ECS Cluster name"
  value       = aws_ecs_cluster.audityzer_cluster.name
}

output "ecr_repository_url" {
  description = "ECR Repository URL"
  value       = aws_ecr_repository.audityzer_repo.repository_url
}

output "cloudwatch_log_group" {
  description = "CloudWatch Log Group name"
  value       = aws_cloudwatch_log_group.audityzer_logs.name
}
