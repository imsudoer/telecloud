const VIEWABLE_EXTENSIONS = [
    '.png',
    '.jpg',
    '.jpeg',
    '.gif',
    '.mp4',
    '.webm',
    '.ogg',
    '.pdf',
    '.mp3',
    '.txt',
    '.js',
    '.css',
    '.html',
    '.py',
    '.c',
    '.cpp',
    '.java',
    '.rb',
    '.json',
    '.xml',
    '.md',
    '.log',
    '.sh',
    '.cfg',
];

const FILE_ICONS = {
    '.jpg': { path: '<path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-4.86 8.86l-3 3.87L9 13.14 6 17h12l-3.86-5.14z"/>', color: '#f4b400' },
    '.jpeg': { path: '<path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-4.86 8.86l-3 3.87L9 13.14 6 17h12l-3.86-5.14z"/>', color: '#f4b400' },
    '.png': { path: '<path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-4.86 8.86l-3 3.87L9 13.14 6 17h12l-3.86-5.14z"/>', color: '#f4b400' },
    '.gif': { path: '<path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-4.86 8.86l-3 3.87L9 13.14 6 17h12l-3.86-5.14z"/>', color: '#f4b400' },
    '.svg': { path: '<path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-4.86 8.86l-3 3.87L9 13.14 6 17h12l-3.86-5.14z"/>', color: '#f4b400' },

    '.mp4': { path: '<path d="m16 10 2.577-1.546c.793-.476 1.19-.714 1.516-.683a1 1 0 0 1 .713.403c.194.264.194.727.194 1.652v4.348c0 .925 0 1.388-.194 1.652a1 1 0 0 1-.713.404c-.326.03-.723-.208-1.516-.684L16 14m-9.8 4h6.6c1.12 0 1.68 0 2.108-.218a2 2 0 0 0 .874-.874C16 16.48 16 15.92 16 14.8V9.2c0-1.12 0-1.68-.218-2.108a2 2 0 0 0-.874-.874C14.48 6 13.92 6 12.8 6H6.2c-1.12 0-1.68 0-2.108.218a2 2 0 0 0-.874.874C3 7.52 3 8.08 3 9.2v5.6c0 1.12 0 1.68.218 2.108a2 2 0 0 0 .874.874C4.52 18 5.08 18 6.2 18" stroke="#a0319e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>', color: 'none' },
    '.webm': { path: '<path d="m16 10 2.577-1.546c.793-.476 1.19-.714 1.516-.683a1 1 0 0 1 .713.403c.194.264.194.727.194 1.652v4.348c0 .925 0 1.388-.194 1.652a1 1 0 0 1-.713.404c-.326.03-.723-.208-1.516-.684L16 14m-9.8 4h6.6c1.12 0 1.68 0 2.108-.218a2 2 0 0 0 .874-.874C16 16.48 16 15.92 16 14.8V9.2c0-1.12 0-1.68-.218-2.108a2 2 0 0 0-.874-.874C14.48 6 13.92 6 12.8 6H6.2c-1.12 0-1.68 0-2.108.218a2 2 0 0 0-.874.874C3 7.52 3 8.08 3 9.2v5.6c0 1.12 0 1.68.218 2.108a2 2 0 0 0 .874.874C4.52 18 5.08 18 6.2 18" stroke="#a0319e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>', color: 'none' },
    '.ogg': { path: '<path d="m16 10 2.577-1.546c.793-.476 1.19-.714 1.516-.683a1 1 0 0 1 .713.403c.194.264.194.727.194 1.652v4.348c0 .925 0 1.388-.194 1.652a1 1 0 0 1-.713.404c-.326.03-.723-.208-1.516-.684L16 14m-9.8 4h6.6c1.12 0 1.68 0 2.108-.218a2 2 0 0 0 .874-.874C16 16.48 16 15.92 16 14.8V9.2c0-1.12 0-1.68-.218-2.108a2 2 0 0 0-.874-.874C14.48 6 13.92 6 12.8 6H6.2c-1.12 0-1.68 0-2.108.218a2 2 0 0 0-.874.874C3 7.52 3 8.08 3 9.2v5.6c0 1.12 0 1.68.218 2.108a2 2 0 0 0 .874.874C4.52 18 5.08 18 6.2 18" stroke="#a0319e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>', color: 'none' },

    '.mp3': { path: '<path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6zm-2 16c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>', color: '#e84235' },

    '.pdf': { path: '<path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16h-3c0-1.1.9-2 2-2V16h-1c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2zm-3-5V3.5L18.5 9H13z"/>', color: '#e84235' },
    '.txt': { path: '<path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>', color: '#4285f4' },
    '.doc': { path: '<path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>', color: '#4285f4' },
    '.docx': { path: '<path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>', color: '#4285f4' },
    '.xls': { path: '<path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm-1 16h-2v-2h2v2zm-2-4h-2v-2h2v2zm2-4h-2V8h2v2zm3 4h-2v-2h2v2zm0-4h-2V8h2v2zm-3-5V3.5L18.5 9H13z"/>', color: '#107c41' },
    '.xlsx': { path: '<path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm-1 16h-2v-2h2v2zm-2-4h-2v-2h2v2zm2-4h-2V8h2v2zm3 4h-2v-2h2v2zm0-4h-2V8h2v2zm-3-5V3.5L18.5 9H13z"/>', color: '#107c41' },
    '.ppt': { path: '<path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm-5 16h8v-2h-8v2zm8-4h-8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>', color: '#d2482e' },
    '.pptx': { path: '<path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm-5 16h8v-2h-8v2zm8-4h-8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>', color: '#d2482e' },
    '.csv': { path: '<path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm-2 16h-2v-2h2v2zm2-4h-2v-2h2v2zm2-4h-2V8h2v2zm-3-5V3.5L18.5 9H13z"/>', color: '#107c41' },

    '.zip': { path: '<path d="M10.83 2H17a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3V3a3 3 0 0 1 3-3h5c1.306 0 2.417.835 2.83 2zM17 4H9.415l-.471-1.334A1.001 1.001 0 0 0 8 2H3a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1zm-3 2h2v2h-2V6zm-2-2h2v2h-2V4zm0 4h2v2h-2V8zm2 2h2v2h-2v-2zm-2 2h2v2h-2v-2z">', color: '#757575' },
    '.rar': { path: '<path d="M10.83 2H17a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3V3a3 3 0 0 1 3-3h5c1.306 0 2.417.835 2.83 2zM17 4H9.415l-.471-1.334A1.001 1.001 0 0 0 8 2H3a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1zm-3 2h2v2h-2V6zm-2-2h2v2h-2V4zm0 4h2v2h-2V8zm2 2h2v2h-2v-2zm-2 2h2v2h-2v-2z">', color: '#757575' },

    '.js': { path: '<path d="M10.228 12.071c0 3.034 0.217 5.583 -1.28 7.091 -0.842 0.849 -2.17 1.349 -3.805 1.349 -2.681 0 -4.169 -1.306 -5.119 -3.113 0.915 -0.584 1.849 -1.149 2.802 -1.695 0.389 1.087 1.701 2.309 3.182 1.557 0.939 -0.477 0.83 -1.924 0.83 -3.494V3.804c-0.003 -0.049 -0.006 -0.098 0.034 -0.104h3.356zm8.509 -1.972c-0.855 -0.366 -1.918 -0.8 -2.179 -1.591 -0.292 -0.888 0.206 -1.619 0.761 -1.868 1.22 -0.548 2.674 0.354 2.975 1.28 0.918 -0.546 1.833 -1.096 2.664 -1.73 -0.976 -1.621 -2.407 -2.782 -5.016 -2.698 -1.436 0.046 -2.515 0.499 -3.321 1.176 -0.786 0.66 -1.393 1.587 -1.488 2.906 -0.282 3.947 2.671 4.955 5.189 6.053 0.794 0.346 1.676 0.696 2.041 1.384 0.753 1.419 -0.581 2.356 -1.73 2.456 -1.844 0.161 -3.087 -0.918 -3.805 -2.041 -0.897 0.556 -1.872 1.033 -2.733 1.626 1.197 2.105 3.16 3.468 6.226 3.459 3.128 -0.009 5.448 -1.517 5.638 -4.358 0.259 -3.862 -2.634 -4.945 -5.223 -6.053"/>', color: '#cbc43f' },
    '.css': { path: '<path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.414z"/>', color: '#2965f1' },
    '.html': { path: '<path id="Vector" d="M13 3.00087C12.9045 3 12.7973 3 12.6747 3H8.2002C7.08009 3 6.51962 3 6.0918 3.21799C5.71547 3.40973 5.40973 3.71547 5.21799 4.0918C5 4.51962 5 5.08009 5 6.2002V17.8002C5 18.9203 5 19.4801 5.21799 19.9079C5.40973 20.2842 5.71547 20.5905 6.0918 20.7822C6.51921 21 7.079 21 8.19694 21L15.8031 21C16.921 21 17.48 21 17.9074 20.7822C18.2837 20.5905 18.5905 20.2842 18.7822 19.9079C19 19.4805 19 18.9215 19 17.8036V9.32568C19 9.20296 19 9.09561 18.9991 9M13 3.00087C13.2856 3.00347 13.4663 3.01385 13.6388 3.05526C13.8429 3.10425 14.0379 3.18526 14.2168 3.29492C14.4186 3.41857 14.5918 3.59182 14.9375 3.9375L18.063 7.06298C18.4089 7.40889 18.5809 7.58136 18.7046 7.78319C18.8142 7.96214 18.8953 8.15726 18.9443 8.36133C18.9857 8.53376 18.9963 8.71451 18.9991 9M13 3.00087V5.8C13 6.9201 13 7.47977 13.218 7.90759C13.4097 8.28392 13.7155 8.59048 14.0918 8.78223C14.5192 9 15.079 9 16.1969 9H18.9991M18.9991 9H19.0002M14 13L16 15L14 17M10 17L8 15L10 13" stroke="#d2522f" stroke-width="2" stroke-linecap="round" stroke-linejoin="round""/>', color: 'none' },
    '.py': { path: '<path d="M19.14,7.5A2.86,2.86,0,0,1,22,10.36h0v3.78A2.86,2.86,0,0,1,19.14,17H12c0,.39.32,1,.71,1H17v1.68a2.86,2.86,0,0,1-2.86,2.86H9.86A2.86,2.86,0,0,1,7,19.64H7V15.89A2.85,2.85,0,0,1,9.86,13h5.25A2.85,2.85,0,0,0,18,10.18V7.5h1.18M14.86,19.29c-.4,0-.72.3-.72.89s.32.71.72.71a.71.71,0,0,0,.71-.71c0-.59-.32-.89-.71-.89m-10-1.79A2.86,2.86,0,0,1,2,14.64V10.86A2.86,2.86,0,0,1,4.86,8H12c0-.39-.32-1-.71-1H7V5.36A2.86,2.86,0,0,1,9.86,2.5h4.28A2.86,2.86,0,0,1,17,5.36V9.11A2.85,2.85,0,0,1,14.14,12H8.89A2.85,2.85,0,0,0,6,14.82V17.5H4.86M9.14,5.71c.4,0,.72-.3.72-.89s-.32-.71-.72-.71-.71.12-.71.71S8.75,5.71,9.14,5.71Z"/>', color: '#34a853' },
    '.json': { path: '<path d="M10.228 12.071c0 3.034 0.217 5.583 -1.28 7.091 -0.842 0.849 -2.17 1.349 -3.805 1.349 -2.681 0 -4.169 -1.306 -5.119 -3.113 0.915 -0.584 1.849 -1.149 2.802 -1.695 0.389 1.087 1.701 2.309 3.182 1.557 0.939 -0.477 0.83 -1.924 0.83 -3.494V3.804c-0.003 -0.049 -0.006 -0.098 0.034 -0.104h3.356zm8.509 -1.972c-0.855 -0.366 -1.918 -0.8 -2.179 -1.591 -0.292 -0.888 0.206 -1.619 0.761 -1.868 1.22 -0.548 2.674 0.354 2.975 1.28 0.918 -0.546 1.833 -1.096 2.664 -1.73 -0.976 -1.621 -2.407 -2.782 -5.016 -2.698 -1.436 0.046 -2.515 0.499 -3.321 1.176 -0.786 0.66 -1.393 1.587 -1.488 2.906 -0.282 3.947 2.671 4.955 5.189 6.053 0.794 0.346 1.676 0.696 2.041 1.384 0.753 1.419 -0.581 2.356 -1.73 2.456 -1.844 0.161 -3.087 -0.918 -3.805 -2.041 -0.897 0.556 -1.872 1.033 -2.733 1.626 1.197 2.105 3.16 3.468 6.226 3.459 3.128 -0.009 5.448 -1.517 5.638 -4.358 0.259 -3.862 -2.634 -4.945 -5.223 -6.053"/>', color: '#5f6368' },
    '.xml': { path: '<path id="Vector" d="M13 3.00087C12.9045 3 12.7973 3 12.6747 3H8.2002C7.08009 3 6.51962 3 6.0918 3.21799C5.71547 3.40973 5.40973 3.71547 5.21799 4.0918C5 4.51962 5 5.08009 5 6.2002V17.8002C5 18.9203 5 19.4801 5.21799 19.9079C5.40973 20.2842 5.71547 20.5905 6.0918 20.7822C6.51921 21 7.079 21 8.19694 21L15.8031 21C16.921 21 17.48 21 17.9074 20.7822C18.2837 20.5905 18.5905 20.2842 18.7822 19.9079C19 19.4805 19 18.9215 19 17.8036V9.32568C19 9.20296 19 9.09561 18.9991 9M13 3.00087C13.2856 3.00347 13.4663 3.01385 13.6388 3.05526C13.8429 3.10425 14.0379 3.18526 14.2168 3.29492C14.4186 3.41857 14.5918 3.59182 14.9375 3.9375L18.063 7.06298C18.4089 7.40889 18.5809 7.58136 18.7046 7.78319C18.8142 7.96214 18.8953 8.15726 18.9443 8.36133C18.9857 8.53376 18.9963 8.71451 18.9991 9M13 3.00087V5.8C13 6.9201 13 7.47977 13.218 7.90759C13.4097 8.28392 13.7155 8.59048 14.0918 8.78223C14.5192 9 15.079 9 16.1969 9H18.9991M18.9991 9H19.0002M14 13L16 15L14 17M10 17L8 15L10 13" stroke="#5f6368" stroke-width="2" stroke-linecap="round" stroke-linejoin="round""/>', color: 'none' },
    '.md': { path: '<path fill-rule="evenodd" clip-rule="evenodd" d="M0 8C0 5.79086 1.79086 4 4 4H20C22.2091 4 24 5.79086 24 8V16C24 18.2091 22.2091 20 20 20H4C1.79086 20 0 18.2091 0 16V8ZM4 6C2.89543 6 2 6.89543 2 8V16C2 17.1046 2.89543 18 4 18H20C21.1046 18 22 17.1046 22 16V8C22 6.89543 21.1046 6 20 6H4ZM5.68377 8.05132C6.09211 7.9152 6.54174 8.05566 6.8 8.4L9 11.3333L11.2 8.4C11.4583 8.05566 11.9079 7.9152 12.3162 8.05132C12.7246 8.18743 13 8.56957 13 9V15C13 15.5523 12.5523 16 12 16C11.4477 16 11 15.5523 11 15V12L9.8 13.6C9.61115 13.8518 9.31476 14 9 14C8.68524 14 8.38885 13.8518 8.2 13.6L7 12V15C7 15.5523 6.55228 16 6 16C5.44772 16 5 15.5523 5 15V9C5 8.56957 5.27543 8.18743 5.68377 8.05132ZM18 9C18 8.44772 17.5523 8 17 8C16.4477 8 16 8.44772 16 9V12.5858L15.7071 12.2929C15.3166 11.9024 14.6834 11.9024 14.2929 12.2929C13.9024 12.6834 13.9024 13.3166 14.2929 13.7071L16.2929 15.7071C16.6834 16.0976 17.3166 16.0976 17.7071 15.7071L19.7071 13.7071C20.0976 13.3166 20.0976 12.6834 19.7071 12.2929C19.3166 11.9024 18.6834 11.9024 18.2929 12.2929L18 12.5858V9Z"/>', color: '#9953df' },
    '.log': { path: '<path id="Vector" d="M13 3.00087C12.9045 3 12.7973 3 12.6747 3H8.2002C7.08009 3 6.51962 3 6.0918 3.21799C5.71547 3.40973 5.40973 3.71547 5.21799 4.0918C5 4.51962 5 5.08009 5 6.2002V17.8002C5 18.9203 5 19.4801 5.21799 19.9079C5.40973 20.2842 5.71547 20.5905 6.0918 20.7822C6.51921 21 7.079 21 8.19694 21L15.8031 21C16.921 21 17.48 21 17.9074 20.7822C18.2837 20.5905 18.5905 20.2842 18.7822 19.9079C19 19.4805 19 18.9215 19 17.8036V9.32568C19 9.20296 19 9.09561 18.9991 9M13 3.00087C13.2856 3.00347 13.4663 3.01385 13.6388 3.05526C13.8429 3.10425 14.0379 3.18526 14.2168 3.29492C14.4186 3.41857 14.5918 3.59182 14.9375 3.9375L18.063 7.06298C18.4089 7.40889 18.5809 7.58136 18.7046 7.78319C18.8142 7.96214 18.8953 8.15726 18.9443 8.36133C18.9857 8.53376 18.9963 8.71451 18.9991 9M13 3.00087V5.8C13 6.9201 13 7.47977 13.218 7.90759C13.4097 8.28392 13.7155 8.59048 14.0918 8.78223C14.5192 9 15.079 9 16.1969 9H18.9991M18.9991 9H19.0002M14 13L16 15L14 17M10 17L8 15L10 13" stroke="#5f6368" stroke-width="2" stroke-linecap="round" stroke-linejoin="round""/>', color: 'none' },
    '.sh': { path: '<path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zM6.414 15.707 5 14.293 7.293 12 5 9.707l1.414-1.414L10.121 12l-3.707 3.707zM19 16h-7v-2h7v2z"/>', color: '#5f6368' },
    '.cfg': { path: '<path id="Vector" d="M13 3.00087C12.9045 3 12.7973 3 12.6747 3H8.2002C7.08009 3 6.51962 3 6.0918 3.21799C5.71547 3.40973 5.40973 3.71547 5.21799 4.0918C5 4.51962 5 5.08009 5 6.2002V17.8002C5 18.9203 5 19.4801 5.21799 19.9079C5.40973 20.2842 5.71547 20.5905 6.0918 20.7822C6.51921 21 7.079 21 8.19694 21L15.8031 21C16.921 21 17.48 21 17.9074 20.7822C18.2837 20.5905 18.5905 20.2842 18.7822 19.9079C19 19.4805 19 18.9215 19 17.8036V9.32568C19 9.20296 19 9.09561 18.9991 9M13 3.00087C13.2856 3.00347 13.4663 3.01385 13.6388 3.05526C13.8429 3.10425 14.0379 3.18526 14.2168 3.29492C14.4186 3.41857 14.5918 3.59182 14.9375 3.9375L18.063 7.06298C18.4089 7.40889 18.5809 7.58136 18.7046 7.78319C18.8142 7.96214 18.8953 8.15726 18.9443 8.36133C18.9857 8.53376 18.9963 8.71451 18.9991 9M13 3.00087V5.8C13 6.9201 13 7.47977 13.218 7.90759C13.4097 8.28392 13.7155 8.59048 14.0918 8.78223C14.5192 9 15.079 9 16.1969 9H18.9991M18.9991 9H19.0002M14 13L16 15L14 17M10 17L8 15L10 13" stroke="#5f6368" stroke-width="2" stroke-linecap="round" stroke-linejoin="round""/>', color: 'none' },
    '.key': { path: '<path id="Vector" d="M13 3.00087C12.9045 3 12.7973 3 12.6747 3H8.2002C7.08009 3 6.51962 3 6.0918 3.21799C5.71547 3.40973 5.40973 3.71547 5.21799 4.0918C5 4.51962 5 5.08009 5 6.2002V17.8002C5 18.9203 5 19.4801 5.21799 19.9079C5.40973 20.2842 5.71547 20.5905 6.0918 20.7822C6.51921 21 7.079 21 8.19694 21L15.8031 21C16.921 21 17.48 21 17.9074 20.7822C18.2837 20.5905 18.5905 20.2842 18.7822 19.9079C19 19.4805 19 18.9215 19 17.8036V9.32568C19 9.20296 19 9.09561 18.9991 9M13 3.00087C13.2856 3.00347 13.4663 3.01385 13.6388 3.05526C13.8429 3.10425 14.0379 3.18526 14.2168 3.29492C14.4186 3.41857 14.5918 3.59182 14.9375 3.9375L18.063 7.06298C18.4089 7.40889 18.5809 7.58136 18.7046 7.78319C18.8142 7.96214 18.8953 8.15726 18.9443 8.36133C18.9857 8.53376 18.9963 8.71451 18.9991 9M13 3.00087V5.8C13 6.9201 13 7.47977 13.218 7.90759C13.4097 8.28392 13.7155 8.59048 14.0918 8.78223C14.5192 9 15.079 9 16.1969 9H18.9991M18.9991 9H19.0002M14 13L16 15L14 17M10 17L8 15L10 13" stroke="#e84235" stroke-width="2" stroke-linecap="round" stroke-linejoin="round""/>', color: 'none' },

    '.c': { path: '<path stroke-width="0.06315789473684211" stroke-linejoin="round" d="M16.085 16.606q-1.112 0.541 -2.904 0.541 -2.34 0 -3.678 -1.382 -1.339 -1.382 -1.338 -3.681 0 -2.45 1.506 -3.974t3.907 -1.524q1.487 0 2.507 0.385v2.255q-1.004 -0.586 -2.287 -0.586 -1.409 0 -2.274 0.885 -0.865 0.885 -0.865 2.397 0 1.451 0.816 2.312t2.198 0.861q1.317 0 2.413 -0.587z"/>', color: '#4285f4' },
    '.cpp': { path: '<path d="M11.056 18.035a7.68 7.68 0 0 1 -3.505 0.689 5.723 5.723 0 0 1 -4.435 -1.76A6.66 6.66 0 0 1 1.5 12.277a7.11 7.11 0 0 1 1.817 -5.061 6.165 6.165 0 0 1 4.714 -1.941 8.4 8.4 0 0 1 3.026 0.481v2.821A5.13 5.13 0 0 0 8.25 7.796a3.607 3.607 0 0 0 -2.784 1.151 4.425 4.425 0 0 0 -1.06 3.119A4.35 4.35 0 0 0 5.407 15.075a3.428 3.428 0 0 0 2.692 1.12 5.475 5.475 0 0 0 2.957 -0.835Z" /><path points="17.112 14.829 17.112 12.485 19.456 12.485 19.456 14.829 21.8 14.829 21.8 17.172 19.456 17.172 19.456 19.515 17.112 19.515 17.112 17.172 14.77 17.172 14.77 14.828 17.112 14.829" d="M12.834 11.122L12.834 9.364L14.592 9.364L14.592 11.122L16.35 11.122L16.35 12.879L14.592 12.879L14.592 14.636L12.834 14.636L12.834 12.879L11.078 12.879L11.078 11.121L12.834 11.122Z"/><path points="25.313 14.829 25.313 12.485 27.657 12.485 27.657 14.829 30 14.829 30 17.172 27.657 17.172 27.657 19.515 25.313 19.515 25.313 17.172 22.971 17.172 22.971 14.828 25.313 14.829" d="M18.985 11.122L18.985 9.364L20.743 9.364L20.743 11.122L22.5 11.122L22.5 12.879L20.743 12.879L20.743 14.636L18.985 14.636L18.985 12.879L17.228 12.879L17.228 11.121L18.985 11.122Z"/>', color: '#4285f4' },
    '.java': { path: '<path id="Vector" d="M13 3.00087C12.9045 3 12.7973 3 12.6747 3H8.2002C7.08009 3 6.51962 3 6.0918 3.21799C5.71547 3.40973 5.40973 3.71547 5.21799 4.0918C5 4.51962 5 5.08009 5 6.2002V17.8002C5 18.9203 5 19.4801 5.21799 19.9079C5.40973 20.2842 5.71547 20.5905 6.0918 20.7822C6.51921 21 7.079 21 8.19694 21L15.8031 21C16.921 21 17.48 21 17.9074 20.7822C18.2837 20.5905 18.5905 20.2842 18.7822 19.9079C19 19.4805 19 18.9215 19 17.8036V9.32568C19 9.20296 19 9.09561 18.9991 9M13 3.00087C13.2856 3.00347 13.4663 3.01385 13.6388 3.05526C13.8429 3.10425 14.0379 3.18526 14.2168 3.29492C14.4186 3.41857 14.5918 3.59182 14.9375 3.9375L18.063 7.06298C18.4089 7.40889 18.5809 7.58136 18.7046 7.78319C18.8142 7.96214 18.8953 8.15726 18.9443 8.36133C18.9857 8.53376 18.9963 8.71451 18.9991 9M13 3.00087V5.8C13 6.9201 13 7.47977 13.218 7.90759C13.4097 8.28392 13.7155 8.59048 14.0918 8.78223C14.5192 9 15.079 9 16.1969 9H18.9991M18.9991 9H19.0002M14 13L16 15L14 17M10 17L8 15L10 13" stroke="#e84235" stroke-width="2" stroke-linecap="round" stroke-linejoin="round""/>', color: 'none' },
    
    'default': { path: '<path id="Vector" d="M13 3.00087C12.9045 3 12.7973 3 12.6747 3H8.2002C7.08009 3 6.51962 3 6.0918 3.21799C5.71547 3.40973 5.40973 3.71547 5.21799 4.0918C5 4.51962 5 5.08009 5 6.2002V17.8002C5 18.9203 5 19.4801 5.21799 19.9079C5.40973 20.2842 5.71547 20.5905 6.0918 20.7822C6.51921 21 7.079 21 8.19694 21L15.8031 21C16.921 21 17.48 21 17.9074 20.7822C18.2837 20.5905 18.5905 20.2842 18.7822 19.9079C19 19.4805 19 18.9215 19 17.8036V9.32568C19 9.20296 19 9.09561 18.9991 9M13 3.00087C13.2856 3.00347 13.4663 3.01385 13.6388 3.05526C13.8429 3.10425 14.0379 3.18526 14.2168 3.29492C14.4186 3.41857 14.5918 3.59182 14.9375 3.9375L18.063 7.06298C18.4089 7.40889 18.5809 7.58136 18.7046 7.78319C18.8142 7.96214 18.8953 8.15726 18.9443 8.36133C18.9857 8.53376 18.9963 8.71451 18.9991 9M13 3.00087V5.8C13 6.9201 13 7.47977 13.218 7.90759C13.4097 8.28392 13.7155 8.59048 14.0918 8.78223C14.5192 9 15.079 9 16.1969 9H18.9991M18.9991 9H19.0002M14 13L16 15L14 17M10 17L8 15L10 13" stroke="#5f6368" stroke-width="2" stroke-linecap="round" stroke-linejoin="round""/>', color: 'none' }
};

