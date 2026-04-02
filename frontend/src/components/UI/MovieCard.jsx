import Button from "./Button.jsx";
import { Status } from "./StatusBadge.jsx";

const STATUS_VARIANT = {
  pending: "pending",
  approved: "approved",
  review: "review",
  rejected: "rejected",
};

const STATUS_LABEL = {
  pending: "En attente",
  approved: "Validé",
  review: "À revoir",
  rejected: "Refusé",
};

function MovieCard({
  variant = "basic",
  title = "Titre de la video",
  directorName = "Nom Prénom",
  description = "Une description raccourcie de la video. Texte texte. Plus de description...",
  status = "pending",
  assignedJurors = [],
  thumbnailSrc,
  onThumbnailClick,
  onAssign,
  onMoreInfo,
}) {
  const isAdmin = variant === "admin-assign" || variant === "admin-assigned";
  const showAssignedJurors = variant === "admin-assigned";
  const isJuryPending = variant === "jury-pending";
  const isJuryReviewed = variant === "jury-reviewed";
  const showStatus = variant !== "basic";
  const uniqueAssignedJurors = [...new Set(
    assignedJurors
      .map((juryName) => juryName.trim())
      .filter(Boolean),
  )];
  const hasAssignedJurors = uniqueAssignedJurors.length > 0;

  return (
    <article className="flex h-full w-full max-w-96 flex-col rounded-3xl border border-noir-bleute/80 bg-gris-steelix p-3 text-white shadow-lg sm:p-4">
      <h3 className="font-title text-2xl leading-tight sm:text-3xl">{title}</h3>
      <p className="text-lg sm:text-xl">Par : {directorName}</p>

      <button
        type="button"
        onClick={onThumbnailClick}
        className="mt-2 block w-full overflow-hidden rounded-2xl bg-gris-magneti focus:outline-none focus:ring-2 focus:ring-bleu-ocean/80"
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
        <div className="mt-2 flex items-center gap-2">
          <span className="text-xl sm:text-2xl">Statut :</span>
          <Status
            variant={STATUS_VARIANT[status] || "pending"}
            className="px-2 py-0.5"
          >
            {STATUS_LABEL[status] || STATUS_LABEL.pending}
          </Status>
        </div>
      )}

      <div className="flex flex-col flex-1">
        {isAdmin && (
          <>
            <p className="mt-2 text-xl leading-snug sm:text-2xl">
              {showAssignedJurors && hasAssignedJurors
                ? "Video assignée à :"
                : "Cette video n'est pas assignée à un jury"}
            </p>

            {showAssignedJurors && hasAssignedJurors && (
              <div className="mt-2 flex flex-wrap gap-2">
                {uniqueAssignedJurors.map((juryName) => (
                  <span
                    key={juryName}
                    className="rounded-sm bg-bleu-ocean px-2 py-1 text-base text-white"
                  >
                    {juryName}
                  </span>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      <div className="mt-auto flex flex-col pt-3">
        {isAdmin && (
          <Button
            interactive
            variant="gradient-blue"
            onClick={onAssign}
            className="h-10 w-full rounded-full text-base font-semibold"
          >
            {showAssignedJurors && hasAssignedJurors
              ? "Modifier le jury"
              : "Assigner à un jury"}
          </Button>
        )}

        <p className="my-3 text-lg leading-snug sm:text-xl line-clamp-2 min-h-[2.75rem]">
          {description}
        </p>

        {(isAdmin || isJuryPending || isJuryReviewed) && (
          <Button
            interactive
            variant="filled-yellow"
            onClick={onMoreInfo}
            className="h-10 w-full rounded-full px-8 text-base font-semibold text-center flex items-center justify-center"
          >
            Voir plus d&apos;informations
          </Button>
        )}
      </div>
    </article>
  );
}

export default MovieCard;
