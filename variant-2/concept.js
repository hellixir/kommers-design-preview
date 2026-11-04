// Static concept interactions only. No network calls or application writes.
(() => {
  document.querySelectorAll('[data-rank]').forEach(button => button.addEventListener('click', () => {
    document.querySelectorAll('[data-rank]').forEach(item => item.classList.toggle('active', item === button));
    ['customers', 'products'].forEach(id => document.getElementById(id).hidden = id !== button.dataset.rank);
  }));
  const showSaleTab = name => {
    document.querySelectorAll('[data-tab]').forEach(tab => tab.classList.toggle('active', tab.dataset.tab === name));
    document.querySelectorAll('[data-content]').forEach(content => content.hidden = content.dataset.content !== name);
  };
  document.querySelectorAll('[data-tab]').forEach(button => button.addEventListener('click', () => showSaleTab(button.dataset.tab)));
  document.querySelectorAll('[data-show-payments]').forEach(button => button.addEventListener('click', () => showSaleTab('payments')));
  // Product metadata remains visible beside the table; tabs focus that local context.
  if (document.body.classList.contains('product')) {
    const tabs = [...document.querySelectorAll('#movements .tab')];
    const targets = [document.querySelector('.movement-panel'), document.querySelector('.product-note'), document.querySelector('.metadata')];
    tabs.forEach((tab, i) => tab.addEventListener('click', () => {
      tabs.forEach(item => item.classList.toggle('active', item === tab));
      targets.forEach((target, j) => target.style.boxShadow = i === j ? 'inset 0 0 0 2px #9683ec' : '');
    }));
  }
})();
