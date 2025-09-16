import React from "react";
import { Rnd } from "react-rnd";
import { CircleChevronLeft } from "lucide-react";
import { TreeNode } from "@/types/tree";
import { TreeView } from "./TreeView";

interface FilterPanelProps {
  isCollapsed: boolean;
  width: number;
  treeData: TreeNode;
  expandedNodes: Set<string>;
  selectedNodes: Set<string>;
  onToggleFilter: () => void;
  onResize: (width: number) => void;
  onToggleNode: (nodeId: string) => void;
  onToggleSelection: (nodeId: string) => void;
  getPrivacyColor: (level?: string) => string;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  isCollapsed,
  width,
  treeData,
  expandedNodes,
  selectedNodes,
  onToggleFilter,
  onResize,
  onToggleNode,
  onToggleSelection,
  getPrivacyColor,
}) => {
  return (
    <div>
      <Rnd
        size={{ width, height: "100%" }}
        position={{ x: 0, y: 0 }}
        onResize={(_, __, ref) => {
          onResize(ref.offsetWidth);
        }}
        enableResizing={{
          top: false,
          right: !isCollapsed,
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
          {!isCollapsed && (
            <div className="bg-[#157FCC] text-white px-4 py-2 flex items-center justify-between transition-opacity duration-300">
              <span className="font-extrabold text-xs">FILTER</span>
              <button
                onClick={onToggleFilter}
                title="Close filter"
                className="text-white px-1 cursor-pointer rounded bg-[#157FCC]"
              >
                <CircleChevronLeft className="h-4.5 w-4.5 font-bold" />
              </button>
            </div>
          )}

          <div className="flex-1 overflow-hidden">
            {!isCollapsed ? (
              <div className="p-2 overflow-y-auto h-full">
                <TreeView
                  treeData={treeData}
                  expandedNodes={expandedNodes}
                  selectedNodes={selectedNodes}
                  onToggleNode={onToggleNode}
                  onToggleSelection={onToggleSelection}
                  getPrivacyColor={getPrivacyColor}
                />
              </div>
            ) : (
              <div className="bg-[#157FCC] h-full flex flex-col transition-all duration-200">
                <button
                  onClick={onToggleFilter}
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
  );
};