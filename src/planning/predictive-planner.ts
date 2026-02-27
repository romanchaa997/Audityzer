/**
 * src/planning/predictive-planner.ts
 * Predictive adoption planning — simulates rollout strategies,
 * risk vs. adoption curve, parallel deployment paths.
 */

import type { SecurityAgent } from '../agent/index.js';

export type AdoptionStrategy =
  | 'aggressive'
  | 'balanced'
  | 'conservative'
  | 'parallel-hybrid';

export interface RolloutPhase {
  name: string;
  duration: string; // e.g. "2 weeks"
  targetUsers: number | string; // e.g. 1000 or "10%"
  features: string[];
  risks: string[];
  mitigations: string[];
}

export interface AdoptionPlan {
  strategy: AdoptionStrategy;
  totalDuration: string;
  phases: RolloutPhase[];
  estimatedRisk: 'low' | 'medium' | 'high';
  estimatedAdoptionRate: number; // 0-100
  parallelTracks?: {
    trackName: string;
    phases: RolloutPhase[];
  }[];
}

export interface PredictivePlannerOptions {
  targetUserBase: number;
  riskTolerance: 'low' | 'medium' | 'high';
  timeConstraint?: string; // e.g. "3 months"
  featureSet: string[];
  agent?: SecurityAgent; // optional: log plans to agent events
}

/**
 * PredictivePlanner — generates adoption rollout plans with
 * predictive risk modeling and parallel path alternatives.
 */
export class PredictivePlanner {
  private options: PredictivePlannerOptions;

  constructor(options: PredictivePlannerOptions) {
    this.options = options;
  }

  /**
   * Generate an adoption plan for the given strategy.
   */
  async generatePlan(strategy: AdoptionStrategy): Promise<AdoptionPlan> {
    switch (strategy) {
      case 'aggressive':
        return this.aggressivePlan();
      case 'balanced':
        return this.balancedPlan();
      case 'conservative':
        return this.conservativePlan();
      case 'parallel-hybrid':
        return this.parallelHybridPlan();
      default:
        throw new Error(`Unknown strategy: ${strategy}`);
    }
  }

  /**
   * Compare multiple strategies and return ranked list.
   */
  async compareStrategies(
    strategies: AdoptionStrategy[]
  ): Promise<Array<AdoptionPlan & { score: number }>> {
    const plans = await Promise.all(
      strategies.map((s) => this.generatePlan(s))
    );

    const scored = plans.map((plan) => ({
      ...plan,
      score: this.scorePlan(plan),
    }));

    return scored.sort((a, b) => b.score - a.score);
  }

  // ─── Strategy Implementations ─────────────────────────────────────────────

  private aggressivePlan(): AdoptionPlan {
    return {
      strategy: 'aggressive',
      totalDuration: '4 weeks',
      phases: [
        {
          name: 'Alpha — Internal',
          duration: '1 week',
          targetUsers: '5% (internal team)',
          features: this.options.featureSet,
          risks: ['High failure rate', 'Negative feedback'],
          mitigations: ['24/7 monitoring', 'Rollback automation'],
        },
        {
          name: 'Beta — Early Adopters',
          duration: '1 week',
          targetUsers: '15%',
          features: this.options.featureSet,
          risks: ['Scalability issues', 'Data migration'],
          mitigations: ['Load testing', 'Incremental data sync'],
        },
        {
          name: 'GA — Full Rollout',
          duration: '2 weeks',
          targetUsers: '100%',
          features: this.options.featureSet,
          risks: ['System overload', 'Support backlog'],
          mitigations: ['Auto-scaling', 'Support team expansion'],
        },
      ],
      estimatedRisk: 'high',
      estimatedAdoptionRate: 85,
    };
  }

  private balancedPlan(): AdoptionPlan {
    return {
      strategy: 'balanced',
      totalDuration: '8 weeks',
      phases: [
        {
          name: 'Alpha — Internal + Partners',
          duration: '2 weeks',
          targetUsers: '5%',
          features: this.options.featureSet.slice(0, 3),
          risks: ['Integration bugs'],
          mitigations: ['Extensive QA', 'Staged feature flags'],
        },
        {
          name: 'Beta — Controlled Expansion',
          duration: '3 weeks',
          targetUsers: '25%',
          features: this.options.featureSet,
          risks: ['Performance degradation'],
          mitigations: ['Progressive enhancement', 'Caching layer'],
        },
        {
          name: 'GA — General Availability',
          duration: '3 weeks',
          targetUsers: '100%',
          features: this.options.featureSet,
          risks: ['Minor edge-case issues'],
          mitigations: ['Hotfix pipeline', 'Real-time alerting'],
        },
      ],
      estimatedRisk: 'medium',
      estimatedAdoptionRate: 72,
    };
  }

