"use client";

import { useState } from "react";
import { Rnd } from "react-rnd";

import React from "react";
import { twMerge } from "tailwind-merge";
import {
  CircleChevronLeft,
  ChevronRight,
  ChevronDown,
  Folder,
  FolderOpen,
  Camera,
  Wifi,
  Mic,
  Smartphone,
  MapPin,
  Shield,
  Database,
  Eye,
  Settings,
  Users,
  Download,
  Plus,
  LucideIcon,
  PlusSquare,
  X,
} from "lucide-react";

// Types pour les données de l'arbre
interface TreeNodeMetadata {
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

interface TreeNode {
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

interface BadgeProps {
  color?: string; // ex: "bg-yellow-400"
  text: string;
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({
  color = "bg-yellow-400",
  text,
  className,
}) => {
  return (
    <div
      className={twMerge(
        "inline-flex items-center px-3 py-1 rounded-md text-white text-sm font-medium",
        className
      )}
    >
      <span className={`w-3.5 h-3.5 rounded-full mr-1 ${color}`} />
      {text}
    </div>
  );
};

interface ToggleButtonProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({
  options,
  value,
  onChange,
}) => {
  return (
    <div className="inline-flex border border-[#3892D3] rounded-sm overflow-hidden">
      {options.map((option) => {
        const isActive = value === option;
        return (
          <button
            key={option}
            onClick={() => onChange(option)}
            className={`px-2 py-1 text-[11px] font-semibold transition-colors uppercase
              ${isActive ? "bg-[#296A9A] text-white" : "bg-[#3183BE]"}
              border-r border-[#3183BE] last:border-r-0 
            `}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
};

// Tree data structure from Tree.jsx
const treeData: TreeNode = {
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

// const mockFilterItems = [
//   {
//     category: "PERMISSIONS",
//     items: [
//       "Access Control",
//       "Encryption",
//       "Handling Unusual Account Activities with Private Link",
//       "Secure Passwords",
//       "Selective Access Control",
//       "Active Broadcast Protection",
//     ],
//   },
//   { category: "Anonymization", items: [] },
//   { category: "Asynchronous Notice", items: [] },
//   { category: "Auditing", items: [] },
//   { category: "Credential Selection", items: [] },
//   { category: "Data Breach Notifications", items: [] },
//   { category: "Informed Consent", items: [] },
//   { category: "Platform for Privacy Preferences Project (P3P)", items: [] },
//   { category: "Privacy Dashboard", items: [] },
//   { category: "Select Before You Collect", items: [] },
//   { category: "Sticky Policies", items: [] },
//   { category: "Trust Evaluation of Services Sides", items: [] },
// ];

export default function Home() {
  const [isFilterCollapsed, setIsFilterCollapsed] = useState<boolean>(false);
  const [filterWidth, setFilterWidth] = useState<number>(280);
  const [catalogWidth, setCatalogWidth] = useState<number>(400);
  const [selectedPattern, setSelectedPattern] = useState<TreeNode | null>(null);
  const [selected, setSelected] = useState<string>("ISO 29100");

  // Tree functionality states
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(
    new Set(["root", "paris", "paris_zones", "lyon"])
  );
  const [selectedNodes, setSelectedNodes] = useState<Set<string>>(new Set());
  const [catalogItems, setCatalogItems] = useState<TreeNode[]>([]);
  const [downloads, setDownloads] = useState<TreeNode[]>([]);

  const toggleFilter = () => {
    setIsFilterCollapsed(!isFilterCollapsed);
    if (!isFilterCollapsed) {
      setFilterWidth(40);
    } else {
      setFilterWidth(280);
    }
  };

  // Tree functionality functions
  const toggleNode = (nodeId: string): void => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(nodeId)) {
      newExpanded.delete(nodeId);
    } else {
      newExpanded.add(nodeId);
    }
    setExpandedNodes(newExpanded);
  };

  const toggleSelection = (nodeId: string): void => {
    const newSelected = new Set(selectedNodes);
    if (newSelected.has(nodeId)) {
      newSelected.delete(nodeId);
    } else {
      newSelected.add(nodeId);
    }
    setSelectedNodes(newSelected);
  };

  const getPrivacyColor = (level?: string): string => {
    switch (level) {
      case "HIGH_SENSITIVE":
        return "text-red-600";
      case "MODERATE":
        return "text-yellow-600";
      case "LOW":
        return "text-green-600";
      default:
        return "text-gray-600";
    }
  };

  // Function to find a node by ID
  const findNodeById = (
    nodeId: string,
    node: TreeNode = treeData
  ): TreeNode | null => {
    if (node.id === nodeId) return node;
    if (node.children) {
      for (const child of node.children) {
        const found = findNodeById(nodeId, child);
        if (found) return found;
      }
    }
    return null;
  };

  // Add selected items to catalog
  const addToCatalog = (): void => {
    const selectedItems = Array.from(selectedNodes)
      .map((nodeId) => findNodeById(nodeId))
      .filter(
        (node): node is TreeNode => node !== null && node.type === "dataset"
      );

    setCatalogItems((prev) => [
      ...prev,
      ...selectedItems.filter(
        (item) => !prev.some((existing) => existing.id === item.id)
      ),
    ]);
    setSelectedNodes(new Set());
  };

  // Add to downloads
  const addToDownloads = (item: TreeNode): void => {
    if (!downloads.some((download) => download.id === item.id)) {
      setDownloads((prev) => [...prev, item]);
    }
  };

  // Remove from downloads
  const removeFromDownloads = (itemId: string): void => {
    setDownloads((prev) => prev.filter((item) => item.id !== itemId));
  };

  // Render tree node
  const renderNode = (node: TreeNode, depth: number = 0): JSX.Element => {
    const isExpanded = expandedNodes.has(node.id);
    const isSelected = selectedNodes.has(node.id);
    const hasChildren = node.children && node.children.length > 0;
    const IconComponent = node.icon || Folder;

    return (
      <div key={node.id} className="select-none">
        <div
          className={`flex items-center py-1 px-2 hover:bg-blue-50 cursor-pointer rounded text-xs ${
            isSelected ? "bg-blue-100" : ""
          }`}
          style={{ paddingLeft: `${depth * 12 + 8}px` }}
        >
          {/* Expand/Collapse Icon */}
          <div className="w-3 h-3 flex items-center justify-center mr-1">
            {hasChildren && (
              <button
                onClick={() => toggleNode(node.id)}
                className="hover:bg-gray-200 rounded"
              >
                {isExpanded ? (
                  <ChevronDown size={10} className="text-gray-600" />
                ) : (
                  <ChevronRight size={10} className="text-gray-600" />
                )}
              </button>
            )}
          </div>

          {/* Checkbox */}
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => toggleSelection(node.id)}
            className="mr-1 h-3 w-3 text-blue-600"
          />

          {/* Node Icon */}
          <div className="mr-1">
            {node.type === "category" || node.type === "zone" ? (
              isExpanded ? (
                <FolderOpen size={12} className="text-blue-500" />
              ) : (
                <Folder size={12} className="text-blue-500" />
              )
            ) : (
              <IconComponent
                size={12}
                className={
                  node.type === "dataset"
                    ? getPrivacyColor(node.metadata?.privacy)
                    : "text-gray-600"
                }
              />
            )}
          </div>

          <span className="flex-1 text-xs truncate">{node.label}</span>

          {/* Metadata Badges */}
          {node.metadata && (
            <div className="ml-1 flex gap-1">
              {node.metadata.privacy && (
                <span
                  className={`text-[10px] px-1 py-0.5 rounded ${
                    node.metadata.privacy === "HIGH_SENSITIVE"
                      ? "bg-red-100 text-red-700"
                      : node.metadata.privacy === "MODERATE"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {node.metadata.privacy === "HIGH_SENSITIVE"
                    ? "H"
                    : node.metadata.privacy === "MODERATE"
                    ? "M"
                    : "L"}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Children */}
        {hasChildren && isExpanded && (
          <div>
            {node.children.map((child) => renderNode(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="h-screen w-screen bg-[#3892D3] flex flex-col overflow-hidden">
      <div className="p-1">
        <div className="bg-[#157FCC] text-white px-2 py-1 flex items-center justify-between rounded-xs">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-xs">LEGEND:</span>
            <Badge
              text="Pattern"
              color="bg-yellow-400"
              className="font-normal uppercase text-xs"
            />
          </div>
          <div className="flex items-center gap-1">
            <ToggleButton
              options={["ISO 29100", "PATTERNS"]}
              value={selected}
              onChange={setSelected}
            />
            <button className="w-6 h-6 cursor-pointer flex items-center justify-center rounded bg-[#296A9A] border-[#3892D3] text-white font-bold text-xs ">
              ?
            </button>
          </div>
        </div>
      </div>

      <div className="p-1 h-full">
        <div className="flex-1 flex relative h-full gap-x-1">
          <div>
            <Rnd
              size={{ width: filterWidth, height: "100%" }}
              position={{ x: 0, y: 0 }}
              onResize={(_, __, ref) => {
                setFilterWidth(ref.offsetWidth);
              }}
              enableResizing={{
                top: false,
                right: !isFilterCollapsed,
                bottom: false,
                left: false,
                topRight: false,
                bottomRight: false,
                bottomLeft: false,
                topLeft: false,
              }}
              disableDragging
              minWidth={40}
              maxWidth={400}
              className="border-r border-[#157FCC] transition-all duration-300 ease-in-out"
            >
              <div className="h-full bg-white flex flex-col">
                {!isFilterCollapsed && (
                  <div className="bg-[#157FCC] text-white px-4 py-2 flex items-center justify-between transition-opacity duration-300">
                    <span className="font-extrabold text-xs">FILTER</span>
                    <button
                      onClick={toggleFilter}
                      title="Close filter"
                      className="text-white px-1 cursor-pointer rounded bg-[#157FCC]"
                    >
                      <CircleChevronLeft className="h-4.5 w-4.5 font-bold" />
                    </button>
                  </div>
                )}

                <div className="flex-1 overflow-hidden">
                  {!isFilterCollapsed ? (
                    <div className="flex flex-col h-full">
                      <div className="p-2 overflow-y-auto flex-1">
                        {renderNode(treeData)}
                      </div>
                      {selectedNodes.size > 0 && (
                        <div className="p-2 border-t bg-gray-50">
                          <button
                            onClick={addToCatalog}
                            className="w-full px-2 py-1 bg-[#3892D3] text-white rounded text-xs cursor-pointer flex items-center justify-center gap-1"
                          >
                            <Plus size={12} />
                            Ajouter au catalogue ({selectedNodes.size})
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="bg-[#157FCC] h-full flex flex-col transition-all duration-200">
                      <button
                        onClick={toggleFilter}
                        title="Open filter"
                        className="w-full h-full text-white bg-[#157FCC] px-2 flex items-center justify-center [writing-mode:vertical-rl] rotate-180 cursor-pointer uppercase font-extrabold text-xs"
                      >
                        Filter
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </Rnd>
          </div>

          <div>
            <Rnd
              size={{ width: catalogWidth, height: "100%" }}
              position={{ x: filterWidth, y: 0 }}
              onResize={(_, __, ref) => {
                setCatalogWidth(ref.offsetWidth);
              }}
              enableResizing={{
                top: false,
                right: true,
                bottom: false,
                left: false,
                topRight: false,
                bottomRight: false,
                bottomLeft: false,
                topLeft: false,
              }}
              disableDragging
              minWidth={300}
              maxWidth={600}
              className="border-r border-gray-300"
            >
              <div className="h-full bg-white">
                <div className="bg-[#157FCC] text-white px-4 py-2 flex items-center justify-between transition-opacity duration-300">
                  <span className="font-extrabold text-xs">CATALOG</span>
                </div>
                <div className="p-4 overflow-y-auto h-full">
                  {catalogItems.length === 0 ? (
                    <div className="text-center text-gray-500 text-sm mt-8">
                      <Database
                        size={32}
                        className="mx-auto mb-2 text-gray-300"
                      />
                      <p>Aucun élément dans le catalogue</p>
                      <p className="text-xs">
                        Sélectionnez des datasets dans l'arbre et ajoutez-les au
                        catalogue
                      </p>
                    </div>
                  ) : (
                    catalogItems.map((item) => {
                      const IconComponent = item.icon || Database;
                      return (
                        <div
                          key={item.id}
                          onClick={() => setSelectedPattern(item)}
                          className={`flex items-center gap-2 p-2 mb-1 cursor-pointer hover:bg-blue-50 rounded ${
                            selectedPattern?.id === item.id ? "bg-[#C1DDF1]" : ""
                          }`}
                        >
                          <IconComponent
                            size={16}
                            className={getPrivacyColor(item.metadata?.privacy)}
                          />
                          <div className="flex-1">
                            <div className="text-xs font-medium">
                              {item.label}
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </Rnd>
          </div>

          <div
            className="bg-white flex-1 relative"
            style={{ marginLeft: filterWidth + catalogWidth }}
          >
            <div className="bg-[#157FCC] text-white px-4 py-2 flex items-center justify-between transition-opacity duration-300">
              <span className="font-extrabold text-xs">DETAILS</span>
            </div>
            <div className="p-4">
              {selectedPattern ? (
                <div>
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      {selectedPattern.icon && (
                        <selectedPattern.icon
                          size={16}
                          className={getPrivacyColor(
                            selectedPattern.metadata?.privacy
                          )}
                        />
                      )}
                      <span className="font-bold text-xs">DATASET</span>
                    </div>
                    <div className="text-lg font-xs mb-2">
                      {selectedPattern.label}
                    </div>

                    <div className="text-xs mb-1">
                      <span className="font-xs">Description:</span>
                    </div>
                    <div className="text-xs mb-4">
                      {selectedPattern.metadata?.description ||
                        "Aucune description disponible"}
                    </div>

                    <div className="text-xs mb-1">
                      <span className="font-xs">
                        Niveau de confidentialité:
                      </span>
                    </div>
                    <div className="text-sm mb-4">
                      <span
                        className={`px-2 py-1 rounded text-xs font-normal ${
                          selectedPattern.metadata?.privacy === "HIGH_SENSITIVE"
                            ? "bg-red-100 text-red-700"
                            : selectedPattern.metadata?.privacy === "MODERATE"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {selectedPattern.metadata?.privacy}
                      </span>
                    </div>

                    {selectedPattern.metadata?.techniques && (
                      <>
                        <div className="text-xs mb-1">
                          <span className="font-normal">
                            Techniques de protection:
                          </span>
                        </div>
                        <div className="text-xs mb-4">
                          <div className="flex flex-wrap gap-1">
                            {selectedPattern.metadata.techniques.map(
                              (technique, index) => (
                                <span
                                  key={index}
                                  className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs"
                                >
                                  {technique.replace("_", " ")}
                                </span>
                              )
                            )}
                          </div>
                        </div>
                      </>
                    )}

                    {selectedPattern.metadata?.formats && (
                      <>
                        <div className="text-xs mb-1">
                          <span className="font-semibold">
                            Formats disponibles:
                          </span>
                        </div>
                        <div className="text-xs mb-4">
                          <div className="flex flex-wrap gap-1">
                            {selectedPattern.metadata.formats.map(
                              (format, index) => (
                                <span
                                  key={index}
                                  className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                                >
                                  {format.replace("_", " ")}
                                </span>
                              )
                            )}
                          </div>
                        </div>
                      </>
                    )}

                    {selectedPattern.metadata?.lastUpdate && (
                      <>
                        <div className="text-xs mb-1">
                          <span className="font-semibold">
                            Dernière mise à jour:
                          </span>
                        </div>
                        <div className="text-xs mb-4">
                          {new Date(
                            selectedPattern.metadata.lastUpdate
                          ).toLocaleDateString("fr-FR", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-500 text-xs mt-8">
                  <Eye size={32} className="mx-auto mb-2 text-gray-300" />
                  <p>Sélectionnez un élément du catalogue</p>
                  <p className="text-xs">pour voir ses détails</p>
                </div>
              )}
            </div>

            {selectedPattern && (
              <div className="absolute bottom-1 right-1">
                <button
                  onClick={() => addToDownloads(selectedPattern)}
                  className="cursor-pointer px-7 py-1 text-white rounded bg-[#3892D3]  flex items-center"
                >
                  <PlusSquare className="h-4 w-4"/>
                </button>
              </div>
            )}
          </div>

          <div className="w-80 bg-white border-l border-gray-300">
            <div className="bg-[#157FCC] text-white px-4 py-2 flex items-center justify-between transition-opacity duration-300">
              <span className="font-extrabold text-xs uppercase">
                téléchargements
              </span>
            </div>
            <div className="p-4 flex flex-col h-[98%]">
              <div className="mb-4">
                <span className="font-semibold text-xs">
                  Datasets à télécharger
                </span>
              </div>
              <div className="flex-1 overflow-y-auto">
                {downloads.length === 0 ? (
                  <div className="text-center text-gray-500 text-xs mt-8">
                    <Download
                      size={32}
                      className="mx-auto mb-2 text-gray-300"
                    />
                    <p>Aucun téléchargement</p>
                    <p className="text-xs">
                      Ajoutez des éléments depuis les détails
                    </p>
                  </div>
                ) : (
                  downloads.map((item) => {
                    const IconComponent = item.icon || Database;
                    return (
                      <div
                        key={item.id}
                        className="flex items-center gap-2 bg-green-50 p-2 rounded mb-2"
                      >
                        <IconComponent
                          size={14}
                          className={getPrivacyColor(item.metadata?.privacy)}
                        />
                        <div className="flex-1">
                          <div className="text-xs font-medium truncate">
                            {item.label}
                          </div>
                          <div className="text-xs text-gray-500">
                            {item.metadata?.privacy}
                          </div>
                        </div>
                        <button
                          onClick={() => removeFromDownloads(item.id)}
                          className="ml-auto text-red-500 hover:bg-red-50 p-1 rounded cursor-pointer"
                        >
                          <X className="h-3 w-3"/>
                        </button>
                      </div>
                    );
                  })
                )}
              </div>
              {downloads.length > 0 && (
                <div className="">
                  <button className="w-full bg-[#3892D3] text-white px-3 py-2 rounded flex items-center justify-center gap-2">
                    <Download size={16} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
