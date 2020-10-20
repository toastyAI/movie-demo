export function Cursor(props) {
  return (
    <svg width="72" height="73" viewBox="0 0 72 73" fill="none" {...props}>
      <g filter="url(#filter0_d)">
        <path
          d="M23.7164 11.278L67.125 43.1627L42.7857 44.3071L29.625 64.8133L23.7164 11.278Z"
          fill="#3995D8"
        />
        <path
          d="M29.9671 63.3546L24.3383 12.3552L65.6907 42.7295L42.7622 43.8076L42.5044 43.8197L42.3649 44.037L29.9671 63.3546Z"
          stroke="white"
        />
      </g>
      <defs>
        <filter
          id="filter0_d"
          x="0.9664"
          y="0.452698"
          width="70.1586"
          height="72.3606"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}
