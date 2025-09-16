# CrowdMesh Data Sharing Catalog

A privacy-preserving data catalog interface for edge-cloud crowd monitoring systems. This Next.js application provides a resizable, multi-panel interface for exploring datasets, privacy techniques, and infrastructure components in crowd safety monitoring deployments across French cities.

## Features

### 🎛️ Resizable Interface
- **4 Main Panels**: Filter, Catalog, Details, and Downloads
- **Drag & Drop Resizing**: Using react-rnd for flexible panel sizing
- **Collapsible Filter Panel**: Minimizes to vertical text for space optimization
- **Responsive Design**: Adapts to different screen sizes

### 🗂️ Data Management
- **Hierarchical Tree View**: Navigate through cities, zones, and datasets
- **Smart Selection**: Folder selection automatically includes all child datasets
- **Synchronized State**: Tree selections sync with catalog items
- **Privacy-Aware Display**: Color-coded privacy levels (High Sensitive, Moderate, Low)

### 🔍 Dynamic Legend
- **Auto-Generated Badges**: Based on available data types
- **Privacy Level Indicators**: Visual representation of sensitivity levels
- **Element Type Classification**: Datasets, techniques, and infrastructure

### 📊 Detailed Information Panel
- **Comprehensive Metadata**: Description, privacy levels, protection techniques
- **Format Information**: Available data formats for each dataset
- **Last Update Timestamps**: Track data freshness
- **Privacy Techniques**: Applied protection methods

### 💾 Download Management
- **Download Queue**: Add/remove items for batch processing
- **Visual Feedback**: Green highlighting for queued items
- **Quick Actions**: One-click add to downloads from details panel

## Architecture

### Component Structure
```
src/
├── components/
│   ├── Badge.tsx              # Reusable badge component
│   ├── CatalogPanel.tsx       # Selected datasets display
│   ├── DetailsPanel.tsx       # Dataset/technique details
│   ├── DownloadsPanel.tsx     # Download queue management
│   ├── FilterPanel.tsx        # Collapsible tree filter
│   ├── Legend.tsx             # Dynamic legend generation
│   ├── ToggleButton.tsx       # Toggle between views
│   ├── TreeView.tsx           # Hierarchical data navigation
│   └── index.ts               # Component exports
├── pages/
│   └── index.tsx              # Main application logic
├── types/
│   └── tree.ts                # TypeScript interfaces
└── __mock/
    └── treeDatas.ts           # Sample dataset
```

### Data Model
The application uses a hierarchical tree structure representing:
- **Cities**: Paris, Lyon, Marseille, Nice, Toulouse
- **Zones**: Surveillance areas within each city
- **Datasets**: Individual data collections with privacy metadata
- **Infrastructure**: Edge computing nodes and fog layers
- **Privacy Techniques**: Applied protection methods

## Privacy Features

### Privacy Levels
- **HIGH_SENSITIVE**: Red indicators, maximum protection
- **MODERATE**: Yellow indicators, balanced approach
- **LOW**: Green indicators, minimal restrictions

### Protection Techniques
- Differential Privacy
- K-Anonymity
- Homomorphic Encryption
- Federated Learning
- Secure Multi-Party Computation
- Synthetic Data Generation
- Temporal/Spatial Privacy Protection

## Getting Started

### Prerequisites
- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation
```bash
# Install dependencies
npm install

# Install react-rnd for resizable panels
npm install react-rnd

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Development
- Main application logic in `src/pages/index.tsx`
- Reusable components in `src/components/`
- Type definitions in `src/types/tree.ts`
- Sample data in `src/__mock/treeDatas.ts`

## Usage

1. **Navigate**: Use the tree view to browse cities and zones
2. **Select**: Check items to add them to the catalog
3. **Explore**: Click catalog items to view detailed information
4. **Download**: Add items to the download queue from the details panel
5. **Resize**: Drag panel borders to adjust layout
6. **Collapse**: Use the toggle button to minimize the filter panel

## Data Sources

The application includes comprehensive mock data covering:
- **42 Datasets** across 5 major French cities
- **8 Privacy Techniques** with implementation details
- **4 Infrastructure Nodes** for edge computing
- **Multiple Sensor Types**: Cameras, WiFi, Audio, LiDAR, IoT

Each dataset includes:
- Privacy level classification
- Applied protection techniques
- Available data formats
- Last update timestamps
- Detailed descriptions

## Technical Stack

- **Frontend**: Next.js 14+ with TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Resizable Panels**: react-rnd
- **State Management**: React Hooks
- **Type Safety**: Full TypeScript coverage

## Contributing

The codebase follows these conventions:
- Functional components with TypeScript
- Tailwind CSS for styling
- Comprehensive prop interfaces
- Reusable component architecture
- Privacy-first data handling

## License

This project is for research and educational purposes in privacy-preserving crowd monitoring systems.