function getFileIcon(fileName) {
    const parts = fileName.split('.');
    if (parts.length > 1) {
        const ext = '.' + parts.pop().toLowerCase();
        return FILE_ICONS[ext] || FILE_ICONS['default'];
    }
    return FILE_ICONS['default'];
}


document.addEventListener('DOMContentLoaded', () => {
    loadSavedTheme();
    loadFiles();
    showToken();
    initializeDragAndDrop();
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
});

function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/; SameSite=Lax";
}

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function applyTheme(theme) {
    const root = document.documentElement;
    const toggleButton = document.getElementById('themeToggle');

    if (theme === 'dark') {
        root.classList.add('dark-theme');
        toggleButton.innerHTML = 'Переключить тему 🌙';
    } else {
        root.classList.remove('dark-theme');
        toggleButton.innerHTML = 'Переключить тему ☀️';
    }
    setCookie('theme', theme, 365);
}

function toggleTheme() {
    const currentTheme = document.documentElement.classList.contains('dark-theme') ? 'dark' : 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(newTheme);
}

function loadSavedTheme() {
    const savedTheme = getCookie('theme');
    const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    let defaultTheme = 'light';
    
    if (savedTheme) {
        defaultTheme = savedTheme;
    } else if (systemPrefersDark) {
        defaultTheme = 'dark';
    }

    applyTheme(defaultTheme);
}

