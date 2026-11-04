// Local static concepts only. Nothing is saved or sent to an application.
(() => {
  const showTab = name => {
    document.querySelectorAll('[data-tab]').forEach(tab => {
      tab.classList.toggle('active', tab.dataset.tab === name);
      tab.setAttribute('aria-selected', String(tab.dataset.tab === name));
    });
    document.querySelectorAll('[data-content]').forEach(panel => panel.hidden = panel.dataset.content !== name);
  };
  document.querySelectorAll('[data-tab]').forEach(tab => tab.addEventListener('click', () => showTab(tab.dataset.tab)));
  document.querySelectorAll('[data-show-payments]').forEach(button => button.addEventListener('click', () => showTab('payments')));
  document.querySelectorAll('[data-rank]').forEach(button => button.addEventListener('click', () => {
    document.querySelectorAll('[data-rank]').forEach(tab => tab.classList.toggle('active', tab === button));
    ['customers', 'products'].forEach(id => document.getElementById(id).hidden = id !== button.dataset.rank);
  }));
  document.querySelectorAll('[data-catalog]').forEach(button => button.addEventListener('click', () => {
    document.querySelectorAll('[data-catalog]').forEach(tab => tab.classList.toggle('active', tab === button));
    ['products', 'warehouses'].forEach(id => document.getElementById('catalog-' + id).hidden = id !== button.dataset.catalog);
  }));
  document.querySelectorAll('[data-demo]').forEach(button => button.addEventListener('click', () => {
    document.getElementById('dialog-title').textContent = button.dataset.demo;
    document.getElementById('concept-dialog').showModal();
  }));
  document.querySelectorAll('[data-aging]').forEach(button => button.addEventListener('click', () => {
    document.getElementById('aging').classList.toggle('highlight');
  }));
  ['sales', 'inventory', 'movements'].forEach(scope => {
    const table = document.querySelector('.' + (scope === 'movements' ? 'movements' : scope) + '-table');
    if (!table) return;
    const controls = [...document.querySelectorAll('[data-search="' + scope + '"], [data-filter="' + scope + '"]')];
    const filter = () => {
      let count = 0;
      table.querySelectorAll('tbody tr').forEach(row => {
        const text = row.textContent.toLowerCase();
        row.hidden = !controls.every(control => {
          const value = control.value.toLowerCase();
          if (!value || value.startsWith('all ')) return true;
          if (control.tagName === 'SELECT') {
            const label = control.getAttribute('aria-label');
            if (scope === 'sales' && label === 'Due') return true;
            const columns = scope === 'sales' ? {Status: 3, Payment: 5} : scope === 'inventory' ? {Category: 1, 'Stock signal': 3} : {Status: 3, Type: 1};
            if (label in columns) {
              const cell = row.cells[columns[label]];
              return cell.firstChild.textContent.trim().toLowerCase() === value;
            }
          }
          return text.includes(value);
        });
        if (!row.hidden) count++;
      });
      const counter = document.querySelector('[data-count]');
      if (counter) counter.textContent = count;
    };
    controls.filter(control => control.getAttribute('aria-label') === 'Due').forEach(control => {
      [...control.options].slice(1).forEach(option => option.disabled = true);
      control.title = 'Due dates for other archive orders are not supplied; filtering is not available in this static preview.';
    });
    controls.forEach(control => control.addEventListener(control.tagName === 'SELECT' ? 'change' : 'input', filter));
  });
})();
