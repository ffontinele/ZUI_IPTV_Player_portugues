import { useEffect } from 'react';
import { useUIStore } from '@/state/uiStore';
import { usePlaylistStore } from '@/state/playlistStore';
import { usePlayerStore } from '@/state/playerStore';
import { useToast } from '@/components/ui/Toast';
import { useTranslation } from 'react-i18next';

export function RemoteRouter() {
  const currentScreen = useUIStore((s) => s.currentScreen);
  const modalOpen = useUIStore((s) => s.modalOpen);
  const navigate = useUIStore((s) => s.navigate);
  const openModal = useUIStore((s) => s.openModal);
  const closeModal = useUIStore((s) => s.closeModal);
  const zapChannel = usePlaylistStore((s) => s.zapChannel);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // BACK: webOS 461, browser ESC 27
      if (e.keyCode === 461 || e.keyCode === 27) {
        e.preventDefault();
        if (modalOpen) {
          closeModal();
          return;
        }
        switch (currentScreen) {
          case 'player':
            // Oynatıcıdan çık → son ana ekran (Live TV / EPG)
            navigate(useUIStore.getState().lastMainScreen);
            break;
          case 'channelList':
          case 'epg':
          case 'settings':
          case 'movies':
          case 'series':
          case 'playlists':
            // Alt sayfalardan BACK → Anasayfa
            navigate('home');
            break;
          case 'home':
            // Anasayfadan BACK → çıkış onayı
            openModal('exit');
            break;
          case 'onboarding':
          case 'loading':
            // Onboarding / yükleme ekranında BACK engelle
            break;
        }
        return;
      }

      // CH+ (33) / CH- (34) — sempre zapeia canais
      if (e.keyCode === 33 || e.keyCode === 34) {
        if (modalOpen) return;
        if (currentScreen === 'player' || currentScreen === 'channelList') {
          e.preventDefault();
          void zapChannel(e.keyCode === 33 ? 'next' : 'prev');
        }
        return;
      }

      // UP (38) / DOWN (40) — inteligente por contexto
      if (e.keyCode === 38 || e.keyCode === 40) {
        if (modalOpen) return;
        if (currentScreen === 'player') {
          const last = useUIStore.getState().lastMainScreen;
          const ctx = usePlayerStore.getState().seriesContext;
          e.preventDefault();
          if (last === 'series' && ctx) {
            const r = e.keyCode === 38
              ? usePlayerStore.getState().playNextEpisode()
              : usePlayerStore.getState().playPrevEpisode();
            if (r === 'no_more') {
              const { t } = useTranslation();
              useToast.getState().show(e.keyCode === 38 ? t('player.no_more_next') : t('player.no_more_prev'));
            }
          } else if (last === 'channelList' || last === 'epg') {
            void zapChannel(e.keyCode === 38 ? 'next' : 'prev');
          }
          // movies: nao faz nada
        } else if (currentScreen === 'channelList') {
          e.preventDefault();
          void zapChannel(e.keyCode === 38 ? 'next' : 'prev');
        }
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [currentScreen, modalOpen, navigate, openModal, closeModal, zapChannel]);

  return null;
}