function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('active');
    document.querySelector('.sidebar-overlay').classList.toggle('active');
}

function triggerUpload() {
    document.getElementById('fileInput').click();
    document.getElementById('sidebar').classList.remove('active');
    document.querySelector('.sidebar-overlay').classList.remove('active');
}

function openLoadModal() {
    document.getElementById('loadTokenModal').style.display = 'block';
    document.getElementById('tokenInput').value = '';
}

function closeLoadModal() {
    document.getElementById('loadTokenModal').style.display = 'none';
}

function copyToClipboard(textToCopy) {
    const tempTextArea = document.createElement('textarea');
    tempTextArea.value = textToCopy;
    tempTextArea.setAttribute('readonly', '');
    tempTextArea.style.position = 'absolute';
    tempTextArea.style.left = '-9999px';
    document.body.appendChild(tempTextArea);

    tempTextArea.select();
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            // uShowToast('Успешно скопировано');
        } else {
            // uShowToast('Не удалось скопировать');
        }
    } catch (err) {
        console.error('Ошибка при копировании: ', err);
    }
    
    document.body.removeChild(tempTextArea);
}

function showToken() {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; user_token=`);
    if (parts.length === 2) {
        const token = parts.pop().split(';').shift();
        document.getElementById('tokenDisplay').innerText = token;
    } else {
            document.getElementById('tokenDisplay').innerText = 'Нет токена';
    }
}

function copyToken() {
    const token = document.getElementById('tokenDisplay').innerText;
    if(token && !token.includes('Загрузка') && !token.includes('Нет токена')) {
        navigator.clipboard.writeText(token).then(() => uShowToast('Токен скопирован!'));
    }
}

async function loadTokenFromInput() {
    const token = document.getElementById('tokenInput').value.trim();
    if (token.length < 26) {
        uShowToast('Введите полный токен (мин. 26 символов)');
        return;
    }

    try {
        const response = await fetch('/api/loadtoken', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: token })
        });
        const result = await response.json();

        if (result.ok) {
            closeLoadModal();
            uShowToast('Вход выполнен. Обновление файлов...');
            
            showToken(); 
            location.reload();
        } else {
            uShowToast('Ошибка входа: ' + (result.error || 'Неизвестная ошибка'));
        }
    } catch (error) {
        uShowToast('Ошибка сети при попытке входа');
    }
}

function initializeDragAndDrop() {
    const body = document.body;
    const overlay = document.getElementById('dragOverlay');

    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        document.body.addEventListener(eventName, preventDefaults, false);
    });
    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    body.addEventListener('dragenter', handleDragEnter, false);
    body.addEventListener('dragleave', handleDragLeave, false);

    function handleDragEnter(e) {
        if (e.target.id !== 'dragOverlay') {
            overlay.classList.add('active');
        }
    }
    
    function handleDragLeave(e) {
        if (e.relatedTarget === null || !document.body.contains(e.relatedTarget)) {
            overlay.classList.remove('active');
        }
    }
    
    body.addEventListener('drop', handleDrop, false);

    function handleDrop(e) {
        overlay.classList.remove('active');
        const dt = e.dataTransfer;
        const files = dt.files;

        if (files.length > 0) {
            uploadFileFromDrop(files[0]);
        }
    }
}

// file progressbar
let isUploading = false; 
let uploadIdCounter = 0;

function createUploadProgress(fileName) {
    const id = `upload-${uploadIdCounter++}`;
    const container = document.getElementById('uploadNotifications');
    
    const item = document.createElement('div');
    item.id = id;
    item.className = 'upload-progress-item';
    item.innerHTML = `
        <div class="upload-info">
            <span class="upload-file-name" title="${fileName}">${fileName}</span>
            <span class="upload-percentage">0%</span>
        </div>
        <div class="progress-bar-container">
            <div class="progress-bar-fill" style="width: 0%;"></div>
        </div>
    `;

    container.appendChild(item);
    
    setTimeout(() => {
        item.classList.add('visible');
    }, 10);
    
    return id;
}

function updateUploadProgress(id, percentage) {
    const item = document.getElementById(id);
    if (item) {
        const percentageText = item.querySelector('.upload-percentage');
        const progressBar = item.querySelector('.progress-bar-fill');
        
        const roundedPercent = Math.round(percentage);
        
        if (percentageText) {
            percentageText.textContent = `${roundedPercent}%`;
        }
        if (progressBar) {
            progressBar.style.width = `${percentage}%`;
        }
    }
}

function removeUploadProgress(id, isSuccess, message) {
    const item = document.getElementById(id);
    if (item) {
        if (isSuccess) {
            updateUploadProgress(id, 100);
        }

        uShowToast(message, isSuccess ? 'success' : 'error');
        
        item.classList.remove('visible');
        item.style.transform = 'translateY(100%)'; 
        
        setTimeout(() => {
            item.remove();
        }, 300);
    }
}

async function uploadFileFromDrop(file) {

    if (isUploading) {
        uShowToast(`Идет загрузка файла. Дождитесь ее завершения, чтобы загрузить "${file.name}".`, 'warning');
        return; 
    }

    isUploading = true;

    const progressId = createUploadProgress(file.name);
    const formData = new FormData();
    formData.append('file', file);

    document.getElementById('loader').style.display = 'block';

    const xhr = new XMLHttpRequest();

    xhr.open('POST', '/upload', true);

    xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable) {
            const percent = (e.loaded / e.total) * 100;
            updateUploadProgress(progressId, percent);
        }
    });
    
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            isUploading = false;

            let result = {};
            let isSuccess = false;
            let message = '';

            try {
                result = JSON.parse(xhr.responseText);
                isSuccess = result.ok;
                message = isSuccess 
                    ? `Файл "${file.name}" успешно загружен`
                    : 'Ошибка: ' + (result.error || 'Unknown');
            } catch (e) {
                isSuccess = false;
                message = `Ошибка сервера (${xhr.status}) или некорректный ответ при загрузке "${file.name}"`;
            }
            
            removeUploadProgress(progressId, isSuccess, message);
        }
    };

    xhr.onerror = function() {
        isUploading = false;
        removeUploadProgress(progressId, false, `Ошибка сети при загрузке файла "${file.name}"`);
    };

    try {
        xhr.send(formData);
    } catch (error) {
        removeUploadProgress(progressId, false, `Непредвиденная ошибка при отправке файла "${file.name}"`);
    } finally {
        isUploading = false;
        document.getElementById('loader').style.display = 'none';
    }
}

async function loadFiles() {
    try {
        const response = await fetch('/api/files');
        const files = await response.json();
        renderTable(files);
    } catch (error) {
        console.error('Error:', error);
    }
}

function openFile(id, name) {
    const encodedName = encodeURIComponent(name);
    const url = `${window.location.origin}/file/${id}?mode=view`;
    window.open(url, '_blank');
}

function downloadFile(id, name) {
    const encodedName = encodeURIComponent(name);
    const url = `${window.location.origin}/file/${id}`;
    window.open(url, '_blank');
}

function renderTable(files) {
    const tbody = document.getElementById('fileTableBody');
    const emptyState = document.getElementById('emptyState');
    tbody.innerHTML = '';

    if (files.length === 0) {
        emptyState.style.display = 'block';
        return;
    }
    emptyState.style.display = 'none';

    files.forEach(file => {
        const ext = ('.' + file.name.split('.').pop()).toLowerCase();
        const isViewable = VIEWABLE_EXTENSIONS.includes(ext);
        const fileNameElement = document.createElement('span');
        fileNameElement.style.overflow = "hidden";
        fileNameElement.style.textOverflow = "ellipsis";
        fileNameElement.className = 'file-name-display';
        fileNameElement.textContent = file.name;
        fileNameElement.setAttribute('data-file-id', file.id);
        fileNameElement.setAttribute("title", "Двойной клик - переименовать")

        fileNameElement.addEventListener('dblclick', function() {
            enableFileNameEditing(this);
        });
        
        const iconData = getFileIcon(file.name);

        const openButton = isViewable 
            ?  `<button class="icon-btn" onclick="openFile('${file.id}', '${file.name}')" title="Открыть для просмотра">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="bgCarrier" stroke-width="0"></g><g id="tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M20.7703 12C20.7703 11.6412 20.5762 11.4056 20.188 10.9343C18.768 9.21014 15.6357 6 12 6C8.36428 6 5.23207 9.21014 3.81198 10.9343C3.42382 11.4056 3.22974 11.6412 3.22974 12C3.22974 12.3588 3.42382 12.5944 3.81198 13.0657C5.23207 14.7899 8.36428 18 12 18C15.6357 18 18.768 14.7899 20.188 13.0657C20.5762 12.5944 20.7703 12.3588 20.7703 12ZM12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3432 9 9.00002 10.3431 9.00002 12C9.00002 13.6569 10.3432 15 12 15Z"></path> </g></svg>
                </button>
                <button class="icon-btn" onclick="downloadFile('${file.id}')" title="Скачать">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="bgCarrier" stroke-width="0"></g><g id="tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M8 10C8 7.79086 9.79086 6 12 6C14.2091 6 16 7.79086 16 10V11H17C18.933 11 20.5 12.567 20.5 14.5C20.5 16.433 18.933 18 17 18H16.9C16.3477 18 15.9 18.4477 15.9 19C15.9 19.5523 16.3477 20 16.9 20H17C20.0376 20 22.5 17.5376 22.5 14.5C22.5 11.7793 20.5245 9.51997 17.9296 9.07824C17.4862 6.20213 15.0003 4 12 4C8.99974 4 6.51381 6.20213 6.07036 9.07824C3.47551 9.51997 1.5 11.7793 1.5 14.5C1.5 17.5376 3.96243 20 7 20H7.1C7.65228 20 8.1 19.5523 8.1 19C8.1 18.4477 7.65228 18 7.1 18H7C5.067 18 3.5 16.433 3.5 14.5C3.5 12.567 5.067 11 7 11H8V10ZM13 11C13 10.4477 12.5523 10 12 10C11.4477 10 11 10.4477 11 11V16.5858L9.70711 15.2929C9.31658 14.9024 8.68342 14.9024 8.29289 15.2929C7.90237 15.6834 7.90237 16.3166 8.29289 16.7071L11.2929 19.7071C11.6834 20.0976 12.3166 20.0976 12.7071 19.7071L15.7071 16.7071C16.0976 16.3166 16.0976 15.6834 15.7071 15.2929C15.3166 14.9024 14.6834 14.9024 14.2929 15.2929L13 16.5858V11Z"></path> </g></svg>
                </button>`
            :  `<button class="icon-btn" onclick="downloadFile('${file.id}')" title="Скачать">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="bgCarrier" stroke-width="0"></g><g id="tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M8 10C8 7.79086 9.79086 6 12 6C14.2091 6 16 7.79086 16 10V11H17C18.933 11 20.5 12.567 20.5 14.5C20.5 16.433 18.933 18 17 18H16.9C16.3477 18 15.9 18.4477 15.9 19C15.9 19.5523 16.3477 20 16.9 20H17C20.0376 20 22.5 17.5376 22.5 14.5C22.5 11.7793 20.5245 9.51997 17.9296 9.07824C17.4862 6.20213 15.0003 4 12 4C8.99974 4 6.51381 6.20213 6.07036 9.07824C3.47551 9.51997 1.5 11.7793 1.5 14.5C1.5 17.5376 3.96243 20 7 20H7.1C7.65228 20 8.1 19.5523 8.1 19C8.1 18.4477 7.65228 18 7.1 18H7C5.067 18 3.5 16.433 3.5 14.5C3.5 12.567 5.067 11 7 11H8V10ZM13 11C13 10.4477 12.5523 10 12 10C11.4477 10 11 10.4477 11 11V16.5858L9.70711 15.2929C9.31658 14.9024 8.68342 14.9024 8.29289 15.2929C7.90237 15.6834 7.90237 16.3166 8.29289 16.7071L11.2929 19.7071C11.6834 20.0976 12.3166 20.0976 12.7071 19.7071L15.7071 16.7071C16.0976 16.3166 16.0976 15.6834 15.7071 15.2929C15.3166 14.9024 14.6834 14.9024 14.2929 15.2929L13 16.5858V11Z"></path> </g></svg>
                </button>`;

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td title="${file.name}">
                <div style="display: flex; align-items: center; gap: 10px;">
                    <svg style="fill:${iconData.color}; min-width: 24px;" viewBox="0 0 24 24">${iconData.path}</svg>
                    <span class="filename-placeholder"></span>
                </div>
            </td>
            <td onclick="copyToClipboard('${file.id}')" title="Нажмите, чтобы скопировать"><span>${file.id}</span></td>
            <td class="token-cell" onclick="copyToClipboard('${file.owner_key}')" title="Нажмите, чтобы скопировать"><span>${file.owner_key}</span></td>
            <td class="views-cell" title="Просмотры (уникальные)">${file.views} (${file.unique})</span>
            <td class="size-cell" title="Размер">${file.size}</span>
            </td>
            <td class="action-cell">
                ${openButton} 
                <button class="icon-btn" onclick="copyLink('file/${file.id}')" title="Копировать ссылку">
                    <svg viewBox="0 0 24 24"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>
                </button>
                <button class="icon-btn" onclick="copyLink('share/${file.id}_${file.owner_key}')" title="Поделиться доступом">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="bgCarrier" stroke-width="0"></g><g id="tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="iconCarrier"> <path d="M11 7C11 9.20914 9.20914 11 7 11C4.79086 11 3 9.20914 3 7C3 4.79086 4.79086 3 7 3C9.20914 3 11 4.79086 11 7ZM4.97715 7C4.97715 8.11719 5.88281 9.02284 7 9.02284C8.11719 9.02284 9.02284 8.11719 9.02284 7C9.02284 5.88281 8.11719 4.97716 7 4.97716C5.88281 4.97716 4.97715 5.88281 4.97715 7Z"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M2.37162 14.2378C3.54371 13.3886 5.09751 13 7 13C8.90249 13 10.4563 13.3886 11.6284 14.2378C12.8188 15.1004 13.4914 16.3477 13.795 17.8079C14.1811 19.6647 12.5708 21 11 21H3C1.42922 21 -0.181121 19.6647 0.204962 17.8079C0.508602 16.3477 1.18119 15.1004 2.37162 14.2378ZM3.54511 15.8574C2.84896 16.3618 2.39073 17.1203 2.16308 18.2151C2.12425 18.4018 2.17618 18.5729 2.31828 18.7223C2.47041 18.8824 2.71717 19 3 19H11C11.2828 19 11.5296 18.8824 11.6817 18.7223C11.8238 18.5729 11.8757 18.4018 11.8369 18.2151C11.6093 17.1203 11.151 16.3618 10.4549 15.8574C9.74039 15.3397 8.65185 15 7 15C5.34815 15 4.25961 15.3397 3.54511 15.8574Z"></path> <path d="M21 7C21 9.20914 19.2091 11 17 11C14.7909 11 13 9.20914 13 7C13 4.79086 14.7909 3 17 3C19.2091 3 21 4.79086 21 7ZM14.9772 7C14.9772 8.11719 15.8828 9.02284 17 9.02284C18.1172 9.02284 19.0228 8.11719 19.0228 7C19.0228 5.88281 18.1172 4.97716 17 4.97716C15.8828 4.97716 14.9772 5.88281 14.9772 7Z"></path> <path d="M14.5361 13.2689C13.9347 13.4165 13.7248 14.1168 14.0647 14.6344L14.1075 14.6995C14.3593 15.0829 14.839 15.239 15.2891 15.1501C15.7787 15.0534 16.3451 15 17 15C18.6519 15 19.7404 15.3397 20.4549 15.8574C21.1511 16.3618 21.6093 17.1203 21.8369 18.2151C21.8758 18.4018 21.8238 18.5729 21.6817 18.7223C21.5296 18.8824 21.2828 19 21 19H16C15.4478 19 15 19.4477 15 20C15 20.5523 15.4478 21 16 21H21C22.5708 21 24.1811 19.6647 23.7951 17.8079C23.4914 16.3477 22.8188 15.1004 21.6284 14.2378C20.4563 13.3886 18.9025 13 17 13C16.0994 13 15.2769 13.0871 14.5361 13.2689Z"></path> </g></svg>
                </button>
                <button class="icon-btn delete" onclick="deleteFile('${file.id}', '${file.owner_key}', this)" title="Удалить">
                    <svg viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
                </button>
            </td>
        `;

        const placeholder = tr.querySelector('.filename-placeholder');
        if (placeholder) {
            placeholder.replaceWith(fileNameElement); 
        }

        tbody.appendChild(tr);
    });
}

