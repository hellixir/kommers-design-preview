// Local concept interactions only. No application integration or data mutations.
(() => {
  document.querySelectorAll('[data-ranking]').forEach(button => button.addEventListener('click', () => {
    document.querySelectorAll('[data-ranking]').forEach(item => item.classList.toggle('active', item === button));
    ['customers', 'products'].forEach(id => document.getElementById(id).hidden = id !== button.dataset.ranking);
  }));
  document.querySelectorAll('.btn:not(a), [data-proposal]').forEach(button => button.addEventListener('click', () => { const toast = document.querySelector('.toast'); toast.textContent = button.dataset.proposal || (button.textContent.trim() + ' · visual proposal, not connected to app data'); toast.hidden = false; setTimeout(() => toast.hidden = true, 2800); }));
  const sale = document.body.classList.contains('sale-detail');
  const product = document.body.classList.contains('product-detail');
  if (!sale && !product) { document.querySelectorAll('.tabs > button:not(.active)').forEach(button => button.addEventListener('click', () => {const toast=document.querySelector('.toast');toast.textContent='Warehouses · outside this five-page concept';toast.hidden=false;setTimeout(() => toast.hidden=true,2800);})); return; }
  const overview = document.querySelector(sale ? '#sale-overview' : '#product-overview');
  const tabs = [...document.querySelectorAll('.tabs > button')];
  const panels = [overview];
  const content = sale ? [
    '<h2>Payment history</h2><p>Fully settled · Paid €53,713.58 · Outstanding €0.00</p><table><thead><tr><th>Date</th><th>Type</th><th class="num">Amount</th><th>Recorded by</th></tr></thead><tbody><tr><td>10 Jul 2024</td><td>Payment</td><td class="num">€53,713.58</td><td>admin@demo.com</td></tr></tbody></table>',
    '<h2>Notes</h2><p>Historical note, not the current settlement state:</p><blockquote>Payment milestone: 30% advance paid</blockquote><p>The order is now fully paid. Use payment history for the current financial record.</p>',
    '<h2>Comments</h2><p>No comments yet.</p><button class="btn">Add comment</button>',
    '<h2>Attachments</h2><p>No attachments yet.</p><button class="btn">Add attachment</button>'
  ] : [
    '<h2>Notes & metadata</h2><p>Food & Beverages / Oils & Fats / Vegetable Oils · FB-OILS-VEG</p><p>Premium sunflower oil in 1L bottles.</p><p>Created: 24 Jun 2026, 12:57 PM<br>Updated: 24 Jun 2026, 12:57 PM</p>'
  ];
  content.forEach(html => {
    const section = document.createElement('section');
    section.className = 'panel concept-tab-content';
    section.innerHTML = html;
    section.hidden = true;
    overview.parentNode.insertBefore(section, overview.nextSibling);
    panels.push(section);
  });
  tabs.forEach((tab, index) => {
    tab.setAttribute('role', 'tab');
    tab.tabIndex = 0;
    const activate = () => {
      tabs.forEach((item, i) => {item.classList.toggle('active', i === index); item.setAttribute('aria-selected', String(i === index));});
      panels.forEach((panel, i) => panel.hidden = i !== index);
    };
    tab.addEventListener('click', activate);
    tab.addEventListener('keydown', event => { if (event.key === 'Enter' || event.key === ' ') {event.preventDefault(); activate();} });
  });
  document.querySelector('[data-payment-link]')?.addEventListener('click', event => { event.preventDefault(); tabs[1].click(); });
})();
