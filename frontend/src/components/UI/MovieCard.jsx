import Button from './Button.jsx';
import { Status } from './StatusBadge.jsx';

const STATUS_VARIANT = {
  pending: 'pending',
  approved: 'approved',
  review: 'review',
  rejected: 'rejected',
};

const STATUS_LABEL = {
  pending: 'En attente',
  approved: 'Approuve',
  review: 'A revoir',
  rejected: 'Rejete',
};

function MovieCard({
  variant = 'basic',
  title = 'Titre de la video',
  directorName = 'Nom Prenom',
  description = 'Une description raccourcie de la video. Texte texte. Plus de description...',
  status = 'pending',
  assignedJurors = [],
  thumbnailSrc,
  onThumbnailClick,
  onAssign,
  onMoreInfo,
}) {
  const isAdmin = variant === 'admin-assign' || variant === 'admin-assigned';
  const showAssignedJurors = variant === 'admin-assigned';
  const isJuryPending = variant === 'jury-pending';
  const isJuryReviewed = variant === 'jury-reviewed';
  const showStatus = variant !== 'basic';

  return (
    <article className="w-full max-w-96 rounded-3xl border border-noir-bleute/80 bg-gris-anthracite p-4 text-white shadow-lg sm:p-5">
      <h3 className="font-title text-3xl leading-tight sm:text-4xl">{title}</h3>
      <p className="mt-1 text-xl sm:text-2xl">Par : {directorName}</p>

      <button
        type="button"
        onClick={onThumbnailClick}
        className="mt-3 block w-full overflow-hidden rounded-2xl bg-gris-magneti focus:outline-none focus:ring-2 focus:ring-bleu-ocean/80"
      >
        {thumbnailSrc ? (
          <img
            src={thumbnailSrc}
            alt={`Miniature de ${title}`}
            className="aspect-video w-full object-cover"
          />
        ) : (
          <div className="relative aspect-video w-full">
            <span className="absolute left-1/2 top-1/2 h-0 w-0 -translate-x-1/2 -translate-y-1/2 border-b-32 border-l-52 border-t-32 border-b-transparent border-l-white/75 border-t-transparent" />
          </div>
        )}
      </button>

      {showStatus && (
        <div className="mt-3 flex items-center gap-2">
          <span className="text-2xl sm:text-3xl">Statut :</span>
          <Status variant={STATUS_VARIANT[status] || 'pending'} className="px-3 py-1">
            {STATUS_LABEL[status] || STATUS_LABEL.pending}
          </Status>
        </div>
      )}

      {isAdmin && (
        <>
          <p className="mt-3 text-2xl leading-snug sm:text-3xl">
            {showAssignedJurors ? 'Video assignee a :' : 'Cette video n\'est pas assignee a un jury.'}
          </p>

          {showAssignedJurors && (
            <div className="mt-3 flex flex-wrap gap-2">
              {assignedJurors.map((juryName) => (
                <span
                  key={juryName}
                  className="rounded-sm bg-bleu-ocean px-3 py-1.5 text-xl text-white"
                >
                  {juryName}
                </span>
              ))}
            </div>
          )}

          <Button
            interactive
            variant="gradient-blue"
            onClick={onAssign}
            className="mt-3 h-9 w-full rounded-full text-base"
          >
            Assigner cette video a un jury
          </Button>
        </>
      )}

      <p className="mt-3 text-xl leading-snug sm:text-2xl">{description}</p>

      {(isAdmin || isJuryPending || isJuryReviewed) && (
        <Button
          interactive
          variant="filled-yellow"
          onClick={onMoreInfo}
          className="mt-5 h-10 w-auto rounded-full px-8 text-base"
        >
          Voir plus d&apos;informations
        </Button>
      )}
    </article>
  );
}

export default MovieCard;
