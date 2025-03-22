import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

// Placeholder components - to be implemented
// These would be properly imported from their respective files in a complete implementation
const Dashboard = () => <div>Dashboard</div>;
const FileManager = () => <div>File Manager</div>;
const Projects = () => <div>Projects</div>;
const QRCodes = () => <div>QR Codes</div>;
const Settings = () => <div>Settings</div>;
const Login = () => <div>Login</div>;
const ScannerView = () => <div>QR Scanner</div>;
const FileViewer = () => <div>File Viewer</div>;
const PartDetails = () => <div>Part Details</div>;
const CabinetDetails = () => <div>Cabinet Details</div>;
const ProjectDetails = () => <div>Project Details</div>;

// Theme configuration
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    // Larger text for touch screens in shop environment
    button: {
      fontSize: '1rem',
    },
  },
  components: {
    // Make buttons larger for easier touch
    MuiButton: {
      styleOverrides: {
        root: {
          padding: '10px 20px',
        },
      },
    },
    // Increase touch targets
    MuiIconButton: {
      styleOverrides: {
        root: {
          padding: '12px',
        },
      },
    },
  },
});

function App() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isOfflineAlertOpen, setIsOfflineAlertOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [serviceWorkerRegistered, setServiceWorkerRegistered] = useState(false);

  // Handle online/offline status
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      // Trigger sync when coming back online
      if ('serviceWorker' in navigator && 'SyncManager' in window) {
        navigator.serviceWorker.ready.then((registration) => {
          registration.sync.register('cabinetflow-sync');
        });
      }
    };

    const handleOffline = () => {
      setIsOnline(false);
      setIsOfflineAlertOpen(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Register service worker for PWA
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
          .then((registration) => {
            console.log('Service Worker registered with scope:', registration.scope);
            setServiceWorkerRegistered(true);
          })
          .catch((error) => {
            console.error('Service Worker registration failed:', error);
          })
          .finally(() => {
            setIsLoading(false);
          });
      });
    } else {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          {/* Authentication */}
          <Route path="/login" element={<Login />} />
          
          {/* Main dashboard */}
          <Route path="/" element={<Dashboard />} />
          
          {/* File management */}
          <Route path="/files" element={<FileManager />} />
          <Route path="/files/:fileId" element={<FileViewer />} />
          
          {/* Project management */}
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:projectId" element={<ProjectDetails />} />
          <Route path="/projects/:projectId/cabinets/:cabinetId" element={<CabinetDetails />} />
          <Route path="/projects/:projectId/cabinets/:cabinetId/parts/:partId" element={<PartDetails />} />
          
          {/* QR Codes */}
          <Route path="/qrcodes" element={<QRCodes />} />
          <Route path="/scan" element={<ScannerView />} />
          
          {/* Settings */}
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Router>
      
      {/* Offline notification */}
      <Snackbar 
        open={isOfflineAlertOpen} 
        autoHideDuration={6000} 
        onClose={() => setIsOfflineAlertOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setIsOfflineAlertOpen(false)} 
          severity="warning" 
          sx={{ width: '100%' }}
        >
          You are offline. Limited functionality is available.
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}

export default App;