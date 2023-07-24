export const renderSummary = (isIDPKnown: boolean) => {
  if (isIDPKnown === true) {
    return (
      <>
        Hai effettuato l’accesso in app IO con le seguenti identità, se sospetti che una di queste
        sia stata compromessa blocca l’accesso all’app per mantenere i tuoi dati al sicuro.{' '}
      </>
    );
  }
  return (
    <>
      Se sospetti che la tua identità digitale sia stata compromessa blocca l’accesso all’app per
      mantenere i tuoi dati al sicuro.
    </>
  );
};
