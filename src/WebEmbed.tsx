
import { styled } from "styled-components"

import { parse as parseYaml } from "yaml"

import * as z from "zod";
import StandardMRCFramework from "./StandardMRCFramework";

const WebEmbedOptions = z.object({
    url: z.url().refine(
        url => {
            const u = new URL(url);
            return ["https:", "http:"].includes(u.protocol);
        },
        "Only HTTP(S) URLs allowed"
    ),
    minHeight: z.union([z.string(), z.number()]).default("512px")
});

const Iframe = styled.iframe`
    width: 100%;
    min-height: var(--min-height);
    box-sizing: border-box;
`

function WebEmbed(props: { source: string }) {
    const obj = parseYaml(props.source)
    const data = WebEmbedOptions.parse(obj)
    return <Iframe src={data.url} style={{
        '--min-height': typeof data.minHeight === 'number' ? `${data.minHeight}px` : data.minHeight
    } as any}></Iframe>
}

export class WebEmbedMRC extends StandardMRCFramework {
    constructor(containerEl: HTMLElement, source: string) {
        super(containerEl, <WebEmbed source={source} />);
    }
}
