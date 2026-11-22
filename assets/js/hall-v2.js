/* =========================================================================
   大厅首页 · 交互（零依赖）
   - 滚动进度 / 导航吸顶
   - [data-reveal] 入场
   - [data-count] 数字滚动
   - 首屏视频延迟加载（省流量，失败退回封面）
   - 厅卡光标光晕
   - 键盘 1–8 直达八厅
   依赖缺失或动画关闭时，内容与链接始终可用。
   ========================================================================= */
(function () {
  'use strict';
  var doc = document, html = doc.documentElement;
  var motionOK = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var $ = function (s, c) { return (c || doc).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || doc).querySelectorAll(s)); };

  /* ---------------- 1. 进度 + 吸顶 ---------------- */
  var nav = $('#nav'), bar = $('#progress'), tick = false;
  function onScroll() {
    var y = window.pageYOffset || doc.documentElement.scrollTop;
    if (nav) nav.classList.toggle('is-stuck', y > 16);
    if (bar) {
      var h = doc.documentElement.scrollHeight - window.innerHeight;
      bar.style.transform = 'scaleX(' + (h > 0 ? Math.min(1, Math.max(0, y / h)) : 0).toFixed(4) + ')';
    }
    tick = false;
  }
  window.addEventListener('scroll', function () {
    if (!tick) { tick = true; window.requestAnimationFrame(onScroll); }
  }, { passive: true });
  onScroll();

  /* ---------------- 2. 入场 ---------------- */
  var els = $$('[data-reveal]');
  var staticMode = html.classList.contains('no-anim');
  if (staticMode) {
    els.forEach(function (el) { el.classList.add('is-in'); });
  } else if (!('IntersectionObserver' in window)) {
    html.classList.add('no-io');
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('is-in');
          io.unobserve(en.target);
        }
      });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.05 });
    els.forEach(function (el) { io.observe(el); });
    // 兜底：2.4s 后仍在视口内却没显形的，强制显形
    window.setTimeout(function () {
      els.forEach(function (el) {
        var r = el.getBoundingClientRect();
        if (r.top < window.innerHeight && parseFloat(window.getComputedStyle(el).opacity) < 0.05) {
          el.classList.add('is-in');
        }
      });
    }, 2400);
  }

  /* ---------------- 3. 数字滚动 ---------------- */
  var nums = $$('[data-count]');
  function finalText(el) {
    var target = parseFloat(el.getAttribute('data-count')) || 0;
    var dec = parseInt(el.getAttribute('data-dec') || '0', 10);
    return target.toFixed(dec) + (el.getAttribute('data-suffix') || '');
  }
  function runCount(el) {
    var target = parseFloat(el.getAttribute('data-count')) || 0;
    var dec = parseInt(el.getAttribute('data-dec') || '0', 10);
    var suffix = el.getAttribute('data-suffix') || '';
    if (!motionOK || staticMode) { el.textContent = finalText(el); return; }
    var t0 = null, dur = 1250;
    function step(t) {
      if (t0 === null) t0 = t;
      var k = Math.min(1, (t - t0) / dur);
      var e = 1 - Math.pow(1 - k, 3);
      el.textContent = (target * e).toFixed(dec) + suffix;
      if (k < 1) window.requestAnimationFrame(step);
    }
    window.requestAnimationFrame(step);
    window.setTimeout(function () { el.textContent = finalText(el); }, dur + 400);
  }
  if (staticMode || !motionOK) {
    nums.forEach(function (n) { n.textContent = finalText(n); });
  } else if (nums.length && 'IntersectionObserver' in window) {
    var cio = new IntersectionObserver(function (es) {
      es.forEach(function (en) { if (en.isIntersecting) { runCount(en.target); cio.unobserve(en.target); } });
    }, { threshold: 0.5 });
    nums.forEach(function (n) { cio.observe(n); });
  } else { nums.forEach(runCount); }

  /* ---------------- 4. 首屏视频 ---------------- */
  var vid = $('#doorVid');
  if (vid) {
    var load = function () {
      var src = vid.getAttribute('data-src');
      if (!src || vid.getAttribute('src')) return;
      vid.src = src;
      var p = vid.play();
      if (p && p.catch) p.catch(function () { /* 被拦截就保留封面 */ });
    };
    if (motionOK && fine && window.innerWidth > 760) {
      if ('requestIdleCallback' in window) window.requestIdleCallback(load, { timeout: 1200 });
      else window.setTimeout(load, 300);
    }
    vid.addEventListener('error', function () { vid.style.display = 'none'; });
  }

  /* ---------------- 5. 厅卡光晕 ---------------- */
  if (fine && motionOK) {
    $$('.zone').forEach(function (z) {
      z.addEventListener('pointermove', function (e) {
        var r = z.getBoundingClientRect();
        z.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100).toFixed(1) + '%');
        z.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100).toFixed(1) + '%');
      });
    });
  }

  /* ---------------- 6. 键盘 1–8 直达 ---------------- */
  doc.addEventListener('keydown', function (e) {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    var tag = (e.target && e.target.tagName) || '';
    if (tag === 'INPUT' || tag === 'TEXTAREA' || (e.target && e.target.isContentEditable)) return;
    var n = parseInt(e.key, 10);
    if (!n || n < 1 || n > 8) return;
    var z = doc.querySelector('.zone[data-key="' + n + '"]');
    if (z) { window.location.href = z.getAttribute('href'); }
  });

  /* ---------------- 7. 平滑锚点 ---------------- */
  $$('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href');
      if (!id || id.length < 2) return;
      var t = doc.getElementById(id.slice(1));
      if (!t) return;
      e.preventDefault();
      var y = t.getBoundingClientRect().top + window.pageYOffset - 60;
      window.scrollTo({ top: y, behavior: motionOK ? 'smooth' : 'auto' });
    });
  });

  /* ---------------- 8. 年份 ---------------- */
  var yr = $('#yr');
  if (yr) yr.textContent = new Date().getFullYear();
})();
