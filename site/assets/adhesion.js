const formUrl = window.HCFCED_CONFIG?.adhesionFormUrl;
if (formUrl) {
  try {
    const url = new URL(formUrl);
    const isGoogleForm = url.protocol === 'https:' &&
      (url.hostname === 'forms.gle' ||
       (url.hostname === 'docs.google.com' && url.pathname.startsWith('/forms/')));
    if (isGoogleForm) {
      const link = document.querySelector('#adhesion-link');
      link.href = url.href;
      link.hidden = false;
      document.querySelector('#form-status').textContent = 'Remplissez le formulaire pour transmettre votre demande au Haut Conseil.';
    }
  } catch { /* Une URL incorrecte conserve le message d'attente. */ }
}
