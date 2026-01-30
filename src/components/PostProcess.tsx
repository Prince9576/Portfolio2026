import { EffectComposer, Outline, Selection } from "@react-three/postprocessing"
import { BlendFunction } from "postprocessing"

export const PostProcess = ({ children }: { children: React.ReactNode }) => {
    return (
        <Selection>
            <EffectComposer
                multisampling={8}
                autoClear={false}
            >
                <Outline
                    blendFunction={BlendFunction.SCREEN}
                    edgeStrength={2}
                    visibleEdgeColor={0xffffff}
                    hiddenEdgeColor={0xffffff}
                    pulseSpeed={0}

                />
            </EffectComposer>
            {children}
        </Selection>
    )
}

export default PostProcess;