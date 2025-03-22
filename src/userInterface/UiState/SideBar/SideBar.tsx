// src/components/SideBar.tsx
import React, { useState, useEffect } from 'react';
import {
  SideBarStyle,
  ToggleButton,
  StatusItem,
  StatusIcon,
  StatusLabel,
  StatusValue,
} from './SideBarStyles';

interface StatusItemType {
  icon: string;
  label: string;
  status: string;
}

interface SidebarEndpoint {
  icon: string;
  label: string;
  endpoint: string;
}

export const SideBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [statusItems, setStatusItems] = useState<StatusItemType[]>([]);

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  // Helper function to convert API response to a string for the sidebar.
  const extractStatus = (label: string, data: any): string => {
    switch (label) {
      case 'Charging':
        return data.status || 'N/A';
      case 'Progress':
        // For example, using trip_distance
        return data.trip_distance || 'N/A';
      case 'Hazard Control':
        return data.active ? 'Hazard Present' : 'No Hazard';
      case 'Tire Pressure':
        return data.status || 'N/A';
      case 'Penalty':
        return data.total_outstanding > 0
          ? `Outstanding: ${data.total_outstanding}`
          : 'None';
      case 'Needs Service?':
        return data.status || 'N/A';
      case 'Inform Service Centers':
        return data.status || 'N/A';
      case 'Parking API':
        return data.status || 'N/A';
      case 'Map API':
        // No direct status field so we simply say Updated
        return 'Updated';
      case 'Login/Signup':
        return data.user?.status || 'Guest';
      case 'Payment API':
        const pending = data.transactions?.find(
          (t: any) => t.status === 'Pending',
        );
        return pending ? 'Pending Payment' : 'Completed';
      default:
        return 'N/A';
    }
  };

  useEffect(() => {
    // Define the sidebar endpoints mapping.
    const sidebarEndpoints: SidebarEndpoint[] = [
      { icon: 'fas fa-bolt', label: 'Charging', endpoint: '/api/charging' },
      {
        icon: 'fas fa-chart-line',
        label: 'Progress',
        endpoint: '/api/progress',
      },
      {
        icon: 'fas fa-exclamation-triangle',
        label: 'Hazard Control',
        endpoint: '/api/hazard_control',
      },
      {
        icon: 'fas fa-tire',
        label: 'Tire Pressure',
        endpoint: '/api/tire_pressure',
      },
      { icon: 'fas fa-gavel', label: 'Penalty', endpoint: '/api/penalty' },
      {
        icon: 'fas fa-wrench',
        label: 'Needs Service?',
        endpoint: '/api/needs_service',
      },
      {
        icon: 'fas fa-phone',
        label: 'Inform Service Centers',
        endpoint: '/api/inform_service_centers',
      },
      {
        icon: 'fas fa-parking',
        label: 'Parking API',
        endpoint: '/api/parking',
      },
      { icon: 'fas fa-map', label: 'Map API', endpoint: '/api/map' },
      { icon: 'fas fa-user', label: 'Login/Signup', endpoint: '/api/auth' },
      {
        icon: 'fas fa-credit-card',
        label: 'Payment API',
        endpoint: '/api/payment',
      },
    ];

    // Fetch all endpoints concurrently.
    Promise.all(
      sidebarEndpoints.map((item) =>
        fetch(`http://localhost:3000${item.endpoint}`)
          .then((res) => res.json())
          .then((data) => ({
            icon: item.icon,
            label: item.label,
            status: extractStatus(item.label, data),
          }))
          .catch((err) => {
            console.error(`Error fetching ${item.label}:`, err);
            return { icon: item.icon, label: item.label, status: 'Error' };
          }),
      ),
    ).then((results) => setStatusItems(results));
  }, []);

  return (
    <SideBarStyle isOpen={isOpen}>
      <ToggleButton isOpen={isOpen} onClick={toggleSidebar}>
        {isOpen ? '⟩' : '⟨'}
      </ToggleButton>
      {statusItems.map((item, index) => (
        <StatusItem key={index} isOpen={isOpen}>
          <StatusIcon className={item.icon} />
          <StatusLabel isOpen={isOpen}>{item.label}</StatusLabel>
          {isOpen && <StatusValue>{item.status}</StatusValue>}
        </StatusItem>
      ))}
    </SideBarStyle>
  );
};
