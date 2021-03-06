import {VDITOR_VERSION} from "./ts/constants";
import {Counter} from "./ts/counter/index";
import {formatRender} from "./ts/editor/formatRender";
import {getSelectText} from "./ts/editor/getSelectText";
import {getText} from "./ts/editor/getText";
import {html2md} from "./ts/editor/html2md";
import {Editor} from "./ts/editor/index";
import {insertText} from "./ts/editor/insertText";
import {selectIsEditor} from "./ts/editor/selectIsEditor";
import {setSelectionByPosition} from "./ts/editor/setSelection";
import {getCursorPosition} from "./ts/hint/getCursorPosition";
import {Hint} from "./ts/hint/index";
import {Hotkey} from "./ts/hotkey/index";
import {abcRender} from "./ts/markdown/abcRender";
import {chartRender} from "./ts/markdown/chartRender";
import {codeRender} from "./ts/markdown/codeRender";
import {emojiRender} from "./ts/markdown/emojiRender";
import {highlightRender} from "./ts/markdown/highlightRender";
import {mathRender} from "./ts/markdown/mathRender";
import {loadLuteJs, md2htmlByText} from "./ts/markdown/md2html";
import {mediaRender} from "./ts/markdown/mediaRender";
import {mermaidRender} from "./ts/markdown/mermaidRender";
import {previewRender} from "./ts/markdown/previewRender";
import {Preview} from "./ts/preview/index";
import {Resize} from "./ts/resize/index";
import {Tip} from "./ts/tip";
import {Toolbar} from "./ts/toolbar/index";
import {Ui} from "./ts/ui/index";
import {Undo} from "./ts/undo";
import {Upload} from "./ts/upload/index";
import {Options} from "./ts/util/Options";

class Vditor {

    public static codeRender = codeRender;
    public static highlightRender = highlightRender;
    public static mathRender = mathRender;
    public static mermaidRender = mermaidRender;
    public static chartRender = chartRender;
    public static abcRender = abcRender;
    public static emojiRender = emojiRender;
    public static mediaRender = mediaRender;
    public static md2html = md2htmlByText;
    public static preview = previewRender;
    public readonly version: string;
    public vditor: IVditor;

    constructor(id: string, options?: IOptions) {
        this.version = VDITOR_VERSION;

        const getOptions = new Options(options);
        const mergedOptions = getOptions.merge();

        this.vditor = {
            id,
            options: mergedOptions,
            originalInnerHTML: document.getElementById(id).innerHTML,
            tip: new Tip(),
            undo: undefined,
        };

        if (mergedOptions.counter > 0) {
            const counter = new Counter(this.vditor);
            this.vditor.counter = counter;
        }

        const editor = new Editor(this.vditor);
        this.vditor.editor = editor;
        this.vditor.undo = new Undo();

        if (mergedOptions.resize.enable) {
            const resize = new Resize(this.vditor);
            this.vditor.resize = resize;
        }

        if (mergedOptions.toolbar) {
            const toolbar: Toolbar = new Toolbar(this.vditor);
            this.vditor.toolbar = toolbar;
        }

        loadLuteJs().then(() => {
            if (this.vditor.toolbar.elements.preview || this.vditor.toolbar.elements.both) {
                const preview = new Preview(this.vditor);
                this.vditor.preview = preview;
            }

            if (mergedOptions.upload.url || mergedOptions.upload.handler) {
                const upload = new Upload();
                this.vditor.upload = upload;
            }

            const ui = new Ui(this.vditor);

            if (this.vditor.options.hint.at || this.vditor.toolbar.elements.emoji) {
                const hint = new Hint(this.vditor);
                this.vditor.hint = hint;
            }
            const hotkey = new Hotkey(this.vditor);
        });
    }

    public getValue() {
        return getText(this.vditor.editor.element);
    }

    public focus() {
        this.vditor.editor.element.focus();
    }

    public blur() {
        this.vditor.editor.element.blur();
    }

    public disabled() {
        this.vditor.editor.element.setAttribute("contenteditable", "false");
    }

    public enable() {
        this.vditor.editor.element.setAttribute("contenteditable", "true");
    }

