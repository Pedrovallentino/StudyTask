/**
 * Utility Functions for StudyTask
 * Provides helper functions for ID generation, date formatting, and common operations
 */

const Utils = {
  /**
   * Generate a unique task ID using timestamp and random suffix
   * @returns {string} Unique identifier
   */
  generateId() {
    return `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  },

  /**
   * Format ISO date string to user-friendly display format (DD/MM/YYYY)
   * @param {string} isoDate - Date in ISO format (YYYY-MM-DD)
   * @returns {string} Formatted date string
   */
  formatDate(isoDate) {
    if (!isoDate) return '';
    const date = new Date(isoDate + 'T00:00:00');
    return date.toLocaleDateString('pt-BR', { year: 'numeric', month: '2-digit', day: '2-digit' });
  },

  /**
   * Convert display date format back to ISO format
   * @param {string} displayDate - Date in DD/MM/YYYY format
   * @returns {string} ISO format date (YYYY-MM-DD)
   */
  toIsoDate(displayDate) {
    if (!displayDate) return '';
    const [day, month, year] = displayDate.split('/');
    return `${year}-${month}-${day}`;
  },

  /**
   * Trim whitespace from string
   * @param {string} str - String to trim
   * @returns {string} Trimmed string
   */
  trimWhitespace(str) {
    return str.trim();
  },

  /**
   * Sort tasks by due date (ascending)
   * @param {Array} tasks - Array of task objects
   * @returns {Array} Sorted array
   */
  sortTasks(tasks) {
    return [...tasks].sort((a, b) => {
      return new Date(a.dueDate) - new Date(b.dueDate);
    });
  },

  /**
   * Get current timestamp in ISO format
   * @returns {string} Current timestamp
   */
  getCurrentTimestamp() {
    return new Date().toISOString();
  },

  /**
   * Check if a date string is in the past
   * @param {string} dateStr - Date in ISO format (YYYY-MM-DD)
   * @returns {boolean} True if date is in the past
   */
  isDateInPast(dateStr) {
    const date = new Date(dateStr + 'T00:00:00');
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  },

  /**
   * Get priority level display name with emoji
   * @param {string} priority - Priority value (Low, Medium, High)
   * @returns {string} Display string with emoji
   */
  getPriorityDisplay(priority) {
    const priorities = {
      'Low': '🟢 Baixa',
      'Medium': '🟡 Média',
      'High': '🔴 Alta'
    };
    return priorities[priority] || priority;
  },

  /**
   * Get status display name
   * @param {string} status - Status value (Pending, Completed)
   * @returns {string} Display string
   */
  getStatusDisplay(status) {
    const statuses = {
      'Pending': 'Pendente',
      'Completed': 'Concluída'
    };
    return statuses[status] || status;
  }
};