function copyLink(id) {
    const url = `${window.location.origin}/${id}`;
    navigator.clipboard.writeText(url).then(() => uShowToast('Ссылка скопирована'));
}

async function uploadFile(input) {
    if (!input.files || input.files.length === 0) return;
    await uploadFileFromDrop(input.files[0]);
    input.value = '';
}

async function deleteFile(id, ownerToken, btnElement) {
    if(!confirm('Удалить файл навсегда?')) return;
    try {
        const response = await fetch(`/delete/${id}`, { headers: { 'Authorization': ownerToken } });
        const result = await response.json();
        if (result.ok) {
            btnElement.closest('tr').remove();
            uShowToast('Файл удален');
            if(document.getElementById('fileTableBody').children.length === 0) {
                document.getElementById('emptyState').style.display = 'block';
            }
        } else {
            uShowToast('Ошибка: ' + result.error);
        }
    } catch (error) { uShowToast('Ошибка сети'); }
}

async function loadUserInfo() {
    try {
        const response = await fetch('/api/me');
        const user = await response.json();
        const usernameElement = document.getElementById('currentUsername');
        if (user && user.username) {
            usernameElement.textContent = user.username;
        } else {
            usernameElement.textContent = 'Guest';
            usernameElement.style.cursor = 'default';
            usernameElement.removeAttribute('title');
        }
    } catch (error) {
        console.error('Error loading user info:', error);
        document.getElementById('currentUsername').textContent = 'Ошибка загрузки';
        document.getElementById('currentUsername').style.cursor = 'default';
    }
}

