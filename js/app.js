/* Rendering e interazioni. I contenuti stanno in js/data.js. */

(function () {
  'use strict';

  /* ---------- Persistenza ---------- */

  var Store = (function () {
    var available = (function () {
      try {
        var probe = '__vienna__';
        window.localStorage.setItem(probe, '1');
        window.localStorage.removeItem(probe);
        return true;
      } catch (err) {
        return false;
      }
    })();

    var fallback = {};

    return {
      get: function (key, empty) {
        if (!available) {
          return Object.prototype.hasOwnProperty.call(fallback, key)
            ? fallback[key]
            : empty;
        }
        try {
          var raw = window.localStorage.getItem(key);
          if (raw === null) return empty;
          var parsed = JSON.parse(raw);
          return parsed === null || typeof parsed !== typeof empty ? empty : parsed;
        } catch (err) {
          return empty;
        }
      },
      set: function (key, value) {
        fallback[key] = value;
        if (!available) return;
        try {
          window.localStorage.setItem(key, JSON.stringify(value));
        } catch (err) {
          /* quota piena o modalità privata: l'app resta usabile in memoria */
        }
      }
    };
  })();

  var KEY_DONE = 'vienna-done';
  var KEY_TICKETS = 'vienna-tickets';
  var KEY_TAB = 'vienna-tab';

  var done = Store.get(KEY_DONE, {});
  var tickets = Store.get(KEY_TICKETS, {});

  /* ---------- Utilità ---------- */

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined && text !== null) node.textContent = text;
    return node;
  }

  function mapUrl(query) {
    return 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(query);
  }

  function telUrl(phone) {
    return 'tel:' + phone.replace(/[^0-9+]/g, '');
  }

  function ticketState(id) {
    var saved = tickets[id];
    if (!saved || typeof saved !== 'object') return { code: '', notes: '', booked: false };
    return {
      code: typeof saved.code === 'string' ? saved.code : '',
      notes: typeof saved.notes === 'string' ? saved.notes : '',
      booked: saved.booked === true
    };
  }

  function saveTicket(id, patch) {
    var next = ticketState(id);
    for (var k in patch) {
      if (Object.prototype.hasOwnProperty.call(patch, k)) next[k] = patch[k];
    }
    tickets[id] = next;
    Store.set(KEY_TICKETS, tickets);
  }

  /* ---------- Testata ---------- */

  function renderMasthead() {
    document.getElementById('tripMeta').textContent =
      TRIP.people + ' · ' + DAYS.length + ' giornate';
    document.getElementById('tripDates').textContent = TRIP.dates;
    document.getElementById('tripBase').textContent =
      TRIP.base.name + ', ' + TRIP.base.address;
  }

  /* ---------- Avviso ---------- */

  function buildNotice() {
    var box = el('aside', 'notice');
    box.appendChild(el('h3', 'notice__title', NOTICE.title));
    var body = el('div', 'notice__body');
    body.innerHTML = NOTICE.body;
    box.appendChild(body);
    return box;
  }

  /* ---------- Tappa ---------- */

  function buildStop(stop, day) {
    var li = el('li', 'stop');
    li.dataset.stop = stop.id;
    if (done[stop.id]) li.classList.add('is-done');

    /* colonna binario: il quadratino è anche la spunta */
    var rail = el('div', 'stop__rail');
    var mark = el('button', 'mark');
    mark.type = 'button';
    mark.setAttribute('aria-pressed', done[stop.id] ? 'true' : 'false');
    mark.setAttribute('aria-label', 'Segna come fatta: ' + stop.time + ' ' + stop.name);
    mark.appendChild(el('span', 'mark__box'));
    rail.appendChild(mark);
    li.appendChild(rail);

    var body = el('div', 'stop__body');

    var detailId = 'detail-' + stop.id;
    var head = el('button', 'stop__head');
    head.type = 'button';
    head.setAttribute('aria-expanded', 'false');
    head.setAttribute('aria-controls', detailId);
    head.appendChild(el('span', 'stop__time', stop.time));
    head.appendChild(el('span', 'stop__name', stop.name));
    head.appendChild(el('span', 'stop__sub', stop.subtitle));

    if (!stop.free) {
      var tags = el('div', 'stop__tags');
      tags.appendChild(el('span', 'tag tag--pay', stop.pay || 'Ingresso a pagamento'));
      if (stop.booking) tags.appendChild(el('span', 'tag', 'Da prenotare'));
      head.appendChild(tags);
    }
    body.appendChild(head);

    var detail = el('div', 'stop__detail');
    detail.id = detailId;
    detail.hidden = true;

    var text = el('div', 'stop__text');
    text.innerHTML = stop.detail;
    detail.appendChild(text);

    var actions = el('div', 'stop__actions');

    if (stop.map) {
      var maps = el('a', 'btn', 'Apri in Maps');
      maps.href = mapUrl(stop.map);
      maps.target = '_blank';
      maps.rel = 'noopener';
      actions.appendChild(maps);
    }

    if (stop.phone) {
      var call = el('a', 'btn', stop.phone);
      call.href = telUrl(stop.phone);
      actions.appendChild(call);
    }

    var toggle = el('button', 'btn');
    toggle.type = 'button';
    toggle.dataset.toggle = stop.id;
    toggle.setAttribute('aria-pressed', done[stop.id] ? 'true' : 'false');
    toggle.textContent = done[stop.id] ? 'Fatta' : 'Segna come fatta';
    actions.appendChild(toggle);

    detail.appendChild(actions);
    body.appendChild(detail);
    li.appendChild(body);

    head.addEventListener('click', function () {
      var open = detail.hidden;
      detail.hidden = !open;
      head.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    mark.addEventListener('click', function () {
      setDone(stop.id, !done[stop.id], day);
    });

    toggle.addEventListener('click', function () {
      setDone(stop.id, !done[stop.id], day);
    });

    return li;
  }

  function setDone(stopId, value, day) {
    if (value) {
      done[stopId] = true;
    } else {
      delete done[stopId];
    }
    Store.set(KEY_DONE, done);
    paintStop(stopId);
    paintProgress(day);
  }

  function paintStop(stopId) {
    var li = document.querySelector('[data-stop="' + stopId + '"]');
    if (!li) return;
    var isDone = done[stopId] === true;
    li.classList.toggle('is-done', isDone);
    li.querySelector('.mark').setAttribute('aria-pressed', isDone ? 'true' : 'false');
    var toggle = li.querySelector('[data-toggle]');
    toggle.setAttribute('aria-pressed', isDone ? 'true' : 'false');
    toggle.textContent = isDone ? 'Fatta' : 'Segna come fatta';
  }

  function paintProgress(day) {
    var total = day.stops.length;
    var count = 0;
    for (var i = 0; i < total; i++) {
      if (done[day.stops[i].id]) count++;
    }
    var panel = document.getElementById('panel-' + day.id);
    if (!panel) return;
    panel.querySelector('.progress__num').textContent = String(count);
    panel.querySelector('.progress__fill').style.width =
      Math.round((count / total) * 100) + '%';
    panel.querySelector('.progress__track').setAttribute('aria-valuenow', String(count));
  }

  /* ---------- Giornata ---------- */

  function buildDayPanel(day) {
    var panel = el('section', 'panel');
    panel.id = 'panel-' + day.id;
    panel.setAttribute('role', 'tabpanel');
    panel.setAttribute('aria-labelledby', 'tab-' + day.id);
    panel.tabIndex = -1;
    panel.style.setProperty('--day', day.color);
    panel.hidden = true;

    panel.appendChild(el('div', 'day__bar'));

    var title = el('h2', 'day__title', day.long);
    title.appendChild(el('span', 'day__date', day.date));
    panel.appendChild(title);

    panel.appendChild(el('p', 'day__theme', day.theme));

    if (day.notice) panel.appendChild(buildNotice());

    var progress = el('div', 'progress');
    var count = el('p', 'progress__count');
    count.appendChild(el('span', 'progress__num', '0'));
    count.appendChild(document.createTextNode('/' + day.stops.length));
    progress.appendChild(count);

    var track = el('div', 'progress__track');
    track.setAttribute('role', 'progressbar');
    track.setAttribute('aria-valuemin', '0');
    track.setAttribute('aria-valuemax', String(day.stops.length));
    track.setAttribute('aria-label', 'Tappe fatte di ' + day.long);
    track.appendChild(el('div', 'progress__fill'));
    progress.appendChild(track);
    panel.appendChild(progress);

    var list = el('ol', 'timeline');
    for (var i = 0; i < day.stops.length; i++) {
      list.appendChild(buildStop(day.stops[i], day));
    }
    panel.appendChild(list);

    return panel;
  }

  /* ---------- Biglietti ---------- */

  function buildTicketCard(ticket) {
    var state = ticketState(ticket.id);

    var card = el('article', 'ticket');
    if (state.booked) card.classList.add('is-booked');

    card.appendChild(el('h3', 'ticket__name', ticket.name));
    card.appendChild(el('p', 'ticket__when', ticket.when));
    card.appendChild(el('p', 'ticket__place', ticket.place));
    card.appendChild(el('p', 'ticket__note', ticket.note));

    var codeField = el('div', 'field');
    var codeLabel = el('label', 'field__label', 'Codice di prenotazione');
    codeLabel.htmlFor = 'code-' + ticket.id;
    var codeInput = el('input', 'field__input');
    codeInput.type = 'text';
    codeInput.id = 'code-' + ticket.id;
    codeInput.value = state.code;
    codeInput.placeholder = '—';
    codeInput.autocomplete = 'off';
    codeInput.spellcheck = false;
    codeField.appendChild(codeLabel);
    codeField.appendChild(codeInput);
    card.appendChild(codeField);

    var notesField = el('div', 'field');
    var notesLabel = el('label', 'field__label', 'Note');
    notesLabel.htmlFor = 'notes-' + ticket.id;
    var notesArea = el('textarea', 'field__area');
    notesArea.id = 'notes-' + ticket.id;
    notesArea.value = state.notes;
    notesArea.placeholder = 'Orario esatto, ingresso, chi ha la mail…';
    notesField.appendChild(notesLabel);
    notesField.appendChild(notesArea);
    card.appendChild(notesField);

    var check = el('label', 'check');
    var checkInput = el('input', 'check__input');
    checkInput.type = 'checkbox';
    checkInput.checked = state.booked;
    check.appendChild(checkInput);
    check.appendChild(el('span', 'check__box'));
    check.appendChild(el('span', 'check__text', 'Prenotato'));
    card.appendChild(check);

    var maps = el('a', 'btn ticket__map', 'Apri in Maps');
    maps.href = mapUrl(ticket.map);
    maps.target = '_blank';
    maps.rel = 'noopener';
    card.appendChild(maps);

    codeInput.addEventListener('input', function () {
      saveTicket(ticket.id, { code: codeInput.value });
    });
    notesArea.addEventListener('input', function () {
      saveTicket(ticket.id, { notes: notesArea.value });
    });
    checkInput.addEventListener('change', function () {
      saveTicket(ticket.id, { booked: checkInput.checked });
      card.classList.toggle('is-booked', checkInput.checked);
    });

    return card;
  }

  function buildTicketsPanel() {
    var panel = el('section', 'panel');
    panel.id = 'panel-tickets';
    panel.setAttribute('role', 'tabpanel');
    panel.setAttribute('aria-labelledby', 'tab-tickets');
    panel.tabIndex = -1;
    panel.style.setProperty('--day', 'var(--gold)');
    panel.hidden = true;

    panel.appendChild(el('div', 'day__bar'));

    var title = el('h2', 'day__title', 'Biglietti');
    title.appendChild(el('span', 'day__date', 'Quattro ingressi da prenotare'));
    panel.appendChild(title);

    panel.appendChild(
      el('p', 'day__theme', 'Tutto il resto del viaggio è gratuito o si paga sul posto.')
    );

    var intro = el('div', 'tickets__intro');
    intro.innerHTML =
      '<p><strong>Ai controlli serve comunque il QR dell’email di conferma.</strong> ' +
      'Questa app è solo un promemoria: i codici scritti qui non sostituiscono il biglietto.</p>' +
      '<p>Tenere le email di conferma scaricate sul telefono prima di partire.</p>';
    panel.appendChild(intro);

    panel.appendChild(buildNotice());

    for (var i = 0; i < TICKETS.length; i++) {
      panel.appendChild(buildTicketCard(TICKETS[i]));
    }

    return panel;
  }

  /* ---------- Tab ---------- */

  var tabButtons = [];
  var tabIds = [];

  function buildTabs() {
    var list = document.getElementById('tablist');
    var panels = document.getElementById('panels');

    function addTab(id, label, color, panel) {
      var tab = el('button', 'tab', label);
      tab.type = 'button';
      tab.id = 'tab-' + id;
      tab.setAttribute('role', 'tab');
      tab.setAttribute('aria-selected', 'false');
      tab.setAttribute('aria-controls', 'panel-' + id);
      tab.tabIndex = -1;
      tab.style.setProperty('--day', color);
      tab.addEventListener('click', function () {
        selectTab(id, true);
      });
      list.appendChild(tab);
      panels.appendChild(panel);
      tabButtons.push(tab);
      tabIds.push(id);
    }

    for (var i = 0; i < DAYS.length; i++) {
      var day = DAYS[i];
      addTab(
        day.id,
        day.label + ' ' + day.date.split(' ')[0],
        day.color,
        buildDayPanel(day)
      );
    }
    addTab('tickets', 'Biglietti', 'var(--ink)', buildTicketsPanel());

    list.addEventListener('keydown', function (event) {
      var index = tabIds.indexOf(current);
      var next = null;
      if (event.key === 'ArrowRight') next = (index + 1) % tabIds.length;
      else if (event.key === 'ArrowLeft') next = (index - 1 + tabIds.length) % tabIds.length;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = tabIds.length - 1;
      if (next === null) return;
      event.preventDefault();
      selectTab(tabIds[next], false);
      tabButtons[next].focus();
    });
  }

  var current = null;

  function selectTab(id, scroll) {
    current = id;
    for (var i = 0; i < tabIds.length; i++) {
      var active = tabIds[i] === id;
      tabButtons[i].setAttribute('aria-selected', active ? 'true' : 'false');
      tabButtons[i].tabIndex = active ? 0 : -1;
      document.getElementById('panel-' + tabIds[i]).hidden = !active;
    }
    Store.set(KEY_TAB, id);

    if (scroll) {
      var tabs = document.getElementById('tabs');
      var top = tabs.offsetTop;
      if (window.pageYOffset > top) window.scrollTo(0, top);
    }
  }

  /* ---------- Azzeramento ---------- */

  function wireReset() {
    var btn = document.getElementById('resetBtn');
    var confirm = document.getElementById('resetConfirm');
    var yes = document.getElementById('resetYes');
    var no = document.getElementById('resetNo');

    btn.addEventListener('click', function () {
      confirm.hidden = false;
      btn.hidden = true;
      yes.focus();
    });

    no.addEventListener('click', function () {
      confirm.hidden = true;
      btn.hidden = false;
      btn.focus();
    });

    yes.addEventListener('click', function () {
      done = {};
      Store.set(KEY_DONE, done);
      var all = document.querySelectorAll('[data-stop]');
      for (var i = 0; i < all.length; i++) {
        paintStop(all[i].dataset.stop);
      }
      for (var d = 0; d < DAYS.length; d++) {
        paintProgress(DAYS[d]);
      }
      confirm.hidden = true;
      btn.hidden = false;
      btn.focus();
    });
  }

  /* ---------- Avvio ---------- */

  renderMasthead();
  buildTabs();
  wireReset();

  for (var d = 0; d < DAYS.length; d++) {
    paintProgress(DAYS[d]);
  }

  var saved = Store.get(KEY_TAB, '');
  selectTab(tabIds.indexOf(saved) === -1 ? tabIds[0] : saved, false);

  if ('serviceWorker' in navigator && location.protocol.indexOf('http') === 0) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('./sw.js', { scope: './' }).catch(function () {
        /* niente offline, l'app funziona lo stesso */
      });
    });
  }
})();
