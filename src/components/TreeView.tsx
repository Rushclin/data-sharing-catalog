import React from "react";
import {
  ChevronRight,
  ChevronDown,
  Folder,
  FolderOpen,
} from "lucide-react";
import { TreeNode } from "@/types/tree";

interface TreeViewProps {
  treeData: TreeNode;
  expandedNodes: Set<string>;
  selectedNodes: Set<string>;
  onToggleNode: (nodeId: string) => void;
  onToggleSelection: (nodeId: string) => void;
  getPrivacyColor: (level?: string) => string;
}

export const TreeView: React.FC<TreeViewProps> = ({
  treeData,
  expandedNodes,
  selectedNodes,
  onToggleNode,
  onToggleSelection,
  getPrivacyColor,
}) => {
  const renderNode = (node: TreeNode, depth: number = 0): React.ReactElement => {
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
                onClick={() => onToggleNode(node.id)}
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
            onChange={() => onToggleSelection(node.id)}
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

          {/* Node Label */}
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

  return <div>{renderNode(treeData)}</div>;
};