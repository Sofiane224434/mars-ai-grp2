import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const CARD_CONFIG = [
  {
    id: 'movies',
    to: '/movies',
    titleKey: 'nav.movies',
    descriptionKey: 'home.quickAccess.cards.movies.description',
    ctaKey: 'home.quickAccess.cards.movies.cta',
    glowClass: 'from-jaune-simpson/45 via-orange-genial/20 to-transparent',
    grainClass: 'bg-jaune-simpson/15',
  },
  {
    id: 'about',
    to: '/about',
    titleKey: 'nav.about',
    descriptionKey: 'home.quickAccess.cards.about.description',
    ctaKey: 'home.quickAccess.cards.about.cta',
    glowClass: 'from-bleu-ciel/45 via-turquoise-vif/20 to-transparent',
    grainClass: 'bg-bleu-ciel/15',
  },
  {
    id: 'faq',
    to: '/faq',
    titleKey: 'nav.faq',
    descriptionKey: 'home.quickAccess.cards.faq.description',
    ctaKey: 'home.quickAccess.cards.faq.cta',
    glowClass: 'from-fauve/45 via-jaune-souffre/20 to-transparent',
    grainClass: 'bg-fauve/15',
  },
];

export default function QuickAccessSection() {
  const { t } = useTranslation();

  return (
    <section className="w-full px-6 pb-16 lg:px-20" aria-labelledby="home-quick-access-title">
      <div className="mx-auto max-w-6xl text-center">
        <h2 id="home-quick-access-title" className="font-title text-3xl font-black uppercase tracking-wide text-white md:text-4xl">
          {t('home.quickAccess.title')}
        </h2>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {CARD_CONFIG.map((card) => (
            <Link
              key={card.id}
              to={card.to}
              className="group relative isolate overflow-hidden rounded-2xl border border-white/15 bg-linear-to-b from-white/10 via-white/5 to-transparent p-6 text-center text-white backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-white/35 hover:shadow-[0_18px_50px_rgba(0,0,0,0.35)]"
              aria-label={`${t(card.titleKey)} - ${t(card.ctaKey)}`}
            >
              <div
                aria-hidden="true"
                className={`absolute -right-12 -top-12 h-40 w-40 rounded-full bg-radial from-white/50 to-transparent opacity-90 blur-xl transition duration-300 group-hover:scale-110 ${card.grainClass}`}
              />
              <div
                aria-hidden="true"
                className={`absolute -left-14 bottom-6 h-40 w-40 rounded-full bg-linear-to-tr opacity-75 blur-2xl transition duration-300 group-hover:opacity-100 ${card.glowClass}`}
              />
              <div aria-hidden="true" className="absolute -bottom-8 right-6 h-20 w-20 rotate-12 rounded-xl border border-white/15 bg-white/5" />

              <h3 className="relative z-10 mt-2 text-2xl font-black uppercase tracking-wide md:text-3xl">
                {t(card.titleKey)}
              </h3>
              <p className="relative z-10 mt-3 min-h-24 text-base leading-relaxed text-white/85">
                {t(card.descriptionKey)}
              </p>
              <span className="relative z-10 mx-auto mt-5 flex w-fit items-center gap-2 text-sm font-semibold uppercase tracking-wider text-jaune-simpson transition group-hover:gap-3">
                {t(card.ctaKey)}
                <span aria-hidden="true">→</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
