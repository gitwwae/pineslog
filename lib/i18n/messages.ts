export type Locale = "en" | "it";
export const LOCALES: Locale[] = ["en", "it"];
export const DEFAULT_LOCALE: Locale = "en";

export type Dictionary = {
  nav: { journey: string; stack: string; log: string; about: string; admin: string };
  locale: { en: string; it: string };
  home: {
    eyebrow: string; title1: string; titleAccent: string; title2: string; titleEm: string; title3: string;
    sub: string; cta1: string; cta2: string;
    day: string; cumulative: string; mrr: string; burn: string;
    ofN: (n: number) => string; pctOf: (p: string) => string; growing: string; activeTools: (n: number) => string;
    strategyEyebrow: string; strategyTitle: string;
    pillars: {
      services: { title: string; body: string };
      audience: { title: string; body: string };
      product: { title: string; body: string };
    };
  };
  journey: {
    eyebrow: string; title: string; sub: string;
    monthsRange: (a: number, b: number) => string;
    target: (label: string, amount: string) => string;
    revenueLabel: string; tooltipJump: string;
  };
  stack: {
    eyebrow: string; title: string; sub1: string; sub2: string; sub3: string;
    activeTools: string; monthlyBurn: string; annual: string;
    thService: string; thCategory: string; thCost: string; thMonth: string; thStatus: string;
    empty: string; essential: string;
  };
  log: {
    eyebrow: string; title: string; sub: string; empty: string;
    week: (n: number) => string; back: string; backShort: string;
  };
  about: {
    eyebrow: string; titlePrefix: string;
    p1A: string; p1B: string; p1C: string; p2: string;
    p3A: string; p3B: string; p3C: string; reachOut: string;
  };
  footer: { tagline: string; smallprint: string };
  login: {
    eyebrow: string; title: string; email: string; sendLink: string; sending: string;
    checkInbox: string; checkInboxDesc: (e: string) => string; hint: string; unauthorized: string;
  };
};

