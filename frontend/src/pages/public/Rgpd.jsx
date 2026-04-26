import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Rgpd() {
  const { t } = useTranslation();
  const sections = t('rgpd.sections', { returnObjects: true });
  const normalizedSections = Array.isArray(sections) ? sections : [];

  return (
    <article id="rgpd-top" className="min-h-screen bg-linear-to-b from-noir-bleute via-gris-anthracite to-noir-bleute px-4 py-10 text-white md:px-8 md:py-14">
      <div className="mx-auto max-w-5xl rounded-2xl border border-white/15 bg-white/5 p-5 backdrop-blur-sm md:p-10">
        <header className="border-b border-white/15 pb-6">
          <p className="text-sm uppercase tracking-[0.35em] text-jaune-simpson">{t('rgpd.badge')}</p>
          <h1 className="mt-3 font-title text-3xl font-black uppercase md:text-5xl">{t('rgpd.pageTitle')}</h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-white/85 md:text-lg">{t('rgpd.intro')}</p>
        </header>

        <nav aria-label={t('rgpd.summaryAriaLabel')} className="mt-8 rounded-xl border border-white/10 bg-noir-bleute/30 p-4">
          <h2 className="text-lg font-semibold text-jaune-simpson">{t('rgpd.summaryTitle')}</h2>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-white/90 md:text-base">
            {normalizedSections.map((section) => (
              <li key={section.id}>
                <a className="underline-offset-2 hover:underline" href={`#${section.id}`}>
                  {section.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <section className="mt-8 space-y-8 md:space-y-10">
          {normalizedSections.map((section) => (
            <section id={section.id} key={section.id} className="scroll-mt-28">
              <h2 className="font-title text-2xl font-black text-jaune-simpson md:text-3xl">{section.title}</h2>

              {section.paragraphs?.map((paragraph, index) => (
                <p key={`${section.id}-p-${index}`} className="mt-3 text-base leading-8 text-white/90 md:text-lg">
                  {paragraph}
                </p>
              ))}

              {section.bullets?.length ? (
                <ul className="mt-4 list-disc space-y-2 pl-5 text-base leading-7 text-white/90 md:text-lg">
                  {section.bullets.map((bullet, index) => (
                    <li key={`${section.id}-b-${index}`}>{bullet}</li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </section>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3 border-t border-white/15 pt-6">
          <a
            href="#rgpd-top"
            className="inline-flex items-center rounded-full border border-jaune-simpson px-5 py-2 text-sm font-semibold uppercase tracking-wider text-jaune-simpson transition hover:bg-jaune-simpson hover:text-noir-bleute"
          >
            {t('rgpd.backToTop')}
          </a>
          <Link
            to="/"
            className="inline-flex items-center rounded-full border border-white/40 px-5 py-2 text-sm font-semibold uppercase tracking-wider text-white transition hover:bg-white hover:text-noir-bleute"
          >
            {t('rgpd.backHome')}
          </Link>
        </div>
      </div>
    </article>
  );
}

export default Rgpd;