  private conservativePlan(): AdoptionPlan {
    return {
      strategy: 'conservative',
      totalDuration: '12 weeks',
      phases: [
        {
          name: 'Private Alpha',
          duration: '3 weeks',
          targetUsers: '2% (selected users)',
          features: this.options.featureSet.slice(0, 2),
          risks: ['Limited feedback'],
          mitigations: ['Deep user interviews', 'A/B testing'],
        },
        {
          name: 'Closed Beta',
          duration: '4 weeks',
          targetUsers: '10%',
          features: this.options.featureSet.slice(0, 4),
          risks: ['Slow adoption'],
          mitigations: ['Incentive programs', 'Targeted outreach'],
        },
        {
          name: 'Open Beta',
          duration: '3 weeks',
          targetUsers: '30%',
          features: this.options.featureSet,
          risks: ['Change resistance'],
          mitigations: ['Training webinars', 'Documentation'],
        },
        {
          name: 'GA',
          duration: '2 weeks',
          targetUsers: '100%',
          features: this.options.featureSet,
          risks: ['Minimal — well-tested'],
          mitigations: ['Standard support SLA'],
        },
      ],
      estimatedRisk: 'low',
      estimatedAdoptionRate: 55,
    };
  }

  private parallelHybridPlan(): AdoptionPlan {
    // Run aggressive for high-risk-tolerant users, conservative for others
    return {
      strategy: 'parallel-hybrid',
      totalDuration: '8 weeks',
      phases: [
        {
          name: 'Parallel Track Kickoff',
          duration: '1 week',
          targetUsers: 'Split cohorts',
          features: ['Initial segmentation'],
          risks: ['Cohort imbalance'],
          mitigations: ['Data-driven segmentation'],
        },
      ],
      estimatedRisk: 'medium',
      estimatedAdoptionRate: 78,
      parallelTracks: [
        {
          trackName: 'Fast Track (Risk-tolerant users)',
          phases: [
            {
              name: 'Fast Alpha',
              duration: '1 week',
              targetUsers: '10%',
              features: this.options.featureSet,
              risks: ['High churn risk'],
              mitigations: ['Instant rollback capability'],
            },
            {
              name: 'Fast GA',
              duration: '2 weeks',
              targetUsers: '40%',
              features: this.options.featureSet,
              risks: ['Moderate'],
              mitigations: ['Redundancy'],
            },
          ],
        },
        {
          trackName: 'Slow Track (Conservative users)',
          phases: [
            {
              name: 'Slow Beta',
              duration: '4 weeks',
              targetUsers: '20%',
              features: this.options.featureSet.slice(0, 3),
              risks: ['Delayed feedback'],
              mitigations: ['Surveys, focus groups'],
            },
            {
              name: 'Slow GA',
              duration: '3 weeks',
              targetUsers: '60%',
              features: this.options.featureSet,
              risks: ['Low'],
              mitigations: ['White-glove support'],
            },
          ],
        },
      ],
    };
  }

  // ─── Scoring Logic ─────────────────────────────────────────────────────────
  private scorePlan(plan: AdoptionPlan): number {
    const riskPenalty = { low: 0, medium: -10, high: -20 };
    const adoptionBonus = plan.estimatedAdoptionRate;

    const riskScore = riskPenalty[plan.estimatedRisk] ?? 0;
    const durationPenalty = this.parseDurationWeeks(plan.totalDuration) * -0.5;

    return adoptionBonus + riskScore + durationPenalty;
  }

  private parseDurationWeeks(duration: string): number {
    const match = duration.match(/(\d+)\s*weeks?/);
    return match ? parseInt(match[1], 10) : 8;
  }

  /**
   * Log the plan to agent event stream (if available).
   */
  async logPlan(plan: AdoptionPlan): Promise<void> {
    if (!this.options.agent) return;

    await this.options.agent.emit('planning:adoption:generated', {
      type: 'ADOPTION_PLAN_GENERATED',
      strategy: plan.strategy,
      totalDuration: plan.totalDuration,
      estimatedRisk: plan.estimatedRisk,
      estimatedAdoptionRate: plan.estimatedAdoptionRate,
      timestamp: new Date().toISOString(),
    });
  }
}

export default PredictivePlanner;
