import React from "react";
import { Eye, PlusSquare } from "lucide-react";
import { TreeNode } from "@/types/tree";

interface DetailsPanelProps {
  filterWidth: number;
  catalogWidth: number;
  selectedPattern: TreeNode | null;
  onAddToDownloads: (item: TreeNode) => void;
  getPrivacyColor: (level?: string) => string;
}

export const DetailsPanel: React.FC<DetailsPanelProps> = ({
  filterWidth,
  catalogWidth,
  selectedPattern,
  onAddToDownloads,
  getPrivacyColor,
}) => {
  return (
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
                    className={getPrivacyColor(selectedPattern.metadata?.privacy)}
                  />
                )}
                <span className="font-bold text-xs">DATASET</span>
              </div>
              <div className="text-lg font-xs mb-2">{selectedPattern.label}</div>

              <div className="text-xs mb-1">
                <span className="font-xs">Description:</span>
              </div>
              <div className="text-xs mb-4">
                {selectedPattern.metadata?.description ||
                  "No description available"}
              </div>

              <div className="text-xs mb-1">
                <span className="font-xs">Privacy Level:</span>
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
                    <span className="font-normal">Protection Techniques:</span>
                  </div>
                  <div className="text-xs mb-4">
                    <div className="flex flex-wrap gap-1">
                      {selectedPattern.metadata.techniques.map((technique, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs"
                        >
                          {technique.replace("_", " ")}
                        </span>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {selectedPattern.metadata?.formats && (
                <>
                  <div className="text-xs mb-1">
                    <span className="font-semibold">Available Formats:</span>
                  </div>
                  <div className="text-xs mb-4">
                    <div className="flex flex-wrap gap-1">
                      {selectedPattern.metadata.formats.map((format, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                        >
                          {format.replace("_", " ")}
                        </span>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {selectedPattern.metadata?.lastUpdate && (
                <>
                  <div className="text-xs mb-1">
                    <span className="font-semibold">Last Update:</span>
                  </div>
                  <div className="text-xs mb-4">
                    {new Date(selectedPattern.metadata.lastUpdate).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-500 text-xs mt-8">
            <Eye size={32} className="mx-auto mb-2 text-gray-300" />
            <p>Select an item from the catalog</p>
            <p className="text-xs">to see its details</p>
          </div>
        )}
      </div>

      {selectedPattern && (
        <div className="absolute bottom-4 right-4">
          <button
            onClick={() => onAddToDownloads(selectedPattern)}
            className="w-12 h-8 bg-[#3892D3] text-white rounded flex items-center justify-center hover:bg-[#2d7bb8] transition-colors"
          >
            <PlusSquare size={16} />
          </button>
        </div>
      )}
    </div>
  );
};