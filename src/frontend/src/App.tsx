import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Placeholder components - to be implemented
const Dashboard = () => <div>Dashboard</div>;
const FileManager = () => <div>File Manager</div>;
const Projects = () => <div>Projects</div>;
const QRCodes = () => <div>QR Codes</div>;
const Settings = () => <div>Settings</div>;
const Login = () => <div>Login</div>;

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
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/files" element={<FileManager />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/qrcodes" element={<QRCodes />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
