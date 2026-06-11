
import { styled } from "styled-components"

import { parse as parseYaml } from "yaml"

import * as z from "zod";
import StandardMRCFramework from "./StandardMRCFramework";

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

export class WebEmbedMRC extends StandardMRCFramework {
    constructor(containerEl: HTMLElement, source: string) {
        super(containerEl, <WebEmbed source={source}/>);
    }
}
