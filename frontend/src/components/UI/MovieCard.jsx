import Button from "./Button.jsx";
import { Status } from "./StatusBadge.jsx";
import { useState } from "react";

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

const DEFAULT_THUMBNAIL = "/assets/img/vignette-test.svg";

// Fallback SVG si l'image ne charge pas
const FALLBACK_SVG = (
  <svg
    className="aspect-video w-full object-cover"
    viewBox="0 0 400 225"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
  >
    <rect width="400" height="225" fill="#2a2a3a" />
    <rect x="1" y="1" width="398" height="223" fill="none" stroke="#444" strokeWidth="2" />
    <circle cx="200" cy="112.5" r="40" fill="#555" opacity="0.5" />
    <path d="M170 100 L170 125 L230 112.5 Z" fill="#666" opacity="0.7" />
  </svg>
);

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
  const [imageError, setImageError] = useState(false);
  
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
      <div className="min-h-20 sm:min-h-24">
        <h3 className="font-title text-2xl leading-tight sm:text-3xl line-clamp-2 min-h-12">
          {title}
        </h3>
        <p className="text-lg sm:text-xl line-clamp-1 min-h-6 mt-0">Par : {directorName}</p>
      </div>

      <button
        type="button"
        onClick={onThumbnailClick}
        className="mt-0 block w-full overflow-hidden rounded-2xl bg-gris-magneti focus:outline-none focus:ring-2 focus:ring-bleu-ocean/80"
      >
        {imageError ? (
          FALLBACK_SVG
        ) : (
          <img
            src={thumbnailSrc || DEFAULT_THUMBNAIL}
            alt={`Miniature de ${title}`}
            className="aspect-video w-full object-cover"
            onError={() => setImageError(true)}
            onLoad={() => setImageError(false)}
          />
        )}
      </button>

      {showStatus && (
        <div className="mt-2 flex items-center gap-2">
          <span className="text-base sm:text-lg">Statut :</span>
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
            {showAssignedJurors && hasAssignedJurors ? (
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <p className="text-base sm:text-lg leading-snug">Vidéo assignée à :</p>
                {uniqueAssignedJurors.map((juryName) => (
                  <span
                    key={juryName}
                    className="rounded-sm bg-bleu-ocean px-2 py-1 text-base text-white"
                  >
                    {juryName}
                  </span>
                ))}
              </div>
            ) : (
              <p className="mt-2 text-lg leading-snug sm:text-xl">
                Cette vidéo n'est pas assignée à un jury
              </p>
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

        <p className="my-3 text-lg leading-snug sm:text-xl line-clamp-2 min-h-11">
          {description}
        </p>

        {(isAdmin || isJuryPending || isJuryReviewed) && (
          <Button
            interactive
            variant="filled-yellow"
            onClick={onMoreInfo}
            className="h-14! w-full! rounded-full px-4 text-sm sm:text-base font-semibold text-center flex items-center justify-center leading-tight"
          >
            Voir plus d&apos;informations
          </Button>
        )}
      </div>
    </article>
  );
}

export default MovieCard;
