/**
 * UI Module for StudyTask
 * Handles all DOM rendering, event binding, and user interactions
 */

const UI = {
  // Current task being edited
  editingTaskId: null,
  deleteTaskId: null,

  /**
   * Initialize UI elements and event listeners
   */
  init() {
    this.cacheElements();
    this.attachEventListeners();
    this.renderTaskList(TaskManager.getTasks());
    Filters.restoreLastFilter();
    this.updateFilterButtonStates();
  },

  /**
   * Cache DOM elements for better performance
   */
  cacheElements() {
    this.taskForm = document.getElementById('taskForm');
    this.taskList = document.getElementById('taskList');
    this.editModal = document.getElementById('editModal');
    this.editForm = document.getElementById('editForm');
    this.confirmModal = document.getElementById('confirmModal');
    this.filterButtons = document.querySelectorAll('.filter-btn');
  },

  /**
   * Attach all event listeners
   */
  attachEventListeners() {
    // Form submission
    this.taskForm.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleTaskFormSubmit();
    });

    // Filter buttons
    this.filterButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const filterType = e.target.dataset.filter;
        Filters.setActiveFilter(filterType);
        this.updateFilterButtonStates();
        this.renderTaskList(TaskManager.getTasks());
      });
    });

    // Edit form submission
    this.editForm.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleEditFormSubmit();
    });

    // Edit modal close buttons
    const editCloseButtons = this.editModal.querySelectorAll('.modal-close, .modal-close-btn');
    editCloseButtons.forEach(btn => {
      btn.addEventListener('click', () => this.closeEditModal());
    });

    // Confirm modal buttons
    const confirmCancel = this.confirmModal.querySelector('.modal-cancel');
    const confirmDelete = this.confirmModal.querySelector('.modal-confirm');
    
    confirmCancel.addEventListener('click', () => this.closeConfirmModal());
    confirmDelete.addEventListener('click', () => this.handleConfirmDelete());

    // Task list event delegation
    this.taskList.addEventListener('click', (e) => {
      const taskItem = e.target.closest('.task-item');
      if (!taskItem) return;

      const taskId = taskItem.dataset.taskId;

      if (e.target.closest('.task-status-checkbox')) {
        this.handleStatusToggle(taskId);
      } else if (e.target.closest('.task-edit-btn')) {
        this.openEditModal(taskId);
      } else if (e.target.closest('.task-delete-btn')) {
        this.openConfirmModal(taskId);
      }
    });

    // Escape key to close modals
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeEditModal();
        this.closeConfirmModal();
      }
    });
  },

  /**
   * Handle task form submission
   */
  handleTaskFormSubmit() {
    const formData = new FormData(this.taskForm);
    const taskData = {
      title: formData.get('title'),
      discipline: formData.get('discipline'),
      dueDate: formData.get('dueDate'),
      priority: formData.get('priority') || 'Medium'
    };

    // Validate
    const validation = Validation.validateTask(taskData);
    if (!validation.valid) {
      this.displayFormErrors(validation.errors, 'taskForm');
      return;
    }

    // Clear errors
    this.clearFormErrors('taskForm');

    // Create task
    const task = TaskManager.createTask(taskData);
    if (!task) {
      alert('Erro ao criar tarefa. Verifique os dados e tente novamente.');
      return;
    }

    // Reset form
    this.taskForm.reset();

    // Re-render task list
    this.renderTaskList(TaskManager.getTasks());
  },

  /**
   * Handle edit form submission
   */
  handleEditFormSubmit() {
    if (!this.editingTaskId) return;

    const formData = new FormData(this.editForm);
    const updates = {
      title: formData.get('title'),
      discipline: formData.get('discipline'),
      dueDate: formData.get('dueDate'),
      priority: formData.get('priority')
    };

    // Validate
    const validation = Validation.validateTask(updates);
    if (!validation.valid) {
      this.displayFormErrors(validation.errors, 'editForm');
      return;
    }

    // Clear errors
    this.clearFormErrors('editForm');

    // Update task
    const updated = TaskManager.updateTask(this.editingTaskId, updates);
    if (!updated) {
      alert('Erro ao atualizar tarefa. Tente novamente.');
      return;
    }

    // Close modal and re-render
    this.closeEditModal();
    this.renderTaskList(TaskManager.getTasks());
  },

  /**
   * Handle status toggle (checkbox)
   * @param {string} taskId - Task ID
   */
  handleStatusToggle(taskId) {
    TaskManager.toggleTaskStatus(taskId);
    this.renderTaskList(TaskManager.getTasks());
  },

  /**
   * Handle delete confirmation
   */
  handleConfirmDelete() {
    if (!this.deleteTaskId) return;

    const success = TaskManager.deleteTask(this.deleteTaskId);
    if (success) {
      this.closeConfirmModal();
      this.renderTaskList(TaskManager.getTasks());
    } else {
      alert('Erro ao deletar tarefa.');
    }
  },

  /**
   * Open edit modal and populate with task data
   * @param {string} taskId - Task ID to edit
   */
  openEditModal(taskId) {
    const task = TaskManager.getTaskById(taskId);
    if (!task) return;

    this.editingTaskId = taskId;
    this.clearFormErrors('editForm');

    // Populate form
    document.getElementById('editTitle').value = task.title;
    document.getElementById('editDiscipline').value = task.discipline;
    document.getElementById('editDate').value = task.dueDate;
    document.querySelector(`input[name="priority"][value="${task.priority}"]`).checked = true;

    // Show modal
    this.editModal.setAttribute('aria-hidden', 'false');
    this.editModal.classList.add('active');
    document.getElementById('editTitle').focus();
  },

  /**
   * Close edit modal
   */
  closeEditModal() {
    this.editingTaskId = null;
    this.editModal.setAttribute('aria-hidden', 'true');
    this.editModal.classList.remove('active');
    this.editForm.reset();
  },

  /**
   * Open confirmation modal for delete
   * @param {string} taskId - Task ID to delete
   */
  openConfirmModal(taskId) {
    this.deleteTaskId = taskId;
    this.confirmModal.setAttribute('aria-hidden', 'false');
    this.confirmModal.classList.add('active');
    this.confirmModal.querySelector('.modal-confirm').focus();
  },

  /**
   * Close confirmation modal
   */
  closeConfirmModal() {
    this.deleteTaskId = null;
    this.confirmModal.setAttribute('aria-hidden', 'true');
    this.confirmModal.classList.remove('active');
  },

  /**
   * Render task list based on current filter
   * @param {Array} tasks - Array of tasks to render
   */
  renderTaskList(tasks) {
    const filtered = Filters.filterByStatus(tasks, Filters.getActiveFilter());
    const sorted = Utils.sortTasks(filtered);

    if (sorted.length === 0) {
      this.taskList.innerHTML = `
        <div class="empty-state">
          <p>Nenhuma tarefa encontrada.</p>
          <p class="empty-state-hint">Crie uma tarefa para começar!</p>
        </div>
      `;
      return;
    }

    this.taskList.innerHTML = sorted
      .map(task => this.renderTaskItem(task))
      .join('');
  },

  /**
   * Render single task item HTML
   * @param {Object} task - Task object
   * @returns {string} HTML string
   */
  renderTaskItem(task) {
    const isCompleted = task.status === 'Completed';
    const isOverdue = Utils.isDateInPast(task.dueDate) && !isCompleted;

    return `
      <div class="task-item ${isCompleted ? 'completed' : ''} ${isOverdue ? 'overdue' : ''}" 
           data-task-id="${task.id}" role="listitem">
        <div class="task-content">
          <div class="task-header">
            <input 
              type="checkbox" 
              class="task-status-checkbox" 
              ${isCompleted ? 'checked' : ''}
              aria-label="Marcar tarefa como ${isCompleted ? 'pendente' : 'concluída'}"
            >
            <h3 class="task-title">${this.escapeHtml(task.title)}</h3>
            <span class="task-priority">${Utils.getPriorityDisplay(task.priority)}</span>
          </div>
          <div class="task-details">
            <span class="task-discipline">📚 ${this.escapeHtml(task.discipline)}</span>
            <span class="task-date">📅 ${Utils.formatDate(task.dueDate)}</span>
            <span class="task-status">
              ${isCompleted ? '✅ Concluída' : '⏳ Pendente'}
            </span>
          </div>
        </div>
        <div class="task-actions">
          <button class="task-edit-btn" aria-label="Editar tarefa">
            ✏️ Editar
          </button>
          <button class="task-delete-btn" aria-label="Deletar tarefa">
            🗑️ Deletar
          </button>
        </div>
      </div>
    `;
  },

  /**
   * Display form validation errors
   * @param {Object} errors - Error object from validation
   * @param {string} formId - Form element ID
   */
  displayFormErrors(errors, formId) {
    const form = document.getElementById(formId);
    const errorFields = form.querySelectorAll('.error-message');

    // Clear all errors first
    this.clearFormErrors(formId);

    // Display errors
    Object.keys(errors).forEach(field => {
      const fieldPrefix = formId === 'taskForm' ? '' : 'edit';
      const errorElement = document.getElementById(`${fieldPrefix}${field}Error`);
      if (errorElement) {
        errorElement.textContent = errors[field];
        errorElement.style.display = 'block';
      }
    });
  },

  /**
   * Clear form validation errors
   * @param {string} formId - Form element ID
   */
  clearFormErrors(formId) {
    const form = document.getElementById(formId);
    const errorElements = form.querySelectorAll('.error-message');
    errorElements.forEach(el => {
      el.textContent = '';
      el.style.display = 'none';
    });
  },

  /**
   * Update filter button active states
   */
  updateFilterButtonStates() {
    const activeFilter = Filters.getActiveFilter();
    this.filterButtons.forEach(btn => {
      const isActive = btn.dataset.filter === activeFilter;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-pressed', isActive);
    });
  },

  /**
   * Escape HTML special characters to prevent XSS
   * @param {string} text - Text to escape
   * @returns {string} Escaped text
   */
  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
};
