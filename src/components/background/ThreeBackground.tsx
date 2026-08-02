import { useEffect, useRef } from "react";
import * as THREE from "three";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * Ambient dot field. Points are scattered across a wide plane (jittered off a
 * grid so they read as a field, not a lattice) and ride a continuous travelling
 * wave — two sine fronts crossing on the Z axis, phase always advancing. Gentle
 * pointer parallax on top. Paused off-screen and under reduced-motion.
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
    camera.position.set(0, 0, 15);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width(), height());
    mount.appendChild(renderer.domElement);

    // Wide, dense, jittered field so dots reach every corner of the screen.
    const GX = 70;
    const GY = 44;
    const GAP = 0.66;
    const JITTER = 0.42;
    const count = GX * GY;

    const positions = new Float32Array(count * 3);
    const base = new Float32Array(count * 3); // bx, by, random phase

    let i = 0;
    for (let x = 0; x < GX; x++) {
      for (let y = 0; y < GY; y++) {
        const jx = (Math.random() - 0.5) * 2 * JITTER;
        const jy = (Math.random() - 0.5) * 2 * JITTER;
        const px = (x - GX / 2) * GAP + jx;
        const py = (y - GY / 2) * GAP + jy;
        positions[i * 3] = px;
        positions[i * 3 + 1] = py;
        positions[i * 3 + 2] = 0;
        base[i * 3] = px;
        base[i * 3 + 1] = py;
        base[i * 3 + 2] = Math.random() * Math.PI * 2; // per-point phase
        i++;
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const sprite = makeDotTexture();
    const material = new THREE.PointsMaterial({
      size: 0.1,
      map: sprite,
      transparent: true,
      color: new THREE.Color("#BEF264"),
      opacity: 0.4,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });

    const points = new THREE.Points(geometry, material);
    // Tilt the whole field slightly so the travelling wave reads with depth.
    points.rotation.x = -0.45;
    scene.add(points);

    // Pointer parallax (smoothed).
    const target = { x: 0, y: 0 };
    const pointer = { x: 0, y: 0 };
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

    let running = true;
    const io = new IntersectionObserver(
      ([entry]) => {
        const wasStopped = !running;
        running = entry.isIntersecting;
        if (running && wasStopped && !reduced) loop();
      },
      { threshold: 0 }
    );
    io.observe(mount);

    const posAttr = geometry.getAttribute("position") as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;
    let raf = 0;
    let t = 0;

    const AMP = 0.72;

    const render = () => {
      pointer.x += (target.x - pointer.x) * 0.045;
      pointer.y += (target.y - pointer.y) * 0.045;

      for (let k = 0; k < count; k++) {
        const bx = base[k * 3];
        const by = base[k * 3 + 1];
        const ph = base[k * 3 + 2];
        // Two crossing travelling waves — continuous, never resets.
        const z =
          Math.sin(bx * 0.42 + t) * AMP +
          Math.cos(by * 0.38 - t * 0.8 + ph * 0.15) * AMP * 0.7;
        arr[k * 3 + 2] = z;
        // Slow lateral drift keeps the field from ever looking frozen.
        arr[k * 3] = bx + Math.sin(t * 0.3 + by) * 0.06;
      }
      posAttr.needsUpdate = true;

      points.rotation.y = pointer.x * 0.16;
      points.rotation.x = -0.45 + pointer.y * 0.12;

      renderer.render(scene, camera);
    };

    const loop = () => {
      if (!running || reduced) return;
      t += 0.01;
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
