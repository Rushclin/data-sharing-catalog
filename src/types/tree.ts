import { LucideIcon } from "lucide-react";

export interface TreeNodeMetadata {
  privacy?: "HIGH_SENSITIVE" | "MODERATE" | "LOW";
  status?: string;
  size?: string;
  techniques?: string[];
  formats?: string[];
  lastUpdate?: string;
  description?: string;
  datasets_count?: number;
  epsilon_range?: string;
  k_values?: string;
  capacity?: string;
  schemes?: string[];
  frameworks?: string[];
}

export interface TreeNode {
  id: string;
  label: string;
  type:
    | "root"
    | "city"
    | "category"
    | "zone"
    | "dataset"
    | "technique"
    | "infrastructure";
  icon?: LucideIcon;
  metadata?: TreeNodeMetadata;
  children?: TreeNode[];
}