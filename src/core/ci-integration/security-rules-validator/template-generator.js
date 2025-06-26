
/**
 * Template Generator for Security Rules
 */

class TemplateGenerator {
  generateTemplate() {
    return {
      $schema: 'https://audityzer.com/schemas/security-rules-v1.json',
      version: '1.0.0',
      metadata: {
        name: 'Default Security Rules',
        description: 'Comprehensive security rules template',
        author: 'Audityzer',
        created: new Date().toISOString(),
      },
      security: {
        enabled: true,
        level: 'high',
        accessControl: {
          rbac: true,
          mfa: true,
          sessionTimeout: 3600,
        },
        encryption: {
          atRest: true,
          inTransit: true,
          algorithm: 'AES-256',
        },
      },
      monitoring: {
        enabled: true,
        uptime: true,
        performance: true,
        security: true,
        alerting: {
          email: [],
          webhook: [],
          slack: [],
        },
      },
      validation: {
        dataIntegrity: true,
        inputValidation: true,
        outputSanitization: true,
        sqlInjectionPrevention: true,
        xssPrevention: true,
      },
      privacy: {
        dataMinimization: true,
        rightToErasure: true,
        dataPortability: true,
        consentManagement: true,
      },
      incident: {
        breachNotification: true,
        responseTeam: [],
        escalationProcedure: true,
        forensics: true,
      },
      compliance: {
        standards: ['SOC2', 'GDPR'],
        auditing: true,
        reporting: true,
      },
      network: {
        firewall: true,
        ddosProtection: true,
        rateLimiting: true,
        ipWhitelisting: false,
      },
      authentication: {
        strongPasswords: true,
        passwordPolicy: {
          minLength: 12,
          requireUppercase: true,
          requireLowercase: true,
          requireNumbers: true,
          requireSpecialChars: true,
        },
        accountLockout: {
          enabled: true,
          maxAttempts: 5,
          lockoutDuration: 900,
        },
      },
    };
  }

  generateL2Template(l2Protocol) {
    const baseTemplate = this.generateTemplate();
    
    // Add L2-specific configurations
    baseTemplate.l2 = {
      protocol: l2Protocol,
      enabled: true,
    };

    switch (l2Protocol) {
      case 'optimism':
        baseTemplate.optimism = {
          sequencer: {
            enabled: true,
            fallback: true,
          },
          faultProofs: {
            enabled: true,
            challengePeriod: 604800, // 7 days
          },
          bridge: {
            withdrawalDelay: 604800,
            guardians: [],
          },
        };
        break;

      case 'arbitrum':
        baseTemplate.arbitrum = {
          anyTrust: false,
          dataAvailabilityCommittee: [],
          challengePeriod: 604800,
          bridge: {
            withdrawalDelay: 604800,
            fraudProofs: true,
          },
        };
        break;

      case 'zksync':
        baseTemplate.zksync = {
          proofSystem: {
            enabled: true,
            type: 'PLONK',
          },
          dataAvailability: 'onchain',
          bridge: {
            withdrawalDelay: 86400, // 1 day for zkSync
          },
        };
        break;

      case 'polygon':
        baseTemplate.polygon = {
          validators: [],
          checkpoints: {
            enabled: true,
            interval: 256,
          },
          bridge: {
            withdrawalDelay: 604800,
            challengePeriod: 604800,
          },
        };
        break;

      case 'base':
        baseTemplate.base = {
          sequencer: {
            enabled: true,
            fallback: true,
          },
          faultProofs: {
            enabled: true,
            challengePeriod: 604800,
          },
          bridge: {
            withdrawalDelay: 604800,
            guardians: [],
          },
        };
        break;

      case 'linea':
        baseTemplate.linea = {
          zkEVM: {
            enabled: true,
            proofSystem: 'PLONK',
          },
          bridge: {
            withdrawalDelay: 86400,
          },
        };
        break;
    }

    return baseTemplate;
  }

  generateMinimalTemplate() {
    return {
      $schema: 'https://audityzer.com/schemas/security-rules-v1.json',
      version: '1.0.0',
      security: {
        enabled: true,
        level: 'medium',
      },
      monitoring: {
        enabled: true,
      },
      validation: {
        dataIntegrity: true,
        inputValidation: true,
      },
    };
  }

  generateEnterpriseTemplate() {
    const template = this.generateTemplate();
    
    // Add enterprise-specific features
    template.enterprise = {
      sso: {
        enabled: true,
        provider: 'SAML',
      },
      audit: {
        enabled: true,
        retention: 2555, // 7 years in days
        immutable: true,
      },
      backup: {
        enabled: true,
        frequency: 'daily',
        retention: 90,
        encryption: true,
      },
      disaster_recovery: {
        enabled: true,
        rto: 4, // Recovery Time Objective in hours
        rpo: 1, // Recovery Point Objective in hours
      },
    };

    // Enhanced compliance for enterprise
    template.compliance.standards.push('ISO27001', 'NIST', 'PCI-DSS');
    
    return template;
  }
}

module.exports = { TemplateGenerator };
