// 📚 Dictionnaire centralisé des templates (Textes officiels MarsAI - V3 avec Titres)
export const EMAIL_TEMPLATES = {
  // --- 🟢 VALIDÉ ---
  approved: {
    id: 'approved',
    scope: 'movie',
    name: '✅ Conformité validée (FR)',
    getSubject: (title) => `MarsAI - Décision du Jury concernant votre film "${title}"`,
    getBody: (firstName, title) => `Bonjour ${firstName},\n\nExcellente nouvelle : après analyse par nos équipes, votre court métrage "${title}" a été validé par notre jury !\n\nQuelle est la prochaine étape ? Votre film est désormais entre les mains de notre jury. Il va être visionné et jugé prochainement. Un nouvel e-mail vous sera adressé à l'issue des délibérations pour vous annoncer si votre œuvre fait partie des 50 courts métrages officiellement sélectionnés qui seront diffusés sur notre site internet, ou si elle n'a malheureusement pas été retenue.\n\nNote de l'équipe : Nous vous rappelons que vous êtes totalement libre de soumettre plusieurs films différents pour le festival. Le jury a actuellement beaucoup de films à juger, nous vous remercions donc pour votre patience en attendant les résultats finaux.\n\nCréativement,\nL'équipe MarsAI`
  },
  approved_en: {
    id: 'approved_en',
    scope: 'movie',
    name: '✅ Conformité validée (EN)',
    getSubject: (title) => `MarsAI - Great news! Your film "${title}" has passed the compliance stage`,
    getBody: (firstName, title) => `Hi ${firstName},\n\nExcellent news: after being reviewed by our team, your short film "${title}" has successfully passed the compliance stage!\n\nWhat is the next step? Your film is now in the hands of our jury. It will be watched and judged shortly. A new email will be sent to you once the deliberations are over to let you know if your work is part of the 50 officially selected short films (which will be showcased on our website), or if it has not been selected this time.\n\nA note from the team: We would like to remind you that you are entirely free to submit multiple, different films for the festival. The jury currently has a lot of films to evaluate, so we thank you in advance for your patience while waiting for the final results.\n\nStay creative,\nThe MarsAI Team`
  },

  // --- 🟠 À REVOIR ---
  review: {
    id: 'review',
    scope: 'movie',
    name: '⚠️ À revoir (FR)',
    getSubject: (title) => `MarsAI - Action requise concernant votre film "${title}"`,
    getBody: (firstName, title) => `Bonjour ${firstName},\n\nNous vous remercions d'avoir soumis "${title}" au festival MarsAI.\n\nAprès analyse de nos équipes, votre film n'a malheureusement pas passé l'étape de conformité dans sa version actuelle.\n\nRaison(s) : \n\nCependant, rien n'est perdu ! Si vous corrigez ces éléments, nous serons ravis de réévaluer votre travail. Vous pouvez soumettre la nouvelle version de votre film directement via notre formulaire.\n\nNote de l'équipe : Nous vous rappelons que vous êtes totalement libre de soumettre d'autres films différents pour le festival. En raison du volume important de films que nous devons analyser et juger, nous vous remercions pour votre patience quant à nos retours.\n\nCréativement,\nL'équipe MarsAI`
  },
  review_en: {
    id: 'review_en',
    scope: 'movie',
    name: '⚠️ À revoir (EN)',
    getSubject: (title) => `MarsAI - Action required regarding your film "${title}"`,
    getBody: (firstName, title) => `Hi ${firstName},\n\nThank you for submitting "${title}" to the MarsAI festival.\n\nFollowing a review by our team, your film unfortunately did not pass the compliance stage in its current version.\n\nReason(s):\n\nHowever, nothing is lost! If you correct these elements, we would be more than happy to re-evaluate your work. You can resubmit the updated version of your film directly via this link: [Insert resubmission link]\n\nA note from the team: We would like to remind you that you are entirely free to submit other, different films for the festival. Due to the high volume of films we have to review and judge, we greatly appreciate your patience regarding our response times.\n\nStay creative,\nThe MarsAI Team`
  },

  // --- 🔴 REFUSÉ ---
  rejected: {
    id: 'rejected',
    scope: 'movie',
    name: '❌ Refusé (FR)',
    getSubject: (title) => `MarsAI - Décision concernant votre film "${title}"`,
    getBody: (firstName, title) => `Bonjour ${firstName},\n\nNous vous remercions d'avoir soumis "${title}" au festival MarsAI.\n\nAprès une analyse minutieuse de nos équipes, nous sommes au regret de vous informer que votre court métrage ne remplit pas nos critères de conformité de manière rédhibitoire. Par conséquent, il ne pourra pas être retenu pour cette édition, même avec des modifications.\n\nSi ce film ne peut pas concourir, cela ne signifie pas la fin de votre aventure avec nous ! Si vous le souhaitez, vous pouvez tout à fait créer et soumettre un nouveau court métrage via notre formulaire principal, en veillant cette fois à bien respecter les prérequis du festival.\n\nNote de l'équipe : Vous restez en effet libre de soumettre autant de films différents que vous le souhaitez. Les candidatures étant nombreuses et le temps d'analyse important, nous vous remercions chaleureusement pour votre patience.\n\nCréativement,\nL'équipe MarsAI`
  },
  rejected_en: {
    id: 'rejected_en',
    scope: 'movie',
    name: '❌ Refusé (EN)',
    getSubject: (title) => `MarsAI - Compliance stage result for your film "${title}"`,
    getBody: (firstName, title) => `Hi ${firstName},\n\nThank you for submitting "${title}" to the MarsAI festival.\n\nAfter a careful review by our team, we regret to inform you that your short film does not meet our core compliance criteria. Therefore, it cannot be considered for this edition, even if modifications are made.\n\nHowever, if this specific film cannot compete, it doesn't mean your journey with us is over! If you wish, you are more than welcome to create and submit a new short film via our main form, making sure this time that it fully meets the festival's guidelines.\n\nA note from the team: You remain completely free to submit as many different films as you like. Because submissions are numerous and the review process takes time, we warmly thank you for your patience.\n\nStay creative,\nThe MarsAI Team`
  },

  // --- ✏️ CUSTOM ---
  custom: {
    id: 'custom',
    scope: 'movie',
    name: '✏️ Email 100% personnalisé',
    getSubject: (title) => `Concernant votre film "${title}"`,
    getBody: (firstName) => `Bonjour ${firstName},\n\n\n\nCréativement,\nL'équipe MarsAI`
  },

  jury_invitation: {
    id: 'jury_invitation',
    scope: 'jury',
    name: '🎟️ Invitation jury officielle',
    getSubject: () => 'MarsAI - Invitation à rejoindre le jury officiel',
    getBody: () => `Bonjour {{displayName}},\n\nNous avons l'immense honneur de vous inviter à faire partie du jury officiel de cette nouvelle édition du festival MarsAI.\n\nVotre expertise sera précieuse pour l'évaluation des courts métrages en compétition.\n\nQuelle est la prochaine étape ? Pour accéder à votre interface privée et commencer à visionner les films qui vous sont assignés, connectez-vous via le lien sécurisé ci-dessous et en utilisant votre token d'accès personnel :\n\nLien de connexion : {{loginUrl}}\nToken d'accès personnel : {{invitationToken}} (valide jusqu'au {{expiryDate}})\n\nPériode de visionnage :\nLes œuvres qui vous seront assignées durent au maximum 2 minutes.\n\nNote de l'équipe : L'accès à ce panel de sélection est strictement confidentiel. Merci de ne pas partager votre token ni les contenus visionnés. Si vous pensez avoir reçu cet e-mail par erreur, ignorez-le.\n\nNous vous remercions chaleureusement pour le temps et l'attention que vous accorderez au travail des réalisateurs.\n\nCréativement,\nL'équipe MarsAI`
  }
};

export const getTemplatesByScope = (scope) =>
  Object.values(EMAIL_TEMPLATES).filter((template) => template.scope === scope);

// Fonction exportée pour être réutilisée si besoin
export const getDefaultTemplateId = (statusId) => {
  if (statusId === 4) return 'approved';
  if (statusId === 3) return 'review';
  if (statusId === 2) return 'rejected';
  return 'custom';
};