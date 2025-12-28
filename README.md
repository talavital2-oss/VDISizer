# VDI Architect Calculator

A precision VDI workload sizing and vSAN ESA capacity planning tool built with React and Tailwind CSS.

## Features

- **Manual Configuration Mode**: Size infrastructure based on user count, vCPU, RAM, and storage requirements
- **Import Workload Mode**: Analyze existing workloads and plan migrations with growth targets
- **vSAN ESA Support**: Configure storage with NVMe disks, RAID policies, and automatic capacity sizing
- **Real-time Calculations**: Instant feedback on blade counts, chassis requirements, and resource utilization
- **Visual Rack Layout**: See your hardware configuration visualized
- **Bill of Materials**: Complete hardware BOM with line items

## Prerequisites

- Node.js 18+ 
- npm 9+

To install Node.js on macOS:
```bash
brew install node
```

Or download from: https://nodejs.org/

## Installation

```bash
npm install
```

## Development

Start the development server:

```bash
npm run dev
```

The app will be available at http://localhost:5173

## Build

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Technology Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first styling

## Processor Support

### AMD EPYC
- EPYC 9455 (48C, 3.15 GHz)
- EPYC 9555 (64C, 3.20 GHz)
- EPYC 9355 (32C, 3.55 GHz)
- EPYC 9655 (96C, 2.60 GHz)

### Intel Xeon 6
- Xeon 6768P (64C, 2.40 GHz)
- Xeon 6554S (48C, 2.20 GHz)
- Xeon 6788P (86C, 2.00 GHz)
- Xeon 6548Y+ (32C, 2.50 GHz)

## vSAN ESA Storage Options

- 1.92TB, 3.8TB, 7.6TB, 15.3TB NVMe drives
- RAID 1, RAID 5, RAID 6 policies
- Auto-size or manual disk count modes
