/**
 * Filters Module for StudyTask
 * Task filtering logic for different views
 */

const Filters = {
  activeFilter: 'all',

  /**
   * Filter tasks by status
   * @param {Array} tasks - Array of tasks to filter
   * @param {string} filterType - Filter type: 'all', 'pending', 'completed'
   * @returns {Array} Filtered tasks
   */
  filterByStatus(tasks, filterType) {
    if (!tasks || !Array.isArray(tasks)) {
      return [];
    }

    switch (filterType) {
      case 'pending':
        return tasks.filter(task => task.status === 'Pending');
      case 'completed':
        return tasks.filter(task => task.status === 'Completed');
      case 'all':
      default:
        return tasks;
    }
  },

  /**
   * Set active filter
   * @param {string} filterType - Filter type to set as active
   */
  setActiveFilter(filterType) {
    if (['all', 'pending', 'completed'].includes(filterType)) {
      this.activeFilter = filterType;
      // Persist filter preference
      const config = Storage.loadConfig();
      config.lastFilter = filterType;
      Storage.saveConfig(config);
    }
  },

  /**
   * Get currently active filter
   * @returns {string} Current active filter type
   */
  getActiveFilter() {
    return this.activeFilter;
  },

  /**
   * Restore last used filter from storage
   */
  restoreLastFilter() {
    const config = Storage.loadConfig();
    this.activeFilter = config.lastFilter || 'all';
  },

  /**
   * Get filter label for display
   * @param {string} filterType - Filter type
   * @returns {string} Display label
   */
  getFilterLabel(filterType) {
    const labels = {
      'all': 'Todas as Tarefas',
      'pending': 'Tarefas Pendentes',
      'completed': 'Tarefas Concluídas'
    };
    return labels[filterType] || 'Todas as Tarefas';
  }
};
