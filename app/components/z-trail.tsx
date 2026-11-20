"use client";

import { useId, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import type { Dictionary } from "@/app/i18n";
import { RevealText } from "@/app/components/reveal-text";

type Group = Dictionary["productCredits"]["groups"][number];
type Item = Group["items"][number];

/*
 * Replica de los capitulos de savor.it/foods: la pantalla queda fija y un trazo se dibuja con
 * el scroll de texto en texto en Z (renglones izquierda -> derecha, regreso en diagonal a la
 * izquierda); cada texto aparece cuando la "pluma" lo cruza y la camara sigue la punta.
 *
 * Vocabulario de trazos (savor.it/foods mezcla curvas, rectas en bajada, arcos y punteados;
 * ningun trazo toca el texto: dejan GAP px). En cada carga se elige al azar el trazo y el estilo
 * de cada tramo (sin repetir el mismo trazo dos veces seguidas) y las posiciones varian un poco,
 * asi el recorrido nunca es identico:
 * - Cambio de renglon: curva en S, diagonal recta en bajada, escalon redondeado o arco abombado.
 * - Mismo renglon: recta horizontal o arco suave.
 * - Entrada lateral a un titulo o al boton: cuarto de circulo, escalon en L o diagonal recta.
 * - Alineados: recta vertical.
 * Estilos: solido, guiones, puntos o guion largo.
 */

// Scroll por cada px de trazo (savor.it recorre su capitulo despacio).
const SCROLL_PER_PX = 0.3;
// El trazo termina al 97% del tramo fijo: una pausa corta con el boton ya visible.
const DRAW_END = 0.97;
// Separacion vertical entre renglones de productos y antes de cada titulo.
const ROW_GAP = 220;
const TITLE_GAP = 300;
// Espacio bajo el boton al final del dibujo.
const END_MARGIN = 90;
// Altura de la punta del trazo en pantalla (0 arriba, 1 abajo). A media pantalla dejaba la
// mitad inferior siempre en blanco; al 70% se ve mas recorrido y menos vacio.
const TIP_AT = 0.7;
// Distancia entre el trazo y el borde de cada texto.
const GAP = 16;
const smooth = { stiffness: 120, damping: 30, restDelta: 0.0005 };

type Anchor =
  | { kind: "start"; x: number; y: number }
  | { kind: "title"; x: number; y: number; text: string }
  | { kind: "item"; x: number; y: number; item: Item }
  | { kind: "cta"; x: number; y: number };

type Point = { x: number; y: number };
type Pattern = "solid" | "dash" | "dot" | "longdash";
type Shape = { d: string; kind: string; pattern: Pattern; from: Point; to: Point };
type Segment = Shape & { s: number; e: number };
type Layout = { w: number; vh: number; anchors: Anchor[]; height: number };
type Trail = { segments: Segment[]; total: number; arrive: number[] };

/** Pseudoaleatorio con semilla (mulberry32): misma semilla, misma secuencia. */
function seeded(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
type Rand = () => number;
const jitter = (rand: Rand, amount: number) => (rand() * 2 - 1) * amount;

/**
 * Posiciones en Z: escritorio, renglones de 3 (16/50/84%); celular, un producto por renglon
 * alternando lado. Cada producto se corre hasta 3% del ancho y cada renglon hasta 24px.
 */
function layout(groups: Group[], w: number, vh: number, rand: Rand): Layout {
  const desktop = w >= 768;
  const anchors: Anchor[] = [];
  // El primer capitulo arranca arriba (38%) con una linea de inicio corta: sin pantalla vacia
  // entre "Our Products" y el primer titulo.
  let y = vh * 0.38;
  anchors.push({ kind: "start", x: w / 2, y: y - vh * 0.12 });
  let side = 0;
  groups.forEach((group, g) => {
    if (g > 0) y += TITLE_GAP;
    anchors.push({ kind: "title", x: w / 2, y, text: group.title });
    group.items.forEach((item, i) => {
      if (!desktop || i % 3 === 0) y += ROW_GAP + Math.round(jitter(rand, 24));
      const base = desktop ? [0.16, 0.5, 0.84][i % 3] : [0.3, 0.7][side++ % 2];
      const x = (base + jitter(rand, 0.03)) * w;
      anchors.push({ kind: "item", x, y, item });
    });
  });
  y += TITLE_GAP;
  anchors.push({ kind: "cta", x: w / 2, y });
  return { w, vh, anchors, height: y + END_MARGIN };
}

const sCurve = (a: Point, b: Point) => {
  const dy = (b.y - a.y) * 0.6;
  return `M${a.x} ${a.y} C${a.x} ${a.y + dy} ${b.x} ${b.y - dy} ${b.x} ${b.y}`;
};
// 0.552: aproximacion de un cuarto de circulo con una curva bezier.
const quarterArc = (a: Point, b: Point) =>
  `M${a.x} ${a.y} C${a.x} ${a.y + (b.y - a.y) * 0.552} ${b.x - (b.x - a.x) * 0.552} ${b.y} ${b.x} ${b.y}`;
const straight = (a: Point, b: Point) => `M${a.x} ${a.y} L${b.x} ${b.y}`;
/** Arco abombado: una sola curva que se separa `bulge` px de la recta, hacia un lado. */
const bow = (a: Point, b: Point, bulge: number) => {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  const len = Math.hypot(b.x - a.x, b.y - a.y) || 1;
  const nx = -(b.y - a.y) / len;
  const ny = (b.x - a.x) / len;
  return `M${a.x} ${a.y} Q${mx + nx * bulge} ${my + ny * bulge} ${b.x} ${b.y}`;
};
/** Escalon: baja, cruza en horizontal a media altura y vuelve a bajar, con esquinas redondeadas. */
const step = (a: Point, b: Point) => {
  const r = Math.min(36, Math.abs(b.x - a.x) / 2, Math.abs(b.y - a.y) / 4);
  const mid = (a.y + b.y) / 2;
  const dir = Math.sign(b.x - a.x) || 1;
  return `M${a.x} ${a.y} L${a.x} ${mid - r} Q${a.x} ${mid} ${a.x + dir * r} ${mid} L${b.x - dir * r} ${mid} Q${b.x} ${mid} ${b.x} ${mid + r} L${b.x} ${b.y}`;
};
/** Escalon en L: baja y gira para entrar de lado. */
const elbow = (a: Point, b: Point) => {
  const r = Math.min(40, Math.abs(b.x - a.x) / 2, Math.abs(b.y - a.y) / 2);
  const dir = Math.sign(b.x - a.x) || 1;
  return `M${a.x} ${a.y} L${a.x} ${b.y - r} Q${a.x} ${b.y} ${a.x + dir * r} ${b.y} L${b.x} ${b.y}`;
};

type Option = { kind: string; d: (a: Point, b: Point, rand: Rand) => string; patterns: Pattern[] };
// Las curvas largas van casi siempre solidas; las rectas en bajada admiten punteados (como savor).
const ROW_CHANGE: Option[] = [
  { kind: "s", d: sCurve, patterns: ["solid", "solid", "longdash"] },
  { kind: "diag", d: straight, patterns: ["dash", "dot", "solid", "longdash"] },
  { kind: "step", d: step, patterns: ["solid", "dash"] },
  { kind: "bow", d: (a, b, rand) => bow(a, b, (rand() < 0.5 ? -1 : 1) * (40 + rand() * 50)), patterns: ["solid", "dot", "longdash"] },
];
const SAME_ROW: Option[] = [
  { kind: "line", d: straight, patterns: ["dash", "dot", "longdash", "solid"] },
  { kind: "arc", d: (a, b, rand) => bow(a, b, -(14 + rand() * 18)), patterns: ["solid", "dash", "dot"] },
];
const SIDE_ENTRY: Option[] = [
  { kind: "quarter", d: quarterArc, patterns: ["solid", "solid", "longdash"] },
  { kind: "elbow", d: elbow, patterns: ["solid", "dash"] },
  { kind: "diag", d: straight, patterns: ["dash", "dot", "solid"] },
];
const pick = <T,>(rand: Rand, list: T[]) => list[Math.floor(rand() * list.length)];

/**
 * Une cada par de anclas con un trazo elegido al azar segun la situacion (sin repetir el
 * anterior), respetando el tamano real de cada texto.
 */
function buildShapes(anchors: Anchor[], half: { w: number; h: number }[], rand: Rand): Shape[] {
  const shapes: Shape[] = [];
  let last = "";
  const choose = (options: Option[], a: Point, b: Point): Omit<Shape, "from" | "to"> => {
    const pool = options.filter((o) => o.kind !== last);
    const option = pick(rand, pool.length ? pool : options);
    last = option.kind;
    return { kind: option.kind, d: option.d(a, b, rand), pattern: pick(rand, option.patterns) };
  };
  for (let k = 1; k < anchors.length; k++) {
    const a = anchors[k - 1];
    const b = anchors[k];
    const ha = half[k - 1];
    const hb = half[k];
    const below = { x: a.x, y: a.y + ha.h + GAP };
    const above = { x: b.x, y: b.y - hb.h - GAP };
    if (a.kind === "start") {
      last = "vertical";
      shapes.push({ kind: "vertical", d: straight(a, above), pattern: "solid", from: a, to: above });
    } else if (a.y === b.y) {
      const from = { x: a.x + ha.w + GAP, y: a.y };
      const to = { x: Math.max(from.x, b.x - hb.w - GAP), y: b.y };
      shapes.push({ ...choose(SAME_ROW, from, to), from, to });
    } else if ((b.kind === "title" || b.kind === "cta") && Math.abs(a.x - b.x) > 24) {
      const to = { x: a.x < b.x ? b.x - hb.w - GAP : b.x + hb.w + GAP, y: b.y };
      shapes.push({ ...choose(SIDE_ENTRY, below, to), from: below, to });
    } else if (Math.abs(a.x - b.x) <= 24) {
      last = "vertical";
      const to = { x: a.x, y: above.y };
      const pattern = pick<Pattern>(rand, ["solid", "solid", "dash"]);
      shapes.push({ kind: "vertical", d: straight(below, to), pattern, from: below, to });
    } else {
      shapes.push({ ...choose(ROW_CHANGE, below, above), from: below, to: above });
    }
  }
  return shapes;
}

const DASHES: Record<Exclude<Pattern, "solid">, string> = { dash: "5 7", dot: "0.1 7", longdash: "16 9" };

/** Tramo del trazo; los estilos no solidos se revelan con una mascara para "dibujarse" igual. */
function TrailSegment({
  seg,
  total,
  progress,
  maskId,
  pathRef,
}: {
  seg: Segment;
  total: number;
  progress: MotionValue<number>;
  maskId: string;
  pathRef: (el: SVGPathElement | null) => void;
}) {
  const drawn = useTransform(progress, [seg.s / total, Math.max(seg.e, seg.s + 0.001) / total], [0, 1]);
  if (seg.pattern === "solid")
    return (
      <motion.path ref={pathRef} d={seg.d} stroke="currentColor" strokeWidth={1.25} strokeLinecap="round" style={{ pathLength: drawn }} />
    );
  return (
    <g>
      <mask id={maskId} maskUnits="userSpaceOnUse">
        <motion.path d={seg.d} stroke="white" strokeWidth={10} style={{ pathLength: drawn }} />
      </mask>
      <path
        ref={pathRef}
        d={seg.d}
        stroke="currentColor"
        strokeWidth={seg.pattern === "dot" ? 2.5 : 1.5}
        strokeLinecap="round"
        strokeDasharray={DASHES[seg.pattern]}
        mask={`url(#${maskId})`}
      />
    </g>
  );
}

/** Texto en su ancla; aparece mientras la pluma cruza su espacio (`from`-`to`, en fraccion del trazo). */
function Label({
  x,
  y,
  from,
  to,
  progress,
  fade = true,
  className = "",
  labelRef,
  children,
}: {
  x: number;
  y: number;
  from: number;
  to: number;
  progress: MotionValue<number>;
  fade?: boolean;
  className?: string;
  labelRef: (el: HTMLDivElement | null) => void;
  children: ReactNode;
}) {
  const t = useTransform(progress, [from, Math.max(to, from + 0.004)], [0, 1]);
  const lift = useTransform(t, [0, 1], [14, 0]);
  return (
    <motion.div
      ref={labelRef}
      style={{ left: x, top: y, opacity: fade ? t : 1, y: fade ? lift : 0 }}
      className={`absolute -translate-x-1/2 -translate-y-1/2 text-center ${className}`}
    >
      {children}
    </motion.div>
  );
}

function ItemText({ item }: { item: Item }) {
  return (
    <>
      <span className="whitespace-nowrap">{item.name}</span>
      {item.note && <em className="block whitespace-nowrap text-base text-default-teal/70">( {item.note} )</em>}
    </>
  );
}

/**
 * Riel de capitulos (fijo a la derecha, desde escritorio): orienta en un tramo fijo de ~7
 * pantallas. Resalta el capitulo actual y una barra muestra cuanto falta.
 */
function ChapterRail({ titles, starts, progress }: { titles: string[]; starts: number[]; progress: MotionValue<number> }) {
  const fill = useTransform(progress, [0, 1], [0, 1]);
  return (
    <nav aria-hidden="true" className="pointer-events-none absolute top-1/2 right-8 hidden -translate-y-1/2 items-stretch gap-4 lg:flex">
      <div className="relative w-px bg-default-teal/15">
        <motion.div style={{ scaleY: fill }} className="absolute inset-0 origin-top bg-default-teal" />
      </div>
      <ol className="flex flex-col gap-5 py-1 text-left font-support2 text-sm">
        {titles.map((title, i) => (
          <RailItem key={title} title={title} from={starts[i]} to={starts[i + 1] ?? 2} progress={progress} />
        ))}
      </ol>
    </nav>
  );
}

function RailItem({ title, from, to, progress }: { title: string; from: number; to: number; progress: MotionValue<number> }) {
  const active = useTransform(progress, (v): number => (v >= from && v < to ? 1 : 0));
  const opacity = useTransform(active, [0, 1], [0.4, 1]);
  const x = useTransform(active, [0, 1], [0, -6]);
  return (
    <motion.li style={{ opacity, x }} className="text-default-teal">
      {title}
    </motion.li>
  );
}

/** Version sin animacion: servidor (antes de medir) y movimiento reducido. */
function StaticList({ groups, cta }: { groups: Group[]; cta: ReactNode }) {
  return (
    <div className="mx-auto mt-16 flex max-w-3xl flex-col items-center gap-14 pb-32">
      {groups.map((group) => (
        <div key={group.title}>
          <h3 className="font-support1 text-4xl text-default-teal sm:text-5xl">{group.title}</h3>
          <ul className="mt-6 space-y-3 font-support2 text-lg sm:text-xl">
            {group.items.map((item) => (
              <li key={item.name}>
                <ItemText item={item} />
              </li>
            ))}
          </ul>
        </div>
      ))}
      {cta}
    </div>
  );
}

export default function ZTrail({
  groups,
  cta,
  still,
  skipLabel,
}: {
  groups: Group[];
  cta: ReactNode;
  still: boolean;
  skipLabel: string;
}) {
  const zoneRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const labelEls = useRef<(HTMLDivElement | null)[]>([]);
  const segEls = useRef<(SVGPathElement | null)[]>([]);
  const [geo, setGeo] = useState<Layout | null>(null);
  const [trail, setTrail] = useState<Trail | null>(null);
  const state = useRef<{ geo: Layout | null; trail: Trail | null }>({ geo: null, trail: null });
  const maskPrefix = useId().replace(/:/g, "");
  // Semilla por carga: el recorrido cambia en cada visita, pero no al hacer scroll ni al redimensionar.
  const seed = useRef(0);

  // 1) Acomodar las anclas en Z segun el ancho y alto de pantalla.
  useLayoutEffect(() => {
    if (still) return;
    const measure = () => {
      const zone = zoneRef.current;
      if (!zone) return;
      if (!seed.current) seed.current = Math.floor(Math.random() * 2 ** 31) + 1;
      const next = layout(groups, zone.clientWidth, window.innerHeight, seeded(seed.current));
      state.current.geo = next;
      setGeo(next);
    };
    measure();
    const observer = new ResizeObserver(measure);
    if (zoneRef.current) observer.observe(zoneRef.current);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [groups, still]);

  // 2) Medir cada texto ya pintado y trazar los tramos sin tocarlo; repartir el recorrido
  //    (los saltos entre tramos cuentan como recorrido: es cuando la pluma cruza el texto).
  useLayoutEffect(() => {
    if (!geo) return;
    let alive = true;
    const build = () => {
      const svg = svgRef.current;
      if (!alive || !svg) return;
      const half = geo.anchors.map((_, k) => {
        const el = labelEls.current[k];
        return el ? { w: el.offsetWidth / 2, h: el.offsetHeight / 2 } : { w: 0, h: 0 };
      });
      const shapes = buildShapes(geo.anchors, half, seeded(seed.current * 7 + 3));
      const probe = document.createElementNS("http://www.w3.org/2000/svg", "path");
      svg.appendChild(probe);
      let cursor = 0;
      const arrive: number[] = [0];
      const segments: Segment[] = shapes.map((shape, j) => {
        if (j > 0) cursor += Math.hypot(shape.from.x - shapes[j - 1].to.x, shape.from.y - shapes[j - 1].to.y);
        probe.setAttribute("d", shape.d);
        const s = cursor;
        cursor += probe.getTotalLength();
        arrive.push(cursor);
        return { ...shape, s, e: cursor };
      });
      probe.remove();
      const next = { segments, total: cursor, arrive };
      state.current.trail = next;
      setTrail(next);
    };
    build();
    // Las fuentes locales cambian el ancho de los textos al cargar.
    document.fonts?.ready.then(build);
    return () => {
      alive = false;
    };
  }, [geo]);

  // Como en savor.it, el trazo empieza a dibujarse mientras la seccion entra (su borde superior
  // al 60% de la pantalla), no hasta que se fija: asi no hay pantalla en blanco al llegar.
  const { scrollYProgress } = useScroll({ target: zoneRef, offset: ["start 60%", "end end"] });
  const smoothed = useSpring(scrollYProgress, smooth);
  const progress = useTransform(smoothed, [0, DRAW_END], [0, 1]);
  const zero = useMotionValue(0);

  // Camara: mantiene la punta en TIP_AT de la pantalla; entre tramos interpola el salto.
  const cameraY = useTransform(progress, (v) => {
    const { geo: g, trail: tr } = state.current;
    if (!g || !tr || tr.segments.length === 0) return 0;
    const t = v * tr.total;
    let tipY = tr.segments[0].from.y;
    for (let j = 0; j < tr.segments.length; j++) {
      const seg = tr.segments[j];
      if (t < seg.s) {
        const prev = tr.segments[j - 1];
        if (prev) tipY = prev.to.y + (seg.from.y - prev.to.y) * ((t - prev.e) / (seg.s - prev.e || 1));
        break;
      }
      if (t <= seg.e) {
        const el = segEls.current[j];
        tipY = el ? el.getPointAtLength(t - seg.s).y : seg.to.y;
        break;
      }
      tipY = seg.to.y;
    }
    return Math.min(0, Math.max(g.vh - g.height, g.vh * TIP_AT - tipY));
  });

  if (still) return <StaticList groups={groups} cta={cta} />;

  const total = trail?.total ?? 1;
  // Cada texto aparece desde que la pluma llega hasta que sale del otro lado (el siguiente tramo).
  const span = (k: number) => {
    if (!trail) return { from: 2, to: 3 };
    const from = Math.min(trail.arrive[k] / total, 0.985);
    const leave = trail.segments[k]?.s ?? trail.arrive[k] + total * 0.012;
    return { from, to: Math.min(Math.max(leave / total, from + 0.006), 1) };
  };

  return (
    <div
      ref={zoneRef}
      // El recorrido empieza 0.6 pantallas antes de fijarse, por eso el alto es 0.4 pantallas + recorrido.
      style={{ height: geo && trail ? geo.vh * 0.4 + (total * SCROLL_PER_PX) / DRAW_END : undefined }}
      className="relative w-full"
    >
      {/* Teclado/lector de pantalla: saltar el tramo animado y llegar directo a contacto. */}
      <a
        href="#contact"
        className="sr-only focus:not-sr-only focus:fixed focus:top-24 focus:left-6 focus:z-20 focus:rounded-full focus:bg-default-teal focus:px-5 focus:py-3 focus:font-support2 focus:text-default-ivory"
      >
        {skipLabel}
      </a>
      {!geo && <StaticList groups={groups} cta={cta} />}
      <div className={`sticky top-0 h-svh w-full overflow-hidden ${geo ? "" : "hidden"}`}>
        <motion.div style={{ y: geo ? cameraY : zero, height: geo?.height }} className="absolute inset-x-0 top-0">
          <svg
            ref={svgRef}
            aria-hidden="true"
            width={geo?.w ?? 0}
            height={geo?.height ?? 0}
            fill="none"
            className="absolute top-0 left-0 text-default-navy/70"
          >
            {trail?.segments.map((seg, j) => (
              <TrailSegment
                key={j}
                seg={seg}
                total={total}
                progress={progress}
                maskId={`${maskPrefix}-m${j}`}
                pathRef={(el) => {
                  segEls.current[j] = el;
                }}
              />
            ))}
          </svg>
          {geo?.anchors.map((a, k) => {
            const { from, to } = span(k);
            const labelRef = (el: HTMLDivElement | null) => {
              labelEls.current[k] = el;
            };
            if (a.kind === "title")
              return (
                <Label key={k} x={a.x} y={a.y} from={from} to={to} progress={progress} fade={false} labelRef={labelRef}>
                  <h3 aria-label={a.text} className="font-support1 text-4xl leading-none text-default-teal sm:text-5xl lg:text-6xl">
                    <RevealText text={a.text} progress={progress} start={from} end={to} charDur={Math.max((to - from) / 3, 0.002)} />
                  </h3>
                </Label>
              );
            if (a.kind === "item")
              return (
                <Label
                  key={k}
                  x={a.x}
                  y={a.y}
                  from={from}
                  to={to}
                  progress={progress}
                  className="font-support2 text-lg sm:text-xl lg:text-2xl"
                  labelRef={labelRef}
                >
                  <ItemText item={a.item} />
                </Label>
              );
            if (a.kind === "cta")
              return (
                <Label key={k} x={a.x} y={a.y} from={from} to={to} progress={progress} labelRef={labelRef}>
                  {cta}
                </Label>
              );
            return null;
          })}
        </motion.div>
        {geo && trail && (
          <ChapterRail
            titles={groups.map((g) => g.title)}
            starts={geo.anchors.flatMap((a, k) => (a.kind === "title" ? [span(k).from] : []))}
            progress={progress}
          />
        )}
      </div>
    </div>
  );
}
