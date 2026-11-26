// Renders project cards from projects.json.
// <div class="grid" data-projects="latest"> -> newest 4
// <div class="grid" data-projects="archive"> -> everything older, grouped by year
(function () {
  var LATEST = 4;
  var MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  function esc(s) {
    return String(s || '').replace(/[&<>"']/g, function (c) {
      return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];
    });
  }
  function fmtDate(d) {
    var p = (d || '').split('-');
    return p.length >= 2 ? MONTHS[+p[1] - 1] + ' ' + p[0] : '';
  }
  function card(p) {
    var thumb = p.image
      ? '<img class="thumb" src="' + esc(p.image) + '" alt="' + esc(p.title) + '" loading="lazy">'
      : '<span class="thumb" style="background:linear-gradient(135deg,' + esc(p.color || '#ff5a1f,#ffb347') + ')"><b>' + esc(p.emoji || '✦') + '</b></span>';
    var href = p.link || p.video || '#';
    var video = p.video
      ? '<a class="badge" href="' + esc(p.video) + '" target="_blank" rel="noopener">▶ Video</a>' : '';
    return '<article class="project">' +
      '<a class="cover" href="' + esc(href) + '" target="_blank" rel="noopener">' + thumb + '</a>' +
      '<div><time>' + fmtDate(p.date) + '</time>' +
      '<a href="' + esc(href) + '" target="_blank" rel="noopener"><strong>' + esc(p.title) + '</strong></a>' +
      '<span>' + esc(p.subtitle) + '</span>' + video + '</div></article>';
  }

  var grids = document.querySelectorAll('[data-projects]');
  if (!grids.length) return;
  fetch('projects.json', {cache: 'no-cache'})
    .then(function (r) { return r.json(); })
    .then(function (all) {
      all.sort(function (a, b) { return (b.date || '').localeCompare(a.date || ''); });
      grids.forEach(function (g) {
        if (g.dataset.projects === 'latest') {
          g.innerHTML = all.slice(0, LATEST).map(card).join('');
          var more = document.getElementById('archive-link');
          if (more) more.hidden = all.length <= LATEST;
        } else {
          var old = all.slice(LATEST), html = '', year = null, open = false;
          if (!old.length) { g.outerHTML = '<p class="empty">Nothing in the archive yet — all projects are on the homepage.</p>'; return; }
          old.forEach(function (p) {
            var y = (p.date || '').slice(0, 4);
            if (y !== year) {
              if (open) html += '</div>';
              html += '<h2>' + esc(y) + '</h2><div class="grid">';
              year = y; open = true;
            }
            html += card(p);
          });
          g.outerHTML = html + '</div>';
        }
      });
    })
    .catch(function () {
      grids.forEach(function (g) { g.innerHTML = '<p class="empty">Could not load projects.</p>'; });
    });
})();
