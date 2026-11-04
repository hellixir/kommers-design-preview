// Local concept navigation only; no data mutation or application integration.
(() => {
  document.querySelectorAll('[data-ranking]').forEach(button => {
    button.addEventListener('click', () => {
      document.querySelectorAll('[data-ranking]').forEach(item => item.classList.toggle('active', item === button));
      ['customers', 'products'].forEach(id => document.getElementById(id).hidden = id !== button.dataset.ranking);
    });
  });
  const sale = document.body.classList.contains('sale-detail');
  const product = document.body.classList.contains('product-detail');
  if (!sale && !product) return;
  const tabs = [...document.querySelectorAll('.tabs > span')];
  const overview = sale ? document.querySelector('.detail-grid > div') : document.querySelector('.tabs + .panel');
  const panels = [overview];
  const content = sale ? [
    '<h2>Payments</h2><p>Fully settled · Outstanding €0.00</p><table><thead><tr><th>Date</th><th>Type</th><th class="num">Amount</th><th>Recorded by</th></tr></thead><tbody><tr><td>10 Jul 2024</td><td>Payment</td><td class="num">€53,713.58</td><td>admin@demo.com</td></tr></tbody></table>',
    '<h2>Notes</h2><p>Historical note — not the current payment state</p><blockquote>Payment milestone: 30% advance paid</blockquote><p>The order is now fully paid. Refer to the payment history for the current financial record.</p>',
    '<h2>Comments</h2><p>No comments yet.</p><button class="btn">Add comment</button>',
    '<h2>Attachments</h2><p>No attachments yet.</p><button class="btn">Add attachment</button>'
  ] : [
    '<h2>Product details</h2><div class="read-fields"><div class="label">Product name<b>Sunflower Oil 1L</b></div><div class="label">Product code<b>VIL-123</b></div><div class="label">Category code<b>FB-OILS-VEG</b></div></div><p>Food & Beverages → Oils & Fats → Vegetable Oils</p>',
    '<h2>Notes & metadata</h2><p>Premium sunflower oil in 1L bottles</p><div class="read-fields"><div class="label">Created<b>24 Jun 2026, 12:57 PM</b></div><div class="label">Last updated<b>24 Jun 2026, 12:57 PM</b></div></div>'
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
    tab.setAttribute('role', 'button');
    tab.tabIndex = 0;
    const activate = () => {
      tabs.forEach((item, i) => item.classList.toggle('active', i === index));
      panels.forEach((panel, i) => panel.hidden = i !== index);
    };
    tab.addEventListener('click', activate);
    tab.addEventListener('keydown', event => { if (event.key === 'Enter') activate(); });
  });
  document.querySelectorAll('.payment-link').forEach(item => {
    item.addEventListener('click', () => tabs[1].click());
    item.addEventListener('keydown', event => { if (event.key === 'Enter') tabs[1].click(); });
  });
})();
