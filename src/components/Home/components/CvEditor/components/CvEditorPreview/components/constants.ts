// Function to add contenteditable to template elements
export const makeEditable = (html: string): string => {
    return html
        .replace(/<h1 class=['"]name['"]\s*>/g, '<h1 class="name" contenteditable="true">')
        .replace(/<p class=['"]title['"]\s*>/g, '<p class="title" contenteditable="true">')
        .replace(/<p class=['"]intro['"]\s*>/g, '<p class="intro" contenteditable="true">')
        .replace(/<p class=['"]job-company['"]\s*>/g, '<p class="job-company" contenteditable="true">')
        .replace(/<p class=['"]job-time['"]\s*>/g, '<p class="job-time" contenteditable="true">')
        .replace(/<p class=['"]edu-title['"]\s*>/g, '<p class="edu-title" contenteditable="true">')
        .replace(/<li>/g, '<li contenteditable="true">')
        .replace(/<p>([📧📞📍🎂•])/g, '<p contenteditable="true">$1')
        .replace(/<p><b>/g, '<p contenteditable="true"><b>')
        .replace(/<p>Thời gian/g, '<p contenteditable="true">Thời gian')
}

export const EDITABLE_STYLES = `
    .cv-template-wrapper {
        background: #ffffff;
        width: 100%;
        min-height: 29.7cm;
    }
    [contenteditable="true"] {
        outline: none;
        transition: background-color 0.15s ease;
        border-radius: 3px;
        min-height: 1em;
    }
    [contenteditable="true"]:hover {
        background-color: rgba(18, 58, 99, 0.06);
        cursor: text;
    }
    [contenteditable="true"]:focus {
        background-color: rgba(18, 58, 99, 0.1);
        box-shadow: inset 0 0 0 1px rgba(18, 58, 99, 0.2);
    }
    [contenteditable="true"]:empty::before {
        content: "Nhấp để nhập...";
        color: #aaa;
        font-style: italic;
        pointer-events: none;
    }
    .avatar-box {
        position: relative;
        cursor: pointer;
    }
    .avatar-box::after {
        content: "📷 Đổi ảnh";
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0, 0, 0, 0.7);
        color: white;
        text-align: center;
        padding: 8px;
        font-size: 12px;
        opacity: 0;
        transition: opacity 0.2s;
        border-radius: 0 0 14px 14px;
    }
    .avatar-box:hover::after { opacity: 1; }
    .avatar-box img { transition: filter 0.2s; }
    .avatar-box:hover img { filter: brightness(0.8); }
`

