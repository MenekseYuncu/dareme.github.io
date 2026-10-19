(function () {
  const params = new URLSearchParams(window.location.search);
  const friendId = params.get('friend_id') || params.get('user_id') || '';
  const button = document.getElementById('invite-action');
  const note = document.getElementById('platform-note');
  const isAndroid = /Android/i.test(navigator.userAgent);
  const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
  const referrer = encodeURIComponent('friend_id=' + friendId);
  const playStore = 'https://play.google.com/store/apps/details?id=com.menekseync.dareme&referrer=' + referrer;
  const deepLink = 'dareme://friend/add?user_id=' + encodeURIComponent(friendId);

  if (!friendId) {
    button.textContent = 'DareMe’yi indir';
    button.href = 'https://play.google.com/store/apps/details?id=com.menekseync.dareme';
    note.textContent = 'DareMe şu anda Android’de kullanılabilir.';
    return;
  }

  if (isIOS) {
    button.textContent = 'iOS uygulaması yakında';
    button.href = '/';
    note.textContent = 'Daveti Android cihazında açabilir veya iOS sürümü için bizi takip edebilirsin.';
    return;
  }

  button.href = isAndroid ? deepLink : playStore;
  button.addEventListener('click', function () {
    if (!isAndroid) return;
    const startedAt = Date.now();
    window.setTimeout(function () {
      if (document.visibilityState === 'visible' && Date.now() - startedAt < 2200) {
        window.location.href = playStore;
      }
    }, 1200);
  });
})();