function toggleEditMode(isEditing) {
    const display = document.querySelector('.user-info-display');
    const editForm = document.querySelector('.username-edit-form');
    const usernameElement = document.getElementById('currentUsername');
    const usernameInput = document.getElementById('usernameInput');
    const editBtn = document.getElementById('editUsernameBtn');
    const cancelBtn = document.getElementById('cancelUsernameBtn');
    
    const isMobile = window.matchMedia('(max-width: 1350px)').matches;

    if (isEditing) {
        if (usernameElement.textContent.trim() === 'Гость') return;

        display.style.display = 'none';
        editForm.style.display = 'flex';
        usernameInput.value = usernameElement.textContent.trim();
        usernameInput.focus();
        
        if (isMobile) {
            editBtn.style.display = 'none';
            cancelBtn.style.display = 'flex';
        }

    } else {
        display.style.display = 'flex';
        editForm.style.display = 'none';

        if (isMobile) {
            editBtn.style.display = 'flex';
            cancelBtn.style.display = 'none';
        }
    }
}

function isValidUsername(username) {
    const minLength = 6;
    const maxLength = 24;
    const regex = /^[a-zA-Z0-9]+$/; 

    if (username.length < minLength || username.length > maxLength) {
        uShowToast(`Юзернейм должен быть от ${minLength} до ${maxLength} символов.`, 'error');
        return false;
    }
    if (!regex.test(username)) {
        uShowToast('Юзернейм может содержать только английские буквы и цифры.', 'error');
        return false;
    }
    return true;
}

