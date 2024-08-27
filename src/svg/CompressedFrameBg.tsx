export default function FrameBackground() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='429'
      height='267'
      fill='none'
    >
      <g filter='url(#A)'>
        <rect
          x='16'
          y='12'
          width='397'
          height='235'
          rx='24'
          fill='#0052ff'
          shape-rendering='crispEdges'
        />
        <path fill='url(#B)' d='M34 35h64v64H34z' />
      </g>
      <defs>
        <filter
          id='A'
          x='0'
          y='0'
          width='429'
          height='267'
          filterUnits='userSpaceOnUse'
          color-interpolation-filters='sRGB'
        >
          <feFlood flood-opacity='0' result='A' />
          <feColorMatrix
            in='SourceAlpha'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            result='B'
          />
          <feOffset dy='4' />
          <feGaussianBlur stdDeviation='8' />
          <feComposite in2='B' operator='out' />
          <feColorMatrix values='0 0 0 0 0 0 0 0 0 0.321569 0 0 0 0 1 0 0 0 0.32 0' />
          <feBlend in2='A' />
          <feBlend in='SourceGraphic' result='D' />
          <feColorMatrix
            in='SourceAlpha'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            result='B'
          />
          <feOffset dy='8' />
          <feGaussianBlur stdDeviation='16' />
          <feComposite in2='B' operator='arithmetic' k2='-1' k3='1' />
          <feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0' />
          <feBlend in2='D' result='E' />
          <feColorMatrix
            in='SourceAlpha'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            result='B'
          />
          <feOffset dy='-8' />
          <feGaussianBlur stdDeviation='16' />
          <feComposite in2='B' operator='arithmetic' k2='-1' k3='1' />
          <feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0' />
          <feBlend in2='E' result='F' />
          <feColorMatrix
            in='SourceAlpha'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            result='B'
          />
          <feOffset dy='-2' />
          <feGaussianBlur stdDeviation='2' />
          <feComposite in2='B' operator='arithmetic' k2='-1' k3='1' />
          <feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0' />
          <feBlend in2='F' result='G' />
          <feColorMatrix
            in='SourceAlpha'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            result='B'
          />
          <feOffset dy='2' />
          <feGaussianBlur stdDeviation='8' />
          <feComposite in2='B' operator='arithmetic' k2='-1' k3='1' />
          <feColorMatrix values='0 0 0 0 0 0 0 0 0 0.321569 0 0 0 0 1 0 0 0 1 0' />
          <feBlend in2='G' result='H' />
          <feColorMatrix
            in='SourceAlpha'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            result='B'
          />
          <feOffset dy='4' />
          <feGaussianBlur stdDeviation='16' />
          <feComposite in2='B' operator='arithmetic' k2='-1' k3='1' />
          <feColorMatrix values='0 0 0 0 0.270588 0 0 0 0 0.882353 0 0 0 0 0.898039 0 0 0 0.5 0' />
          <feBlend in2='H' result='I' />
          <feColorMatrix
            in='SourceAlpha'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            result='B'
          />
          <feOffset dy='8' />
          <feGaussianBlur stdDeviation='8' />
          <feComposite in2='B' operator='arithmetic' k2='-1' k3='1' />
          <feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0' />
          <feBlend in2='I' />
        </filter>
      </defs>
    </svg>
  );
}
