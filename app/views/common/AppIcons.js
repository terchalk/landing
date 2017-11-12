import React from 'react';

const mainLogo =
    (<svg width="24" height="17" viewBox="0 0 24 17" xmlns="http://www.w3.org/2000/svg">
        <g fill="none" fillRule="evenodd">
        <path d="M18.492 9.36c-2.13 1.202-3.977 1.792-5.55 1.764-2.21-.038-5.437-1.33-9.72-3.875l8.423 8.722 6.847-6.613z" stroke="#FD5C63"/>
        <g transform="rotate(-24 1.98 -3)">
        <path d="M2.428.726c1.375 2.305 2.5 3.977 3.37 5.016.873 1.04 2.348 2.22 4.426 3.543L7.79 11.4C6.64 9.18 5.664 7.59 4.86 6.63 4.058 5.673 2.585 4.26.443 2.393L2.428.726z" fill="#FD5C63"/>
        <rect fill="#FD5C63" transform="rotate(142 9.55 11.11)" x="5.485" y="9.214" width="8.13" height="3.794" rx="1.897"/>
        <rect fill="#FE8E93" transform="rotate(142 9.55 11.11)" x="8.118" y="9.216" width="2.863" height="3.79" rx=".2"/>
        </g>
        </g>
    </svg>);
const mobileIcon =
    (<svg width="24" height="32" viewBox="0 0 24 32" xmlns="http://www.w3.org/2000/svg">
        <g fill="none" fillRule="evenodd">
        <path d="M-4 0h32v32H-4z"/>
        <g fillRule="nonzero" fill="#FD5C63">
        <path d="M4.154 19.152h15.578v1H4.154zM4.154 20.94h15.578v1H4.154zM18.06 3.552h-2.443C15.617 1.59 14.003 0 12.012 0c-1.99 0-3.604 1.59-3.604 3.552h-2.58v4.163h12.23V3.552zM7.7 6.3c-.38 0-.687-.303-.687-.676 0-.374.308-.677.687-.677.38 0 .687.303.687.677 0 .373-.308.676-.687.676zm2.774-2.748c0-.836.69-1.516 1.538-1.516.848 0 1.54.68 1.54 1.516h-3.078zM16.24 6.3c-.38 0-.687-.303-.687-.676 0-.374.307-.677.686-.677.38 0 .686.303.686.677 0 .373-.307.676-.687.676zM4.154 22.727h15.578v1H4.154zM4.154 12.002h15.578v1H4.154zM4.154 10.214h15.578v1H4.154z"/>
        <path d="M19.166 4.936V6.25h2.944v19.344h-5.06v4.984l.69-.678v-3.627h3.68l.058-.056-4.426 4.36H1.914V6.252H4.86V4.937H.527V31.94h22.83V6.25h.14V4.937"/>
        <path d="M4.154 17.364h15.578v1H4.154zM4.154 15.577h15.578v1H4.154zM4.154 13.79h15.578v1H4.154z"/>
        </g>
        </g>
    </svg>);
const backButton =
    (<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
        <g fill="none" fillRule="evenodd" opacity=".87">
            <path d="M-4-4h24v24H-4" />
            <path fill="#000" fillRule="nonzero" d="M16 7H3.83l5.59-5.59L8 0 0 8l8 8 1.41-1.41L3.83 9H16" />
        </g>
    </svg>);
const forwardButton =
    (<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
        <g fill="none" fillRule="evenodd" opacity=".87">
            <path d="M20 20H-4V-4h24" />
            <path fill="#393939" fillRule="nonzero" d="M0 9h12.17l-5.59 5.59L8 16l8-8-8-8-1.41 1.41L12.17 7H0" />
        </g>
    </svg>);
const profileIcon = 
    (<svg width="20" height="22" viewBox="0 0 20 22" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(0 1)" stroke="#000" fill="none" fillRule="evenodd" opacity=".54" strokeLinejoin="round">
        <path d="M7.5 11.28V14l-5.01 1.79C1.298 16.215.5 17.346.5 18.613V20.5h19v-1.886c0-1.268-.797-2.398-1.99-2.825L12.5 14v-2.906"/>
        <ellipse cx="9.875" cy="6" rx="5" ry="6"/>
        <path d="M14.828 5.453l-.453.047c-1.703.328-2.797-.29-3.734-1.93C10.08 4.648 8.32 5.5 6.876 5.5c-.71 0-1.323-.146-1.936-.466"/>
        </g>
    </svg>);

const AppIcons = {
    mainLogo,
    mobileIcon,
    backButton,
    forwardButton,
    profileIcon
};

export default AppIcons;
