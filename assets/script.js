(function () {
    var de = document.querySelector('.maintenanceMessage[lang="de"]');
    var en = document.querySelector('.maintenanceMessage[lang="en"]');
    var button = document.getElementById('langSwitch');
    if (!de || !en || !button) return;

    var saved = null;
    try { saved = localStorage.getItem('lang'); } catch (e) {}

    var langs = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || ''];
    var lang = saved === 'de' || saved === 'en' ? saved : (/^de\b/i.test(langs[0]) ? 'de' : 'en');

    function show(next) {
        lang = next;
        de.hidden = lang !== 'de';
        en.hidden = lang !== 'en';
        document.documentElement.lang = lang;
        document.title = lang === 'de'
            ? 'AppTec360 UEM - Wartung'
            : 'AppTec360 UEM - Maintenance';
        button.textContent = lang === 'de' ? 'English' : 'Deutsch';
        button.lang = lang === 'de' ? 'en' : 'de';
    }

    en.classList.remove('translation');
    button.hidden = false;
    button.addEventListener('click', function () {
        show(lang === 'de' ? 'en' : 'de');
        try { localStorage.setItem('lang', lang); } catch (e) {}
    });
    show(lang);
})();

(function () {
    var end = new Date('2026-11-19T15:30:00+01:00');
    var target = document.getElementById('localTime');
    if (!target) return;

    if (Intl.DateTimeFormat().resolvedOptions().timeZone === 'Europe/Berlin') return;

    var endStr = end.toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' });
    target.textContent = 'That is ' + endStr + ' in your local time.';
})();

(function () {
    // Once maintenance is over and DNS points back to the real servers,
    // a reload lands the visitor on the management console.
    var interval = 2 * 60 * 1000;
    var notices = document.querySelectorAll('.reloadNotice');
    var deadline = Date.now() + interval;

    function format(ms) {
        var s = Math.max(0, Math.ceil(ms / 1000));
        var m = Math.floor(s / 60);
        s = s % 60;
        return m + ':' + (s < 10 ? '0' : '') + s;
    }

    function tick() {
        var left = deadline - Date.now();
        if (left <= 0) {
            // reloading while offline would leave the browser's error page behind, which never reloads again
            if (navigator.onLine === false) {
                deadline = Date.now() + 10 * 1000;
            } else {
                location.reload();
                return;
            }
        }
        for (var i = 0; i < notices.length; i++) {
            var de = notices[i].closest('[lang]').lang === 'de';
            notices[i].textContent = de
                ? 'Diese Seite wird in ' + format(left) + ' automatisch neu geladen.'
                : 'This page will reload automatically in ' + format(left) + '.';
            notices[i].hidden = false;
        }
    }

    tick();
    setInterval(tick, 1000);
})();
