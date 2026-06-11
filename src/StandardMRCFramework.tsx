import ReactDOM from "react-dom/client"
import { MarkdownRenderChild } from "obsidian";
import { StrictMode } from "react"
import { ErrorBoundary } from "react-error-boundary";
import { StyleSheetManager } from "styled-components";
import type { ReactNode } from "react";


/**
 * An extension of MarkdownRenderChild that can mount/unmount React children inside a shadow-root 
 */
export default class StandardMRCFramework extends MarkdownRenderChild {
    public shadowRoot: ShadowRoot;
    public reactRoot: ReactDOM.Root | null;
    public children: ReactNode
    constructor(containerEl: HTMLElement, children: ReactNode) {
        super(containerEl);
        this.shadowRoot = this.containerEl.attachShadow({ mode: 'open' });
        this.reactRoot = null;
        this.children = children;
    }
    override onload(): void {
        this.reactRoot = ReactDOM.createRoot(this.shadowRoot);
        this.reactRoot.render(<StrictMode>
            <StyleSheetManager target={this.shadowRoot}>
                <ErrorBoundary fallback={<p>Something went fucking wrong! (check console)</p>}>
                    {this.children}
                </ErrorBoundary>
            </StyleSheetManager>
        </StrictMode>)
    } override onunload(): void {
        this.reactRoot?.unmount();
    }
}