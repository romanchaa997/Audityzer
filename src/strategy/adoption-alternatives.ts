/**
 * src/strategy/adoption-alternatives.ts
 * Strategic components for building adoption alternatives — evaluates
 * parallel deployment paths, resource allocation, and stakeholder alignment.
 */

import type { AdoptionPlan, RolloutPhase } from '../planning/predictive-planner.js';

export interface DeploymentComponent {
  id: string;
  name: string;
  description: string;
  estimatedCost: number; // USD
  requiredTime: string; // e.g. "2 weeks"
  dependencies: string[]; // component IDs
  parallelizable: boolean;
}

export interface ResourceAllocation {
  teamSize: number;
  budget: number; // USD
  infrastructure: string[];
  tooling: string[];
}

export interface StakeholderAlignment {
  stakeholder: string;
  priority: 'low' | 'medium' | 'high';
  concerns: string[];
  proposedMitigations: string[];
}

export interface StrategyAlternative {
  id: string;
  name: string;
  description: string;
  components: DeploymentComponent[];
  resources: ResourceAllocation;
  stakeholders: StakeholderAlignment[];
  feasibilityScore: number; // 0-100
  adoptionPlan?: AdoptionPlan;
}

export interface AlternativeComparisonMatrix {
  alternatives: StrategyAlternative[];
  criteriaWeights: {
    cost: number;
    time: number;
    risk: number;
    adoption: number;
  };
  rankedAlternatives: Array<{
    alternative: StrategyAlternative;
    totalScore: number;
    breakdown: Record<string, number>;
  }>;
}

/**
 * AdoptionAlternativesBuilder — constructs and evaluates multiple
 * strategic alternatives for parallel or sequential deployment.
 */
export class AdoptionAlternativesBuilder {
  private alternatives: StrategyAlternative[] = [];
  private criteriaWeights = {
    cost: 0.25,
    time: 0.25,
    risk: 0.3,
    adoption: 0.2,
  };

  /**
   * Add a strategic alternative.
   */
  addAlternative(alternative: StrategyAlternative): void {
    this.alternatives.push(alternative);
  }

  /**
   * Set custom criteria weights for comparison.
   */
  setWeights(weights: Partial<typeof this.criteriaWeights>): void {
    this.criteriaWeights = { ...this.criteriaWeights, ...weights };
  }

  /**
   * Build comparison matrix and rank alternatives.
   */
  buildComparisonMatrix(): AlternativeComparisonMatrix {
    const rankedAlternatives = this.alternatives
      .map((alt) => {
        const costScore = this.normalizeCost(alt.resources.budget);
        const timeScore = this.normalizeTime(alt.components);
        const riskScore = alt.adoptionPlan?.estimatedRisk
          ? this.normalizeRisk(alt.adoptionPlan.estimatedRisk)
          : 50;
        const adoptionScore = alt.adoptionPlan?.estimatedAdoptionRate ?? 50;

        const totalScore =
          costScore * this.criteriaWeights.cost +
          timeScore * this.criteriaWeights.time +
          riskScore * this.criteriaWeights.risk +
          adoptionScore * this.criteriaWeights.adoption;

        return {
          alternative: alt,
          totalScore,
          breakdown: {
            cost: costScore,
            time: timeScore,
            risk: riskScore,
            adoption: adoptionScore,
          },
        };
      })
      .sort((a, b) => b.totalScore - a.totalScore);

    return {
      alternatives: this.alternatives,
      criteriaWeights: this.criteriaWeights,
      rankedAlternatives,
    };
  }

  /**
   * Generate a parallel deployment strategy that runs multiple
   * alternatives concurrently where feasible.
   */
  generateParallelDeployment(
    selectedAlternatives: string[]
  ): {
    parallelTracks: Array<{
      trackId: string;
      components: DeploymentComponent[];
      timeline: string;
    }>;
    estimatedCompletion: string;
  } {
    const selected = this.alternatives.filter((alt) =>
      selectedAlternatives.includes(alt.id)
    );

    const parallelTracks = selected.map((alt, idx) => ({
      trackId: `track-${idx + 1}`,
      components: alt.components.filter((c) => c.parallelizable),
      timeline: this.calculateTimeline(alt.components),
    }));

    const maxTimeline = Math.max(
      ...parallelTracks.map((t) => this.parseTimelineWeeks(t.timeline))
    );

    return {
      parallelTracks,
      estimatedCompletion: `${maxTimeline} weeks`,
    };
  }

  // ─── Normalization / Scoring Helpers ─────────────────────────────────────

  private normalizeCost(budget: number): number {
    // Lower cost = higher score. Assume max budget = 500k
    const maxBudget = 500_000;
    return Math.max(0, 100 - (budget / maxBudget) * 100);
  }

  private normalizeTime(components: DeploymentComponent[]): number {
    const totalWeeks = components.reduce(
      (sum, c) => sum + this.parseTimelineWeeks(c.requiredTime),
      0
    );
    // Lower time = higher score. Assume max time = 24 weeks
    const maxWeeks = 24;
    return Math.max(0, 100 - (totalWeeks / maxWeeks) * 100);
  }

  private normalizeRisk(risk: 'low' | 'medium' | 'high'): number {
    const riskMap = { low: 90, medium: 60, high: 30 };
    return riskMap[risk] ?? 50;
  }

  private calculateTimeline(components: DeploymentComponent[]): string {
    const totalWeeks = components.reduce(
      (sum, c) => sum + this.parseTimelineWeeks(c.requiredTime),
      0
    );
    return `${totalWeeks} weeks`;
  }

  private parseTimelineWeeks(timeline: string): number {
    const match = timeline.match(/(\d+)\s*weeks?/);
    return match ? parseInt(match[1], 10) : 1;
  }
}

/**
 * Factory: create common deployment components.
 */
export function createDeploymentComponent(
  id: string,
  name: string,
  options?: Partial<DeploymentComponent>
): DeploymentComponent {
  return {
    id,
    name,
    description: options?.description ?? '',
    estimatedCost: options?.estimatedCost ?? 10_000,
    requiredTime: options?.requiredTime ?? '2 weeks',
    dependencies: options?.dependencies ?? [],
    parallelizable: options?.parallelizable ?? true,
  };
}

export default AdoptionAlternativesBuilder;
