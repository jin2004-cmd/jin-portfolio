/* =========================================================================
   金佳信 · 项目作品集 — 交互层
   原则：静态内容优先。JS 只做增强：动效、预览、筛选、快速索引。
   任一依赖缺失（GSAP / Lenis）时，链接、内容、筛选仍然可用。
   ========================================================================= */
(function () {
  'use strict';

  var doc = document;
  var html = doc.documentElement;
  var $ = function (s, c) { return (c || doc).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || doc).querySelectorAll(s)); };
  var motionOK = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var hasGSAP = !!(window.gsap && window.ScrollTrigger);
  var hasLenis = !!window.Lenis;

  if (hasGSAP) { try { window.gsap.registerPlugin(window.ScrollTrigger); } catch (e) {} }

  /* ---------------------------------------------------------------- 1. smooth scroll */
  var lenis = null;
  if (hasLenis && finePointer && motionOK) {
    try {
      lenis = new window.Lenis({
        duration: 0.95,
        easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); },
        smoothWheel: true,
        touchMultiplier: 1.6
      });
      if (hasGSAP) {
        lenis.on('scroll', window.ScrollTrigger.update);
        window.gsap.ticker.add(function (time) { lenis.raf(time * 1000); });
        window.gsap.ticker.lagSmoothing(0);
      } else {
        var rafL = function (t) { lenis.raf(t); window.requestAnimationFrame(rafL); };
        window.requestAnimationFrame(rafL);
      }
      doc.body.classList.add('lenis-on');
    } catch (e) { lenis = null; }
  }

  function scrollToEl(el) {
    if (!el) return;
    var y = el.getBoundingClientRect().top + window.pageYOffset - 64;
    if (lenis) { lenis.scrollTo(y, { duration: 1.1 }); return; }
    window.scrollTo({ top: y, behavior: motionOK ? 'smooth' : 'auto' });
  }

  /* ---------------------------------------------------------------- 2. nav + progress */
  var nav = $('#nav');
  var progress = $('#progress');
  var lastY = window.pageYOffset;
  var ticking = false;

  function onScroll() {
    var y = window.pageYOffset;
    if (nav) {
      if (y > 24) nav.classList.add('is-stuck'); else nav.classList.remove('is-stuck');
    }
    if (progress) {
      var h = doc.documentElement.scrollHeight - window.innerHeight;
      var p = h > 0 ? Math.min(1, Math.max(0, y / h)) : 0;
      progress.style.transform = 'scaleX(' + p.toFixed(4) + ')';
    }
    lastY = y;
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; window.requestAnimationFrame(onScroll); }
  }, { passive: true });
  onScroll();

  /* ---------------------------------------------------------------- 3. anchors */
  $$('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href');
      if (id === '#' || id.length < 2) return;
      var target = doc.getElementById(id.slice(1));
      if (!target) return;
      e.preventDefault();
      scrollToEl(target);
      if (history.replaceState) { try { history.replaceState(null, '', id); } catch (er) {} }
    });
  });

  /* ---------------------------------------------------------------- 4. reveal */
  var revealEls = $$('[data-reveal]');
  function revealAll() { revealEls.forEach(function (el) { el.classList.add('is-in'); }); }

  if (hasGSAP && motionOK && revealEls.length) {
    window.gsap.set(revealEls, { opacity: 0, y: 26 });
    window.ScrollTrigger.batch(revealEls, {
      start: 'top 90%',
      once: true,
      onEnter: function (batch) {
        window.gsap.to(batch, {
          opacity: 1, y: 0, duration: 0.95, ease: 'power3.out',
          stagger: 0.07, overwrite: true,
          onComplete: function () { batch.forEach(function (el) { el.classList.add('is-in'); }); }
        });
      }
    });
    window.ScrollTrigger.refresh();
  } else if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else { revealAll(); }

  // 保险：任何情况下 2.6s 后仍未显形的元素强制显形
  window.setTimeout(function () {
    revealEls.forEach(function (el) {
      var cs = window.getComputedStyle(el);
      if (parseFloat(cs.opacity) < 0.05) el.classList.add('is-in');
      el.style.willChange = '';
    });
    // 首屏入场动画的兜底：动画被系统关闭时也要看得到字
    $$('.hero .anim').forEach(function (el) {
      if (parseFloat(window.getComputedStyle(el).opacity) < 0.05) {
        el.style.animation = 'none';
        el.style.opacity = '1';
        el.style.transform = 'none';
      }
    });
  }, 2600);

  /* ---------------------------------------------------------------- 4b. count-up */
  (function () {
    var nums = $$('[data-count]');
    if (!nums.length) return;
    var run = function (el) {
      var target = parseFloat(el.getAttribute('data-count')) || 0;
      var suffix = el.getAttribute('data-suffix') || '';
      if (!motionOK) { el.textContent = target + suffix; return; }
      var start = null, dur = 1200;
      var step = function (t) {
        if (start === null) start = t;
        var k = Math.min(1, (t - start) / dur);
        var eased = 1 - Math.pow(1 - k, 3);
        el.textContent = Math.round(target * eased) + suffix;
        if (k < 1) window.requestAnimationFrame(step);
      };
      window.requestAnimationFrame(step);
      // 兜底：rAF 被挂起（后台标签页等）时也要落到正确数字
      window.setTimeout(function () { el.textContent = target + suffix; }, dur + 500);
    };
    if ('IntersectionObserver' in window) {
      var cio = new IntersectionObserver(function (es) {
        es.forEach(function (e) {
          if (e.isIntersecting) { run(e.target); cio.unobserve(e.target); }
        });
      }, { threshold: 0.4 });
      nums.forEach(function (n) { cio.observe(n); });
    } else { nums.forEach(run); }
  })();

  /* ---------------------------------------------------------------- 5. hero video */
  var heroVid = $('#heroVid');
  if (heroVid) {
    var loadHero = function () {
      var src = heroVid.getAttribute('data-src');
      if (!src) return;
      heroVid.src = src;
      heroVid.preload = 'auto';
      var p = heroVid.play();
      if (p && p.catch) p.catch(function () { /* 自动播放被拦截：保留 poster */ });
    };
    if (motionOK && finePointer && window.innerWidth > 720) {
      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(loadHero, { timeout: 900 });
      } else { window.setTimeout(loadHero, 260); }
    }
    heroVid.addEventListener('error', function () { heroVid.style.display = 'none'; });
  }

  /* ---------------------------------------------------------------- 6. cursor glow + magnet */
  var glow = $('#glow');
  if (glow && finePointer && motionOK) {
    doc.body.classList.add('has-pointer');
    var gx = window.innerWidth / 2, gy = window.innerHeight * 0.35;
    var tx = gx, ty = gy, gRunning = false;
    window.addEventListener('pointermove', function (e) {
      tx = e.clientX; ty = e.clientY;
      if (!gRunning) { gRunning = true; loopGlow(); }
    }, { passive: true });
    function loopGlow() {
      gx += (tx - gx) * 0.12;
      gy += (ty - gy) * 0.12;
      glow.style.transform = 'translate3d(' + gx.toFixed(1) + 'px,' + gy.toFixed(1) + 'px,0)';
      if (Math.abs(tx - gx) > 0.4 || Math.abs(ty - gy) > 0.4) {
        window.requestAnimationFrame(loopGlow);
      } else { gRunning = false; }
    }
  }

  if (finePointer && motionOK) {
    $$('[data-magnet]').forEach(function (el) {
      el.addEventListener('pointermove', function (e) {
        var r = el.getBoundingClientRect();
        var dx = (e.clientX - r.left - r.width / 2) * 0.12;
        var dy = (e.clientY - r.top - r.height / 2) * 0.18;
        el.style.transform = 'translate(' + dx.toFixed(1) + 'px,' + (dy - 2).toFixed(1) + 'px)';
      });
      el.addEventListener('pointerleave', function () { el.style.transform = ''; });
    });
  }

  /* ---------------------------------------------------------------- 7. selected list ⇄ stage */
  var stage = $('#selStage');
  var stageImg = $('#stageImg');
  var stageVid = $('#stageVid');
  var stageTitle = $('#stageTitle');
  var stageState = $('#stageState');
  var selLinks = $$('#selList .sel-link');
  var activeSel = null;

  function activateSel(link) {
    if (!stage || !link || link === activeSel) return;
    activeSel = link;
    var poster = link.getAttribute('data-poster');
    var video = link.getAttribute('data-video');
    var title = link.getAttribute('data-title') || '';

    if (poster && stageImg.getAttribute('src') !== poster) {
      stageImg.style.opacity = '0';
      var im = new Image();
      im.onload = function () {
        stageImg.src = poster;
        if (stageVid) stageVid.poster = poster;
        stageImg.style.opacity = '1';
      };
      im.src = poster;
    }
    if (title) stageTitle.textContent = title;

    if (video && stageVid) {
      if (stageVid.getAttribute('data-cur') !== video) {
        stageVid.setAttribute('data-cur', video);
        stageVid.src = video;
      }
      stage.classList.add('has-video');
      var pr = stageVid.play();
      if (pr && pr.catch) pr.catch(function () {
        stage.classList.remove('has-video');
        if (stageState) stageState.textContent = 'Poster only';
      });
      if (stageState) stageState.textContent = 'Preview';
    } else if (stageVid) {
      stageVid.pause();
      stage.classList.remove('has-video');
      if (stageState) stageState.textContent = 'Image';
    }
  }

  selLinks.forEach(function (link) {
    link.addEventListener('pointerenter', function () { activateSel(link); });
    link.addEventListener('focus', function () { activateSel(link); });
  });

  /* ---------------------------------------------------------------- 8. card glare + tilt + hover video */
  var cards = $$('#grid .card');

  if (finePointer && motionOK) {
    cards.forEach(function (card) {
      var glare = $('.card-glare', card);
      card.addEventListener('pointermove', function (e) {
        var r = card.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width;
        var py = (e.clientY - r.top) / r.height;
        if (glare) {
          glare.style.setProperty('--cx', (px * 100).toFixed(1) + '%');
          glare.style.setProperty('--cy', (py * 100).toFixed(1) + '%');
        }
        card.style.setProperty('--ry', ((px - 0.5) * 3.2).toFixed(2) + 'deg');
        card.style.setProperty('--rx', ((0.5 - py) * 2.6).toFixed(2) + 'deg');
      });
      card.addEventListener('pointerleave', function () {
        card.style.setProperty('--ry', '0deg');
        card.style.setProperty('--rx', '0deg');
      });
    });
  }

  if (finePointer && motionOK) {
    cards.forEach(function (card) {
      var src = card.getAttribute('data-video');
      if (!src) return;
      var vid = $('.card-video', card);
      if (!vid) return;
      var timer = null;
      card.addEventListener('pointerenter', function () {
        timer = window.setTimeout(function () {
          if (!vid.getAttribute('src')) vid.src = src;
          vid.preload = 'auto';
          var p = vid.play();
          if (p && p.catch) p.catch(function () {});
          card.classList.add('playing');
        }, 320);
      });
      card.addEventListener('pointerleave', function () {
        if (timer) { window.clearTimeout(timer); timer = null; }
        card.classList.remove('playing');
        window.setTimeout(function () {
          if (!card.classList.contains('playing')) vid.pause();
        }, 480);
      });
    });
  }

  /* ---------------------------------------------------------------- 9. filters */
  var chips = $$('#filters .chip');
  var archCount = $('#archCount');
  var CATS = ['all', 'video', 'tool', 'doc'];

  function applyFilter(cat, remember) {
    if (CATS.indexOf(cat) < 0) cat = 'all';
    var shown = 0;
    cards.forEach(function (card, i) {
      var ok = (cat === 'all' || card.getAttribute('data-cat') === cat);
      if (ok) {
        shown++;
        card.removeAttribute('hidden');
        if (motionOK && hasGSAP) {
          window.gsap.fromTo(card, { opacity: 0, y: 14 }, {
            opacity: 1, y: 0, duration: 0.5, delay: Math.min(i * 0.02, 0.24), ease: 'power2.out', overwrite: true
          });
        }
      } else {
        card.setAttribute('hidden', '');
      }
    });
    chips.forEach(function (c) {
      var on = c.getAttribute('data-cat') === cat;
      c.classList.toggle('on', on);
      c.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    if (archCount) archCount.textContent = '显示 ' + shown + ' / ' + cards.length;
    var empty = $('#empty');
    if (empty) empty.classList.toggle('on', shown === 0);
    if (remember && history.replaceState) {
      try { history.replaceState(null, '', '#' + cat); } catch (e) {}
    }
    if (hasGSAP) { try { window.ScrollTrigger.refresh(); } catch (e) {} }
  }

  chips.forEach(function (c) {
    c.addEventListener('click', function () { applyFilter(c.getAttribute('data-cat'), true); });
  });

  var initHash = (location.hash || '').replace('#', '');
  applyFilter(CATS.indexOf(initHash) > -1 ? initHash : 'all', false);

  /* ---------------------------------------------------------------- 10. keyboard 1–4 */
  doc.addEventListener('keydown', function (e) {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    var tag = (e.target && e.target.tagName) || '';
    if (tag === 'INPUT' || tag === 'TEXTAREA' || (e.target && e.target.isContentEditable)) return;
    var map = { '1': 'all', '2': 'video', '3': 'tool', '4': 'doc' };
    if (map[e.key]) applyFilter(map[e.key], true);
  });

  /* ---------------------------------------------------------------- 11. active nav link */
  var sections = [$('#sel'), $('#arch'), $('#meth'), $('#about')];
  var navLinks = $$('.nav-links a');
  if ('IntersectionObserver' in window && sections.length) {
    var navIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var id = '#' + en.target.id;
        navLinks.forEach(function (a) { a.classList.toggle('on', a.getAttribute('href') === id); });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { if (s) navIO.observe(s); });
  }

  /* ---------------------------------------------------------------- 12. command palette */
  var pal = $('#pal');
  var palInput = $('#palInput');
  var palList = $('#palList');
  var palOpenBtn = $('#palOpen');
  var palHint = $('#palHint');

  var palette = [];
  $$('#grid .card').forEach(function (card, i) {
    var hit = $('.card-hit', card);
    var title = $('.card-title', card);
    if (!hit || !title) return;
    var cat = card.getAttribute('data-cat');
    palette.push({
      t: title.textContent.trim(),
      href: hit.getAttribute('href'),
      cat: cat === 'video' ? '影像' : cat === 'tool' ? '工具' : '文档',
      keys: (card.getAttribute('data-key') || '') + ' ' + title.textContent,
      ext: hit.getAttribute('target') === '_blank',
      idx: ('0' + (i + 1)).slice(-2)
    });
  });
  [
    { t: '精选作品 · Selected', href: '#sel', cat: '跳转' },
    { t: '全部档案 · Archive', href: '#arch', cat: '跳转' },
    { t: '方法 · Method', href: '#meth', cat: '跳转' },
    { t: '关于 · About', href: '#about', cat: '跳转' }
  ].forEach(function (s) { palette.push({ t: s.t, href: s.href, cat: s.cat, keys: s.t, idx: '··' }); });

  var palFiltered = palette.slice();
  var palIndex = 0;

  function renderPal(q) {
    q = (q || '').trim().toLowerCase();
    palFiltered = palette.filter(function (p) {
      if (!q) return true;
      return (p.t + ' ' + (p.keys || '') + ' ' + p.cat).toLowerCase().indexOf(q) > -1;
    });
    palIndex = 0;
    if (!palFiltered.length) {
      palList.innerHTML = '<p class="pal-empty">没有匹配项</p>';
      return;
    }
    palList.innerHTML = palFiltered.map(function (p, i) {
      return '<div class="pal-item' + (i === 0 ? ' on' : '') + '" data-i="' + i + '">' +
        '<span class="pi-idx">' + p.idx + '</span>' +
        '<span class="pi-t">' + p.t + '</span>' +
        '<span class="pi-m">' + p.cat + '</span></div>';
    }).join('');
  }

  function movePal(step) {
    if (!palFiltered.length) return;
    palIndex = (palIndex + step + palFiltered.length) % palFiltered.length;
    var items = $$('.pal-item', palList);
    items.forEach(function (it, i) { it.classList.toggle('on', i === palIndex); });
    if (items[palIndex]) items[palIndex].scrollIntoView({ block: 'nearest' });
  }

  function goPal(i) {
    var p = palFiltered[i];
    if (!p) return;
    closePal();
    if (p.href.charAt(0) === '#') {
      scrollToEl(doc.getElementById(p.href.slice(1)));
    } else if (p.ext) {
      window.open(p.href, '_blank');
    } else {
      window.location.href = p.href;
    }
  }

  function openPal() {
    if (!pal) return;
    pal.classList.add('on');
    doc.body.classList.add('is-locked');
    if (lenis) lenis.stop();
    renderPal('');
    window.setTimeout(function () { if (palInput) palInput.focus(); }, 40);
  }
  function closePal() {
    if (!pal) return;
    pal.classList.remove('on');
    doc.body.classList.remove('is-locked');
    if (lenis) lenis.start();
    if (palInput) palInput.value = '';
  }

  if (palOpenBtn) palOpenBtn.addEventListener('click', openPal);
  if (pal) {
    pal.addEventListener('click', function (e) { if (e.target === pal) closePal(); });
    palList.addEventListener('click', function (e) {
      var it = e.target.closest ? e.target.closest('.pal-item') : null;
      if (it) goPal(parseInt(it.getAttribute('data-i'), 10));
    });
  }
  if (palInput) {
    palInput.addEventListener('input', function () { renderPal(palInput.value); });
  }
  doc.addEventListener('keydown', function (e) {
    var isK = (e.key === 'k' || e.key === 'K');
    if ((e.metaKey || e.ctrlKey) && isK) {
      e.preventDefault();
      if (pal && pal.classList.contains('on')) closePal(); else openPal();
      return;
    }
    if (!pal || !pal.classList.contains('on')) return;
    if (e.key === 'Escape') { e.preventDefault(); closePal(); }
    else if (e.key === 'ArrowDown') { e.preventDefault(); movePal(1); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); movePal(-1); }
    else if (e.key === 'Enter') { e.preventDefault(); goPal(palIndex); }
  });

  // 平台提示：Mac 显示 ⌘K
  if (navigator.platform && /Mac/i.test(navigator.platform)) {
    var kh = $('#kbdHint');
    if (kh) kh.textContent = '⌘ K';
  }

  /* ---------------------------------------------------------------- 13. misc */
  // 让外部链接在 file:// 下也能正常打开
  $$('a[target="_blank"]').forEach(function (a) {
    a.setAttribute('rel', 'noopener');
  });

  if (hasGSAP && motionOK) {
    // 极轻的视差：首屏封面
    try {
      window.gsap.to('.hero-media', {
        yPercent: 8, ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
      });
    } catch (e) {}
  }

  window.addEventListener('load', function () {
    if (hasGSAP) { try { window.ScrollTrigger.refresh(); } catch (e) {} }
  });
})();
