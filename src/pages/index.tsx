"use client";

import { useState, useEffect } from "react";
import { TreeNode } from "@/types/tree";
import { treeData } from "@/__mock/treeDatas";
import {
  FilterPanel,
  CatalogPanel,
  DetailsPanel,
  DownloadsPanel,
  Legend,
} from "@/components";

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

  const getPrivacyColor = (level?: string): string => {
    switch (level) {
      case "HIGH_SENSITIVE": return "text-red-600";
      case "MODERATE": return "text-yellow-600";
      case "LOW": return "text-green-600";
      default: return "text-gray-600";
    }
  };

  const findNodeById = (nodeId: string, node: TreeNode = treeData): TreeNode | null => {
    if (node.id === nodeId) return node;
    if (node.children) {
      for (const child of node.children) {
        const found = findNodeById(nodeId, child);
        if (found) return found;
      }
    }
    return null;
  };

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

  const toggleFilter = () => {
    setIsFilterCollapsed(!isFilterCollapsed);
    setFilterWidth(!isFilterCollapsed ? 40 : 280);
  };

  const handleFilterResize = (width: number) => {
    setFilterWidth(width);
  };

  const handleCatalogResize = (width: number) => {
    setCatalogWidth(width);
  };

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
    const node = findNodeById(nodeId);
    if (!node) return;

    const newSelected = new Set(selectedNodes);

    if (newSelected.has(nodeId)) {
      newSelected.delete(nodeId);

      if (node.type === "dataset") {
        setCatalogItems((prev) => prev.filter((item) => item.id !== nodeId));
        if (selectedPattern?.id === nodeId) {
          setSelectedPattern(null);
        }
      }

      if (node.type === "category" || node.type === "zone" || node.type === "city") {
        const childDatasets = collectDatasets(node);
        childDatasets.forEach((dataset) => {
          newSelected.delete(dataset.id);
          setCatalogItems((prev) => prev.filter((item) => item.id !== dataset.id));
          if (selectedPattern?.id === dataset.id) {
            setSelectedPattern(null);
          }
        });
      }
    } else {
      newSelected.add(nodeId);

      if (node.type === "dataset" && !catalogItems.some((item) => item.id === nodeId)) {
        setCatalogItems((prev) => [...prev, node]);
      }

      if (node.type === "category" || node.type === "zone" || node.type === "city") {
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

  const addToDownloads = (item: TreeNode): void => {
    if (!downloads.some((download) => download.id === item.id)) {
      setDownloads((prev) => [...prev, item]);
    }
  };

  const removeFromDownloads = (itemId: string): void => {
    setDownloads((prev) => prev.filter((item) => item.id !== itemId));
  };

  return (
    <div className="h-screen w-screen bg-[#3892D3] flex flex-col overflow-y-hidden">
      <Legend
        treeData={treeData}
        selected={selected}
        onSelectionChange={setSelected}
      />

      <div className="p-1 h-full">
        <div className="flex-1 flex relative h-full gap-x-1">
          <FilterPanel
            isCollapsed={isFilterCollapsed}
            width={filterWidth}
            treeData={treeData}
            expandedNodes={expandedNodes}
            selectedNodes={selectedNodes}
            onToggleFilter={toggleFilter}
            onResize={handleFilterResize}
            onToggleNode={toggleNode}
            onToggleSelection={toggleSelection}
            getPrivacyColor={getPrivacyColor}
          />

          <CatalogPanel
            width={catalogWidth}
            filterWidth={filterWidth}
            catalogItems={catalogItems}
            selectedPattern={selectedPattern}
            onResize={handleCatalogResize}
            onSelectPattern={setSelectedPattern}
            getPrivacyColor={getPrivacyColor}
          />

          <DetailsPanel
            filterWidth={filterWidth}
            catalogWidth={catalogWidth}
            selectedPattern={selectedPattern}
            onAddToDownloads={addToDownloads}
            getPrivacyColor={getPrivacyColor}
          />

          <DownloadsPanel
            downloads={downloads}
            onRemoveFromDownloads={removeFromDownloads}
            getPrivacyColor={getPrivacyColor}
          />
        </div>
      </div>
    </div>
  );
}