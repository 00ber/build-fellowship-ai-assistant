export type DemoId = string;

export interface DemoStep {
  title: string;
  description: string;
}

export interface DemoInstruction {
  steps: DemoStep[];
}
