import { tns } from 'tiny-slider';

tns({
  container: '.slider',
  items: 1,
  autoplay: true,
  speed: 600,
  autoplayButtonOutput: false,
  loop: true,
  gutter: 0,
  edgePadding: 0,
  controlsText: [
    `<span class='fa fa-arrow-left'></span>`,
    `<span class='fa fa-arrow-right'></span>`,
  ],
});