    public setSelection(start: number, end: number) {
        setSelectionByPosition(start, end, this.vditor.editor.element);
    }

    public getSelection() {
        let selectText = "";
        if (window.getSelection().rangeCount !== 0) {
            selectText = getSelectText(this.vditor.editor.element);
        }
        return selectText;
    }

    public renderPreview(value?: string) {
        this.vditor.preview.render(this.vditor, value);
    }

    public getCursorPosition() {
        return getCursorPosition(this.vditor.editor.element);
    }

    public isUploading() {
        return this.vditor.upload.isUploading;
    }

    public clearCache() {
        localStorage.removeItem("vditor" + this.vditor.id);
    }

    public disabledCache() {
        this.vditor.options.cache = false;
    }

    public enableCache() {
        this.vditor.options.cache = true;
    }

    public html2md(value: string) {
        return html2md(this.vditor, value);
    }

    public getHTML() {
        return md2htmlByText(getText(this.vditor.editor.element));
    }

    public tip(text: string, time?: number) {
        this.vditor.tip.show(text, time);
    }

    public setPreviewMode(mode: string) {
        let toolbarItemClassName;
        switch (mode) {
            case "both":
                if (!this.vditor.toolbar.elements.both) {
                    return;
                }
                toolbarItemClassName = this.vditor.toolbar.elements.both.children[0].className;
                if (toolbarItemClassName.indexOf("vditor-menu--current") === -1) {
                    this.vditor.preview.element.className = "vditor-preview vditor-preview--both";
                    this.vditor.toolbar.elements.both.children[0].className =
                        `${toolbarItemClassName} vditor-menu--current`;
                    if (!this.vditor.toolbar.elements.preview) {
                        return;
                    }
                    this.vditor.toolbar.elements.preview.children[0].className =
                        this.vditor.toolbar.elements.preview.children[0].className.replace(" vditor-menu--current", "");
                }
                break;
            case "editor":
                if (!this.vditor.preview) {
                    return;
                }
                if (this.vditor.preview.element.className !== "vditor-preview vditor-preview--editor") {
                    this.vditor.preview.element.className = "vditor-preview vditor-preview--editor";
                    if (this.vditor.toolbar.elements.preview) {
                        this.vditor.toolbar.elements.preview.children[0].className =
                            this.vditor.toolbar.elements.preview.children[0].className
                                .replace(" vditor-menu--current", "");
                    }
                    if (this.vditor.toolbar.elements.both) {
                        this.vditor.toolbar.elements.both.children[0].className =
                            this.vditor.toolbar.elements.both.children[0].className
                                .replace(" vditor-menu--current", "");
                    }
                }
                break;
            case "preview":
                if (!this.vditor.toolbar.elements.preview) {
                    return;
                }
                toolbarItemClassName = this.vditor.toolbar.elements.preview.children[0].className;
                if (toolbarItemClassName.indexOf("vditor-menu--current") === -1) {
                    this.vditor.preview.element.className = "vditor-preview vditor-preview--preview";
                    this.vditor.toolbar.elements.preview.children[0].className =
                        `${toolbarItemClassName} vditor-menu--current`;
                    if (!this.vditor.toolbar.elements.both) {
                        return;
                    }
                    this.vditor.toolbar.elements.both.children[0].className =
                        this.vditor.toolbar.elements.both.children[0].className.replace(" vditor-menu--current", "");
                }
                break;
            default:
                break;
        }
    }

    public deleteValue() {
        if (selectIsEditor(this.vditor.editor.element)) {
            if (window.getSelection().isCollapsed) {
                return;
            }
            insertText(this.vditor, "", "", true);
        }
    }

    public updateValue(value: string) {
        if (selectIsEditor(this.vditor.editor.element)) {
            insertText(this.vditor, value, "", true);
        }
    }

    public insertValue(value: string) {
        if (selectIsEditor(this.vditor.editor.element)) {
            insertText(this.vditor, value, "");
        }
    }

    public setValue(value: string) {
        formatRender(this.vditor, value, {
            end: value.length,
            start: value.length,
        });
        if (!value) {
            localStorage.removeItem("vditor" + this.vditor.id);
        }
    }
}

export default Vditor;
