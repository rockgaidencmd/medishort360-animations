import React from 'react';

/** Cutaway layers used as the anatomical bridge from fingertip to arteriole. */
export const SkinLayers: React.FC<{frame: number}> = ({frame}) => (
  <g>
    <defs>
      <linearGradient id="epidermis" x1="0" y1="0" x2="0" y2="1">
        <stop stopColor="#f5cbb6" /><stop offset="0.45" stopColor="#df987f" /><stop offset="1" stopColor="#b96470" />
      </linearGradient>
      <linearGradient id="dermis" x1="0" y1="0" x2="0" y2="1">
        <stop stopColor="#ef9f98" /><stop offset="0.55" stopColor="#ce667c" /><stop offset="1" stopColor="#8f3d62" />
      </linearGradient>
      <linearGradient id="hypodermis" x1="0" y1="0" x2="0" y2="1">
        <stop stopColor="#e6a867" /><stop offset="1" stopColor="#9d5c58" />
      </linearGradient>
      <linearGradient id="capillary" x1="0" y1="0" x2="0" y2="1">
        <stop stopColor="#ff9b8f" /><stop offset="1" stopColor="#9e344f" />
      </linearGradient>
      <filter id="skin-depth"><feGaussianBlur stdDeviation="28" /></filter>
    </defs>

    <rect width="1080" height="1920" fill="#172e42" />
    <ellipse cx="180" cy="450" rx="510" ry="440" fill="#a24982" opacity="0.28" filter="url(#skin-depth)" />
    <ellipse cx="890" cy="1440" rx="530" ry="420" fill="#d45a71" opacity="0.18" filter="url(#skin-depth)" />

    {/* Epidermis: layered surface with papillae, not a flat skin-colored band. */}
    <path d="M0 440 C100 412 166 448 245 427 C334 403 400 448 485 425 C580 398 641 449 722 421 C820 388 896 445 972 418 C1015 402 1051 410 1080 422 V657 C1008 634 978 667 922 648 C840 620 783 678 706 655 C625 631 574 680 495 654 C402 623 342 669 264 648 C175 623 112 672 0 640Z" fill="url(#epidermis)" stroke="#ffd4bd" strokeWidth="10" />
    <path d="M0 469 C108 450 162 478 246 459 C335 438 404 481 490 459 C576 438 646 481 728 455 C815 427 900 478 979 451 C1024 437 1055 441 1080 451" fill="none" stroke="#fff0d8" strokeWidth="17" opacity="0.68" />
    <path d="M0 628 C97 651 163 622 249 645 C334 667 407 635 493 655 C575 675 645 638 728 657 C813 676 893 638 974 651 C1018 659 1051 652 1080 645" fill="none" stroke="#a64c61" strokeWidth="9" opacity="0.72" />

    {/* Dermis, with a fine collagen weave and a branching capillary bed. */}
    <path d="M0 642 C110 675 166 640 248 659 C335 681 405 650 492 674 C580 696 648 651 731 671 C812 689 898 650 980 668 C1015 676 1050 667 1080 660 V1198 C990 1169 914 1208 823 1178 C733 1148 660 1212 573 1183 C484 1154 405 1210 313 1180 C219 1150 137 1205 0 1175Z" fill="url(#dermis)" />
    <g fill="none" stroke="#ffd1c3" strokeWidth="4" opacity="0.22">
      <path d="M20 757 C180 690 240 821 390 741 S650 815 804 736 S966 813 1070 738" />
      <path d="M-10 871 C145 806 244 927 385 854 S650 927 803 854 S970 923 1090 858" />
      <path d="M20 1014 C166 941 253 1059 408 987 S658 1050 808 978 S966 1056 1080 992" />
    </g>
    <g fill="none" stroke="#702d54" strokeWidth="28" strokeLinecap="round" opacity="0.62">
      <path d="M-30 1107 C133 1079 215 1124 334 1104 S511 1069 602 1091 S774 1132 891 1096 S1018 1078 1110 1095" />
      <path d="M158 1108 C187 1017 215 968 254 952 C294 934 312 993 332 1103" />
      <path d="M464 1091 C485 1003 522 964 562 956 C604 948 629 1017 649 1101" />
      <path d="M768 1105 C790 1014 824 978 862 968 C902 958 927 1022 945 1092" />
    </g>
    <g fill="none" stroke="url(#capillary)" strokeWidth="17" strokeLinecap="round">
      <path d="M-30 1094 C133 1067 215 1110 334 1090 S511 1055 602 1077 S774 1118 891 1082 S1018 1064 1110 1081" />
      <path d="M158 1094 C187 1003 215 954 254 938 C294 920 312 979 332 1089" />
      <path d="M464 1077 C485 989 522 950 562 942 C604 934 629 1003 649 1087" />
      <path d="M768 1091 C790 1000 824 964 862 954 C902 944 927 1008 945 1078" />
    </g>
    <g fill="none" stroke="#417fa1" strokeWidth="12" strokeLinecap="round" opacity="0.9">
      <path d="M-20 1140 C136 1114 222 1156 338 1137 S513 1103 605 1123 S777 1164 893 1129 S1019 1110 1090 1128" />
      <path d="M247 952 C278 931 302 955 318 1034" />
      <path d="M554 944 C592 932 613 971 630 1034" />
      <path d="M856 957 C895 948 917 988 931 1040" />
    </g>

    {/* Slow cell flow remains present in the capillary loops. */}
    {Array.from({length: 7}, (_, index) => {
      const x = ((frame * 1.35 + index * 171 + 60) % 1090) - 10;
      return <g key={index} transform={`translate(${x} ${1089 + Math.sin(frame * 0.035 + index) * 15})`}>
        <ellipse rx="17" ry="9" fill="#c84158" stroke="#ffb3a1" strokeWidth="2" />
        <ellipse rx="6" ry="3" fill="#7b2949" />
        <path d="M-12 -3 Q0 -8 12 -3" stroke="#ffe0d2" strokeWidth="2" fill="none" opacity="0.7" />
      </g>;
    })}

    {/* Subcutaneous tissue, with lobules and septa to establish depth. */}
    <path d="M0 1178 C125 1204 214 1166 311 1194 C405 1221 482 1169 575 1198 C665 1226 739 1166 823 1194 C914 1224 991 1182 1080 1213 V1920 H0Z" fill="url(#hypodermis)" />
    <g fill="#f0c27a" stroke="#9c5b56" strokeWidth="9" opacity="0.72">
      <path d="M70 1290 Q134 1217 208 1282 Q252 1322 213 1397 Q140 1453 79 1389 Q42 1348 70 1290Z" />
      <path d="M296 1450 Q367 1370 446 1438 Q494 1485 450 1564 Q373 1624 305 1550 Q265 1508 296 1450Z" />
      <path d="M566 1293 Q638 1218 709 1286 Q753 1336 707 1407 Q632 1461 573 1392 Q536 1346 566 1293Z" />
      <path d="M818 1482 Q884 1403 960 1470 Q1006 1513 967 1591 Q891 1652 827 1586 Q789 1540 818 1482Z" />
    </g>
    <g fill="none" stroke="#f7d6a0" strokeWidth="7" opacity="0.62">
      <path d="M42 1320 Q121 1277 215 1347" /><path d="M270 1489 Q362 1431 465 1501" />
      <path d="M544 1324 Q635 1270 729 1345" /><path d="M790 1522 Q882 1467 986 1531" />
    </g>
  </g>
);
