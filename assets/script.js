(function () {
    var end = new Date('2026-09-16T20:00:00+02:00');
    var target = document.getElementById('localTime');
    if (!target) return;

    if (Intl.DateTimeFormat().resolvedOptions().timeZone === 'Europe/Berlin') return;

    var endStr = end.toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' });
    target.textContent = 'That is ' + endStr + ' in your local time.';
})();
