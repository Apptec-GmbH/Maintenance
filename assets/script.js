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
