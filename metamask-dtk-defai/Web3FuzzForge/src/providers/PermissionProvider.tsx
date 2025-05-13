'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { GrantPermissionsReturnType } from '@metamask/delegation-toolkit/experimental';
import { Address } from 'viem';

export type Permission = NonNullable<GrantPermissionsReturnType>[number];

interface PermissionContextType {
  permission: Permission | null;
  smartAccount: Address | null;
  savePermission: (permission: Permission) => void;
  fetchPermission: () => Permission | null;
  removePermission: () => void;
}

export const PermissionContext = createContext<PermissionContextType>({
  permission: null,
  smartAccount: null,
  savePermission: () => {},
  fetchPermission: () => null,
  removePermission: () => {},
});

const PERMISSION_STORAGE_KEY = 'gator-permission';

export const PermissionProvider = ({ children }: { children: React.ReactNode }) => {
  const [permission, setPermission] = useState<Permission | null>(null);
  const [smartAccount, setSmartAccount] = useState<Address | null>(null);

  // Saves the permission to session storage. This is for testing purposes. Use a database solution for production.
  const savePermission = useCallback((permissionToSave: Permission) => {
    sessionStorage.setItem(PERMISSION_STORAGE_KEY, JSON.stringify(permissionToSave));
    setPermission(permissionToSave);
    setSmartAccount(permissionToSave.address as Address);
  }, []);

  // Fetches the permission from session storage
  const fetchPermission = useCallback(() => {
    const storedPermission = sessionStorage.getItem(PERMISSION_STORAGE_KEY);
    if (storedPermission) {
      return JSON.parse(storedPermission) as Permission;
    }
    return null;
  }, []);

  // Removes the permission from session storage. This does not revoke the permission from the user, it just removes the permission from the local storage.
  const removePermission = useCallback(() => {
    sessionStorage.removeItem(PERMISSION_STORAGE_KEY);
    setPermission(null);
    setSmartAccount(null);
  }, []);

  // Fetch permission from session storage when component mounts
  useEffect(() => {
    const storedPermission: Permission | null = fetchPermission();
    if (storedPermission) {
      setPermission(storedPermission);
      setSmartAccount(storedPermission.address as Address);
    }
  }, [fetchPermission]);

  return (
    <PermissionContext.Provider
      value={{
        permission,
        smartAccount,
        savePermission,
        fetchPermission,
        removePermission,
      }}
    >
      {children}
    </PermissionContext.Provider>
  );
};

export const usePermissions = () => {
  return useContext(PermissionContext);
};
