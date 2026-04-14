import { createRequire } from "module";

const require = createRequire(import.meta.url);
const { BrevoClient } = require("@getbrevo/brevo");

const DEFAULT_NEWS_PUBLIC_CAMPAIGN_NAME = "NEWS_PUBLIC";
const CAMPAIGN_PAGE_SIZE = 50;
const CAMPAIGN_MAX_OFFSET = 500;

const toNumber = (value) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
};

const toRate = (numerator, denominator) => {
  if (!denominator || denominator <= 0) return 0;
  return Number(((numerator / denominator) * 100).toFixed(2));
};

const resolveApiKey = () => process.env.BREVO_API_KEY || "";

const resolveCampaignIdFromEnv = () => {
  const raw = process.env.BREVO_NEWS_PUBLIC_CAMPAIGN_ID || "";
  const parsed = Number(raw);

  if (!Number.isInteger(parsed) || parsed <= 0) {
    return null;
  }

  return parsed;
};

const resolveCampaignName = () =>
  (process.env.BREVO_NEWS_PUBLIC_CAMPAIGN_NAME || DEFAULT_NEWS_PUBLIC_CAMPAIGN_NAME).trim();

const unwrapResponse = (response) => response?.data ?? response ?? null;

const normalizeCampaignLabel = (label) =>
  String(label || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]/g, "");

const createBrevoClient = () => {
  const apiKey = resolveApiKey();
  if (!apiKey) return null;

  return new BrevoClient({ apiKey });
};

const findCampaignIdByName = async (client, campaignName) => {
  const normalizedName = normalizeCampaignLabel(campaignName);

  for (
    let offset = 0;
    offset <= CAMPAIGN_MAX_OFFSET;
    offset += CAMPAIGN_PAGE_SIZE
  ) {
    const response = await client.emailCampaigns.getEmailCampaigns({
      limit: CAMPAIGN_PAGE_SIZE,
      offset,
      sort: "desc",
      statistics: "globalStats",
    });

    const payload = unwrapResponse(response);
    const campaigns = Array.isArray(payload?.campaigns) ? payload.campaigns : [];

    if (!campaigns.length) {
      return null;
    }

    const exactMatch = campaigns.find((campaign) => {
      if (typeof campaign?.name !== "string") return false;
      return normalizeCampaignLabel(campaign.name) === normalizedName;
    });

    if (exactMatch?.id) {
      return Number(exactMatch.id);
    }

    const partialMatch = campaigns.find((campaign) => {
      if (typeof campaign?.name !== "string") return false;
      const normalizedCandidate = normalizeCampaignLabel(campaign.name);
      return (
        normalizedCandidate.includes(normalizedName) ||
        normalizedName.includes(normalizedCandidate)
      );
    });

    if (partialMatch?.id) {
      return Number(partialMatch.id);
    }

    if (campaigns.length < CAMPAIGN_PAGE_SIZE) {
      return null;
    }
  }

  return null;
};

const buildNewsPublicPayload = (campaignData, campaignId) => {
  const globalStats = campaignData?.statistics?.globalStats || {};

  const sent = toNumber(globalStats.sent);
  const delivered = toNumber(globalStats.delivered);
  const opens = toNumber(globalStats.uniqueViews);
  const clicks = toNumber(globalStats.uniqueClicks);
  const unsubscriptions = toNumber(globalStats.unsubscriptions);

  return {
    available: true,
    source: "brevo",
    campaignId,
    campaignName: campaignData?.name || resolveCampaignName(),
    status: campaignData?.status || null,
    metrics: {
      sent,
      delivered,
      opens,
      clicks,
      unsubscriptions,
      deliveryRate: toRate(delivered, sent),
      openRate: toRate(opens, delivered),
      clickRate: toRate(clicks, delivered),
      unsubscriptionRate: toRate(unsubscriptions, delivered),
    },
    updatedAt: new Date().toISOString(),
  };
};

export const getNewsPublicCampaignStats = async () => {
  const client = createBrevoClient();
  if (!client) {
    return {
      available: false,
      source: "brevo",
      reason: "missing_api_key",
      message: "BREVO_API_KEY manquant.",
    };
  }

  try {
    const campaignName = resolveCampaignName();
    let campaignId = resolveCampaignIdFromEnv();

    if (!campaignId) {
      campaignId = await findCampaignIdByName(client, campaignName);
    }

    if (!campaignId) {
      return {
        available: false,
        source: "brevo",
        reason: "campaign_not_found",
        message: `Campagne \"${campaignName}\" introuvable.`,
      };
    }

    const campaignResponse = await client.emailCampaigns.getEmailCampaign({
      campaignId,
      statistics: "globalStats",
      excludeHtmlContent: true,
    });

    const campaignData = unwrapResponse(campaignResponse);
    return buildNewsPublicPayload(campaignData, campaignId);
  } catch (error) {
    return {
      available: false,
      source: "brevo",
      reason: "fetch_failed",
      message: error?.message || "Impossible de recuperer les statistiques Brevo.",
    };
  }
};
