"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export const HeroScene3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check for reduced motion
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let renderer: THREE.WebGLRenderer | null = null;
    let animationFrameId: number;

    try {
      const width = container.clientWidth || window.innerWidth || 800;
      const height = container.clientHeight || window.innerHeight || 600;

      // Scene, Camera, Renderer
      const scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0x070913, 0.035);

      const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
      camera.position.z = 18;

      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

      if (container && renderer.domElement) {
        container.appendChild(renderer.domElement);
      }

      // Root Group for Mouse Parallax
      const worldGroup = new THREE.Group();
      scene.add(worldGroup);

      // 1. NEURAL NETWORK NODES & CONNECTIONS
      const nodeCount = 42;
      const nodePositions: THREE.Vector3[] = [];
      const nodeGeometry = new THREE.SphereGeometry(0.12, 16, 16);
      const purpleMaterial = new THREE.MeshBasicMaterial({ color: 0x8b5cf6 });
      const cyanMaterial = new THREE.MeshBasicMaterial({ color: 0x06b6d4 });

      const nodesGroup = new THREE.Group();
      for (let i = 0; i < nodeCount; i++) {
        const radius = 4.5 + Math.random() * 2.5;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);

        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.sin(phi) * Math.sin(theta);
        const z = radius * Math.cos(phi);

        const pos = new THREE.Vector3(x, y, z);
        nodePositions.push(pos);

        const isPurple = Math.random() > 0.45;
        const mesh = new THREE.Mesh(nodeGeometry, isPurple ? purpleMaterial : cyanMaterial);
        mesh.position.copy(pos);
        nodesGroup.add(mesh);
      }
      worldGroup.add(nodesGroup);

      // Connecting lines between close nodes
      const linePositions: number[] = [];
      const lineColors: number[] = [];
      const maxDistance = 3.6;

      for (let i = 0; i < nodeCount; i++) {
        for (let j = i + 1; j < nodeCount; j++) {
          const dist = nodePositions[i].distanceTo(nodePositions[j]);
          if (dist < maxDistance) {
            linePositions.push(
              nodePositions[i].x,
              nodePositions[i].y,
              nodePositions[i].z,
              nodePositions[j].x,
              nodePositions[j].y,
              nodePositions[j].z
            );

            // Alpha / color interpolation
            const alpha = 1.0 - dist / maxDistance;
            lineColors.push(0.55 * alpha, 0.36 * alpha, 0.96 * alpha);
            lineColors.push(0.02 * alpha, 0.71 * alpha, 0.83 * alpha);
          }
        }
      }

      const linesGeometry = new THREE.BufferGeometry();
      linesGeometry.setAttribute("position", new THREE.Float32BufferAttribute(linePositions, 3));
      linesGeometry.setAttribute("color", new THREE.Float32BufferAttribute(lineColors, 3));

      const linesMaterial = new THREE.LineBasicMaterial({
        vertexColors: true,
        transparent: true,
        opacity: 0.75,
        blending: THREE.AdditiveBlending,
      });
      const linesMesh = new THREE.LineSegments(linesGeometry, linesMaterial);
      worldGroup.add(linesMesh);

      // 2. CENTRAL AI CORE (Futuristic Polyhedron + Rings)
      const coreGroup = new THREE.Group();

      const coreGeom = new THREE.IcosahedronGeometry(1.6, 1);
      const coreMat = new THREE.MeshBasicMaterial({
        color: 0x8b5cf6,
        wireframe: true,
        transparent: true,
        opacity: 0.65,
      });
      const coreMesh = new THREE.Mesh(coreGeom, coreMat);
      coreGroup.add(coreMesh);

      const innerGeom = new THREE.OctahedronGeometry(0.9, 0);
      const innerMat = new THREE.MeshBasicMaterial({
        color: 0x06b6d4,
        wireframe: true,
        transparent: true,
        opacity: 0.8,
      });
      const innerMesh = new THREE.Mesh(innerGeom, innerMat);
      coreGroup.add(innerMesh);

      const ring1Geom = new THREE.TorusGeometry(3.2, 0.025, 16, 100);
      const ring1Mat = new THREE.MeshBasicMaterial({
        color: 0xa855f7,
        transparent: true,
        opacity: 0.5,
      });
      const ring1 = new THREE.Mesh(ring1Geom, ring1Mat);
      ring1.rotation.x = Math.PI / 3;
      coreGroup.add(ring1);

      const ring2Geom = new THREE.TorusGeometry(3.8, 0.02, 16, 100);
      const ring2Mat = new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.4,
      });
      const ring2 = new THREE.Mesh(ring2Geom, ring2Mat);
      ring2.rotation.y = Math.PI / 4;
      ring2.rotation.x = -Math.PI / 5;
      coreGroup.add(ring2);

      worldGroup.add(coreGroup);

      // 3. BACKGROUND PARTICLES
      const particleCount = 180;
      const particleGeometry = new THREE.BufferGeometry();
      const particlePositions = new Float32Array(particleCount * 3);

      for (let i = 0; i < particleCount * 3; i += 3) {
        particlePositions[i] = (Math.random() - 0.5) * 35;
        particlePositions[i + 1] = (Math.random() - 0.5) * 25;
        particlePositions[i + 2] = (Math.random() - 0.5) * 25;
      }

      particleGeometry.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
      const particleMaterial = new THREE.PointsMaterial({
        size: 0.08,
        color: 0x93c5fd,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending,
      });

      const particles = new THREE.Points(particleGeometry, particleMaterial);
      scene.add(particles);

      // Parallax mouse interaction
      let mouseX = 0;
      let mouseY = 0;
      let targetX = 0;
      let targetY = 0;

      const handleMouseMove = (e: MouseEvent) => {
        const { innerWidth, innerHeight } = window;
        mouseX = (e.clientX / innerWidth - 0.5) * 2;
        mouseY = (e.clientY / innerHeight - 0.5) * 2;
      };

      window.addEventListener("mousemove", handleMouseMove);

      // Resize Handler
      const handleResize = () => {
        if (!container || !renderer) return;
        const w = container.clientWidth || window.innerWidth;
        const h = container.clientHeight || window.innerHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };

      window.addEventListener("resize", handleResize);

      // Animation Loop
      let clock = new THREE.Clock();

      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);

        const elapsedTime = clock.getElapsedTime();

        if (!prefersReducedMotion) {
          worldGroup.rotation.y = elapsedTime * 0.12;
          worldGroup.rotation.x = Math.sin(elapsedTime * 0.08) * 0.15;

          coreMesh.rotation.y = elapsedTime * 0.35;
          coreMesh.rotation.x = elapsedTime * 0.25;
          innerMesh.rotation.y = -elapsedTime * 0.45;
          innerMesh.rotation.z = elapsedTime * 0.3;

          ring1.rotation.z = elapsedTime * 0.2;
          ring2.rotation.y = -elapsedTime * 0.25;

          particles.rotation.y = elapsedTime * 0.03;

          targetX += (mouseX - targetX) * 0.04;
          targetY += (mouseY - targetY) * 0.04;

          camera.position.x = targetX * 1.5;
          camera.position.y = -targetY * 1.5;
          camera.lookAt(0, 0, 0);
        }

        if (renderer) {
          renderer.render(scene, camera);
        }
      };

      animate();

      return () => {
        cancelAnimationFrame(animationFrameId);
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("resize", handleResize);
        if (container && renderer && renderer.domElement && container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
        if (renderer) {
          renderer.dispose();
        }
        nodeGeometry.dispose();
        purpleMaterial.dispose();
        cyanMaterial.dispose();
        linesGeometry.dispose();
        linesMaterial.dispose();
        coreGeom.dispose();
        coreMat.dispose();
        innerGeom.dispose();
        innerMat.dispose();
        ring1Geom.dispose();
        ring1Mat.dispose();
        ring2Geom.dispose();
        ring2Mat.dispose();
        particleGeometry.dispose();
        particleMaterial.dispose();
      };
    } catch (err) {
      console.warn("HeroScene3D WebGL non-fatal fallback:", err);
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
};

export default HeroScene3D;

