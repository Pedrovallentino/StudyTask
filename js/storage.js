/**
 * Storage Module for StudyTask
 * Abstracts localStorage access for task persistence
 */

const Storage = {
  STORAGE_KEY: 'studytask_tasks',
  APP_CONFIG_KEY: 'studytask_config',

  /**
   * Save tasks collection to localStorage
   * @param {Array} tasks - Array of task objects
   * @returns {boolean} Success indicator
   */
  saveTasks(tasks) {
    try {
      const data = JSON.stringify(tasks);
      localStorage.setItem(this.STORAGE_KEY, data);
      return true;
    } catch (error) {
      if (error.name === 'QuotaExceededError') {
        console.warn('localStorage quota exceeded. Some tasks may not be saved.');
        return false;
      }
      console.error('Error saving tasks to storage:', error);
      return false;
    }
  },

  /**
   * Load tasks collection from localStorage
   * @returns {Array} Array of task objects (empty array if storage is empty or corrupted)
   */
  loadTasks() {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (!data) {
        return [];
      }
      const tasks = JSON.parse(data);
      if (!Array.isArray(tasks)) {
        console.warn('Corrupted tasks data in storage. Starting fresh.');
        return [];
      }
      return tasks;
    } catch (error) {
      console.error('Error loading tasks from storage:', error);
      return [];
    }
  },

  /**
   * Clear all StudyTask data from localStorage
   * @returns {boolean} Success indicator
   */
  clearTasks() {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
      localStorage.removeItem(this.APP_CONFIG_KEY);
      return true;
    } catch (error) {
      console.error('Error clearing storage:', error);
      return false;
    }
  },

  /**
   * Get storage status and usage information
   * @returns {Object} Storage status object
   */
  getStorageStatus() {
    const status = {
      available: this.isStorageAvailable(),
      estimatedUsage: 0,
      estimatedQuota: 0,
      taskCount: 0
    };

    try {
      const tasks = this.loadTasks();
      status.taskCount = tasks.length;
      
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (data) {
        status.estimatedUsage = new Blob([data]).size;
      }
      
      // Most browsers allow ~5-10MB per domain
      status.estimatedQuota = 5 * 1024 * 1024; // 5MB estimate
      
      return status;
    } catch (error) {
      console.error('Error getting storage status:', error);
      return status;
    }
  },

  /**
   * Check if localStorage is available and accessible
   * @returns {boolean} True if storage is available
   */
  isStorageAvailable() {
    try {
      const test = '__storage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (error) {
      return false;
    }
  },

  /**
   * Save application configuration
   * @param {Object} config - Configuration object
   */
  saveConfig(config) {
    try {
      localStorage.setItem(this.APP_CONFIG_KEY, JSON.stringify(config));
    } catch (error) {
      console.error('Error saving config:', error);
    }
  },

  /**
   * Load application configuration
   * @returns {Object} Configuration object
   */
  loadConfig() {
    try {
      const data = localStorage.getItem(this.APP_CONFIG_KEY);
      return data ? JSON.parse(data) : { lastFilter: 'all' };
    } catch (error) {
      console.error('Error loading config:', error);
      return { lastFilter: 'all' };
    }
  }
};
