import React, { useState, useEffect } from 'react';

// --- Inline Icons ---
const Icons = {
  Server: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line></svg>,
  Cpu: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg>,
  Activity: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>,
  Lock: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>,
  Unlock: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 9.9-1"></path></svg>,
  Box: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>,
  AlertTriangle: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>,
  Import: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>,
  Sliders: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/></svg>,
  Check: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>,
  Database: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s 9-1.34 9-3V5"></path></svg>,
  Info: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>,
  Settings: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>,
  ArrowLeft: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
};

const TeraSkyLogo = () => (
  <div className="flex items-center gap-2">
    <span className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">TERASKY</span>
  </div>
);

// --- Processor Database ---
const PROCESSORS = [
  { id: 'amd-9455', vendor: 'AMD', name: 'EPYC 9455', cores: 48, baseFreq: 3.15, desc: 'High Freq VDI Gold Standard' },
  { id: 'amd-9555', vendor: 'AMD', name: 'EPYC 9555', cores: 64, baseFreq: 3.20, desc: 'Extreme Performance & Density' },
  { id: 'amd-9355', vendor: 'AMD', name: 'EPYC 9355', cores: 32, baseFreq: 3.55, desc: 'Max Frequency / Low Density' },
  { id: 'amd-9655', vendor: 'AMD', name: 'EPYC 9655', cores: 96, baseFreq: 2.60, desc: 'Massive Density (Lower GHz)' },
  { id: 'intel-6768p', vendor: 'Intel', name: 'Xeon 6768P', cores: 64, baseFreq: 2.40, desc: 'Xeon 6 Performance Leader' },
  { id: 'intel-6554s', vendor: 'Intel', name: 'Xeon 6554S', cores: 48, baseFreq: 2.20, desc: 'Xeon 6 Mainline Option' },
  { id: 'intel-6788p', vendor: 'Intel', name: 'Xeon 6788P', cores: 86, baseFreq: 2.00, desc: 'Max Core Count P-Core' },
  { id: 'intel-6548y', vendor: 'Intel', name: 'Xeon 6548Y+', cores: 32, baseFreq: 2.50, desc: 'Cost/Power Optimized' },
];

const DISK_OPTIONS = [
    { id: 'nvme-1.9', name: '1.92TB NVMe (ESA)', capacity: 1.92 },
    { id: 'nvme-3.8', name: '3.8TB NVMe (ESA)', capacity: 3.84 },
    { id: 'nvme-7.6', name: '7.6TB NVMe (ESA)', capacity: 7.68 },
    { id: 'nvme-15.3', name: '15.3TB NVMe (ESA)', capacity: 15.36 },
];

const RAID_OPTIONS = [
    { id: 'raid1', name: 'RAID 1 (Mirroring)', overhead: 2.0, desc: 'High Perf, 2x Overhead' },
    { id: 'raid5', name: 'RAID 5 (Erasure Coding)', overhead: 1.33, desc: 'Balanced, 1.33x Overhead' },
    { id: 'raid6', name: 'RAID 6 (Erasure Coding)', overhead: 1.5, desc: 'Max Safety, 1.5x Overhead' },
];

