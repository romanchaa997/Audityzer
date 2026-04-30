
import NetInfo from '@react-native-community/netinfo';
import SQLite from 'react-native-sqlite-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { store } from '@/store';
import { setOnlineStatus, addOfflineAction, removeOfflineAction, setSyncStatus } from '@/store/slices/offlineSlice';
import { OfflineAction, SyncStatus } from '@/types';
import apiClient from '@/services/api/apiClient';

// Enable promise-based SQLite
SQLite.enablePromise(true);

interface OfflineDatabase {
  projects: any[];
  vulnerabilities: any[];
  scanResults: any[];
  reports: any[];
  userProfiles: any[];
  organizations: any[];
}

class OfflineService {
  private db: SQLite.SQLiteDatabase | null = null;
  private isInitialized = false;
  private syncInProgress = false;
  private readonly DB_NAME = 'audityzer_offline.db';
  private readonly DB_VERSION = '1.0';
  private readonly OFFLINE_ACTIONS_KEY = 'offline_actions';

  async initialize(): Promise<void> {
    if (this.isInitialized) {
      return;
    }

    try {
      // Initialize SQLite database
      await this.initializeDatabase();

      // Setup network monitoring
      this.setupNetworkMonitoring();

      // Load pending offline actions
      await this.loadOfflineActions();

      this.isInitialized = true;
      console.log('Offline service initialized successfully');
    } catch (error) {
      console.error('Failed to initialize offline service:', error);
    }
  }

  private async initializeDatabase(): Promise<void> {
    try {
      this.db = await SQLite.openDatabase(
        {
          name: this.DB_NAME,
          location: 'default',
        }
      );

      await this.createTables();
      console.log('Offline database initialized');
    } catch (error) {
      console.error('Database initialization failed:', error);
      throw new Error('Failed to initialize offline database');
    }
  }

  private async createTables(): Promise<void> {
    if (!this.db) {
      throw new Error('Database not initialized');
    }

    const createTablesSQL = [
      // Projects table
      `CREATE TABLE IF NOT EXISTS projects (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT,
        organization_id TEXT,
        status TEXT,
        visibility TEXT,
        configuration TEXT,
        metrics TEXT,
        created_at TEXT,
        updated_at TEXT,
        synced INTEGER DEFAULT 0
      )`,

      // Vulnerabilities table
      `CREATE TABLE IF NOT EXISTS vulnerabilities (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT,
        severity TEXT,
        type TEXT,
        status TEXT,
        project_id TEXT,
        location TEXT,
        impact TEXT,
        recommendation TEXT,
        confidence REAL,
        ai_generated INTEGER,
        created_at TEXT,
        updated_at TEXT,
        synced INTEGER DEFAULT 0
      )`,

      // Scan results table
      `CREATE TABLE IF NOT EXISTS scan_results (
        id TEXT PRIMARY KEY,
        project_id TEXT,
        scan_type TEXT,
        status TEXT,
        results TEXT,
        started_at TEXT,
        completed_at TEXT,
        created_at TEXT,
        synced INTEGER DEFAULT 0
      )`,

      // Reports table
      `CREATE TABLE IF NOT EXISTS reports (
        id TEXT PRIMARY KEY,
        project_id TEXT,
        name TEXT,
        type TEXT,
        content TEXT,
        format TEXT,
        generated_at TEXT,
        synced INTEGER DEFAULT 0
      )`,

      // User profiles table
      `CREATE TABLE IF NOT EXISTS user_profiles (
        id TEXT PRIMARY KEY,
        email TEXT,
        name TEXT,
        avatar TEXT,
        role TEXT,
        preferences TEXT,
        updated_at TEXT,
        synced INTEGER DEFAULT 0
      )`,

      // Organizations table
      `CREATE TABLE IF NOT EXISTS organizations (
        id TEXT PRIMARY KEY,
        name TEXT,
        slug TEXT,
        description TEXT,
        logo TEXT,
        plan TEXT,
        status TEXT,
        settings TEXT,
        updated_at TEXT,
        synced INTEGER DEFAULT 0
      )`,

      // Offline actions table
      `CREATE TABLE IF NOT EXISTS offline_actions (
        id TEXT PRIMARY KEY,
        type TEXT NOT NULL,
        payload TEXT NOT NULL,
        timestamp TEXT NOT NULL,
        retry_count INTEGER DEFAULT 0,
        max_retries INTEGER DEFAULT 3,
        status TEXT DEFAULT 'pending'
      )`,
    ];

    for (const sql of createTablesSQL) {
      await this.db.executeSql(sql);
    }
  }

