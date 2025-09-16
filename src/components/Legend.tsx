import React from "react";
import { TreeNode } from "@/types/tree";
import { Badge } from "./Badge";
import { ToggleButton } from "./ToggleButton";

interface LegendProps {
  treeData: TreeNode;
  selected: string;
  onSelectionChange: (value: string) => void;
}

export const Legend: React.FC<LegendProps> = ({
  treeData,
  selected,
  onSelectionChange,
}) => {
  // Recursive function to collect all element types
  const collectElementTypes = (node: TreeNode): Set<string> => {
    const types = new Set<string>();

    if (node.type === 'dataset' || node.type === 'technique') {
      types.add(node.type);
    }

    if (node.children) {
      node.children.forEach(child => {
        const childTypes = collectElementTypes(child);
        childTypes.forEach(type => types.add(type));
      });
    }

    return types;
  };

  // Function to collect privacy levels
  const collectPrivacyLevels = (node: TreeNode): Set<string> => {
    const levels = new Set<string>();

    if (node.metadata?.privacy) {
      levels.add(node.metadata.privacy);
    }

    if (node.children) {
      node.children.forEach(child => {
        const childLevels = collectPrivacyLevels(child);
        childLevels.forEach(level => levels.add(level));
      });
    }

    return levels;
  };

  const elementTypes = collectElementTypes(treeData);
  const privacyLevels = collectPrivacyLevels(treeData);

  // Badge configuration based on found types
  const getBadgeConfig = (type: string) => {
    switch (type) {
      case 'dataset':
        return { text: 'Dataset', color: 'bg-blue-500' };
      case 'technique':
        return { text: 'Technique', color: 'bg-purple-500' };
      default:
        return { text: 'Pattern', color: 'bg-yellow-400' };
    }
  };

  // Privacy level configuration
  const getPrivacyBadgeConfig = (level: string) => {
    switch (level) {
      case 'HIGH_SENSITIVE':
        return { text: 'High Sensitive', color: 'bg-red-500' };
      case 'MODERATE':
        return { text: 'Moderate', color: 'bg-yellow-500' };
      case 'LOW':
        return { text: 'Low Risk', color: 'bg-green-500' };
      default:
        return { text: level, color: 'bg-gray-500' };
    }
  };

  return (
    <div className="p-1">
      <div className="bg-[#157FCC] text-white px-2 py-1 flex items-center justify-between rounded-xs">
        <div className="flex items-center gap-2">
          <span className="font-extrabold text-xs">LEGEND:</span>

          {/* Element Types */}
          {Array.from(elementTypes).map(type => {
            const config = getBadgeConfig(type);
            return (
              <Badge
                key={type}
                text={config.text}
                color={config.color}
                className="font-normal uppercase text-xs"
              />
            );
          })}

          {/* Privacy Levels */}
          {privacyLevels.size > 0 && (
            <>
              <span className="text-xs">|</span>
              {Array.from(privacyLevels).map(level => {
                const config = getPrivacyBadgeConfig(level);
                return (
                  <Badge
                    key={level}
                    text={config.text}
                    color={config.color}
                    className="font-normal uppercase text-xs"
                  />
                );
              })}
            </>
          )}
        </div>

        <div className="flex items-center gap-1">
          <ToggleButton
            options={["ISO 29100", "PATTERNS"]}
            value={selected}
            onChange={onSelectionChange}
          />
          <button className="w-6 h-6 cursor-pointer flex items-center justify-center rounded bg-[#296A9A] border-[#3892D3] text-white font-bold text-xs">
            ?
          </button>
        </div>
      </div>
    </div>
  );
};