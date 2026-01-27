import React, { useEffect, useRef } from 'react';
import { CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer.js';
import { Scene } from 'three';
import { useThree } from '@react-three/fiber';

export function useCSS3DRenderer(containerRef: React.RefObject<HTMLDivElement | null>) {
    const css3DSceneRef = useRef<Scene>(new Scene());
    const css3DRendererRef = useRef<CSS3DRenderer | null>(null);
    const { size } = useThree();

    useEffect(() => {
        if (!containerRef.current) return;

        // Create CSS3D renderer
        const css3DRenderer = new CSS3DRenderer();
        css3DRenderer.setSize(size.width, size.height);
        css3DRenderer.domElement.style.position = 'absolute';
        css3DRenderer.domElement.style.top = '0px';
        css3DRenderer.domElement.style.pointerEvents = 'none';

        containerRef.current.appendChild(css3DRenderer.domElement);
        css3DRendererRef.current = css3DRenderer;

        return () => {
            if (containerRef.current && css3DRenderer.domElement.parentNode) {
                containerRef.current.removeChild(css3DRenderer.domElement);
            }
        };
    }, [containerRef]);

    // Handle resize
    useEffect(() => {
        if (css3DRendererRef.current) {
            css3DRendererRef.current.setSize(size.width, size.height);
        }
    }, [size]);

    // Rendering should be triggered by the caller or useFrame in the component.

    return {
        css3DScene: css3DSceneRef.current,
        css3DRenderer: css3DRendererRef.current,
    };
}
