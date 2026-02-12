import { useCallback, useContext, useEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";
import { selectionContext } from "@react-three/postprocessing";
import * as THREE from "three";

const useOutline = (groupRef: React.RefObject<THREE.Group | null>) => {
  const meshesRef = useRef<THREE.Object3D[]>([]);
  const is3DHoveredRef = useRef(false);
  const isHtmlHoveredRef = useRef(false);
  const selectionApi = useContext(selectionContext);
  const invalidate = useThree((state) => state.invalidate);

  useEffect(() => {
    if (!groupRef.current) return;
    const meshes: THREE.Object3D[] = [];
    groupRef.current.traverse((obj) => {
      if ((obj as THREE.Mesh).isMesh) {
        meshes.push(obj);
      }
    });
    meshesRef.current = meshes;
  }, [groupRef]);

  const addToSelection = useCallback(() => {
    if (!selectionApi) return;
    const meshes = meshesRef.current;
    if (meshes.length > 0) {
      selectionApi.select((prev) => {
        const newMeshes = meshes.filter((m) => !prev.includes(m));
        return newMeshes.length > 0 ? [...prev, ...newMeshes] : prev;
      });
      invalidate();
    }
  }, [selectionApi, invalidate]);

  const removeFromSelection = useCallback(() => {
    if (!selectionApi) return;
    const meshes = meshesRef.current;
    if (meshes.length > 0) {
      selectionApi.select((prev) => prev.filter((m) => !meshes.includes(m)));
      invalidate();
    }
  }, [selectionApi, invalidate]);

  const on3DPointerOver = useCallback(() => {
    is3DHoveredRef.current = true;
    addToSelection();
  }, [addToSelection]);

  const on3DPointerOut = useCallback(() => {
    is3DHoveredRef.current = false;
    if (!isHtmlHoveredRef.current) {
      removeFromSelection();
    }
  }, [removeFromSelection]);

  const onHtmlMouseEnter = useCallback(() => {
    isHtmlHoveredRef.current = true;
    addToSelection();
  }, [addToSelection]);

  const onHtmlMouseLeave = useCallback(() => {
    isHtmlHoveredRef.current = false;
    if (!is3DHoveredRef.current) {
      removeFromSelection();
    }
  }, [removeFromSelection]);

  return {
    on3DPointerOver,
    on3DPointerOut,
    onHtmlMouseEnter,
    onHtmlMouseLeave,
  };
};

export default useOutline;
