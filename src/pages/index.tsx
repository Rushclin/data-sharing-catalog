"use client";

import { useState, useEffect } from "react";
import { Rnd } from "react-rnd";

import React from "react";
import { twMerge } from "tailwind-merge";
import {
  CircleChevronLeft,
  ChevronRight,
  ChevronDown,
  Folder,
  FolderOpen,
  Database,
  Eye,
  Download,
  PlusSquare,
  X,
} from "lucide-react";
import { TreeNode } from "@/types/tree";
import { treeData } from "@/__mock/treeDatas";

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

export default function Home() {
  const [isFilterCollapsed, setIsFilterCollapsed] = useState<boolean>(false);
  const [filterWidth, setFilterWidth] = useState<number>(280);
  const [catalogWidth, setCatalogWidth] = useState<number>(400);
  const [selectedPattern, setSelectedPattern] = useState<TreeNode | null>(null);
  const [selected, setSelected] = useState<string>("ISO 29100");

  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(
    new Set(["root", "paris", "paris_zones", "lyon"])
  );
  const [selectedNodes, setSelectedNodes] = useState<Set<string>>(new Set());
  const [catalogItems, setCatalogItems] = useState<TreeNode[]>([]);
  const [downloads, setDownloads] = useState<TreeNode[]>([]);

  useEffect(() => {
    const catalogDatasetIds = catalogItems.map((item) => item.id);
    const newSelected = new Set(selectedNodes);

    catalogDatasetIds.forEach((id) => {
      newSelected.add(id);
    });

    setSelectedNodes(newSelected);
  }, [catalogItems]);

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

  // Fonction récursive pour collecter tous les datasets enfants
  const collectDatasets = (node: TreeNode): TreeNode[] => {
    let datasets: TreeNode[] = [];

    if (node.type === "dataset") {
      datasets.push(node);
    }

    if (node.children) {
      node.children.forEach((child) => {
        datasets = datasets.concat(collectDatasets(child));
      });
    }

    return datasets;
  };

  const toggleSelection = (nodeId: string): void => {
    const node = findNodeById(nodeId);
    if (!node) return;

    const newSelected = new Set(selectedNodes);

    if (newSelected.has(nodeId)) {
      newSelected.delete(nodeId);

      // Si c'est un dataset, le retirer du catalogue
      if (node.type === "dataset") {
        setCatalogItems((prev) => prev.filter((item) => item.id !== nodeId));
        // Si c'était le pattern sélectionné, le désélectionner
        if (selectedPattern?.id === nodeId) {
          setSelectedPattern(null);
        }
      }

      // Si c'est un dossier, décocher tous ses datasets enfants
      if (
        node.type === "category" ||
        node.type === "zone" ||
        node.type === "city"
      ) {
        const childDatasets = collectDatasets(node);
        childDatasets.forEach((dataset) => {
          newSelected.delete(dataset.id);
          setCatalogItems((prev) =>
            prev.filter((item) => item.id !== dataset.id)
          );
          // Si c'était le pattern sélectionné, le désélectionner
          if (selectedPattern?.id === dataset.id) {
            setSelectedPattern(null);
          }
        });
      }
    } else {
      newSelected.add(nodeId);

      // Si c'est un dataset, l'ajouter automatiquement au catalogue
      if (
        node.type === "dataset" &&
        !catalogItems.some((item) => item.id === nodeId)
      ) {
        setCatalogItems((prev) => [...prev, node]);
      }

      // Si c'est un dossier, cocher et ajouter tous ses datasets enfants
      if (
        node.type === "category" ||
        node.type === "zone" ||
        node.type === "city"
      ) {
        const childDatasets = collectDatasets(node);
        const newDatasets: TreeNode[] = [];

        childDatasets.forEach((dataset) => {
          newSelected.add(dataset.id);
          if (!catalogItems.some((item) => item.id === dataset.id)) {
            newDatasets.push(dataset);
          }
        });

        if (newDatasets.length > 0) {
          setCatalogItems((prev) => [...prev, ...newDatasets]);
        }
      }
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
  const renderNode = (
    node: TreeNode,
    depth: number = 0
  ): React.ReactElement => {
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

          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => toggleSelection(node.id)}
            className="mr-1 h-3 w-3 text-blue-600"
          />

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
            {node.children?.map((child) => renderNode(child, depth + 1))}
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
                    <div className="p-2 overflow-y-auto h-full">
                      {renderNode(treeData)}
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
                            selectedPattern?.id === item.id
                              ? "bg-[#C1DDF1]"
                              : ""
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
              <div className="absolute bottom-4 right-4">
                <button
                  onClick={() => addToDownloads(selectedPattern)}
                  className="w-12 h-8 bg-[#3892D3] text-white rounded flex items-center justify-center hover:bg-[#2d7bb8] transition-colors"
                >
                  <PlusSquare size={16} />
                </button>
              </div>
            )}
          </div>

          <div className="w-80 bg-white border-l border-gray-300 relative">
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
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    );
                  })
                )}
              </div>
              {downloads.length > 0 && (
                <div className="absolute bottom-4 right-4">
                  <button className="w-12 h-8 bg-[#3892D3] text-white rounded flex items-center justify-center hover:bg-[#2d7bb8] transition-colors">
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
