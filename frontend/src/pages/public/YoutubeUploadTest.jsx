import { useState } from "react";

function YoutubeUploadTest() {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const defaultApiBase = `${window.location.protocol}//${window.location.hostname}:5000/api`;
  const API_BASE = import.meta.env.VITE_API_URL || defaultApiBase;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setResult(null);
    setError(null);

    if (!file) {
      setError({ message: "Selectionne un fichier video (.mp4 ou .mov)." });
      return;
    }

    const formData = new FormData();
    formData.append("video_file", file);
    formData.append("title", title || file.name);
    formData.append("description", description || "Upload test YouTube depuis la page temporaire");

    try {
      setLoading(true);
      const response = await fetch(`${API_BASE}/movies`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) {
        setError({
          message: data?.details || data?.error || "Erreur inconnue lors de l'upload",
          step: data?.step || null,
          provider: data?.provider || null,
          providerStatus: data?.providerStatus || null,
          providerReason: data?.providerReason || null,
        });
        return;
      }

      setResult(data);
    } catch (uploadError) {
      setError({ message: uploadError.message || "Echec de l'upload" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-noir-bleute to-gris-anthracite px-4 py-10 text-white">
      <div className="mx-auto max-w-2xl rounded-2xl border border-white/15 bg-black/20 p-6">
        <h1 className="font-title text-4xl">Test Upload YouTube</h1>
        <p className="mt-2 text-gray-300">
          Page temporaire pour tester le flow backend: upload video -&gt; YouTube (et S3 si disponible).
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="video" className="mb-1 block text-sm text-gray-200">
              Fichier video (.mp4, .mov)
            </label>
            <input
              id="video"
              type="file"
              accept="video/mp4,video/quicktime,.mp4,.mov"
              onChange={(event) => setFile(event.target.files?.[0] || null)}
              className="block w-full rounded-lg border border-white/20 bg-black/30 px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label htmlFor="title" className="mb-1 block text-sm text-gray-200">
              Titre (optionnel)
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              className="w-full rounded-lg border border-white/20 bg-black/30 px-3 py-2 text-sm"
              placeholder="Titre de la video"
            />
          </div>

          <div>
            <label htmlFor="description" className="mb-1 block text-sm text-gray-200">
              Description (optionnelle)
            </label>
            <textarea
              id="description"
              rows="4"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              className="w-full rounded-lg border border-white/20 bg-black/30 px-3 py-2 text-sm"
              placeholder="Description de test"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-jaune-souffre px-5 py-2 font-semibold text-reglisse transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Upload en cours..." : "Tester l'upload"}
          </button>
        </form>

        {error && (
          <div className="mt-4 rounded-lg border border-red-400/40 bg-red-500/10 p-3 text-red-200">
            <p className="font-semibold">{error.message}</p>
            {(error.step || error.provider || error.providerReason) && (
              <ul className="mt-2 list-disc pl-5 text-sm text-red-100">
                {error.step && <li>Etape: {error.step}</li>}
                {error.provider && <li>Provider: {error.provider}</li>}
                {error.providerStatus && <li>Code provider: {error.providerStatus}</li>}
                {error.providerReason && <li>Raison provider: {error.providerReason}</li>}
              </ul>
            )}
          </div>
        )}

        {result && (
          <div className="mt-4 rounded-lg border border-green-400/30 bg-green-500/10 p-3">
            <p className="mb-2 font-semibold text-green-200">Upload termine</p>
            <pre className="max-h-80 overflow-auto text-xs text-green-100 whitespace-pre-wrap">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default YoutubeUploadTest;
