import React from 'react';

type HandAnatomyProps = {
  x?: number;
  y?: number;
  scale?: number;
  cyanosis?: number;
};

/** Original dorsal-hand illustration with separate distal cyanosis layers. */
export const HandAnatomy: React.FC<HandAnatomyProps> = ({
  x = 0,
  y = 0,
  scale = 1,
  cyanosis = 0,
}) => (
  <g transform={`translate(${x} ${y}) rotate(90) scale(${scale}) translate(-470 -1466)`}>
    <defs>
      <linearGradient id="hand-skin" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#f4ceb2" />
        <stop offset="0.34" stopColor="#dca587" />
        <stop offset="0.72" stopColor="#c78470" />
        <stop offset="1" stopColor="#9b6264" />
      </linearGradient>
      <linearGradient id="hand-light" x1="0" y1="0" x2="1" y2="0">
        <stop stopColor="#fff0dc" stopOpacity="0.72" />
        <stop offset="0.45" stopColor="#f2cfb6" stopOpacity="0.15" />
        <stop offset="1" stopColor="#59394f" stopOpacity="0.42" />
      </linearGradient>
      <linearGradient id="finger-cyanosis" x1="0" y1="0" x2="0" y2="1">
        <stop stopColor="#594b99" stopOpacity="0.88" />
        <stop offset="0.42" stopColor="#6a619f" stopOpacity="0.68" />
        <stop offset="0.84" stopColor="#7772a4" stopOpacity="0.15" />
        <stop offset="1" stopColor="#7772a4" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="nail-bed" x1="0" y1="0" x2="0" y2="1">
        <stop stopColor="#f2d9cc" />
        <stop offset="1" stopColor="#bd8d83" />
      </linearGradient>
      <filter id="hand-depth" x="-25%" y="-15%" width="150%" height="140%">
        <feGaussianBlur in="SourceAlpha" stdDeviation="18" result="blur" />
        <feOffset dy="22" dx="8" result="offset" />
        <feComponentTransfer><feFuncA type="linear" slope="0.48" /></feComponentTransfer>
        <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
      </filter>
      <clipPath id="hand-silhouette">
        <path d="M270 1360 C235 1304 220 1217 224 1138 C227 1083 244 1012 253 961 L201 844 C173 780 187 715 228 694 C271 672 306 708 330 770 L302 516 C293 431 317 365 368 356 C418 347 441 396 438 477 L430 264 C427 175 457 119 512 117 C567 115 586 169 578 254 L563 487 L596 307 C610 228 653 197 700 217 C745 236 752 281 733 356 L681 546 L736 414 C762 352 807 335 850 357 C894 379 897 428 865 495 L772 708 C828 681 876 703 884 745 C892 787 851 839 806 879 C752 927 720 993 704 1078 L668 1310 C648 1410 568 1464 470 1466 C377 1467 301 1430 270 1360 Z" />
      </clipPath>
    </defs>

    {/* A soft cast shadow separates the hand from the scene without a sticker outline. */}
    <path
      d="M270 1360 C235 1304 220 1217 224 1138 C227 1083 244 1012 253 961 L201 844 C173 780 187 715 228 694 C271 672 306 708 330 770 L302 516 C293 431 317 365 368 356 C418 347 441 396 438 477 L430 264 C427 175 457 119 512 117 C567 115 586 169 578 254 L563 487 L596 307 C610 228 653 197 700 217 C745 236 752 281 733 356 L681 546 L736 414 C762 352 807 335 850 357 C894 379 897 428 865 495 L772 708 C828 681 876 703 884 745 C892 787 851 839 806 879 C752 927 720 993 704 1078 L668 1310 C648 1410 568 1464 470 1466 C377 1467 301 1430 270 1360 Z"
      fill="url(#hand-skin)"
      stroke="#8e5f5d"
      strokeOpacity="0.42"
      strokeWidth="20"
      filter="url(#hand-depth)"
    />

    <g clipPath="url(#hand-silhouette)">
      {/* Soft dorsal shading gives each digit a rounded profile. */}
      <path d="M260 1180 C330 1000 340 750 318 370 L446 340 L476 1510 L225 1510Z" fill="url(#hand-light)" opacity="0.72" />
      <path d="M635 240 C770 240 860 460 730 860 L704 1340 L610 1410Z" fill="#6a4d5d" opacity="0.22" />

      {/* Distal color change fades into natural skin and stays concentrated at the digits. */}
      <g opacity={cyanosis}>
        <path d="M195 670 Q220 660 261 691 L319 805 L345 923 Q274 907 232 855 Q190 799 195 670Z" fill="url(#finger-cyanosis)" />
        <path d="M300 335 Q354 330 420 359 L434 642 Q386 680 324 625Z" fill="url(#finger-cyanosis)" />
        <path d="M430 95 Q500 80 584 112 L578 400 Q510 435 438 385Z" fill="url(#finger-cyanosis)" />
        <path d="M575 195 Q654 176 750 212 L684 507 Q612 530 558 471Z" fill="url(#finger-cyanosis)" />
        <path d="M729 327 Q806 318 890 362 L794 648 Q735 671 684 616Z" fill="url(#finger-cyanosis)" />
        {/* Irregular branching marbling, never circular black spots. */}
        <g fill="none" stroke="#6c609f" strokeWidth="8" strokeLinecap="round" opacity="0.54">
          <path d="M215 746 Q234 780 258 793 L277 821 M249 785 Q260 757 279 744 M331 395 Q349 432 373 453 L395 483 M368 445 Q390 430 402 405" />
          <path d="M466 157 Q489 194 515 216 L539 252 M508 213 Q531 195 542 170 M611 245 Q636 276 657 291 L676 329 M648 283 Q670 268 687 239" />
          <path d="M764 390 Q783 420 800 435 L816 467 M793 426 Q810 408 824 382" />
        </g>
      </g>

      {/* Tendon paths, knuckle transitions and skin folds follow the dorsal anatomy. */}
      <g fill="none" strokeLinecap="round">
        <g stroke="#ffdfc5" strokeOpacity="0.48" strokeWidth="12">
          <path d="M373 392 C370 590 381 778 423 1050" />
          <path d="M510 156 C504 445 513 740 522 1042" />
          <path d="M686 250 C641 504 608 746 584 1028" />
          <path d="M830 392 C749 590 692 772 635 1030" />
          <path d="M231 737 C255 850 316 934 395 1000" />
        </g>
        <g stroke="#8d5c58" strokeOpacity="0.40" strokeWidth="6">
          <path d="M330 540 Q372 563 428 542" />
          <path d="M322 441 Q370 463 432 441" />
          <path d="M441 421 Q504 447 573 416" />
          <path d="M442 322 Q507 348 578 319" />
          <path d="M573 483 Q641 504 711 470" />
          <path d="M592 382 Q658 405 726 371" />
          <path d="M691 572 Q750 594 813 563" />
          <path d="M727 487 Q787 507 844 477" />
          <path d="M320 1138 Q442 1088 590 1140" />
        </g>
      </g>

      {/* Natural nail beds: five distinct nails anchor the five-digit anatomy. */}
      <g stroke="#a9766e" strokeWidth="5">
        <path d="M205 719 Q223 695 244 704 Q267 716 271 761 Q250 782 224 767 Q207 752 205 719Z" fill="url(#nail-bed)" />
        <path d="M335 378 Q355 351 382 356 Q410 362 413 409 Q389 432 359 421 Q340 411 335 378Z" fill="url(#nail-bed)" />
        <path d="M469 142 Q494 114 522 118 Q551 122 557 170 Q532 193 500 184 Q476 175 469 142Z" fill="url(#nail-bed)" />
        <path d="M619 242 Q645 215 675 226 Q704 236 698 281 Q669 301 641 285 Q620 272 619 242Z" fill="url(#nail-bed)" />
        <path d="M778 374 Q806 350 830 365 Q855 379 841 419 Q812 438 789 418 Q773 403 778 374Z" fill="url(#nail-bed)" />
      </g>
      <g fill="none" stroke="#fff0e4" strokeWidth="5" strokeLinecap="round" opacity="0.58">
        <path d="M215 724 Q230 708 248 716" />
        <path d="M346 384 Q364 367 386 375" />
        <path d="M480 148 Q501 130 525 138" />
        <path d="M631 248 Q650 231 675 239" />
        <path d="M790 382 Q808 367 831 378" />
      </g>
    </g>
  </g>
);
