/**
 * Validation Module for StudyTask
 * Centralized validation for all task fields and business rules
 */

const Validation = {
  /**
   * Business rules for task fields
   */
  rules: {
    title: {
      required: true,
      minLength: 1,
      maxLength: 500,
      type: 'string',
      message: 'Título é obrigatório e deve ter entre 1 e 500 caracteres'
    },
    discipline: {
      required: true,
      minLength: 1,
      maxLength: 100,
      type: 'string',
      message: 'Disciplina é obrigatória e deve ter entre 1 e 100 caracteres'
    },
    dueDate: {
      required: true,
      type: 'date',
      message: 'Data de vencimento é obrigatória e deve ser uma data válida'
    },
    priority: {
      required: false,
      enum: ['Low', 'Medium', 'High'],
      default: 'Medium',
      message: 'Prioridade deve ser Baixa, Média ou Alta'
    },
    status: {
      required: false,
      enum: ['Pending', 'Completed'],
      default: 'Pending',
      message: 'Status deve ser Pendente ou Concluído'
    }
  },

  /**
   * Validate a complete task object
   * @param {Object} task - Task object to validate
   * @returns {Object} { valid: boolean, errors: Object }
   */
  validateTask(task) {
    const errors = {};

    // Validate title
    const titleError = this.isValidTitle(task.title);
    if (titleError) errors.title = titleError;

    // Validate discipline
    const disciplineError = this.isValidDiscipline(task.discipline);
    if (disciplineError) errors.discipline = disciplineError;

    // Validate due date
    const dateError = this.isValidDate(task.dueDate);
    if (dateError) errors.dueDate = dateError;

    // Validate priority
    const priorityError = this.isValidPriority(task.priority);
    if (priorityError) errors.priority = priorityError;

    // Validate status
    const statusError = this.isValidStatus(task.status);
    if (statusError) errors.status = statusError;

    return {
      valid: Object.keys(errors).length === 0,
      errors: errors
    };
  },

  /**
   * Validate title field
   * @param {string} title - Title to validate
   * @returns {string|null} Error message or null if valid
   */
  isValidTitle(title) {
    if (!title || typeof title !== 'string') {
      return 'Título é obrigatório';
    }
    const trimmed = title.trim();
    if (trimmed.length < 1) {
      return 'Título não pode estar vazio';
    }
    if (trimmed.length > 500) {
      return 'Título não pode ultrapassar 500 caracteres';
    }
    return null;
  },

  /**
   * Validate discipline field
   * @param {string} discipline - Discipline to validate
   * @returns {string|null} Error message or null if valid
   */
  isValidDiscipline(discipline) {
    if (!discipline || typeof discipline !== 'string') {
      return 'Disciplina é obrigatória';
    }
    const trimmed = discipline.trim();
    if (trimmed.length < 1) {
      return 'Disciplina não pode estar vazia';
    }
    if (trimmed.length > 100) {
      return 'Disciplina não pode ultrapassar 100 caracteres';
    }
    return null;
  },

  /**
   * Validate due date field
   * @param {string} dueDate - Date in ISO format (YYYY-MM-DD)
   * @returns {string|null} Error message or null if valid
   */
  isValidDate(dueDate) {
    if (!dueDate) {
      return 'Data de vencimento é obrigatória';
    }
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(dueDate)) {
      return 'Data deve estar no formato YYYY-MM-DD';
    }
    const date = new Date(dueDate + 'T00:00:00');
    if (isNaN(date.getTime())) {
      return 'Data inválida';
    }
    return null;
  },

  /**
   * Validate priority field
   * @param {string} priority - Priority value
   * @returns {string|null} Error message or null if valid
   */
  isValidPriority(priority) {
    if (!priority) {
      return null; // Priority has default value
    }
    if (!this.rules.priority.enum.includes(priority)) {
      return `Prioridade deve ser uma de: ${this.rules.priority.enum.join(', ')}`;
    }
    return null;
  },

  /**
   * Validate status field
   * @param {string} status - Status value
   * @returns {string|null} Error message or null if valid
   */
  isValidStatus(status) {
    if (!status) {
      return null; // Status has default value
    }
    if (!this.rules.status.enum.includes(status)) {
      return `Status deve ser uma de: ${this.rules.status.enum.join(', ')}`;
    }
    return null;
  },

  /**
   * Get business rules for display/reference
   * @returns {Object} Business rules object
   */
  getBusinessRules() {
    return {
      RN001: 'Campos obrigatórios: título, disciplina, data de vencimento',
      RN002: 'Prioridade padrão é Média',
      RN003: 'Novas tarefas começam com status Pendente',
      RN004: 'Exclusão requer confirmação do usuário',
      RN005: 'Tarefas concluídas permanecem visíveis',
      RN006: 'IDs de tarefa devem ser únicos',
      RN007: 'Espaços em branco são removidos automaticamente dos campos'
    };
  },

  /**
   * Apply business rules to task data (trim, defaults, etc.)
   * @param {Object} taskData - Raw task data
   * @returns {Object} Task data with rules applied
   */
  applyBusinessRules(taskData) {
    return {
      title: taskData.title ? Utils.trimWhitespace(taskData.title) : '',
      discipline: taskData.discipline ? Utils.trimWhitespace(taskData.discipline) : '',
      dueDate: taskData.dueDate || '',
      priority: taskData.priority || 'Medium',
      status: taskData.status || 'Pending'
    };
  }
};
