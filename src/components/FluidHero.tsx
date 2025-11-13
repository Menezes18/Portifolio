import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface FluidHeroProps {
  toggleSidebar?: () => void;
}

const FluidHero = ({ toggleSidebar }: FluidHeroProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const mouse = new THREE.Vector2(0.5, 0.5);
    const prevMouse = new THREE.Vector2(0.5, 0.5);
    let isMoving = false;
    let lastMoveTime = 0;
    let hasUserInteracted = false;
    let autoAnimTime = 0;
    let idleTime = 0;
    const IDLE_THRESHOLD = 10000; // 10 seconds without interaction

    const size = 500;
    const pingPongTargets = [
      new THREE.WebGLRenderTarget(size, size, {
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        format: THREE.RGBAFormat,
        type: THREE.FloatType,
      }),
      new THREE.WebGLRenderTarget(size, size, {
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        format: THREE.RGBAFormat,
        type: THREE.FloatType,
      }),
    ];
    let currentTarget = 0;

    const createPlaceholderTexture = (color: string) => {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      const texture = new THREE.CanvasTexture(canvas);
      texture.minFilter = THREE.LinearFilter;
      return texture;
    };

    const topTexture = createPlaceholderTexture('#ffffff');
    const bottomTexture = createPlaceholderTexture('#000000');

    const topTextureSize = new THREE.Vector2(1, 1);
    const bottomTextureSize = new THREE.Vector2(1, 1);

    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

    const fluidFragmentShader = `
      precision mediump float;
      uniform sampler2D uPrevTrails;
      uniform vec2 uMouse;
      uniform vec2 uPrevMouse;
      uniform vec2 uResolution;
      uniform float uDecay;
      uniform bool uIsMoving;
      varying vec2 vUv;

      void main() {
        vec4 prevState = texture2D(uPrevTrails, vUv);
        float newValue = prevState.r * uDecay;

        if (uIsMoving) {
          vec2 mouseDirection = uMouse - uPrevMouse;
          float lineLength = length(mouseDirection);
          if (lineLength > 0.001) {
            vec2 mouseDir = mouseDirection / lineLength;
            vec2 toPixel = vUv - uPrevMouse;
            float projAlong = dot(toPixel, mouseDir);
            projAlong = clamp(projAlong, 0.0, lineLength);
            vec2 closestPoint = uPrevMouse + projAlong * mouseDir;
            float dist = length(vUv - closestPoint);
            float lineWidth = 0.09;
            float intensity = smoothstep(lineWidth, 0.0, dist) * 0.3;
            newValue += intensity;
          }
        }

        gl_FragColor = vec4(newValue, 0.0, 0.0, 1.0);
      }
    `;

    const displayFragmentShader = `
      precision mediump float;
      uniform sampler2D uFluid;
      uniform sampler2D uTopTexture;
      uniform sampler2D uBottomTexture;
      uniform vec2 uTopTextureSize;
      uniform vec2 uBottomTextureSize;
      uniform vec2 uResolution;
      uniform float uDpr;
      uniform float uPanY;
      varying vec2 vUv;

      vec2 getCoverUV(vec2 uv, vec2 textureSize) {
        if (textureSize.x < 1.0 || textureSize.y < 1.0) return uv;
        vec2 s = uResolution / textureSize;
        float scale = min(s.x, s.y);
        vec2 scaledSize = textureSize * scale;
        vec2 offset = (uResolution - scaledSize) * 0.5;
        return (uv * uResolution - offset - vec2(0.0, uPanY)) / scaledSize;
      }
      
      float inBounds(vec2 uv) {
        float inX = step(0.0, uv.x) * step(uv.x, 1.0);
        float inY = step(0.0, uv.y) * step(uv.y, 1.0);
        return inX * inY;
      }

      void main() {
        float fluid = texture2D(uFluid, vUv).r;
        vec2 topUV = getCoverUV(vUv, uTopTextureSize);
        vec2 bottomUV = getCoverUV(vUv, uBottomTextureSize);
        float inTop = inBounds(topUV);
        float inBottom = inBounds(bottomUV);
        topUV = clamp(topUV, 0.0, 1.0);
        bottomUV = clamp(bottomUV, 0.0, 1.0);
        vec4 topColor = texture2D(uTopTexture, topUV);
        vec4 bottomColor = texture2D(uBottomTexture, bottomUV);
        float threshold = 0.02;
        float edgeWidth = 0.004 / uDpr;
        float t = smoothstep(threshold, threshold + edgeWidth, fluid);
        vec4 finalColor = mix(topColor, bottomColor, t);
        float inAny = max(inTop, inBottom);
        finalColor = mix(vec4(1.0, 1.0, 1.0, 1.0), finalColor, inAny);
        gl_FragColor = finalColor;
      }
    `;

    const trailsMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uPrevTrails: { value: null },
        uMouse: { value: mouse },
        uPrevMouse: { value: prevMouse },
        uResolution: { value: new THREE.Vector2(size, size) },
        uDecay: { value: 0.97 },
        uIsMoving: { value: false },
      },
      vertexShader,
      fragmentShader: fluidFragmentShader,
    });

    const displayMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uFluid: { value: null },
        uTopTexture: { value: topTexture },
        uBottomTexture: { value: bottomTexture },
        uResolution: {
          value: new THREE.Vector2(window.innerWidth, window.innerHeight),
        },
        uDpr: { value: window.devicePixelRatio },
        uTopTextureSize: { value: topTextureSize },
        uBottomTextureSize: { value: bottomTextureSize },
        uPanY: { value: -120 },
      },
      vertexShader,
      fragmentShader: displayFragmentShader,
    });

    const loadImage = (url: string, targetTexture: THREE.Texture, textureSizeVector: THREE.Vector2) => {
      const img = new Image();
      img.crossOrigin = 'Anonymous';

      img.onload = function () {
        const originalWidth = img.width;
        const originalHeight = img.height;
        textureSizeVector.set(originalWidth, originalHeight);

        const maxSize = 4096;
        let newWidth = originalWidth;
        let newHeight = originalHeight;

        if (originalWidth > maxSize || originalHeight > maxSize) {
          if (originalWidth > originalHeight) {
            newWidth = maxSize;
            newHeight = Math.floor(originalHeight * (maxSize / originalWidth));
          } else {
            newHeight = maxSize;
            newWidth = Math.floor(originalWidth * (maxSize / originalHeight));
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = newWidth;
        canvas.height = newHeight;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, newWidth, newHeight);
        }

        const newTexture = new THREE.CanvasTexture(canvas);
        newTexture.minFilter = THREE.LinearFilter;
        newTexture.magFilter = THREE.LinearFilter;

        if (url.includes('top')) {
          displayMaterial.uniforms.uTopTexture.value = newTexture;
        } else {
          displayMaterial.uniforms.uBottomTexture.value = newTexture;
        }
      };

      img.onerror = function (err) {
        console.error(`Error loading image ${url}:`, err);
      };

      img.src = url;
    };

    loadImage('/images/top-image.jpg', topTexture, topTextureSize);
    loadImage('/images/bottom-image.jpg', bottomTexture, bottomTextureSize);

    const planeGeometry = new THREE.PlaneGeometry(2, 2);
    const displayMesh = new THREE.Mesh(planeGeometry, displayMaterial);
    scene.add(displayMesh);

    const simMesh = new THREE.Mesh(planeGeometry, trailsMaterial);
    const simScene = new THREE.Scene();
    simScene.add(simMesh);

    renderer.setRenderTarget(pingPongTargets[0]);
    renderer.clear();
    renderer.setRenderTarget(pingPongTargets[1]);
    renderer.clear();
    renderer.setRenderTarget(null);

    const onMouseMove = (event: MouseEvent) => {
      hasUserInteracted = true;
      autoAnimTime = 0;
      idleTime = 0;
      
      const canvasRect = canvas.getBoundingClientRect();

      if (
        event.clientX >= canvasRect.left &&
        event.clientX <= canvasRect.right &&
        event.clientY >= canvasRect.top &&
        event.clientY <= canvasRect.bottom
      ) {
        prevMouse.copy(mouse);

        mouse.x = (event.clientX - canvasRect.left) / canvasRect.width;
        mouse.y = 1.0 - (event.clientY - canvasRect.top) / canvasRect.height;

        isMoving = true;
        lastMoveTime = performance.now();
      } else {
        isMoving = false;
      }
    };

    const onTouchMove = (event: TouchEvent) => {
      hasUserInteracted = true;
      autoAnimTime = 0;
      idleTime = 0;
      
      // Don't prevent default - allow scrolling
      const canvasRect = canvas.getBoundingClientRect();
      const touchX = event.touches[0].clientX;
      const touchY = event.touches[0].clientY;

      if (
        touchX >= canvasRect.left &&
        touchX <= canvasRect.right &&
        touchY >= canvasRect.top &&
        touchY <= canvasRect.bottom
      ) {
        // Only interact with fluid if touch is on canvas
        prevMouse.copy(mouse);

        mouse.x = (touchX - canvasRect.left) / canvasRect.width;
        mouse.y = 1.0 - (touchY - canvasRect.top) / canvasRect.height;

        isMoving = true;
        lastMoveTime = performance.now();
      } else {
        isMoving = false;
      }
    };

    const onWindowResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);

      displayMaterial.uniforms.uResolution.value.set(
        window.innerWidth,
        window.innerHeight
      );
      displayMaterial.uniforms.uDpr.value = window.devicePixelRatio;
    };

    const animate = () => {
      requestAnimationFrame(animate);

      const now = performance.now();
      
      // Track idle time only after user has interacted
      if (hasUserInteracted) {
        if (isMoving) {
          idleTime = 0;
          lastMoveTime = now;
        } else if (now - lastMoveTime > 16) {
          idleTime = now - lastMoveTime;
        }
      }

      // Only show auto-animation if user never interacted OR has been idle for 10 seconds
      const shouldAutoAnimate = !hasUserInteracted || idleTime > IDLE_THRESHOLD;

      if (shouldAutoAnimate) {
        autoAnimTime += 0.016; // ~60fps
        
        // Create a smooth wave motion that crosses the face
        const speed = 0.8;
        const waveX = ((Math.sin(autoAnimTime * speed) + 1) / 2); // 0 to 1
        const waveY = 0.4 + Math.sin(autoAnimTime * speed * 0.7) * 0.15; // center around face
        
        prevMouse.copy(mouse);
        mouse.x = waveX;
        mouse.y = waveY;
        isMoving = true;
        
        // Reset after showing the effect for a while
        if (autoAnimTime > 15) {
          autoAnimTime = 0;
        }
      } else {
        // User is controlling
        if (isMoving && now - lastMoveTime > 50) {
          isMoving = false;
        }
      }

      const prevTarget = pingPongTargets[currentTarget];
      currentTarget = (currentTarget + 1) % 2;
      const currentRenderTarget = pingPongTargets[currentTarget];

      trailsMaterial.uniforms.uPrevTrails.value = prevTarget.texture;
      trailsMaterial.uniforms.uMouse.value.copy(mouse);
      trailsMaterial.uniforms.uPrevMouse.value.copy(prevMouse);
      trailsMaterial.uniforms.uIsMoving.value = isMoving;

      renderer.setRenderTarget(currentRenderTarget);
      renderer.render(simScene, camera);

      displayMaterial.uniforms.uFluid.value = currentRenderTarget.texture;

      renderer.setRenderTarget(null);
      renderer.render(scene, camera);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('resize', onWindowResize);

    animate();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('resize', onWindowResize);
      renderer.dispose();
      trailsMaterial.dispose();
      displayMaterial.dispose();
      planeGeometry.dispose();
      pingPongTargets.forEach((target) => target.dispose());
    };
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden bg-white">
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />
      
      {/* Overlay content */}
      <div className="absolute inset-0 z-10 flex flex-col justify-between p-8 pointer-events-none">
        <nav className="flex justify-between items-start pointer-events-auto">
          <div className="site-name">
            <a href="#" className="font-righteous text-4xl text-black no-underline uppercase leading-tight">
              Gustavo<br/>Menezes
            </a>
          </div>
        </nav>

        <div className="hero-footer flex justify-between items-end pointer-events-none">
          <p className="text-black uppercase text-sm font-semibold leading-tight">MenezesDev</p>
          <p className="text-black uppercase text-sm font-semibold leading-tight">Portfólio 2025</p>
        </div>
      </div>
    </section>
  );
};

export default FluidHero;
