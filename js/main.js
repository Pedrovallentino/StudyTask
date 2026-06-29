/**
 * Main Application Entry Point for StudyTask
 * Initializes all modules and sets up the application
 */

// Global error handler to catch any uncaught exceptions
window.addEventListener('error', (event) => {
  console.error('Uncaught error:', event.error);
  event.preventDefault();
});

// Unhandled promise rejection handler
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
  event.preventDefault();
});

/**
 * Initialize the entire application
 */
function initApp() {
  try {
    // Check if storage is available
    if (!Storage.isStorageAvailable()) {
      console.warn('localStorage is not available. Data will not persist.');
      alert('Aviso: Seu navegador não permite armazenamento de dados. As tarefas não serão mantidas após fechar o navegador.');
    }

    // Initialize task manager with stored tasks
    TaskManager.init();

    // Initialize UI
    UI.init();

    console.log('StudyTask initialized successfully');
    console.log(`Loaded ${TaskManager.getTaskCount()} tasks from storage`);
  } catch (error) {
    console.error('Fatal error during initialization:', error);
    alert('Erro ao inicializar a aplicação. Recarregue a página e tente novamente.');
  }
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
