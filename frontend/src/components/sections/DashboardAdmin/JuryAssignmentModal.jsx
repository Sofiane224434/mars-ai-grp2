import Button from "../../UI/Button.jsx";

function JuryAssignmentModal({
    isOpen,
    selectedMovie,
    juryOptions,
    selectedJuryId,
    onSelectJury,
    assignError,
    isAssigning,
    onClose,
    onConfirm,
}) {
    if (!isOpen || !selectedMovie) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 px-4">
            <div className="w-full max-w-lg rounded-2xl border border-white/15 bg-gris-steelix p-5 text-white shadow-2xl">
                <h2 className="text-2xl font-title mb-2">Assigner un jury</h2>
                <p className="text-sm text-gris-magneti mb-4 line-clamp-2">
                    Film : {selectedMovie.title}
                </p>

                <div className="max-h-72 overflow-y-auto rounded-lg border border-white/10 bg-noir-bleute/60">
                    {juryOptions.length > 0 ? (
                        juryOptions.map((jury) => {
                            const isSelected = String(jury.id) === String(selectedJuryId);
                            return (
                                <label
                                    key={jury.id}
                                    className={`flex cursor-pointer items-center justify-between gap-3 border-b border-white/5 px-3 py-3 last:border-b-0 ${isSelected ? 'bg-bleu-ocean/25' : 'hover:bg-white/5'}`}
                                >
                                    <div className="min-w-0">
                                        <p className="text-sm font-semibold truncate">{jury.email}</p>
                                        <p className="text-xs text-gris-magneti">
                                            {jury.assignedMoviesCount} film(s) assigne(s)
                                        </p>
                                    </div>
                                    <input
                                        type="radio"
                                        name="jury-choice"
                                        className="h-4 w-4"
                                        checked={isSelected}
                                        onChange={() => onSelectJury(String(jury.id))}
                                    />
                                </label>
                            );
                        })
                    ) : (
                        <p className="px-3 py-4 text-sm text-gris-magneti">Aucun jury disponible.</p>
                    )}
                </div>

                {assignError && (
                    <p className="mt-3 text-sm text-brulure-despespoir">{assignError}</p>
                )}

                <div className="mt-5 flex justify-end gap-2">
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-full border border-white/25 px-4 py-2 text-sm hover:bg-white/10"
                    >
                        Annuler
                    </button>
                    <Button
                        interactive
                        variant="gradient-blue"
                        onClick={onConfirm}
                        className="text-sm"
                    >
                        {isAssigning ? "Assignation..." : "Assigner"}
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default JuryAssignmentModal;
