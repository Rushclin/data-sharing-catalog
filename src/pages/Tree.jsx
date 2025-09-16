import React, { useState } from 'react';
import { 
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
  Clock,
  Users,
  Database,
  Eye,
  Settings
} from 'lucide-react';

const CrowdMeshTreeCatalog = () => {
  const [expandedNodes, setExpandedNodes] = useState(new Set(['root', 'paris', 'lyon']));
  const [selectedNodes, setSelectedNodes] = useState(new Set());

  // Structure des données hiérarchiques basée sur l'architecture CrowdMesh
  const treeData = {
    id: 'root',
    label: 'Catalogue CrowdMesh - Données Edge-Cloud',
    type: 'root',
    children: [
      {
        id: 'paris',
        label: 'Paris',
        type: 'city',
        icon: MapPin,
        children: [
          {
            id: 'paris_zones',
            label: 'Zones de Surveillance',
            type: 'category',
            icon: Folder,
            children: [
              {
                id: 'paris_zone_a',
                label: 'Zone A - Centre Commercial Les Halles',
                type: 'zone',
                icon: Camera,
                metadata: { privacy: 'HIGH_SENSITIVE', status: 'active', size: '2.3 GB' },
                children: [
                  {
                    id: 'paris_zone_a_cam',
                    label: 'Caméras de Surveillance (12 unités)',
                    type: 'dataset',
                    icon: Camera,
                    metadata: { 
                      privacy: 'HIGH_SENSITIVE', 
                      techniques: ['face_blurring', 'differential_privacy'],
                      formats: ['heatmap', 'density_stats'],
                      lastUpdate: '2025-09-15T14:30:00Z'
                    }
                  },
                  {
                    id: 'paris_zone_a_wifi',
                    label: 'Détecteurs WiFi (8 points)',
                    type: 'dataset',
                    icon: Wifi,
                    metadata: { 
                      privacy: 'HIGH_SENSITIVE',
                      techniques: ['mac_randomization', 'k_anonymity'],
                      formats: ['presence_heatmap', 'flow_patterns'],
                      lastUpdate: '2025-09-15T14:25:00Z'
                    }
                  },
                  {
                    id: 'paris_zone_a_audio',
                    label: 'Capteurs Audio Ambiants (6 unités)',
                    type: 'dataset',
                    icon: Mic,
                    metadata: { 
                      privacy: 'MODERATE',
                      techniques: ['audio_anonymization', 'decibel_aggregation'],
                      formats: ['noise_levels', 'crowd_density_audio'],
                      lastUpdate: '2025-09-15T14:20:00Z'
                    }
                  }
                ]
              },
              {
                id: 'paris_zone_b',
                label: 'Zone B - Gare du Nord',
                type: 'zone',
                icon: Camera,
                metadata: { privacy: 'HIGH_SENSITIVE', status: 'active', size: '4.1 GB' },
                children: [
                  {
                    id: 'paris_zone_b_cam',
                    label: 'Caméras Haute Définition (24 unités)',
                    type: 'dataset',
                    icon: Camera,
                    metadata: { 
                      privacy: 'HIGH_SENSITIVE',
                      techniques: ['real_time_anonymization', 'differential_privacy'],
                      formats: ['anonymized_tracks', 'flow_analysis']
                    }
                  },
                  {
                    id: 'paris_zone_b_mobile',
                    label: 'Analytics Mobile (Bluetooth/WiFi)',
                    type: 'dataset',
                    icon: Smartphone,
                    metadata: { 
                      privacy: 'HIGH_SENSITIVE',
                      techniques: ['temporal_blur', 'spatial_cloaking'],
                      formats: ['mobility_patterns', 'dwell_time_stats']
                    }
                  }
                ]
              },
              {
                id: 'paris_zone_c',
                label: 'Zone C - Parc de la Villette',
                type: 'zone',
                icon: Camera,
                metadata: { privacy: 'MODERATE', status: 'active', size: '1.8 GB' },
                children: [
                  {
                    id: 'paris_zone_c_env',
                    label: 'Capteurs Environnementaux',
                    type: 'dataset',
                    icon: Database,
                    metadata: { 
                      privacy: 'LOW',
                      techniques: ['temporal_aggregation'],
                      formats: ['weather_crowd_correlation', 'activity_heatmaps']
                    }
                  }
                ]
              }
            ]
          },
          {
            id: 'paris_edge_nodes',
            label: 'Nœuds Edge Computing',
            type: 'category',
            icon: Settings,
            children: [
              {
                id: 'paris_edge_1',
                label: 'Edge Node 1 - Les Halles MEC',
                type: 'infrastructure',
                icon: Database,
                metadata: { 
                  status: 'operational',
                  capacity: '85%',
                  techniques: ['local_differential_privacy', 'federated_learning']
                }
              },
              {
                id: 'paris_edge_2',
                label: 'Edge Node 2 - Gare du Nord MEC',
                type: 'infrastructure', 
                icon: Database,
                metadata: { 
                  status: 'operational',
                  capacity: '72%',
                  techniques: ['homomorphic_encryption', 'secure_aggregation']
                }
              }
            ]
          }
        ]
      },
      {
        id: 'lyon',
        label: 'Lyon',
        type: 'city',
        icon: MapPin,
        children: [
          {
            id: 'lyon_zones',
            label: 'Zones de Surveillance',
            type: 'category',
            icon: Folder,
            children: [
              {
                id: 'lyon_zone_centre',
                label: 'Zone Centre - Place Bellecour',
                type: 'zone',
                icon: Camera,
                metadata: { privacy: 'HIGH_SENSITIVE', status: 'active', size: '3.2 GB' },
                children: [
                  {
                    id: 'lyon_centre_cam',
                    label: 'Système de Surveillance Intégré',
                    type: 'dataset',
                    icon: Camera,
                    metadata: { 
                      privacy: 'HIGH_SENSITIVE',
                      techniques: ['real_time_masking', 'k_anonymity'],
                      formats: ['crowd_flow_analysis', 'safety_metrics']
                    }
                  }
                ]
              },
              {
                id: 'lyon_zone_perrache',
                label: 'Zone Perrache - Station Transport',
                type: 'zone',
                icon: Camera,
                metadata: { privacy: 'HIGH_SENSITIVE', status: 'active', size: '2.7 GB' },
                children: [
                  {
                    id: 'lyon_perrache_multimodal',
                    label: 'Capteurs Transport Multimodal',
                    type: 'dataset',
                    icon: Users,
                    metadata: { 
                      privacy: 'MODERATE',
                      techniques: ['differential_privacy', 'spatial_cloaking'],
                      formats: ['transit_patterns', 'occupancy_forecast']
                    }
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'techniques_privacy',
        label: 'Techniques de Protection Appliquées',
        type: 'category',
        icon: Shield,
        children: [
          {
            id: 'differential_privacy',
            label: 'Differential Privacy',
            type: 'technique',
            icon: Shield,
            metadata: { 
              datasets_count: 8,
              epsilon_range: '0.1 - 1.0',
              description: 'Protection probabiliste contre la réidentification'
            }
          },
          {
            id: 'k_anonymity',
            label: 'K-Anonymity',
            type: 'technique',
            icon: Shield,
            metadata: { 
              datasets_count: 12,
              k_values: '5 - 50',
              description: 'Garantie de non-distinguabilité dans un groupe'
            }
          },
          {
            id: 'homomorphic_encryption',
            label: 'Chiffrement Homomorphe',
            type: 'technique',
            icon: Shield,
            metadata: { 
              datasets_count: 4,
              schemes: ['Paillier', 'BGV'],
              description: 'Calculs sur données chiffrées'
            }
          },
          {
            id: 'federated_learning',
            label: 'Federated Learning',
            type: 'technique',
            icon: Shield,
            metadata: { 
              datasets_count: 6,
              frameworks: ['TensorFlow Federated', 'PySyft'],
              description: 'Apprentissage sans centralisation des données'
            }
          }
        ]
      }
    ]
  };

  const toggleNode = (nodeId) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(nodeId)) {
      newExpanded.delete(nodeId);
    } else {
      newExpanded.add(nodeId);
    }
    setExpandedNodes(newExpanded);
  };

  const toggleSelection = (nodeId) => {
    const newSelected = new Set(selectedNodes);
    if (newSelected.has(nodeId)) {
      newSelected.delete(nodeId);
    } else {
      newSelected.add(nodeId);
    }
    setSelectedNodes(newSelected);
  };

  const getPrivacyColor = (level) => {
    switch (level) {
      case 'HIGH_SENSITIVE': return 'text-red-600';
      case 'MODERATE': return 'text-yellow-600';
      case 'LOW': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const renderNode = (node, depth = 0) => {
    const isExpanded = expandedNodes.has(node.id);
    const isSelected = selectedNodes.has(node.id);
    const hasChildren = node.children && node.children.length > 0;
    const IconComponent = node.icon || Folder;

    return (
      <div key={node.id} className="select-none">
        <div 
          className={`flex items-center py-1 px-2 hover:bg-blue-50 cursor-pointer rounded ${
            isSelected ? 'bg-blue-100' : ''
          }`}
          style={{ paddingLeft: `${depth * 20 + 8}px` }}
        >
          {/* Expand/Collapse Icon */}
          <div className="w-4 h-4 flex items-center justify-center mr-1">
            {hasChildren && (
              <button onClick={() => toggleNode(node.id)} className="hover:bg-gray-200 rounded">
                {isExpanded ? (
                  <ChevronDown size={14} className="text-gray-600" />
                ) : (
                  <ChevronRight size={14} className="text-gray-600" />
                )}
              </button>
            )}
          </div>

          {/* Checkbox */}
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => toggleSelection(node.id)}
            className="mr-2 h-4 w-4 text-blue-600"
          />

          {/* Node Icon */}
          <div className="mr-2">
            {node.type === 'category' || node.type === 'zone' ? (
              isExpanded ? (
                <FolderOpen size={16} className="text-blue-500" />
              ) : (
                <Folder size={16} className="text-blue-500" />
              )
            ) : (
              <IconComponent size={16} className={
                node.type === 'dataset' ? getPrivacyColor(node.metadata?.privacy) : 'text-gray-600'
              } />
            )}
          </div>

          {/* Node Label */}
          <span className="flex-1 text-sm">
            {node.label}
          </span>

          {/* Metadata Badges */}
          {node.metadata && (
            <div className="ml-2 flex gap-1">
              {node.metadata.privacy && (
                <span className={`text-xs px-1 py-0.5 rounded ${
                  node.metadata.privacy === 'HIGH_SENSITIVE' 
                    ? 'bg-red-100 text-red-700'
                    : node.metadata.privacy === 'MODERATE'
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-green-100 text-green-700'
                }`}>
                  {node.metadata.privacy}
                </span>
              )}
              {node.metadata.status && (
                <span className={`text-xs px-1 py-0.5 rounded ${
                  node.metadata.status === 'active' 
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-700'
                }`}>
                  {node.metadata.status}
                </span>
              )}
              {node.metadata.size && (
                <span className="text-xs text-gray-500">
                  {node.metadata.size}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Children */}
        {hasChildren && isExpanded && (
          <div>
            {node.children.map(child => renderNode(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  const selectedCount = selectedNodes.size;

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border">
          {/* Header */}
          <div className="p-4 border-b bg-gray-50">
            <h1 className="text-xl font-bold mb-2">Catalogue CrowdMesh - Vue Hiérarchique</h1>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span>Architecture Edge-Cloud Computing</span>
              <span>•</span>
              <span>Données Respectueuses de la Vie Privée</span>
              {selectedCount > 0 && (
                <>
                  <span>•</span>
                  <span className="text-blue-600 font-medium">
                    {selectedCount} élément{selectedCount > 1 ? 's' : ''} sélectionné{selectedCount > 1 ? 's' : ''}
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Tree View */}
          <div className="p-4">
            <div className="border rounded-lg bg-white max-h-96 overflow-y-auto">
              {renderNode(treeData)}
            </div>
          </div>

          {/* Actions */}
          {selectedCount > 0 && (
            <div className="p-4 border-t bg-gray-50">
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-2">
                  <Eye size={16} />
                  Voir les détails ({selectedCount})
                </button>
                <button className="px-4 py-2 border rounded hover:bg-gray-50">
                  Demander l'accès
                </button>
                <button className="px-4 py-2 border rounded hover:bg-gray-50">
                  Exporter la sélection
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Legend */}
        <div className="mt-4 bg-white rounded-lg shadow-sm border p-4">
          <h3 className="font-semibold mb-3">Légende</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Camera size={16} className="text-red-600" />
              <span>Données HIGH_SENSITIVE</span>
            </div>
            <div className="flex items-center gap-2">
              <Wifi size={16} className="text-yellow-600" />
              <span>Données MODERATE</span>
            </div>
            <div className="flex items-center gap-2">
              <Database size={16} className="text-green-600" />
              <span>Données LOW</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield size={16} className="text-blue-600" />
              <span>Techniques Privacy</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrowdMeshTreeCatalog;