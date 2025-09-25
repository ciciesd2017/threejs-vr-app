const $ = (id) => document.getElementById(id);
export function bindUI({ sky, models, anim, audioPlayer, videoPanel, lists }) {
  $("btnBg")?.addEventListener("click", () => sky.next(lists.SKYBOXES));
  $("btnModel")?.addEventListener("click", () => models.next(lists.MODEL_URLS));
  $("btnPlayAll")?.addEventListener("click", () => anim.playAll());
  $("btnPauseAll")?.addEventListener("click", () => anim.pauseAll());
  $("btnResumeAll")?.addEventListener("click", () => anim.resumeAll());
  $("btnStopAll")?.addEventListener("click", () => anim.stopAll());
  $("btnPlay3x")?.addEventListener("click", () => anim.playNTimesExact(0, 3));
  $("btnSeek0")?.addEventListener("click", () => anim.seekToStart(0));
  $("btnAddAll")?.addEventListener("click", () =>
    models.addAllRow(lists.MODEL_URLS)
  );

  $("btnPlayOrPause")?.addEventListener("click", () =>
    audioPlayer.togglePlayPause()
  );
  $("btnStopMusic")?.addEventListener("click", () => audioPlayer.stop());
  $("btnSwitchToMusic")?.addEventListener("click", () => audioPlayer.next());
  $("btnPlayVideo")?.addEventListener("click", () => videoPanel.open());
  $("btnCloseVideo")?.addEventListener("click", () => videoPanel.close());
}
