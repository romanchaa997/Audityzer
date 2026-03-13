
# Mindfulness Chatbot Analytics Implementation

## Overview

This comprehensive analytics implementation provides privacy-compliant tracking, crisis intervention effectiveness monitoring, and predictive analytics for the enhanced mindfulness chatbot with advanced safety features.

## Features

### 1. User Engagement Analytics
- **Session Quality Scoring**: Tracks conversation depth and user engagement patterns
- **User Journey Mapping**: Maps user interactions and identifies engagement patterns
- **Retention Analysis**: 7-day and 30-day retention tracking with churn prediction
- **Feature Usage Analytics**: Monitors which exercises and tools are most effective

### 2. Crisis Intervention Effectiveness Metrics
- **Detection Accuracy**: Tracks false positives/negatives in crisis detection
- **Intervention Success Rates**: Measures effectiveness by crisis level and demographics
- **Time-to-Resolution**: Monitors response times for crisis situations
- **Professional Referral Tracking**: Tracks completion rates and outcomes

### 3. Safety Feature Performance Analytics
- **Wellness Check-in Monitoring**: Response rates and user satisfaction tracking
- **Early Warning System**: Accuracy metrics and prevention success rates
- **Safety Escalation Effectiveness**: Tracks escalation protocols and outcomes
- **Follow-up Completion**: Monitors post-crisis follow-up effectiveness

### 4. Predictive Analytics & ML Models
- **Risk Assessment**: ML models for predicting user crisis risk
- **Intervention Timing**: Optimal timing predictions for user outreach
- **Personalization Effectiveness**: A/B testing and recommendation success tracking
- **Continuous Learning**: Automated model retraining and improvement

## Privacy & Compliance

### GDPR Compliance Features
- **User Consent Management**: Granular consent tracking and management
- **Data Anonymization**: Automatic user ID hashing and data anonymization
- **Right to Erasure**: Automated data deletion upon user request
- **Data Portability**: User data export functionality
- **Audit Logging**: Comprehensive audit trail for compliance

### Data Retention Policies
- **User Engagement Data**: 12 months retention, 6 months anonymization
- **Crisis Intervention Data**: 24 months retention, 12 months anonymization
- **Safety Feature Data**: 18 months retention, 9 months anonymization
- **Personalization Data**: 12 months retention, 6 months anonymization

## Installation & Setup

### Prerequisites
- Python 3.8+
- Prometheus (for metrics collection)
- Grafana (for dashboards)
- SMTP server (for email reports)

### Quick Start

1. **Environment Setup**:
```bash
cd ~/analytics_implementation
cp .env.template .env
# Edit .env with your configuration
```

2. **Install Dependencies**:
```bash
source venv/bin/activate
pip install -r requirements.txt
```

3. **Configure Environment Variables**:
Edit `.env` file with your settings:
- SMTP credentials for email reports
- Grafana API credentials
- Privacy compliance settings

4. **Initialize Database**:
```bash
python scripts/privacy_compliance.py
```

5. **Start Metrics Collectors**:
```bash
# Start engagement metrics collector
nohup python scripts/collect_metrics.py &

# Start crisis metrics collector  
nohup python scripts/crisis_metrics.py &

# Start safety metrics collector
nohup python scripts/safety_metrics.py &
```

6. **Setup Automated Reports**:
```bash
chmod +x scripts/cron_setup.sh
./scripts/cron_setup.sh
```

7. **Import Grafana Dashboards**:
```bash
# Copy dashboard files to Grafana provisioning directory
# Or import manually through Grafana UI
```

## Configuration

### Metrics Collection
- **Prometheus Ports**: 8000 (engagement), 8001 (crisis), 8002 (safety)
- **Collection Interval**: 30 seconds (configurable)
- **Data Retention**: Configurable per data category

### Email Reports
- **Weekly Reports**: Generated every Monday at 9:00 AM
- **Monthly Reports**: Generated on 1st of each month at 10:00 AM
- **Recipients**: Configurable in `.env` file

### Model Training
- **Automatic Retraining**: Every Sunday at 2:00 AM
- **Risk Thresholds**: High (0.8), Medium (0.5) - configurable
- **Model Persistence**: Models saved to `models/` directory

## Dashboard Access

