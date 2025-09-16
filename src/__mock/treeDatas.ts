import { TreeNode } from "@/types/tree";
import { Camera, Folder, MapPin, Mic, Shield, Smartphone, Wifi } from "lucide-react";

export const treeData: TreeNode = {
  id: "root",
  label: "Catalogue CrowdMesh - Données Edge-Cloud",
  type: "root",
  children: [
    {
      id: "paris",
      label: "Paris",
      type: "city",
      icon: MapPin,
      children: [
        {
          id: "paris_zones",
          label: "Zones de Surveillance",
          type: "category",
          icon: Folder,
          children: [
            {
              id: "paris_zone_a",
              label: "Zone A - Centre Commercial Les Halles",
              type: "zone",
              icon: Camera,
              metadata: {
                privacy: "HIGH_SENSITIVE",
                status: "active",
                size: "2.3 GB",
              },
              children: [
                {
                  id: "paris_zone_a_cam",
                  label: "Caméras de Surveillance (12 unités)",
                  type: "dataset",
                  icon: Camera,
                  metadata: {
                    privacy: "HIGH_SENSITIVE",
                    techniques: ["face_blurring", "differential_privacy"],
                    formats: ["heatmap", "density_stats"],
                    lastUpdate: "2025-09-15T14:30:00Z",
                    description:
                      "Données anonymisées de surveillance avec floutage facial et confidentialité différentielle",
                  },
                },
                {
                  id: "paris_zone_a_wifi",
                  label: "Détecteurs WiFi (8 points)",
                  type: "dataset",
                  icon: Wifi,
                  metadata: {
                    privacy: "HIGH_SENSITIVE",
                    techniques: ["mac_randomization", "k_anonymity"],
                    formats: ["presence_heatmap", "flow_patterns"],
                    lastUpdate: "2025-09-15T14:25:00Z",
                    description:
                      "Patterns de flux anonymisés avec randomisation MAC et k-anonymat",
                  },
                },
                {
                  id: "paris_zone_a_audio",
                  label: "Capteurs Audio Ambiants (6 unités)",
                  type: "dataset",
                  icon: Mic,
                  metadata: {
                    privacy: "MODERATE",
                    techniques: ["audio_anonymization", "decibel_aggregation"],
                    formats: ["noise_levels", "crowd_density_audio"],
                    lastUpdate: "2025-09-15T14:20:00Z",
                    description:
                      "Analyse acoustique anonymisée pour estimation de densité",
                  },
                },
              ],
            },
            {
              id: "paris_zone_b",
              label: "Zone B - Gare du Nord",
              type: "zone",
              icon: Camera,
              metadata: {
                privacy: "HIGH_SENSITIVE",
                status: "active",
                size: "4.1 GB",
              },
              children: [
                {
                  id: "paris_zone_b_cam",
                  label: "Caméras Haute Définition (24 unités)",
                  type: "dataset",
                  icon: Camera,
                  metadata: {
                    privacy: "HIGH_SENSITIVE",
                    techniques: [
                      "real_time_anonymization",
                      "differential_privacy",
                    ],
                    formats: ["anonymized_tracks", "flow_analysis"],
                    description:
                      "Tracking anonymisé en temps réel avec analyse de flux",
                  },
                },
                {
                  id: "paris_zone_b_mobile",
                  label: "Analytics Mobile (Bluetooth/WiFi)",
                  type: "dataset",
                  icon: Smartphone,
                  metadata: {
                    privacy: "HIGH_SENSITIVE",
                    techniques: ["temporal_blur", "spatial_cloaking"],
                    formats: ["mobility_patterns", "dwell_time_stats"],
                    description:
                      "Patterns de mobilité avec masquage temporel et spatial",
                  },
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "lyon",
      label: "Lyon",
      type: "city",
      icon: MapPin,
      children: [
        {
          id: "lyon_zones",
          label: "Zones de Surveillance",
          type: "category",
          icon: Folder,
          children: [
            {
              id: "lyon_zone_centre",
              label: "Zone Centre - Place Bellecour",
              type: "zone",
              icon: Camera,
              metadata: {
                privacy: "HIGH_SENSITIVE",
                status: "active",
                size: "3.2 GB",
              },
              children: [
                {
                  id: "lyon_centre_cam",
                  label: "Système de Surveillance Intégré",
                  type: "dataset",
                  icon: Camera,
                  metadata: {
                    privacy: "HIGH_SENSITIVE",
                    techniques: ["real_time_masking", "k_anonymity"],
                    formats: ["crowd_flow_analysis", "safety_metrics"],
                    description:
                      "Surveillance intégrée avec masquage temps réel",
                  },
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "techniques_privacy",
      label: "Techniques de Protection Appliquées",
      type: "category",
      icon: Shield,
      children: [
        {
          id: "differential_privacy",
          label: "Differential Privacy",
          type: "technique",
          icon: Shield,
          metadata: {
            datasets_count: 8,
            epsilon_range: "0.1 - 1.0",
            description: "Protection probabiliste contre la réidentification",
          },
        },
        {
          id: "k_anonymity",
          label: "K-Anonymity",
          type: "technique",
          icon: Shield,
          metadata: {
            datasets_count: 12,
            k_values: "5 - 50",
            description: "Garantie de non-distinguabilité dans un groupe",
          },
        },
      ],
    },
  ],
};