async function saveUsername() {
    const newUsername = document.getElementById('usernameInput').value.trim();
    const currentUsername = document.getElementById('currentUsername').textContent.trim();

    if (!isValidUsername(newUsername)) {
        return;
    }

    if (newUsername === currentUsername) {
        uShowToast('Юзернейм не изменился.', 'info');
        toggleEditMode(false);
        return;
    }

    try {
        const response = await fetch('/api/setme/username', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: newUsername })
        });
        const result = await response.json();

        if (result.ok) {
            document.getElementById('currentUsername').textContent = newUsername;
            uShowToast('Юзернейм успешно изменен!', 'success');
            toggleEditMode(false);
        } else {
            uShowToast('Ошибка изменения юзернейма: ' + (result.error || 'Неизвестная ошибка'), 'error');
        }
    } catch (error) {
        console.error('Error saving username:', error);
        uShowToast('Ошибка сети при попытке изменения юзернейма', 'error');
    }
}

function initUsernameFeature() {
    const usernameElement = document.getElementById('currentUsername');
    const editBtn = document.getElementById('editUsernameBtn');
    const saveBtn = document.getElementById('saveUsernameBtn');
    const cancelBtn = document.getElementById('cancelUsernameBtn');
    const usernameInput = document.getElementById('usernameInput');

    usernameElement.addEventListener('click', (e) => {
        if (e.detail === 1 && usernameElement.textContent.trim() !== 'Загрузка...' && usernameElement.textContent.trim() !== 'Ошибка загрузки') {
            const username = usernameElement.textContent.trim();
            copyToClipboard(username); 
            uShowToast('Юзернейм скопирован'); 
        }
    });

    usernameElement.addEventListener('dblclick', () => {
        toggleEditMode(true);
    });

    editBtn.addEventListener('click', () => {
        toggleEditMode(true);
    });

    saveBtn.addEventListener('click', saveUsername);
    
    cancelBtn.addEventListener('click', () => {
        toggleEditMode(false);
    });

    usernameInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            saveUsername();
        }
    });

    loadUserInfo();
}

