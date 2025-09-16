import React from "react";
import { Rnd } from "react-rnd";
import { Database } from "lucide-react";
import { TreeNode } from "@/types/tree";

interface CatalogPanelProps {
  width: number;
  filterWidth: number;
  catalogItems: TreeNode[];
  selectedPattern: TreeNode | null;
  onResize: (width: number) => void;
  onSelectPattern: (pattern: TreeNode) => void;
  getPrivacyColor: (level?: string) => string;
}

export const CatalogPanel: React.FC<CatalogPanelProps> = ({
  width,
  filterWidth,
  catalogItems,
  selectedPattern,
  onResize,
  onSelectPattern,
  getPrivacyColor,
}) => {
  return (
    <div>
      <Rnd
        size={{ width, height: "100%" }}
        position={{ x: filterWidth, y: 0 }}
        onResize={(_, __, ref) => {
          onResize(ref.offsetWidth);
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
                <Database size={32} className="mx-auto mb-2 text-gray-300" />
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
                    onClick={() => onSelectPattern(item)}
                    className={`flex items-center gap-2 p-2 mb-1 cursor-pointer hover:bg-blue-50 rounded ${
                      selectedPattern?.id === item.id ? "bg-[#C1DDF1]" : ""
                    }`}
                  >
                    <IconComponent
                      size={16}
                      className={getPrivacyColor(item.metadata?.privacy)}
                    />
                    <div className="flex-1">
                      <div className="text-xs font-medium">{item.label}</div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </Rnd>
    </div>
  );
};