export const messages: { en: Dictionary; it: Dictionary } = {
  en: {
    nav: { journey: "Journey", stack: "Stack", log: "Log", about: "About", admin: "Admin" },
    locale: { en: "EN", it: "IT" },
    home: {
      eyebrow: "A captain's log · est. 2026",
      title1: "Field notes on the road to ",
      titleAccent: "$1M",
      title2: ". Building ",
      titleEm: "AI",
      title3: " in the open.",
      sub: "A public log of every step from $0 to a million dollars. Tools, numbers, mistakes, lessons. Written down, in the open, by a solo founder with a tech background and a tight budget.",
      cta1: "See the journey →",
      cta2: "My stack",
      day: "Day",
      cumulative: "Cumulative",
      mrr: "MRR",
      burn: "Burn",
      ofN: (n: number) => `of ${n}`,
      pctOf: (p: string) => `${p}% of $1M`,
      growing: "growing",
      activeTools: (n: number) => `${n} active tools`,
      strategyEyebrow: "The strategy",
      strategyTitle: "Cash → Audience → Product. In that order.",
      pillars: {
        services: { title: "Services first", body: "AI consulting and automation for SMBs funds everything. Cash flow on day one, market insight built in." },
        audience: { title: "Audience always", body: "Build in public. Every project, every number, every mistake. Public. Compounding asset, zero ad budget." },
        product: { title: "Product later", body: "Productize the most recurring problem from services into a micro-SaaS. Then scale, diversify, repeat." }
      }
    },
    journey: {
      eyebrow: "Roadmap · 48 months",
      title: "The 6 macro-phases.",
      sub: "Six phases, four years, one goal. The non-linear path from zero to a million. Slow at the start (validation + audience), compounding hard in the back half.",
      monthsRange: (a: number, b: number) => `M${a}-${b}`,
      target: (label: string, amount: string) => `Target ${label}: ${amount}`,
      revenueLabel: "◆ Cumulative revenue",
      tooltipJump: "click to jump"
    },
    stack: {
      eyebrow: "Build in public · live",
      title: "The stack.",
      sub1: "Every paid tool I use, the cost, and what it is for. Updated as I add or cut. Year-one burn rate goal: under ",
      sub2: "$200/mo",
      sub3: ".",
      activeTools: "Active tools",
      monthlyBurn: "Monthly burn",
      annual: "Annual",
      thService: "Service",
      thCategory: "Category",
      thCost: "Cost",
      thMonth: "/ month",
      thStatus: "Status",
      empty: "No public tools yet.",
      essential: "essential"
    },
    log: {
      eyebrow: "Captain's log",
      title: "Field notes.",
      sub: "Weekly write-ups: numbers, decisions, lessons, what is next.",
      empty: "No log entries published yet. The first one is on its way.",
      week: (n: number) => `week ${n}`,
      back: "← all field notes",
      backShort: "← back to all entries"
    },
    about: {
      eyebrow: "About",
      titlePrefix: "Hi, I'm ",
      p1A: "I'm a tech / AI builder. ",
      p1B: " is my public log on the way to ",
      p1C: ". Starting from a tight budget, no audience, no funding.",
      p2: "I write down the tools, the numbers, what worked and what did not. The plan is simple: sell expertise, build an audience, productize, scale, diversify.",
      p3A: "If you build in AI or want to follow the journey, the ",
      p3B: "log",
      p3C: " is the place.",
      reachOut: "Reach out:"
    },
    footer: {
      tagline: "Field notes on the road to $1M.",
      smallprint: "built in public · hosted on Vercel"
    },
    login: {
      eyebrow: "Admin",
      title: "Sign in",
      email: "Email",
      sendLink: "Send magic link",
      sending: "Sending…",
      checkInbox: "Check your email.",
      checkInboxDesc: (e: string) => `I sent a magic link to ${e}. Open it from this browser to sign in.`,
      hint: "Only the email defined in ADMIN_EMAIL can sign in. Magic link via Supabase Auth, no password.",
      unauthorized: "Email not authorized. Only the email defined in ADMIN_EMAIL can sign in."
    }
  },
  it: {
    nav: { journey: "Journey", stack: "Stack", log: "Log", about: "About", admin: "Admin" },
    locale: { en: "EN", it: "IT" },
    home: {
      eyebrow: "Il diario di bordo · est. 2026",
      title1: "Appunti sulla strada verso ",
      titleAccent: "$1M",
      title2: ". Costruendo ",
      titleEm: "AI",
      title3: " allo scoperto.",
      sub: "Un diario pubblico di ogni passo da $0 a un milione di dollari. Tool, numeri, errori, lezioni. Scritti nero su bianco, allo scoperto, da un solo founder con background tech e budget risicato.",
      cta1: "Guarda il journey →",
      cta2: "Il mio stack",
      day: "Giorno",
      cumulative: "Cumulativo",
      mrr: "MRR",
      burn: "Burn",
      ofN: (n: number) => `di ${n}`,
      pctOf: (p: string) => `${p}% di $1M`,
      growing: "in crescita",
      activeTools: (n: number) => `${n} tool attivi`,
      strategyEyebrow: "La strategia",
      strategyTitle: "Cash → Audience → Prodotto. In quest'ordine.",
      pillars: {
        services: { title: "Prima i servizi", body: "Consulenza AI e automazioni per PMI finanziano tutto. Cash flow dal primo giorno, market insight inclusi nel pacchetto." },
        audience: { title: "Sempre audience", body: "Build in public. Ogni progetto, ogni numero, ogni errore. Pubblici. Asset che fa compounding, zero ad budget." },
        product: { title: "Poi prodotto", body: "Productize il problema piu ricorrente dei servizi in un micro-SaaS. Poi scala, diversifica, ripeti." }
      }
    },
    journey: {
      eyebrow: "Roadmap · 48 mesi",
      title: "Le 6 macro-fasi.",
      sub: "Sei fasi, quattro anni, un obiettivo. Il percorso non lineare da zero al milione. Lento all'inizio (validazione + audience), che fa compounding pesante nella seconda meta.",
      monthsRange: (a: number, b: number) => `M${a}-${b}`,
      target: (label: string, amount: string) => `Target ${label}: ${amount}`,
      revenueLabel: "◆ Revenue cumulato",
      tooltipJump: "click per saltare"
    },
    stack: {
      eyebrow: "Build in public · live",
      title: "Lo stack.",
      sub1: "Ogni tool a pagamento che uso, il costo, e a cosa serve. Aggiornato a ogni aggiunta o taglio. Obiettivo burn rate primo anno: sotto i ",
      sub2: "$200/mese",
      sub3: ".",
      activeTools: "Tool attivi",
      monthlyBurn: "Burn mensile",
      annual: "Annuale",
      thService: "Servizio",
      thCategory: "Categoria",
      thCost: "Costo",
      thMonth: "/ mese",
      thStatus: "Stato",
      empty: "Nessun tool pubblicato ancora.",
      essential: "essenziale"
    },
    log: {
      eyebrow: "Diario di bordo",
      title: "Appunti.",
      sub: "Aggiornamenti settimanali: numeri, decisioni, lezioni, cosa viene dopo.",
      empty: "Nessun post pubblicato ancora. Il primo arriva a giorni.",
      week: (n: number) => `settimana ${n}`,
      back: "← tutti gli appunti",
      backShort: "← tutti i post"
    },
    about: {
      eyebrow: "Chi sono",
      titlePrefix: "Ciao, sono ",
      p1A: "Sono un builder tech / AI. ",
      p1B: " e il mio diario pubblico sulla strada verso ",
      p1C: ". Si parte con budget risicato, niente audience, niente investitori.",
      p2: "Annoto i tool, i numeri, cosa ha funzionato e cosa no. Il piano e' semplice: vendere expertise, costruire audience, productize, scalare, diversificare.",
      p3A: "Se anche tu costruisci nell'AI o vuoi seguire il percorso, il ",
      p3B: "log",
      p3C: " e' il posto.",
      reachOut: "Contattami:"
    },
    footer: {
      tagline: "Appunti sulla strada verso $1M.",
      smallprint: "build in public · hosted on Vercel"
    },
    login: {
      eyebrow: "Admin",
      title: "Sign in",
      email: "Email",
      sendLink: "Invia magic link",
      sending: "Invio in corso…",
      checkInbox: "Controlla la tua mail.",
      checkInboxDesc: (e: string) => `Ho mandato un magic link a ${e}. Aprilo da questo browser per entrare.`,
      hint: "Solo l'email definita in ADMIN_EMAIL puo' entrare. Magic link via Supabase Auth, niente password.",
      unauthorized: "Email non autorizzata. Solo l'email definita in ADMIN_EMAIL puo' accedere."
    }
  }
};