const VdiArchitectCalculator = ({ project, onSave, onBack }) => {
  const [configMode, setConfigMode] = useState('manual'); 
  const [isVsanEnabled, setIsVsanEnabled] = useState(false);
  
  // vSAN / Disk State
  const [selectedDisk, setSelectedDisk] = useState(DISK_OPTIONS[1]); // Default 3.8TB
  const [raidPolicy, setRaidPolicy] = useState(RAID_OPTIONS[1]); 
  const [diskConfigMode, setDiskConfigMode] = useState('auto'); // 'auto' | 'manual'
  const [manualDiskCount, setManualDiskCount] = useState(2); // Default to minimum ESA recommendation

  const [importData, setImportData] = useState({
    totalServers: 12, totalCores: 288, totalNetGhz: 750, totalMemoryGB: 9216, 
    totalVMs: 2000, totalvCPUs: 6000, avgCpuUtil: 65, avgRamUtil: 80, 
    totalIops: 80000, totalRawTb: 500, totalUsedTb: 300, growthTarget: 10
  });

  const [numUsers, setNumUsers] = useState(450);
  const [vcpuPerUser, setVcpuPerUser] = useState(8);
  const [ramPerUser, setRamPerUser] = useState(16);
  const [storagePerUser, setStoragePerUser] = useState(60); 
  const [oversubscription, setOversubscription] = useState(5);
  const [maxRamTarget, setMaxRamTarget] = useState(85);
  const [selectedCpuId, setSelectedCpuId] = useState('amd-9455');
  const [isHwLocked, setIsHwLocked] = useState(false);
  const [lockedBladeCount, setLockedBladeCount] = useState(16);

  const BLADE_RAM_GB = 1536; 
  const SOCKETS_PER_BLADE = 2;
  const CHASSIS_SLOTS = 8;
  const MAX_DRIVES_PER_BLADE = 6;
  const VSAN_SLACK_SPACE = 0.25; 
  const HYPERVISOR_OVERHEAD_BASE = 0.1;
  const VSAN_CPU_OVERHEAD = 0.12; 
  const VSAN_RAM_OVERHEAD_GB = 32; 
  const MIN_DRIVES_PER_BLADE_ESA = 2; // Updated to 2 as per user request

  const [result, setResult] = useState({
    activeBlades: 0, totalBlades: 0, chassisCount: 0, cpuLoad: 0, ramUtil: 0,
    storageUtil: 0, netGhzPerBlade: 0, usersPerBlade: 0, safetyTriggered: false,
    constraint: 'CPU', math: { netCores: 0, totalSlots: 0, usersPerBladeCpuCap: 0, nPlusOneRatio: 0, totalVcpu: 0 },
    cpu: {}, profiler: null, totalSystemCores: 0, totalSystemRamTB: 0,
    storage: { rawNeeded: 0, disksPerBlade: 0, totalDisks: 0, usableCapacity: 0, totalRawCapacity: 0, usableNeeded: 0, isOversized: false }
  });

  // --- Load Project Data ---
  useEffect(() => {
    if (project?.data) {
      const d = project.data;
      if (d.configMode) setConfigMode(d.configMode);
      if (d.numUsers !== undefined) setNumUsers(d.numUsers);
      if (d.vcpuPerUser !== undefined) setVcpuPerUser(d.vcpuPerUser);
      if (d.ramPerUser !== undefined) setRamPerUser(d.ramPerUser);
      if (d.storagePerUser !== undefined) setStoragePerUser(d.storagePerUser);
      if (d.oversubscription !== undefined) setOversubscription(d.oversubscription);
      if (d.selectedCpuId) setSelectedCpuId(d.selectedCpuId);
      if (d.isVsanEnabled !== undefined) setIsVsanEnabled(d.isVsanEnabled);
      if (d.selectedDisk) setSelectedDisk(d.selectedDisk);
      if (d.raidPolicy) setRaidPolicy(d.raidPolicy);
      if (d.diskConfigMode) setDiskConfigMode(d.diskConfigMode);
      if (d.manualDiskCount !== undefined) setManualDiskCount(d.manualDiskCount);
      if (d.importData) setImportData(d.importData);
    }
  }, [project]);

  // --- Save Project Data ---
  useEffect(() => {
    const saveData = {
      configMode,
      numUsers,
      vcpuPerUser,
      ramPerUser,
      storagePerUser,
      oversubscription,
      selectedCpuId,
      isVsanEnabled,
      selectedDisk,
      raidPolicy,
      diskConfigMode,
      manualDiskCount,
      importData,
    };
    if (onSave) {
      onSave(saveData);
    }
  }, [configMode, numUsers, vcpuPerUser, ramPerUser, storagePerUser, oversubscription, selectedCpuId, isVsanEnabled, selectedDisk, raidPolicy, diskConfigMode, manualDiskCount, importData, onSave]);

  // --- Workload Profiler Logic ---
  useEffect(() => {
    if (configMode === 'import') {
      const { totalNetGhz, totalMemoryGB, totalVMs, avgCpuUtil, avgRamUtil, growthTarget, totalUsedTb } = importData;
      const consumedGhzTotal = totalNetGhz * (avgCpuUtil / 100);
      const consumedRamTotal = totalMemoryGB * (avgRamUtil / 100);
      const realGhzPerVm = consumedGhzTotal / totalVMs;
      const realRamPerVm = consumedRamTotal / totalVMs;
      const realStoragePerVm = (totalUsedTb * 1024) / totalVMs; 
      const growthMult = 1 + (growthTarget / 100);
      const targetUserCount = Math.ceil(totalVMs * growthMult);
      
      setNumUsers(targetUserCount);
      setStoragePerUser(Math.ceil(realStoragePerVm));
    }
  }, [configMode, importData]);

  // --- Main Calculation Engine ---
  useEffect(() => {
    const cpu = PROCESSORS.find(p => p.id === selectedCpuId) || PROCESSORS[0];
    
    // 1. Hardware Base Stats
    const grossCoresPerBlade = cpu.cores * SOCKETS_PER_BLADE;
    
    // 2. Overheads
    const effectiveHypervisorOverhead = isVsanEnabled 
        ? HYPERVISOR_OVERHEAD_BASE + VSAN_CPU_OVERHEAD 
        : HYPERVISOR_OVERHEAD_BASE;
        
    const effectiveRamPerBlade = isVsanEnabled
        ? (BLADE_RAM_GB - VSAN_RAM_OVERHEAD_GB) * 0.9 
        : BLADE_RAM_GB * 0.9;

    const netCoresPerBlade = grossCoresPerBlade * (1 - effectiveHypervisorOverhead);
    const netGhzPerBlade = netCoresPerBlade * cpu.baseFreq;

    let limitingFactor = 'CPU';
    let calculatedCpuLoad = 0;
    let calculatedRamUtil = 0;
    let profilerStats = null;
    let storageResults = { rawNeeded: 0, disksPerBlade: 0, totalDisks: 0, usableCapacity: 0, totalRawCapacity: 0, usableNeeded: 0, isOversized: false };

    // 3. Demand Calculation
    let bladesForCpu = 0;
    let bladesForRam = 0;
    let nPlusOneRatio = 0;
    let totalVcpuDemand = 0;

    // --- RAM Demand (Universal) ---
    const totalRamDemandGB = numUsers * ramPerUser;
    const SAFE_RAM_CEILING = 0.90;
    bladesForRam = Math.ceil(totalRamDemandGB / (effectiveRamPerBlade * SAFE_RAM_CEILING));

    if (configMode === 'import') {
      // --- IMPORT MODE (Throughput Sizing) ---
      const { totalNetGhz, totalMemoryGB, totalVMs, avgCpuUtil, avgRamUtil, growthTarget, totalUsedTb } = importData;
      const consumedGhzTotal = totalNetGhz * (avgCpuUtil / 100);
      const consumedRamTotal = totalMemoryGB * (avgRamUtil / 100);
      const growthMult = 1 + (growthTarget / 100);
      
      const targetGhzDemand = consumedGhzTotal * growthMult;
      
      const SAFE_CPU_CEILING = 0.85;
      bladesForCpu = Math.ceil(targetGhzDemand / (netGhzPerBlade * SAFE_CPU_CEILING));
      
      profilerStats = {
        realGhzPerVm: consumedGhzTotal / totalVMs,
        realRamPerVm: consumedRamTotal / totalVMs,
        realStoragePerVm: (totalUsedTb * 1024) / totalVMs,
        targetGhzDemand,
      };

    } else {
      // --- MANUAL MODE (Physical Core Ratio Sizing) ---
      totalVcpuDemand = numUsers * vcpuPerUser;
      const slotsPerBladePhysical = grossCoresPerBlade * oversubscription;
      const requiredActiveNodes = Math.ceil(totalVcpuDemand / slotsPerBladePhysical);
      bladesForCpu = requiredActiveNodes;
    }

    let minBlades = Math.max(bladesForCpu, bladesForRam);
    if (bladesForRam > bladesForCpu) limitingFactor = 'RAM';

    // 4. vSAN Storage Sizing
    if (isVsanEnabled) {
        const totalUsableGB = numUsers * storagePerUser;
        const totalUsableTB = totalUsableGB / 1024;
        const totalRawTB = totalUsableTB * raidPolicy.overhead * (1 + VSAN_SLACK_SPACE);
        
        let sufficientStorage = false;
        let bladesForStorage = minBlades;
        let disksPerNode = 0;

        if (diskConfigMode === 'manual') {
            // --- MANUAL DISK COUNT MODE ---
            disksPerNode = manualDiskCount;
            // Iterate blade count until capacity is met using fixed disk count
            while (!sufficientStorage) {
                const totalClusterCapacity = bladesForStorage * disksPerNode * selectedDisk.capacity;
                if (totalClusterCapacity >= totalRawTB) {
                    sufficientStorage = true;
                } else {
                    bladesForStorage++;
                }
            }
        } else {
            // --- AUTO SIZE MODE ---
            // Iterate disksPerNode (min 2, max 6) then add blades if needed
            while (!sufficientStorage) {
                const totalDisksNeeded = Math.ceil(totalRawTB / selectedDisk.capacity);
                disksPerNode = Math.ceil(totalDisksNeeded / bladesForStorage);
                
                if (disksPerNode > MAX_DRIVES_PER_BLADE) {
                     bladesForStorage++; 
                } else {
                     sufficientStorage = true;
                }
            }
            // Ensure minimum disk count for ESA if possible
            if (disksPerNode < MIN_DRIVES_PER_BLADE_ESA) disksPerNode = MIN_DRIVES_PER_BLADE_ESA;
        }

        if (bladesForStorage > minBlades) {
            limitingFactor = 'STORAGE';
            minBlades = bladesForStorage;
        }

        storageResults = {
            rawNeeded: totalRawTB,
            usableNeeded: totalUsableTB,
            disksPerBlade: disksPerNode, 
            usableCapacity: 0,
            totalDisks: 0,
            totalRawCapacity: 0,
            isOversized: false
        };
    }

    // 5. Finalize Counts
    let activeBlades = minBlades;
    if (isHwLocked) {
        activeBlades = Math.max(1, lockedBladeCount - 1); 
    } else {
        if (!isHwLocked) setLockedBladeCount(activeBlades + 1);
    }

    // 6. Recalculate Metrics
    const totalClusterNetGhz = activeBlades * netGhzPerBlade;
    const totalClusterRam = activeBlades * effectiveRamPerBlade;
    const totalPhysicalCoresActive = activeBlades * grossCoresPerBlade;
    
    if (configMode === 'manual') {
        nPlusOneRatio = totalVcpuDemand / totalPhysicalCoresActive;
        const ESTIMATED_GHZ_PER_VCPU = 0.15; 
        const totalRealGhzDemand = totalVcpuDemand * ESTIMATED_GHZ_PER_VCPU * 3.15; 
        const estimatedActiveGhz = numUsers * 1.5; 
        calculatedCpuLoad = (estimatedActiveGhz / totalClusterNetGhz) * 100;
        calculatedRamUtil = ((numUsers * ramPerUser) / totalClusterRam) * 100;
    } else {
         const { totalNetGhz, avgCpuUtil, growthTarget, totalMemoryGB, avgRamUtil } = importData;
         const consumedGhzTotal = totalNetGhz * (avgCpuUtil / 100);
         const targetGhzDemand = consumedGhzTotal * (1 + (growthTarget / 100));
         calculatedCpuLoad = (targetGhzDemand / totalClusterNetGhz) * 100;
         
         const consumedRamTotal = totalMemoryGB * (avgRamUtil / 100);
         const targetRamDemand = consumedRamTotal * (1 + (growthTarget / 100));
         calculatedRamUtil = (targetRamDemand / totalClusterRam) * 100;
    }

    const totalBlades = isHwLocked ? lockedBladeCount : activeBlades + 1;
    const chassisCount = Math.ceil(totalBlades / CHASSIS_SLOTS);
    const usersPerBladeActual = Math.floor(numUsers / activeBlades); 
    
    const totalSystemCores = totalBlades * grossCoresPerBlade; 
    const totalSystemRamTB = (totalBlades * BLADE_RAM_GB) / 1024;

    if (isVsanEnabled) {
        storageResults.totalDisks = totalBlades * storageResults.disksPerBlade;
        storageResults.totalRawCapacity = storageResults.totalDisks * selectedDisk.capacity;
        
        if (storageResults.totalRawCapacity > (storageResults.rawNeeded * 1.5)) {
            storageResults.isOversized = true;
        }
    }

    setResult({
      activeBlades,
      totalBlades,
      chassisCount,
      cpuLoad: calculatedCpuLoad,
      ramUtil: calculatedRamUtil,
      constraint: limitingFactor,
      netGhzPerBlade, 
      usersPerBlade: usersPerBladeActual,
      cpu,
      profiler: profilerStats,
      totalSystemCores,
      totalSystemRamTB,
      storage: storageResults,
      math: {
        netCores: netCoresPerBlade,
        totalSlots: Math.floor(grossCoresPerBlade * oversubscription), 
        usersPerBladeCpuCap: Math.floor((grossCoresPerBlade * oversubscription) / vcpuPerUser),
        nPlusOneRatio: nPlusOneRatio,
        totalVcpu: totalVcpuDemand
      }
    });

  }, [numUsers, vcpuPerUser, ramPerUser, oversubscription, maxRamTarget, selectedCpuId, isHwLocked, lockedBladeCount, configMode, importData, isVsanEnabled, selectedDisk, raidPolicy, storagePerUser, diskConfigMode, manualDiskCount]);

  // --- Helpers ---
  const ProgressBar = ({ label, value, limit, isCpu, isStorage }) => {
    let color = "bg-emerald-500";
    if (value > 90) color = "bg-red-600";
    else if (value > 75) color = "bg-yellow-500";
    if (isStorage) color = "bg-orange-500/100/100";

    return (
      <div className="mb-4">
        <div className="flex justify-between items-end mb-1">
          <span className="text-sm font-bold text-slate-200">{label}</span>
          <span className={`text-sm font-bold ${value > limit ? 'text-red-600' : 'text-slate-300'}`}>
            {value.toFixed(1)}%
          </span>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-3 relative overflow-hidden">
           {isCpu && <div className="absolute top-0 bottom-0 w-0.5 bg-slate-400 z-10 opacity-50" style={{ left: '75%' }}></div>}
           <div className={`h-3 rounded-full transition-all duration-300 ${color}`} style={{ width: `${Math.min(value, 100)}%` }}></div>
        </div>
      </div>
    );
  };

  const ChassisVisual = () => {
    const chassis = [];
    let bladesAllocated = 0;

    for (let c = 0; c < result.chassisCount; c++) {
      const slots = [];
      for (let s = 0; s < 8; s++) {
        if (bladesAllocated < result.totalBlades) {
            const hasDisk = isVsanEnabled;
            const diskCount = result.storage?.disksPerBlade || 0;
            
            slots.push(
                <div key={s} className="h-full bg-blue-600 rounded-sm border border-blue-700 flex flex-col justify-center items-center relative group">
                <span className="text-[9px] text-white font-bold opacity-60 absolute top-1">M8</span>
                <div className="h-8 w-1 bg-blue-300/30 rounded-full"></div>
                {hasDisk && (
                    <div className="absolute bottom-1 w-full flex justify-center space-x-0.5 px-1">
                        {[...Array(Math.max(0, Math.min(6, diskCount)))].map((_, i) => (
                            <div key={i} className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></div>
                        ))}
                    </div>
                )}
                </div>
            );
            bladesAllocated++;
        } else {
          slots.push(
            <div key={s} className="h-full bg-slate-800 rounded-sm border border-slate-700 flex items-center justify-center">
              <span className="text-[9px] text-slate-300">Empty</span>
            </div>
          );
        }
      }
      chassis.push(
        <div key={c} className="bg-slate-800 p-2 rounded-lg shadow-md w-full">
           <div className="flex justify-between text-xs text-slate-400 mb-2 px-1">
             <span className="font-mono text-slate-300">Chassis #{c + 1}</span>
             <span>X9508</span>
           </div>
           <div className="grid grid-cols-8 gap-1 h-20 bg-slate-900 border border-slate-700 p-1 rounded">
             {slots}
           </div>
        </div>
      );
    }
    return <div className="space-y-3">{chassis}</div>;
  };

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-white p-4">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-6 border-b border-slate-800 pb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className="p-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-400 hover:text-orange-500"
                title="Back to Projects"
              >
                <Icons.ArrowLeft />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-white flex items-center">
                  <span className="mr-2 text-orange-500"><Icons.Server /></span>
                  {project?.name || 'VDI Architect'}
                </h1>
                {project?.description && (
                  <p className="text-slate-400 text-sm mt-1">{project.description}</p>
                )}
              </div>
            </div>

            <TeraSkyLogo />
          </div>

          <div className="flex space-x-3">
            <div className="bg-slate-900 p-1 rounded-lg border border-slate-800 shadow-sm flex items-center">
                <button
                  onClick={() => setConfigMode('manual')}
                  className={`flex items-center px-3 py-1.5 rounded-md text-xs font-bold transition-all ${configMode === 'manual' ? 'bg-orange-500/100/20 text-orange-500' : 'text-slate-400 hover:bg-slate-800'}`}
                >
                  <span className="mr-1"><Icons.Sliders /></span> Manual Config
                </button>
                <button
                  onClick={() => {
                    setConfigMode('import');
                    setIsHwLocked(false);
                  }}
                  className={`flex items-center px-3 py-1.5 rounded-md text-xs font-bold transition-all ${configMode === 'import' ? 'bg-orange-500/100/20 text-orange-500' : 'text-slate-400 hover:bg-slate-800'}`}
                >
                  <span className="mr-1"><Icons.Import /></span> Import Workload
                </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* LEFT: Configuration */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* CPU Selection */}
            <div className="bg-slate-900 p-4 rounded-xl shadow-sm border border-slate-800 h-64 flex flex-col">
              <h2 className="font-bold text-white mb-3 flex items-center text-sm">
                <span className="mr-2 text-orange-500"><Icons.Cpu /></span> Target Processor
              </h2>
              <div className="space-y-2 overflow-y-auto flex-1 pr-1 custom-scrollbar">
                {PROCESSORS.map((cpu) => (
                  <label 
                    key={cpu.id}
                    className={`flex items-center justify-between p-2 rounded border cursor-pointer transition-all ${
                      selectedCpuId === cpu.id 
                      ? 'border-orange-500 bg-orange-500/100/10 ring-1 ring-orange-500' 
                      : 'border-slate-800 hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center">
                      <input 
                        type="radio" 
                        name="cpu" 
                        value={cpu.id} 
                        checked={selectedCpuId === cpu.id}
                        onChange={() => setSelectedCpuId(cpu.id)}
                        className="mr-2 accent-orange-500"
                      />
                      <div>
                        <div className="font-bold text-xs text-white">{cpu.name}</div>
                        <div className="text-[10px] text-slate-400">{cpu.desc}</div>
                      </div>
                    </div>
                    <div className="text-right text-xs">
                      <div className="font-mono font-bold text-slate-200">{cpu.baseFreq} GHz</div>
                      <div className="text-slate-400">{cpu.cores} Cores</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Inputs Panel */}
            <div className="bg-slate-900 p-4 rounded-xl shadow-sm border border-slate-800">
               {configMode === 'manual' ? (
                 <>
                    <h2 className="font-bold text-white mb-4 text-sm flex items-center">
                      <span className="mr-2 text-slate-400"><Icons.Sliders /></span> Parameters
                    </h2>
                    <div className="space-y-5">
                        <div>
                          <div className="flex justify-between text-xs font-bold text-slate-400 uppercase mb-1">
                            <span>Total Users</span>
                            <span className="text-orange-500 text-sm">{numUsers}</span>
                          </div>
                          <input type="range" min="50" max="5000" step="50" value={numUsers} onChange={(e) => setNumUsers(Number(e.target.value))} className="w-full accent-orange-500" />
                        </div>
                        <div>
                          <div className="flex justify-between text-xs font-bold text-slate-400 uppercase mb-1">
                            <span>vCPU Per User</span>
                            <span className="text-orange-500 text-sm">{vcpuPerUser} vCPU</span>
                          </div>
                          <input type="range" min="2" max="16" step="1" value={vcpuPerUser} onChange={(e) => setVcpuPerUser(Number(e.target.value))} className="w-full accent-orange-500" />
                        </div>
                        <div>
                          <div className="flex justify-between text-xs font-bold text-slate-400 uppercase mb-1">
                            <span>RAM Per User</span>
                            <span className="text-orange-500 text-sm">{ramPerUser} GB</span>
                          </div>
                          <input type="range" min="4" max="64" step="4" value={ramPerUser} onChange={(e) => setRamPerUser(Number(e.target.value))} className="w-full accent-orange-500" />
                        </div>

                        <div>
                            <div className="flex justify-between text-xs font-bold text-slate-400 uppercase mb-1">
                            <span>CPU Ratio</span>
                            <span className="text-orange-500 text-sm">{oversubscription}:1</span>
                            </div>
                            <input type="range" min="3" max="10" step="0.5" value={oversubscription} onChange={(e) => setOversubscription(Number(e.target.value))} className="w-full accent-orange-500" />
                        </div>
                        
                        {isVsanEnabled && (
                            <div className="p-3 bg-orange-500/100/10 border border-orange-500/20 rounded-lg">
                                <div className="flex justify-between text-xs font-bold text-orange-500 uppercase mb-1">
                                    <span>Storage Per User</span>
                                    <span className="text-sm">{storagePerUser} GB</span>
                                </div>
                                <input type="range" min="30" max="500" step="10" value={storagePerUser} onChange={(e) => setStoragePerUser(Number(e.target.value))} className="w-full accent-orange-500" />
                            </div>
                        )}
                    </div>
                 </>
               ) : (
                 <>
                    <h2 className="font-bold text-white mb-4 text-sm flex items-center">
                      <span className="mr-2 text-orange-500"><Icons.Import /></span> Workload Details
                    </h2>
                    <div className="space-y-4">
                      
                      {/* Cluster Specs */}
                      <div className="bg-slate-900 p-2 rounded border border-slate-800">
                        <div className="text-[10px] font-bold text-slate-400 uppercase mb-2 border-b pb-1">Current Cluster Specs</div>
                        <div className="grid grid-cols-2 gap-3 mb-2">
                           <div>
                              <label className="text-[10px] text-slate-400 block mb-1">Total Net GHz</label>
                              <input type="number" value={importData.totalNetGhz} onChange={(e) => setImportData({...importData, totalNetGhz: Number(e.target.value)})} className="w-full text-xs p-1 border rounded" />
                           </div>
                           <div>
                              <label className="text-[10px] text-slate-400 block mb-1">Total Memory (GB)</label>
                              <input type="number" value={importData.totalMemoryGB} onChange={(e) => setImportData({...importData, totalMemoryGB: Number(e.target.value)})} className="w-full text-xs p-1 border rounded" />
                           </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                           <div>
                              <label className="text-[10px] text-slate-400 block mb-1">Total Cores</label>
                              <input type="number" value={importData.totalCores} onChange={(e) => setImportData({...importData, totalCores: Number(e.target.value)})} className="w-full text-xs p-1 border rounded" />
                           </div>
                           <div>
                              <label className="text-[10px] text-slate-400 block mb-1">Total Servers</label>
                              <input type="number" value={importData.totalServers} onChange={(e) => setImportData({...importData, totalServers: Number(e.target.value)})} className="w-full text-xs p-1 border rounded" />
                           </div>
                        </div>
                      </div>

                      {/* VM Specs */}
                      <div className="bg-slate-900 p-2 rounded border border-slate-800">
                        <div className="text-[10px] font-bold text-slate-400 uppercase mb-2 border-b pb-1">Current VM Allocation</div>
                        <div className="grid grid-cols-2 gap-3">
                           <div>
                              <label className="text-[10px] text-slate-400 block mb-1">Total VMs (Users)</label>
                              <input type="number" value={importData.totalVMs} onChange={(e) => setImportData({...importData, totalVMs: Number(e.target.value)})} className="w-full text-xs p-1 border rounded" />
                           </div>
                           <div>
                              <label className="text-[10px] text-slate-400 block mb-1">Total vCPUs</label>
                              <input type="number" value={importData.totalvCPUs} onChange={(e) => setImportData({...importData, totalvCPUs: Number(e.target.value)})} className="w-full text-xs p-1 border rounded" />
                           </div>
                        </div>
                      </div>

                      {/* Storage Profiler Inputs */}
                      {isVsanEnabled && (
                        <div className="bg-orange-500/10 p-2 rounded border border-orange-500/30">
                             <div className="text-[10px] font-bold text-orange-400 uppercase mb-2 border-b border-orange-500/30 pb-1">Storage Profiler</div>
                             <div className="grid grid-cols-3 gap-2">
                                <div>
                                    <label className="text-[10px] text-slate-400 block mb-1">Total IOPS</label>
                                    <input type="number" value={importData.totalIops} onChange={(e) => setImportData({...importData, totalIops: Number(e.target.value)})} className="w-full text-xs p-1 border rounded" />
                                </div>
                                <div>
                                    <label className="text-[10px] text-slate-400 block mb-1">Raw TB</label>
                                    <input type="number" value={importData.totalRawTb} onChange={(e) => setImportData({...importData, totalRawTb: Number(e.target.value)})} className="w-full text-xs p-1 border rounded" />
                                </div>
                                <div>
                                    <label className="text-[10px] text-slate-400 block mb-1">Used TB</label>
                                    <input type="number" value={importData.totalUsedTb} onChange={(e) => setImportData({...importData, totalUsedTb: Number(e.target.value)})} className="w-full text-xs p-1 border rounded" />
                                </div>
                             </div>
                        </div>
                      )}

                      {/* Utilization */}
                      <div className="bg-orange-500/100/10 p-2 rounded border border-orange-500/20">
                        <div className="text-[10px] font-bold text-orange-400 uppercase mb-2 border-b border-orange-500/30 pb-1">Observed Utilization</div>
                        <div className="mb-2">
                           <div className="flex justify-between text-xs text-slate-300 mb-1">
                             <span>CPU Util: <strong>{importData.avgCpuUtil}%</strong></span>
                           </div>
                           <input type="range" value={importData.avgCpuUtil} onChange={(e) => setImportData({...importData, avgCpuUtil: Number(e.target.value)})} className="w-full h-1.5 bg-orange-500/100/20 rounded-lg appearance-none cursor-pointer accent-orange-500" />
                        </div>
                        <div>
                           <div className="flex justify-between text-xs text-slate-300 mb-1">
                             <span>RAM Util: <strong>{importData.avgRamUtil}%</strong></span>
                           </div>
                           <input type="range" value={importData.avgRamUtil} onChange={(e) => setImportData({...importData, avgRamUtil: Number(e.target.value)})} className="w-full h-1.5 bg-orange-500/100/20 rounded-lg appearance-none cursor-pointer accent-orange-500" />
                        </div>
                      </div>

                      {/* Growth */}
                      <div>
                          <div className="flex justify-between text-xs font-bold text-emerald-600 uppercase mb-1">
                            <span>User Growth Target</span>
                            <span className="text-sm">+{importData.growthTarget}%</span>
                          </div>
                          <input type="range" min="0" max="100" step="5" value={importData.growthTarget} onChange={(e) => setImportData({...importData, growthTarget: Number(e.target.value)})} className="w-full accent-emerald-500" />
                      </div>

                    </div>
                 </>
               )}
            </div>
            
            {/* vSAN Config Panel */}
            <div className="bg-slate-900 p-4 rounded-xl shadow-sm border border-slate-800">
                 <div className="flex items-center justify-between mb-3">
                    <h2 className="font-bold text-white text-sm flex items-center">
                        <span className="mr-2 text-orange-500"><Icons.Database /></span> vSAN ESA (Express Storage Architecture)
                    </h2>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" checked={isVsanEnabled} onChange={() => setIsVsanEnabled(!isVsanEnabled)} className="sr-only peer" />
                        <div className="w-9 h-5 bg-slate-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-orange-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-slate-900 after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-orange-500/100"></div>
                    </label>
                 </div>
                 
                 {isVsanEnabled ? (
                    <div className="space-y-3 animate-fadeIn">
                        
                        {/* Disk Config Mode Toggle */}
                        <div className="flex bg-slate-800 p-1 rounded-lg mb-4 w-full">
                            <button
                                onClick={() => setDiskConfigMode('auto')}
                                className={`flex-1 py-1 text-xs font-bold rounded-md transition-all ${diskConfigMode === 'auto' ? 'bg-slate-900 text-orange-500 shadow-sm' : 'text-slate-400'}`}
                            >
                                Auto-Size
                            </button>
                            <button
                                onClick={() => setDiskConfigMode('manual')}
                                className={`flex-1 py-1 text-xs font-bold rounded-md transition-all ${diskConfigMode === 'manual' ? 'bg-slate-900 text-orange-500 shadow-sm' : 'text-slate-400'}`}
                            >
                                Manual Count
                            </button>
                        </div>

                        <div>
                            <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Disk Model (NVMe)</label>
                            <select 
                                value={selectedDisk.id} 
                                onChange={(e) => setSelectedDisk(DISK_OPTIONS.find(d => d.id === e.target.value))}
                                className="w-full text-xs p-2 border rounded bg-slate-900"
                            >
                                {DISK_OPTIONS.map(d => (
                                    <option key={d.id} value={d.id}>{d.name}</option>
                                ))}
                            </select>
                        </div>

                        {diskConfigMode === 'manual' && (
                            <div>
                                <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">
                                    Disks Per Node: <span className="text-orange-500">{manualDiskCount}</span>
                                </label>
                                <input 
                                    type="range" 
                                    min="2" 
                                    max="6" 
                                    step="1" 
                                    value={manualDiskCount} 
                                    onChange={(e) => setManualDiskCount(Number(e.target.value))} 
                                    className="w-full accent-orange-500"
                                />
                                <div className="text-[10px] text-slate-400 mt-1">
                                    Manual overrides may increase node count if storage is insufficient.
                                </div>
                            </div>
                        )}

                        <div>
                            <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Redundancy Policy</label>
                            <select 
                                value={raidPolicy.id} 
                                onChange={(e) => setRaidPolicy(RAID_OPTIONS.find(r => r.id === e.target.value))}
                                className="w-full text-xs p-2 border rounded bg-slate-900"
                            >
                                {RAID_OPTIONS.map(r => (
                                    <option key={r.id} value={r.id}>{r.name} - {r.desc}</option>
                                ))}
                            </select>
                            <div className="text-[10px] text-slate-400 mt-1">
                                Storage Overhead: <span className="font-bold text-orange-500">{(raidPolicy.overhead).toFixed(2)}x</span>
                            </div>
                        </div>
                    </div>
                 ) : (
                    <div className="text-xs text-slate-400 italic">Enable to configure vSAN ESA Storage.</div>
                 )}
            </div>

          </div>

          {/* CENTER: Results & Visualization */}
          <div className="lg:col-span-5 space-y-6">
             {/* Big Numbers */}
             <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-800 p-4 rounded-xl text-white shadow relative overflow-hidden">
                   <div className="text-slate-400 text-xs mb-1 uppercase tracking-wider">Total Blades Needed</div>
                   <div className="text-4xl font-bold">{result.totalBlades}</div>
                   <div className="text-xs text-emerald-400 mt-1">{result.activeBlades} Active + 1 Standby</div>
                </div>
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 shadow-sm">
                   <div className="text-slate-400 text-xs mb-1 uppercase tracking-wider">Total Chassis</div>
                   <div className="text-4xl font-bold text-orange-500">{result.chassisCount}</div>
                   <div className="text-xs text-slate-400 mt-1">UCS X9508 (7RU)</div>
                </div>
             </div>

             {/* Performance Panel */}
             <div className="bg-slate-900 p-5 rounded-xl shadow-sm border border-slate-800">
                <div className="flex items-center mb-6 border-b pb-2">
                   <span className="text-orange-500 mr-2"><Icons.Activity /></span>
                   <h3 className="font-bold text-white text-sm">Projected Cluster Health</h3>
                </div>

                <ProgressBar 
                  label="Memory Allocation" 
                  value={result.ramUtil} 
                  limit={90} 
                />
                
                <ProgressBar 
                  label="Active Compute Demand (Avg)" 
                  value={result.cpuLoad} 
                  limit={85} 
                  isCpu 
                />

                {isVsanEnabled && (
                    <div className="mt-4 pt-4 border-t border-slate-700">
                         <div className="flex justify-between items-end mb-2">
                             <div className="text-sm font-bold text-slate-200">vSAN Capacity Usage</div>
                             <div className="text-xs text-slate-400">{(result.storage.usableNeeded || 0).toFixed(1)} TB Usable</div>
                         </div>
                         <div className="w-full bg-slate-700 rounded-full h-3">
                              <div className="h-3 rounded-full bg-orange-500/100/100" style={{ width: result.storage.isOversized ? '20%' : '70%' }}></div> 
                         </div>
                         <div className="flex justify-between mt-1 text-[10px] text-slate-400">
                            <span>Policy: {raidPolicy.name}</span>
                            <span>Slack Space: 25%</span>
                         </div>
                    </div>
                )}

                <div className="mt-4 text-xs text-slate-400 bg-slate-900 p-3 rounded border border-slate-700 flex justify-between">
                   <span><strong>{result.cpu.name}</strong> ({result.cpu.cores}C / {result.cpu.baseFreq}GHz)</span>
                   <span className="font-mono font-bold text-orange-500">{result.netGhzPerBlade.toFixed(0)} Net GHz</span>
                </div>

                {/* Constraint Notification */}
                <div className="mt-4 p-3 bg-orange-500/100/10 border border-orange-500/20 rounded text-xs text-orange-400 flex items-start">
                     <span className="mr-2 mt-0.5"><Icons.AlertTriangle /></span>
                     <div>
                        <strong>Limiting Factor: {result.constraint}</strong>
                        <div className="text-orange-500/80">
                            {result.constraint === 'STORAGE' 
                                ? "Node count increased to satisfy vSAN capacity or disk-per-node limits." 
                                : "Hardware sized to keep Load safe at full growth."}
                        </div>
                     </div>
                </div>
             </div>

             {/* Rack View */}
             <div className="bg-slate-900 p-5 rounded-xl shadow-sm border border-slate-800">
                <h3 className="font-bold text-white text-sm mb-4">Rack Visualization</h3>
                <ChassisVisual />
             </div>
          </div>

          {/* RIGHT: Math Inspector & BOM */}
          <div className="lg:col-span-3 space-y-6">
             {/* Math Inspector */}
             <div className="bg-slate-900 p-5 rounded-xl shadow-sm text-white border border-slate-700">
                <h3 className="font-bold text-emerald-400 mb-3 text-xs uppercase tracking-wide">
                  {configMode === 'manual' ? 'Math Inspector' : 'Workload Analysis'}
                </h3>
                
                {configMode === 'manual' ? (
                  <div className="space-y-3 text-xs font-mono text-slate-300">
                      <div className="flex justify-between">
                          <span className="text-slate-400">Total vCPU Demand:</span>
                          <span>{result.math.totalVcpu}</span>
                      </div>
                      <div className="flex justify-between text-slate-400">
                          <span>Gross Physical Cores:</span>
                          <span>{(result.activeBlades * (result.cpu.cores || 0) * 2).toLocaleString()} ({result.activeBlades} nodes)</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-600 pb-2 mb-2">
                          <span>Resulting N+1 Ratio:</span>
                          <span className="text-white font-bold">{result.math.nPlusOneRatio.toFixed(2)} : 1</span>
                      </div>
                      <div className="flex justify-between text-emerald-300">
                          <span>Target Density:</span>
                          <span className="font-bold">{result.usersPerBlade} Users/Node</span>
                      </div>
                      {isVsanEnabled && (
                           <div className="pt-2 border-t border-slate-700 mt-2 text-indigo-300">
                                <div className="text-[10px] uppercase mb-1 flex items-center">
                                    Storage Constraint Check 
                                    {result.storage.isOversized && <span className="ml-1 text-yellow-400"><Icons.Info /></span>}
                                </div>
                                <div className="flex justify-between text-slate-400">
                                    <span>Usable Need:</span>
                                    <span>{(result.storage.usableNeeded || 0).toFixed(1)} TB</span>
                                </div>
                                <div className="flex justify-between font-bold text-white border-b border-slate-600 pb-1 mb-1">
                                    <span>Required Raw:</span>
                                    <span>{(result.storage.rawNeeded || 0).toFixed(1)} TB</span>
                                </div>
                                
                                {result.storage.isOversized && (
                                    <div className="bg-yellow-900/40 p-2 rounded text-[10px] text-yellow-200 mt-1">
                                        <strong>Architecture Minimum:</strong> <br/>
                                        Capacity driven by ESA requirement of {result.storage.disksPerBlade} disks per host.
                                    </div>
                                )}
                           </div>
                      )}
                  </div>
                ) : (
                  <div className="space-y-3 text-xs font-mono text-slate-300">
                    <div className="pb-2 border-b border-slate-700 mb-2">
                      <div className="text-slate-400 uppercase text-[10px] mb-1">Reverse Calculation</div>
                      <div className="flex justify-between text-slate-400">
                        <span>Used GHz:</span>
                        <span>{(importData.totalNetGhz * (importData.avgCpuUtil/100)).toFixed(0)} GHz</span>
                      </div>
                      <div className="flex justify-between text-slate-400">
                        <span>Used RAM:</span>
                        <span>{(importData.totalMemoryGB * (importData.avgRamUtil/100)).toFixed(0)} GB</span>
                      </div>
                      <div className="flex justify-between text-white font-bold mt-1">
                        <span>Real Profile:</span>
                        <span>{(result.profiler?.realGhzPerVm || 0).toFixed(2)}GHz / {(result.profiler?.realRamPerVm || 0).toFixed(1)}GB</span>
                      </div>
                    </div>
                    
                    {isVsanEnabled && (
                        <div className="pb-2 border-b border-slate-700 mb-2 text-indigo-300">
                             <div className="text-[10px] uppercase mb-1 text-orange-400">Storage Profile</div>
                             <div className="flex justify-between">
                                <span>Avg Storage:</span>
                                <span>{(result.profiler?.realStoragePerVm || 0).toFixed(0)} GB/VM</span>
                             </div>
                             <div className="flex justify-between">
                                <span>Total IOPS:</span>
                                <span>{importData.totalIops.toLocaleString()}</span>
                             </div>
                        </div>
                    )}
                    
                    <div>
                       <div className="text-slate-400 uppercase text-[10px] mb-1">New Requirement</div>
                       <div className="flex justify-between">
                        <span>Target Users:</span>
                        <span className="text-emerald-400 font-bold">{numUsers}</span>
                      </div>
                    </div>
                  </div>
                )}
             </div>

             {/* BOM */}
             <div className="bg-slate-900 p-5 rounded-xl shadow-sm border border-slate-800">
                <h3 className="font-bold text-white mb-4 flex items-center text-sm">
                   <span className="mr-2 text-orange-500"><Icons.Box /></span> Bill of Materials
                </h3>
                
                <div className="space-y-6">
                  {/* Totals Section */}
                  <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase mb-2 tracking-wider">Cluster Totals</div>
                    <div className="grid grid-cols-2 gap-3">
                       <div className="bg-slate-900 p-2 rounded border border-slate-700">
                          <div className="text-[10px] text-slate-400 mb-1">Total Cores</div>
                          <div className="text-lg font-bold text-white">{result.totalSystemCores}</div>
                       </div>
                       <div className="bg-slate-900 p-2 rounded border border-slate-700">
                          <div className="text-[10px] text-slate-400 mb-1">Total RAM</div>
                          <div className="text-lg font-bold text-white">{result.totalSystemRamTB.toFixed(1)} <span className="text-xs font-normal">TB</span></div>
                       </div>
                    </div>
                    {isVsanEnabled && (
                        <div className="mt-2 bg-orange-500/100/10 p-2 rounded border border-orange-500/20">
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="text-[10px] text-orange-500 mb-1 uppercase font-bold">Raw Storage Provided</div>
                                    <div className="text-lg font-bold text-orange-500">{(result.storage.totalRawCapacity || 0).toFixed(1)} <span className="text-xs font-normal">TB</span></div>
                                </div>
                                <div className="text-right">
                                    <div className="text-[10px] text-orange-400">{result.storage.totalDisks} Drives Total</div>
                                    <div className="text-[9px] text-indigo-300">({result.storage.disksPerBlade} per node)</div>
                                </div>
                            </div>
                        </div>
                    )}
                  </div>

                  {/* Node Spec Section */}
                  <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase mb-2 tracking-wider">Node Configuration</div>
                    <div className="bg-slate-800 text-white p-3 rounded-lg text-xs space-y-1">
                       <div className="font-bold text-indigo-300 border-b border-slate-600 pb-1 mb-1">UCS X215c M8 Compute Node</div>
                       <div className="flex justify-between">
                          <span className="text-slate-400">CPU:</span>
                          <span>2x {result.cpu.name}</span>
                       </div>
                       <div className="flex justify-between">
                          <span className="text-slate-400">RAM:</span>
                          <span>1,536 GB (1.5 TB)</span>
                       </div>
                       {isVsanEnabled && (
                           <div className="flex justify-between text-emerald-300">
                               <span>Disk:</span>
                               <span>{result.storage.disksPerBlade}x {selectedDisk.name}</span>
                           </div>
                       )}
                    </div>
                  </div>

                  {/* Line Items */}
                  <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase mb-2 tracking-wider">Line Items</div>
                    <ul className="space-y-2 text-xs">
                      <li className="flex justify-between border-b border-slate-700 pb-1">
                          <span className="text-slate-300">UCS X9508 Chassis</span>
                          <span className="font-bold">{result.chassisCount}</span>
                      </li>
                      <li className="flex justify-between border-b border-slate-700 pb-1">
                          <span className="text-slate-300">UCS X215c M8 Node</span>
                          <span className="font-bold">{result.totalBlades}</span>
                      </li>
                      {isVsanEnabled && (
                           <li className="flex justify-between border-b border-slate-700 pb-1 text-orange-500 bg-orange-500/100/10 px-1 rounded">
                                <span>{selectedDisk.name}</span>
                                <span className="font-bold">{result.storage.totalDisks}</span>
                           </li>
                      )}
                      <li className="flex justify-between border-b border-slate-700 pb-1">
                          <span className="text-slate-300">UCS 9108 IFM</span>
                          <span className="font-bold">{result.chassisCount * 2}</span>
                      </li>
                      <li className="flex justify-between">
                          <span className="text-slate-300">2800W PSU</span>
                          <span className="font-bold">{result.chassisCount * 6}</span>
                      </li>
                    </ul>
                  </div>
                </div>

             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default VdiArchitectCalculator;