  private setupNetworkMonitoring(): void {
    NetInfo.addEventListener((state) => {
      const isOnline = state.isConnected && state.isInternetReachable;
      console.log('Network status changed:', isOnline ? 'online' : 'offline');
      
      store.dispatch(setOnlineStatus(isOnline));

      if (isOnline && !this.syncInProgress) {
        // Auto-sync when coming back online
        this.performSync();
      }
    });
  }

  private async loadOfflineActions(): Promise<void> {
    try {
      const actionsData = await AsyncStorage.getItem(this.OFFLINE_ACTIONS_KEY);
      if (actionsData) {
        const actions: OfflineAction[] = JSON.parse(actionsData);
        // Load actions into store
        actions.forEach(action => {
          store.dispatch(addOfflineAction(action));
        });
      }
    } catch (error) {
      console.error('Failed to load offline actions:', error);
    }
  }

  async storeData(table: keyof OfflineDatabase, data: any[]): Promise<void> {
    if (!this.db) {
      throw new Error('Database not initialized');
    }

    try {
      await this.db.transaction(async (tx) => {
        for (const item of data) {
          const columns = Object.keys(item).join(', ');
          const placeholders = Object.keys(item).map(() => '?').join(', ');
          const values = Object.values(item);

          await tx.executeSql(
            `INSERT OR REPLACE INTO ${table} (${columns}) VALUES (${placeholders})`,
            values
          );
        }
      });

      console.log(`Stored ${data.length} items in ${table} table`);
    } catch (error) {
      console.error(`Failed to store data in ${table}:`, error);
      throw error;
    }
  }

  async getData<T>(table: keyof OfflineDatabase, where?: string, params?: any[]): Promise<T[]> {
    if (!this.db) {
      throw new Error('Database not initialized');
    }

    try {
      const whereClause = where ? `WHERE ${where}` : '';
      const sql = `SELECT * FROM ${table} ${whereClause}`;
      
      const [results] = await this.db.executeSql(sql, params);
      
      const items: T[] = [];
      for (let i = 0; i < results.rows.length; i++) {
        items.push(results.rows.item(i));
      }

      return items;
    } catch (error) {
      console.error(`Failed to get data from ${table}:`, error);
      return [];
    }
  }

  async addOfflineAction(action: Omit<OfflineAction, 'id'>): Promise<void> {
    try {
      const offlineAction: OfflineAction = {
        id: Date.now().toString(),
        ...action,
      };

      // Store in database
      if (this.db) {
        await this.db.executeSql(
          'INSERT INTO offline_actions (id, type, payload, timestamp, retry_count, max_retries) VALUES (?, ?, ?, ?, ?, ?)',
          [
            offlineAction.id,
            offlineAction.type,
            JSON.stringify(offlineAction.payload),
            offlineAction.timestamp,
            offlineAction.retryCount,
            offlineAction.maxRetries,
          ]
        );
      }

      // Store in Redux
      store.dispatch(addOfflineAction(offlineAction));

      // Store in AsyncStorage as backup
      await this.saveOfflineActionsToStorage();

      console.log('Offline action added:', offlineAction.type);
    } catch (error) {
      console.error('Failed to add offline action:', error);
    }
  }

  private async saveOfflineActionsToStorage(): Promise<void> {
    try {
      const state = store.getState();
      const actions = state.offline.pendingActions;
      await AsyncStorage.setItem(this.OFFLINE_ACTIONS_KEY, JSON.stringify(actions));
    } catch (error) {
      console.error('Failed to save offline actions to storage:', error);
    }
  }

  async performSync(): Promise<void> {
    if (this.syncInProgress) {
      console.log('Sync already in progress');
      return;
    }

    this.syncInProgress = true;
    const syncStatus: SyncStatus = {
      isOnline: true,
      isSyncing: true,
      syncProgress: 0,
      pendingActions: 0,
    };

    store.dispatch(setSyncStatus(syncStatus));

    try {
      console.log('Starting offline sync...');

      // Sync offline actions first
      await this.syncOfflineActions();

      // Sync cached data
      await this.syncCachedData();

      // Update sync status
      syncStatus.isSyncing = false;
      syncStatus.syncProgress = 100;
      syncStatus.lastSyncAt = new Date().toISOString();
      syncStatus.pendingActions = 0;

      store.dispatch(setSyncStatus(syncStatus));

      console.log('Offline sync completed successfully');
    } catch (error) {
      console.error('Offline sync failed:', error);
      
      syncStatus.isSyncing = false;
      syncStatus.syncProgress = 0;
      store.dispatch(setSyncStatus(syncStatus));
    } finally {
      this.syncInProgress = false;
    }
  }

