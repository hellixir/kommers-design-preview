// Local concept interactions only. No application requests or data mutation.
(() => {
  const toast = document.getElementById('concept-toast');
  let timer;
  document.querySelectorAll('[data-demo]').forEach(button => button.addEventListener('click', () => {
    toast.textContent = `${button.dataset.demo} · concept preview only; no data is changed.`;
    toast.hidden = false;
    clearTimeout(timer);
    timer = setTimeout(() => { toast.hidden = true; }, 2500);
  }));
  const tabs = [...document.querySelectorAll('[data-tab]')];
  const activate = index => {
    tabs.forEach(tab => {
      const selected = tab.dataset.tab === String(index);
      tab.classList.toggle('active', selected);
      tab.setAttribute('aria-selected', String(selected));
    });
    document.querySelectorAll('[data-panel]').forEach(panel => { panel.hidden = panel.dataset.panel !== String(index); });
  };
  tabs.forEach(tab => tab.addEventListener('click', () => activate(tab.dataset.tab)));
  document.querySelectorAll('.payment-link').forEach(button => button.addEventListener('click', () => activate(1)));
  document.querySelectorAll('[data-ranking]').forEach(button => button.addEventListener('click', () => {
    document.querySelectorAll('[data-ranking]').forEach(tab => tab.classList.toggle('active', tab === button));
    ['customers', 'products'].forEach(id => { document.getElementById(id).hidden = id !== button.dataset.ranking; });
  }));
  document.querySelectorAll('.register').forEach(register => {
    const rows = [...register.querySelectorAll('tbody tr')];
    const controls = [...register.querySelectorAll('input,select')];
    const originalFooter = register.querySelector('.table-footer > span:first-child')?.textContent;
    function apply() {
      let active = false;
      const values = controls.map(control => {
        const label = control.getAttribute('aria-label');
        const value = control.value.trim().toLowerCase();
        const ignored = !value || /^all |^any /.test(value) || label === 'Date range';
        if (!ignored) active = true;
        return {label, value, ignored};
      });
      rows.forEach(row => {
        const cells = [...row.cells];
        row.hidden = values.some(({label,value,ignored}) => {
          if (ignored) return false;
          const text = row.textContent.toLowerCase();
          if (label === 'Customer') return !cells[2].textContent.toLowerCase().includes(value);
          if (label === 'Order code' || label === 'Product code') return !text.includes(value);
          if (label === 'Due') return false; // Due dates are not supplied for the archive preview.
          if (label === 'Payment') return cells[5]?.textContent.toLowerCase().trim() !== value;
          return !text.includes(value);
        });
      });
      const footer = register.querySelector('.table-footer > span:first-child');
      if (footer) footer.textContent = active ? `${rows.filter(row => !row.hidden).length} matching rows in this local preview` : originalFooter;
    }
    controls.forEach(control => control.addEventListener(control.tagName === 'INPUT' ? 'input' : 'change', apply));
    register.querySelector('[data-reset]')?.addEventListener('click', () => {
      controls.forEach(control => { if (control.tagName === 'SELECT') control.selectedIndex = 0; else control.value = ''; });
      apply();
    });
  });
})();
