import { useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { MachineMonitor } from './components/MachineMonitor';
import { QCManagement } from './components/QCManagement';
import { UserManagement } from './components/UserManagement';
import { Login } from './components/Login';
import { PageBackground } from './components/PageBackground';

export type View = 'dashboard' | 'monitor' | 'qc' | 'users';

function AppContent() {
  const { currentUser } = useAuth();
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [selectedMachine, setSelectedMachine] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Show login if not authenticated
  if (!currentUser) {
    return <Login />;
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-[#faf8f5] via-[#fff8f0] to-[#fef3e2] dark:from-[#121212] dark:via-[#1a1a1a] dark:to-[#1e1e1e] transition-colors myc-pattern relative overflow-hidden">
      {/* Background decorations */}
      <PageBackground />

      <Sidebar
        currentView={currentView}
        onViewChange={(view) => {
          setCurrentView(view);
          setSidebarOpen(false);
        }}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="flex-1 overflow-auto relative z-10">
        {currentView === 'dashboard' && (
          <Dashboard
            onMachineSelect={(machineId) => {
              setSelectedMachine(machineId);
              setCurrentView('monitor');
            }}
            onMenuClick={() => setSidebarOpen(true)}
          />
        )}

        {currentView === 'monitor' && (
          <MachineMonitor
            machineId={selectedMachine}
            onBack={() => {
              setSelectedMachine(null);
              setCurrentView('dashboard');
            }}
            onMenuClick={() => setSidebarOpen(true)}
            onMachineSelect={(machineId) => setSelectedMachine(machineId)}
          />
        )}

        {currentView === 'qc' && (
          <QCManagement onMenuClick={() => setSidebarOpen(true)} />
        )}

        {currentView === 'users' && (
          <UserManagement onMenuClick={() => setSidebarOpen(true)} />
        )}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}