  private async syncOfflineActions(): Promise<void> {
    const state = store.getState();
    const pendingActions = state.offline.pendingActions;

    console.log(`Syncing ${pendingActions.length} pending actions`);

    for (const action of pendingActions) {
      try {
        await this.executeOfflineAction(action);
        
        // Remove successful action
        store.dispatch(removeOfflineAction(action.id));
        
        // Remove from database
        if (this.db) {
          await this.db.executeSql(
            'DELETE FROM offline_actions WHERE id = ?',
            [action.id]
          );
        }

        console.log(`Synced offline action: ${action.type}`);
      } catch (error) {
        console.error(`Failed to sync action ${action.type}:`, error);
        
        // Increment retry count
        action.retryCount++;
        
        if (action.retryCount >= action.maxRetries) {
          // Remove failed action after max retries
          store.dispatch(removeOfflineAction(action.id));
          
          if (this.db) {
            await this.db.executeSql(
              'DELETE FROM offline_actions WHERE id = ?',
              [action.id]
            );
          }
          
          console.log(`Removed failed action after ${action.maxRetries} retries: ${action.type}`);
        }
      }
    }

    await this.saveOfflineActionsToStorage();
  }

  private async executeOfflineAction(action: OfflineAction): Promise<void> {
    switch (action.type) {
      case 'CREATE_PROJECT':
        await apiClient.post('/projects', action.payload);
        break;
      case 'UPDATE_PROJECT':
        await apiClient.put(`/projects/${action.payload.id}`, action.payload);
        break;
      case 'DELETE_PROJECT':
        await apiClient.delete(`/projects/${action.payload.id}`);
        break;
      case 'UPDATE_VULNERABILITY_STATUS':
        await apiClient.patch(`/vulnerabilities/${action.payload.id}/status`, {
          status: action.payload.status,
        });
        break;
      case 'CREATE_SCAN':
        await apiClient.post('/scans', action.payload);
        break;
      case 'UPDATE_USER_PREFERENCES':
        await apiClient.patch('/user/preferences', action.payload);
        break;
      default:
        console.warn(`Unknown offline action type: ${action.type}`);
    }
  }

  private async syncCachedData(): Promise<void> {
    try {
      // Sync projects
      const response = await apiClient.get('/projects');
      if (response.success && response.data) {
        await this.storeData('projects', response.data.items || response.data);
      }

      // Sync vulnerabilities
      const vulnResponse = await apiClient.get('/vulnerabilities');
      if (vulnResponse.success && vulnResponse.data) {
        await this.storeData('vulnerabilities', vulnResponse.data.items || vulnResponse.data);
      }

      // Sync user profile
      const userResponse = await apiClient.get('/user/profile');
      if (userResponse.success && userResponse.data) {
        await this.storeData('userProfiles', [userResponse.data]);
      }

      console.log('Cached data synced successfully');
    } catch (error) {
      console.error('Failed to sync cached data:', error);
    }
  }

  async clearCache(): Promise<void> {
    if (!this.db) {
      return;
    }

    try {
      const tables = ['projects', 'vulnerabilities', 'scan_results', 'reports', 'user_profiles', 'organizations'];
      
      for (const table of tables) {
        await this.db.executeSql(`DELETE FROM ${table}`);
      }

      console.log('Offline cache cleared');
    } catch (error) {
      console.error('Failed to clear cache:', error);
    }
  }

  async getCacheSize(): Promise<number> {
    if (!this.db) {
      return 0;
    }

    try {
      const [results] = await this.db.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table'"
      );

      let totalSize = 0;
      for (let i = 0; i < results.rows.length; i++) {
        const tableName = results.rows.item(i).name;
        if (tableName !== 'sqlite_sequence') {
          const [countResult] = await this.db.executeSql(
            `SELECT COUNT(*) as count FROM ${tableName}`
          );
          totalSize += countResult.rows.item(0).count;
        }
      }

      return totalSize;
    } catch (error) {
      console.error('Failed to get cache size:', error);
      return 0;
    }
  }

  async isOnline(): Promise<boolean> {
    const state = await NetInfo.fetch();
    return state.isConnected && state.isInternetReachable;
  }

  async destroy(): Promise<void> {
    if (this.db) {
      await this.db.close();
      this.db = null;
    }
    this.isInitialized = false;
  }
}

export const offlineService = new OfflineService();
export default offlineService;
