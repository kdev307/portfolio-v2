import { useEffect, useRef } from "react";
import * as THREE from "three";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * Subtle animated dot field. A grid of points on a plane drifts on a slow
 * sine wave and parallaxes gently toward the pointer. Rendered once, paused
 * when off-screen or when reduced motion is requested.
 */
export function ThreeBackground() {
  const mountRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = () => mount.clientWidth;
    const height = () => mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width() / height(), 0.1, 100);
    camera.position.set(0, 0, 14);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width(), height());
    mount.appendChild(renderer.domElement);

    // Build a grid of points.
    const GX = 46;
    const GY = 26;
    const GAP = 0.62;
    const count = GX * GY;
    const positions = new Float32Array(count * 3);
    const base = new Float32Array(count * 2);

    let i = 0;
    for (let x = 0; x < GX; x++) {
      for (let y = 0; y < GY; y++) {
        const px = (x - GX / 2) * GAP;
        const py = (y - GY / 2) * GAP;
        positions[i * 3] = px;
        positions[i * 3 + 1] = py;
        positions[i * 3 + 2] = 0;
        base[i * 2] = px;
        base[i * 2 + 1] = py;
        i++;
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    // Soft round sprite so dots glow rather than being hard squares.
    const sprite = makeDotTexture();
    const material = new THREE.PointsMaterial({
      size: 0.09,
      map: sprite,
      transparent: true,
      color: new THREE.Color("#BEF264"),
      opacity: 0.42,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // Pointer parallax (smoothed).
    const pointer = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };
    const onPointer = (e: PointerEvent) => {
      target.x = (e.clientX / window.innerWidth - 0.5) * 2;
      target.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("pointermove", onPointer);

    const onResize = () => {
      camera.aspect = width() / height();
      camera.updateProjectionMatrix();
      renderer.setSize(width(), height());
    };
    window.addEventListener("resize", onResize);

    // Pause when tab hidden or scrolled far away.
    let running = true;
    const io = new IntersectionObserver(
      ([entry]) => {
        running = entry.isIntersecting;
        if (running && !reduced) loop();
      },
      { threshold: 0 }
    );
    io.observe(mount);

    const posAttr = geometry.getAttribute("position") as THREE.BufferAttribute;
    let raf = 0;
    let t = 0;

    const render = () => {
      pointer.x += (target.x - pointer.x) * 0.04;
      pointer.y += (target.y - pointer.y) * 0.04;

      for (let k = 0; k < count; k++) {
        const bx = base[k * 2];
        const by = base[k * 2 + 1];
        const z =
          Math.sin(bx * 0.5 + t) * 0.35 + Math.cos(by * 0.5 + t * 0.8) * 0.35;
        posAttr.array[k * 3 + 2] = z;
      }
      posAttr.needsUpdate = true;

      points.rotation.x = pointer.y * 0.18;
      points.rotation.y = pointer.x * 0.22;

      renderer.render(scene, camera);
    };

    const loop = () => {
      if (!running || reduced) return;
      t += 0.006;
      render();
      raf = requestAnimationFrame(loop);
    };

    if (reduced) {
      render(); // one static frame
    } else {
      loop();
    }

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("resize", onResize);
      geometry.dispose();
      material.dispose();
      sprite.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [reduced]);

  return (
    <div
      ref={mountRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full"
    />
  );
}

function makeDotTexture(): THREE.Texture {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const g = ctx.createRadialGradient(
    size / 2,
    size / 2,
    0,
    size / 2,
    size / 2,
    size / 2
  );
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.35, "rgba(255,255,255,0.6)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}
