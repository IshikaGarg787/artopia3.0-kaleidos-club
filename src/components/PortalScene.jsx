import { useEffect, useRef } from 'react';
import { FINE, MOBILE, RM } from '../lib/env.js';

/** The 3D multiverse portal (Three.js, loaded lazily). Calls onFallback() if WebGL isn't available. */
export default function PortalScene({ heroRef, onFallback }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    let cleanup = () => {};

    import('three').then((THREE) => {
      if (cancelled) return;
      const canvas = canvasRef.current, hero = heroRef.current;
      let renderer;
      try {
        renderer = new THREE.WebGLRenderer({ canvas, antialias: !MOBILE, alpha: true });
        if (!renderer.getContext()) throw new Error('no webgl');
      } catch { onFallback(); return; }

      renderer.setPixelRatio(Math.min(devicePixelRatio || 1, MOBILE ? 1.5 : 2));
      const scene = new THREE.Scene();
      const cam = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
      cam.position.z = 7;
      const group = new THREE.Group(); scene.add(group);

      const cols = [0xE62429, 0xF5B942, 0x38BDF8, 0x8B5CF6, 0xE62429, 0x38BDF8, 0xF5B942];
      const rings = cols.map((c, i) => {
        const m = new THREE.Mesh(
          new THREE.TorusGeometry(1.3 + i * 0.42, i % 2 ? 0.012 : 0.026, 6, MOBILE ? 120 : 220),
          new THREE.MeshBasicMaterial({ color: c, transparent: true, opacity: Math.max(0.25, 0.9 - i * 0.09), blending: THREE.AdditiveBlending, depthWrite: false })
        );
        m.rotation.x = i * 0.16 - 0.5; m.rotation.y = i * 0.1;
        m.userData.s = 0.0035 * (1 + i * 0.18) * (i % 2 ? -1 : 1);
        group.add(m); return m;
      });

      const N = MOBILE ? 650 : 1700, pos = new Float32Array(N * 3), col = new Float32Array(N * 3), pal = cols.map((c) => new THREE.Color(c));
      for (let i = 0; i < N; i++) {
        const r = 0.8 + Math.pow(Math.random(), 0.7) * 6, a = Math.random() * 6.283 + r * 0.9;
        pos[i * 3] = Math.cos(a) * r; pos[i * 3 + 1] = Math.sin(a) * r * 0.62; pos[i * 3 + 2] = (Math.random() - 0.5) * 4;
        const k = pal[(Math.random() * pal.length) | 0]; col[i * 3] = k.r; col[i * 3 + 1] = k.g; col[i * 3 + 2] = k.b;
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
      const pts = new THREE.Points(geo, new THREE.PointsMaterial({ size: 0.04, vertexColors: true, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending, depthWrite: false }));
      scene.add(pts);

      const c2 = document.createElement('canvas'); c2.width = c2.height = 128;
      const x = c2.getContext('2d'), gr = x.createRadialGradient(64, 64, 0, 64, 64, 64);
      gr.addColorStop(0, 'rgba(255,220,140,.95)'); gr.addColorStop(0.25, 'rgba(230,36,41,.5)'); gr.addColorStop(0.6, 'rgba(139,92,246,.2)'); gr.addColorStop(1, 'rgba(0,0,0,0)');
      x.fillStyle = gr; x.fillRect(0, 0, 128, 128);
      const tex = new THREE.CanvasTexture(c2); tex.colorSpace = THREE.SRGBColorSpace;
      const glow = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, blending: THREE.AdditiveBlending, transparent: true, depthWrite: false }));
      glow.scale.set(5.2, 5.2, 1); scene.add(glow);

      let mx = 0, my = 0, tx = 0, ty = 0, raf = 0, vis = true;
      const resize = () => {
        const w = hero.clientWidth, h = hero.clientHeight;
        renderer.setSize(w, h, false); cam.aspect = w / h;
        cam.position.z = w / h < 0.8 ? 11 : w / h < 1.2 ? 8.5 : 7;
        cam.setViewOffset(w, h, 0, h * 0.1, w, h); cam.updateProjectionMatrix();
        renderer.render(scene, cam);
      };
      const frame = () => {
        rings.forEach((r) => { r.rotation.z += r.userData.s; });
        pts.rotation.z += 0.0009;
        tx += (mx - tx) * 0.05; ty += (my - ty) * 0.05;
        group.rotation.y = tx * 0.5; group.rotation.x = ty * 0.35; pts.rotation.y = tx * 0.2;
        renderer.render(scene, cam);
        raf = requestAnimationFrame(frame);
      };
      const start = () => { if (!raf && !RM && vis && !document.hidden) raf = requestAnimationFrame(frame); };
      const stop = () => { cancelAnimationFrame(raf); raf = 0; };
      const onVis = () => (document.hidden ? stop() : start());
      const onMove = (e) => { mx = e.clientX / innerWidth - 0.5; my = e.clientY / innerHeight - 0.5; };
      const onLost = (e) => { e.preventDefault(); stop(); onFallback(); };

      const ro = new ResizeObserver(resize); ro.observe(hero); resize();
      const io = 'IntersectionObserver' in window ? new IntersectionObserver((es) => { vis = es[0].isIntersecting; vis ? start() : stop(); }) : null;
      io && io.observe(hero);
      document.addEventListener('visibilitychange', onVis);
      if (FINE) addEventListener('pointermove', onMove, { passive: true });
      canvas.addEventListener('webglcontextlost', onLost);
      start();

      cleanup = () => {
        stop(); ro.disconnect(); io && io.disconnect();
        document.removeEventListener('visibilitychange', onVis);
        removeEventListener('pointermove', onMove);
        canvas.removeEventListener('webglcontextlost', onLost);
        rings.forEach((r) => { r.geometry.dispose(); r.material.dispose(); });
        geo.dispose(); pts.material.dispose(); tex.dispose(); glow.material.dispose(); renderer.dispose();
      };
    }).catch(onFallback);

    return () => { cancelled = true; cleanup(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <canvas id="portal" ref={canvasRef} aria-hidden="true" />;
}
