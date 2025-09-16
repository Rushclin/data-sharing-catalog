import React from "react";
import { Download, Database, X } from "lucide-react";
import { TreeNode } from "@/types/tree";

interface DownloadsPanelProps {
  downloads: TreeNode[];
  onRemoveFromDownloads: (itemId: string) => void;
  getPrivacyColor: (level?: string) => string;
}

export const DownloadsPanel: React.FC<DownloadsPanelProps> = ({
  downloads,
  onRemoveFromDownloads,
  getPrivacyColor,
}) => {
  return (
    <div className="w-80 bg-white border-l border-gray-300 relative">
      <div className="bg-[#157FCC] text-white px-4 py-2 flex items-center justify-between transition-opacity duration-300">
        <span className="font-extrabold text-xs uppercase">Download</span>
      </div>
      <div className="p-4 flex flex-col h-[98%]">
        <div className="mb-4">
          <span className="font-semibold text-xs">Datasets to download</span>
        </div>
        <div className="flex-1 overflow-y-auto">
          {downloads.length === 0 ? (
            <div className="text-center text-gray-500 text-xs mt-8">
              <Download size={32} className="mx-auto mb-2 text-gray-300" />
              <p>No downloads</p>
              <p className="text-xs">Add items from details</p>
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
                    onClick={() => onRemoveFromDownloads(item.id)}
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
  );
};