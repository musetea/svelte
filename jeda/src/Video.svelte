<script>
  let _paused = true;
  let _volume = 0;
  let _duration;
  let _currentTime = 0;

  let poster =
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg";
  let src =
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
  function playVideo() {
    _paused = !_paused;
  }
</script>

<video
  {poster}
  {src}
  bind:paused={_paused}
  bind:volume={_volume}
  bind:duration={_duration}
  bind:currentTime={_currentTime}
>
  <track kind="captions" />
</video>
<p>
  {(_currentTime / 60).toFixed(2)} / {(_duration / 60).toFixed(2)}
</p>
<button on:click={playVideo}> Play </button>
{Math.floor(_volume * 100)}
<input type="range" name="" id="" max="1" step="0.01" bind:value={_volume} />

<style>
  video {
    max-width: 400px;

    display: grid;
    place-items: center;
  }
</style>
