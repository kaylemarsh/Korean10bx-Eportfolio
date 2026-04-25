(function () {
  const dot = document.createElement('div');
  dot.id = 'c-dot';
  document.body.appendChild(dot);

  const N = 14;
  const trail = Array.from({ length: N }, () => {
    const d = document.createElement('div');
    d.className = 'c-trail';
    document.body.appendChild(d);
    return d;
  });

  let mx = -100, my = -100;
  const pts = Array.from({ length: N }, () => ({ x: -100, y: -100 }));

  window.addEventListener('mousemove', function (e) {
    mx = e.clientX;
    my = e.clientY;
    dot.style.transform = 'translate(' + mx + 'px,' + my + 'px)';
  }, { passive: true });

  function tick() {
    for (var i = 0; i < N; i++) {
      var px = i === 0 ? mx : pts[i - 1].x;
      var py = i === 0 ? my : pts[i - 1].y;
      pts[i].x += (px - pts[i].x) * 0.28;
      pts[i].y += (py - pts[i].y) * 0.28;
      var s = 1 - (i / N) * 0.75;
      var o = (1 - i / N) * 0.55;
      trail[i].style.cssText =
        'transform:translate(' + pts[i].x + 'px,' + pts[i].y + 'px) scale(' + s + ');opacity:' + o + ';';
    }
    requestAnimationFrame(tick);
  }
  tick();
})();