async function renameFile(fileId, newName) {
    try {
        const response = await fetch('/api/rename', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                file: fileId,
                name: newName
            })
        });

        const result = await response.json();

        if (response.ok && result.ok) {
            uShowToast(`Файл успешно переименован в "${newName}"`, 'success');
            loadFiles();
        } else if (response.status === 403) {
            uShowToast("Нет доступа для переименования файла", "error");
        } else {
            uShowToast(`Ошибка переименования: ${result.error || 'Неизвестный ответ сервера'}`, "error");
        }
    } catch (error) {
        console.error('Rename file error:', error);
        uShowToast("Ошибка сети при попытке переименования", "error");
    }
}

function disableFileNameEditing(element, save = false) {
    const input = element.querySelector('input');
    const originalText = element.getAttribute('data-original-name');
    
    if (!input) return;

    const fileId = element.getAttribute('data-file-id');
    let newName = input.value.trim();

    input.blur();
    
    element.removeChild(input);
    element.textContent = originalText;
    element.classList.remove('editing');

    if (save && newName !== originalText) {
        if (newName.length > 0) {
            element.textContent = newName;
            renameFile(fileId, newName);
        } else {
            uShowToast("Имя файла не может быть пустым", "warning");
        }
    } else {
        element.textContent = originalText;
    }

    document.removeEventListener('click', handleOutsideClick);
}

function handleOutsideClick(event) {
    const activeElement = document.querySelector('.file-name-display.editing');
    if (activeElement && !activeElement.contains(event.target)) {
        disableFileNameEditing(activeElement, true);
    }
}

function enableFileNameEditing(element) {
    if (element.classList.contains('editing')) return;

    const currentName = element.textContent.trim();

    const input = document.createElement('input');
    input.type = 'text';
    input.value = currentName;
    input.className = 'rename-input';


    element.setAttribute('data-original-name', currentName);
    element.classList.add('editing');

    element.textContent = '';
    element.appendChild(input);

    input.focus();
    input.select(); 

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            disableFileNameEditing(element, true);
        } else if (e.key === 'Escape') {
            disableFileNameEditing(element, false);
        }
    });
    setTimeout(() => {
        document.addEventListener('click', handleOutsideClick);
    }, 100); 
}

document.addEventListener('DOMContentLoaded', initUsernameFeature);