### Grafana Dashboards
1. **User Engagement Dashboard**: `http://localhost:3000/d/engagement`
2. **Crisis Intervention Dashboard**: `http://localhost:3000/d/crisis`
3. **Safety Features Dashboard**: `http://localhost:3000/d/safety`

### Key Metrics
- Session duration and frequency
- User satisfaction scores
- Crisis detection accuracy
- Intervention success rates
- Wellness check response rates
- Early warning system performance

## API Endpoints

### Metrics Endpoints
- `http://localhost:8000/metrics` - User engagement metrics
- `http://localhost:8001/metrics` - Crisis intervention metrics
- `http://localhost:8002/metrics` - Safety feature metrics

### Privacy Compliance
- User consent recording
- Data deletion requests
- Data export functionality
- Compliance reporting

## Usage Examples

### Recording User Consent
```python
from scripts.privacy_compliance import PrivacyComplianceManager, UserConsent
from datetime import datetime, timedelta

manager = PrivacyComplianceManager()
consent = UserConsent(
    user_id="user_123",
    consent_type="analytics_tracking",
    granted=True,
    timestamp=datetime.now(),
    expiry_date=datetime.now() + timedelta(days=365),
    ip_address="192.168.1.1",
    user_agent="Mozilla/5.0..."
)
manager.record_user_consent(consent)
```

### Generating Risk Predictions
```python
from models.predictive_model import PredictiveModel, UserFeatures

model = PredictiveModel()
model.load_models()

user_features = UserFeatures(
    user_id="user_123",
    session_frequency=2.5,
    avg_session_duration=600,
    # ... other features
)

prediction = model.predict_user_risk(user_features)
print(f"Risk Score: {prediction.risk_score}")
print(f"Recommendations: {prediction.recommended_interventions}")
```

### Manual Report Generation
```bash
# Generate weekly report
python scripts/report_generator.py Weekly

# Generate monthly report
python scripts/report_generator.py Monthly
```

## Monitoring & Maintenance

### Health Checks
- Automated process monitoring via cron
- Metrics collector health checks every hour
- Log rotation and cleanup

### Data Cleanup
- Automated cleanup of old report files (90+ days)
- Privacy-compliant data retention processing
- Model artifact management

### Performance Monitoring
- Prometheus metrics for system health
- Grafana alerts for anomalies
- Email notifications for critical issues

## Troubleshooting

### Common Issues

1. **Metrics Not Appearing**:
   - Check if collectors are running: `pgrep -f "collect_metrics.py"`
   - Verify Prometheus configuration
   - Check firewall settings for metrics ports

2. **Email Reports Not Sending**:
   - Verify SMTP credentials in `.env`
   - Check email server connectivity
   - Review logs in `logs/` directory

3. **Dashboard Import Issues**:
   - Ensure Grafana provisioning is configured
   - Check dashboard JSON syntax
   - Verify Prometheus data source connection

4. **Privacy Compliance Errors**:
   - Check database permissions
   - Verify SQLite installation
   - Review audit logs for errors

### Log Files
- `logs/weekly_reports.log` - Weekly report generation
- `logs/monthly_reports.log` - Monthly report generation  
- `logs/model_training.log` - ML model training
- `logs/privacy_compliance.log` - Privacy operations

## Security Considerations

### Data Protection
- All user IDs are hashed for anonymization
- Sensitive data encrypted at rest
- Access controls on analytics database
- Regular security audits

### Network Security
- Metrics endpoints on localhost only
- HTTPS for external communications
- API key authentication for Grafana
- Rate limiting on data export endpoints

## Contributing

### Development Setup
1. Fork the repository
2. Create feature branch
3. Install development dependencies
4. Run tests before submitting PR

### Testing
```bash
# Run unit tests
python -m pytest tests/

# Run integration tests
python -m pytest tests/integration/

# Run privacy compliance tests
python -m pytest tests/privacy/
```

## License & Compliance

This implementation is designed to be GDPR-compliant and follows privacy-by-design principles. All data processing is based on legitimate interests and user consent. Regular compliance audits are recommended.

## Support

For technical support or questions:
1. Check the troubleshooting section
2. Review log files for errors
3. Consult the privacy compliance documentation
4. Contact the development team

---

**Last Updated**: August 23, 2025
**Version**: 1.0.0
**Compliance Status**: GDPR Ready
