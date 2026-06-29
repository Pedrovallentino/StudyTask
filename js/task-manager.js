/**
 * Task Manager Module for StudyTask
 * Core CRUD operations for task management
 */

const TaskManager = {
  tasks: [],

  /**
   * Initialize task manager by loading tasks from storage
   * @returns {Array} Loaded tasks
   */
  init() {
    this.tasks = Storage.loadTasks();
    return this.tasks;
  },

  /**
   * Get all tasks
   * @returns {Array} Array of all tasks
   */
  getTasks() {
    return this.tasks;
  },

  /**
   * Get single task by ID
   * @param {string} id - Task ID
   * @returns {Object|null} Task object or null if not found
   */
  getTaskById(id) {
    return this.tasks.find(task => task.id === id) || null;
  },

  /**
   * Create a new task
   * @param {Object} taskData - Object with title, discipline, dueDate, priority
   * @returns {Object|null} Created task object or null if validation fails
   */
  createTask(taskData) {
    // Apply business rules (trim, defaults)
    const cleaned = Validation.applyBusinessRules(taskData);

    // Validate
    const validation = Validation.validateTask(cleaned);
    if (!validation.valid) {
      console.error('Task validation failed:', validation.errors);
      return null;
    }

    // Create task object with auto-generated fields
    const task = {
      id: Utils.generateId(),
      title: cleaned.title,
      discipline: cleaned.discipline,
      dueDate: cleaned.dueDate,
      priority: cleaned.priority,
      status: cleaned.status || 'Pending',
      createdAt: Utils.getCurrentTimestamp(),
      updatedAt: Utils.getCurrentTimestamp()
    };

    // Add to collection
    this.tasks.push(task);

    // Persist to storage
    Storage.saveTasks(this.tasks);

    return task;
  },

  /**
   * Update a task
   * @param {string} id - Task ID
   * @param {Object} updates - Fields to update
   * @returns {Object|null} Updated task or null if not found or validation fails
   */
  updateTask(id, updates) {
    const task = this.getTaskById(id);
    if (!task) {
      console.error('Task not found:', id);
      return null;
    }

    // Apply business rules to updates
    const cleaned = Validation.applyBusinessRules(updates);

    // Merge updates with existing task
    const updated = {
      ...task,
      title: cleaned.title || task.title,
      discipline: cleaned.discipline || task.discipline,
      dueDate: cleaned.dueDate || task.dueDate,
      priority: cleaned.priority || task.priority,
      status: updates.status !== undefined ? updates.status : task.status,
      updatedAt: Utils.getCurrentTimestamp()
    };

    // Validate updated task
    const validation = Validation.validateTask(updated);
    if (!validation.valid) {
      console.error('Updated task validation failed:', validation.errors);
      return null;
    }

    // Update in collection
    const index = this.tasks.findIndex(t => t.id === id);
    this.tasks[index] = updated;

    // Persist to storage
    Storage.saveTasks(this.tasks);

    return updated;
  },

  /**
   * Toggle task status between Pending and Completed
   * @param {string} id - Task ID
   * @returns {Object|null} Updated task or null if not found
   */
  toggleTaskStatus(id) {
    const task = this.getTaskById(id);
    if (!task) {
      console.error('Task not found:', id);
      return null;
    }

    const newStatus = task.status === 'Pending' ? 'Completed' : 'Pending';
    return this.updateTask(id, { status: newStatus });
  },

  /**
   * Delete a task
   * @param {string} id - Task ID
   * @returns {boolean} Success indicator
   */
  deleteTask(id) {
    const index = this.tasks.findIndex(task => task.id === id);
    if (index === -1) {
      console.error('Task not found:', id);
      return false;
    }

    this.tasks.splice(index, 1);
    Storage.saveTasks(this.tasks);
    return true;
  },

  /**
   * Get tasks count
   * @returns {number} Total number of tasks
   */
  getTaskCount() {
    return this.tasks.length;
  },

  /**
   * Get pending tasks count
   * @returns {number} Number of pending tasks
   */
  getPendingCount() {
    return this.tasks.filter(task => task.status === 'Pending').length;
  },

  /**
   * Get completed tasks count
   * @returns {number} Number of completed tasks
   */
  getCompletedCount() {
    return this.tasks.filter(task => task.status === 'Completed').length;
  }
};
