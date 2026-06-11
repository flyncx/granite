import ReactDOM from "react-dom/client"
import { MarkdownRenderChild } from "obsidian";
import { StrictMode } from "react";
import { ErrorBoundary } from "react-error-boundary"

import { styled, StyleSheetManager } from "styled-components"

import { parse as parseYaml } from "yaml"

import * as z from "zod";

const WebEmbedOptions = z.object({
    url: z.string(),
    minHeight: z.string().or(z.number()).default("512px")
});

const Iframe = styled.iframe`
    width: 100%;
    min-height: var(--min-height);
`

function WebEmbed(props: { source: string }) {
    const data = WebEmbedOptions.parse(parseYaml(props.source))
    return <Iframe src={data.url} style={{
        '--min-height': typeof data.minHeight === 'number' ? `${data.minHeight}px` : data.minHeight
    } as any}></Iframe>
}

export class WebEmbedMRC extends MarkdownRenderChild {
    public source: string;
    public shadowRoot: ShadowRoot;
    public root: ReactDOM.Root | null;
    constructor(containerEl: HTMLElement, source: string) {
        super(containerEl);
        this.source = source;
        this.shadowRoot = this.containerEl.attachShadow({ mode: 'open' });
        this.root = null;
    }
    override onload(): void {
        this.root = ReactDOM.createRoot(this.shadowRoot);
        this.root.render(<StrictMode>
            <StyleSheetManager target={this.shadowRoot}>
                <ErrorBoundary fallback={<p>Something went fucking wrong! (check console)</p>}>
                    <WebEmbed source={this.source} />
                </ErrorBoundary>
            </StyleSheetManager>
        </StrictMode>)
    } override onunload(): void {
        this.root?.unmount();
    }
}